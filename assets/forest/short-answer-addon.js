(function () {
  'use strict';

  const LIMIT = 20;
  const CIRCLED = {'①': 1, '②': 2, '③': 3, '④': 4};

  function cleanText(value) {
    return String(value || '').replace(/^[\s(（]*[A-Da-d1-4①②③④][.)）\s]+/, '').trim();
  }

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[·ㆍ\-\s()（）\[\]{}.,!?"'“”‘’:：/]/g, '')
      .replace(/℃/g, '도');
  }

  function answerNumber(text) {
    const source = String(text || '');
    for (const mark of Object.keys(CIRCLED)) {
      if (source.includes(mark)) return CIRCLED[mark];
    }
    const numbered = source.match(/정답\s*[:：]?\s*([1-4])/);
    if (numbered) return Number(numbered[1]);
    const lettered = source.match(/정답\s*[:：]?\s*\(?([A-D])\)?/i);
    if (lettered) return lettered[1].toUpperCase().charCodeAt(0) - 64;
    return 0;
  }

  function optionNodes(card) {
    const selectors = [
      '.options .opt-btn', '.options .option-btn', '.options li',
      'button.option', '.choices button', '.choices li', '.choice', '.option-item'
    ];
    for (const selector of selectors) {
      const nodes = Array.from(card.querySelectorAll(selector)).filter(function (node) {
        return !node.classList.contains('btn-reveal') && !node.classList.contains('check-btn');
      });
      if (nodes.length >= 2) return nodes.slice(0, 4);
    }
    return [];
  }

  function correctIndexFromMarkup(card, options) {
    const dataAnswer = Number(card.getAttribute('data-answer'));
    if (dataAnswer >= 1 && dataAnswer <= 4) return dataAnswer - 1;

    const answerBox = card.querySelector('.answer-box, .ans-label, .explanation');
    const boxNumber = answerNumber(answerBox && answerBox.textContent);
    if (boxNumber) return boxNumber - 1;

    for (let i = 0; i < options.length; i++) {
      if (options[i].hasAttribute('data-correct')) return i;
      const onclick = options[i].getAttribute('onclick') || '';
      if (/[,\s]['"]a['"]\s*\)/i.test(onclick)) return i;
      const check = onclick.match(/checkAnswer\([^,]+,\s*['"]([A-D])['"],\s*['"]([A-D])['"]\)/i);
      if (check && check[1].toUpperCase() === check[2].toUpperCase()) return i;
    }
    return -1;
  }

  function dataBackedQuestions() {
    try {
      if (typeof questions !== 'undefined' && Array.isArray(questions)) {
        return questions.map(function (item) {
          return {q: item.q, answer: item.o && item.o[item.a], exp: item.e || ''};
        });
      }
    } catch (e) {}
    try {
      if (typeof QS !== 'undefined' && Array.isArray(QS)) {
        return QS.map(function (item) {
          return {q: item.q, answer: item.opts && item.opts[item.ans], exp: item.exp || ''};
        });
      }
    } catch (e) {}
    return [];
  }

  function domBackedQuestions() {
    const cards = Array.from(document.querySelectorAll('.question-card, .quiz-card, .q-card, .question'))
      .filter(function (card) { return !card.closest('#short-answer-addon'); });
    const result = [];
    cards.forEach(function (card) {
      const qNode = card.querySelector('.question-text, .q-text');
      const options = optionNodes(card);
      if (!qNode || options.length < 2) return;
      const correctIndex = correctIndexFromMarkup(card, options);
      if (correctIndex < 0 || !options[correctIndex]) return;
      const explanation = card.querySelector('.explanation, .answer-box, .result-msg');
      result.push({
        q: qNode.textContent.trim(),
        answer: cleanText(options[correctIndex].textContent),
        exp: explanation ? explanation.textContent.replace(/^\s*(정답|💡)[^—\n]*[—\n]?\s*/, '').trim() : ''
      });
    });
    return result;
  }

  function selectQuestions() {
    const source = dataBackedQuestions();
    const items = source.length >= LIMIT ? source : domBackedQuestions();
    if (!items.length) return [];
    const step = Math.max(1, Math.floor(items.length / LIMIT));
    const selected = [];
    for (let i = 0; i < items.length && selected.length < LIMIT; i += step) {
      if (items[i].q && items[i].answer) selected.push(items[i]);
    }
    for (let i = 0; i < items.length && selected.length < Math.min(LIMIT, items.length); i++) {
      if (!selected.includes(items[i]) && items[i].q && items[i].answer) selected.push(items[i]);
    }
    return selected.slice(0, LIMIT);
  }

  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #short-answer-addon{max-width:860px;margin:28px auto;padding:0 20px;font-family:'Apple SD Gothic Neo','Noto Sans KR',sans-serif;color:#222}
      #short-answer-addon .sa-heading{font-size:1.18rem;font-weight:900;color:#7b1f28;margin:0 0 8px}
      #short-answer-addon .sa-guide{font-size:.88rem;color:#666;margin:0 0 14px;line-height:1.55}
      #short-answer-addon .sa-score{position:sticky;top:58px;z-index:100;background:#fff7f7;border:1px solid #efb6ba;border-radius:10px;padding:11px 14px;margin-bottom:14px;font-weight:800;color:#8f2731;box-shadow:0 2px 8px rgba(70,20,25,.08)}
      #short-answer-addon .sa-card{background:#fff;border-left:5px solid #ef9a9a;border-radius:12px;padding:18px 20px;margin-bottom:14px;box-shadow:0 1px 5px rgba(0,0,0,.08)}
      #short-answer-addon .sa-card.correct{border-left-color:#43a047}#short-answer-addon .sa-card.wrong{border-left-color:#e53935}
      #short-answer-addon .sa-num{font-size:.78rem;font-weight:900;color:#a3343e;margin-bottom:5px}#short-answer-addon .sa-q{font-weight:700;line-height:1.58;margin-bottom:11px}
      #short-answer-addon .sa-row{display:flex;gap:8px}.sa-input{flex:1;min-width:0;border:1.5px solid #e0c8ca;border-radius:8px;padding:10px 12px;font:inherit}.sa-input:focus{outline:none;border-color:#b33b45;box-shadow:0 0 0 3px rgba(179,59,69,.12)}
      #short-answer-addon .sa-check{border:0;border-radius:8px;padding:0 15px;background:#a3343e;color:#fff;font-weight:900;cursor:pointer}#short-answer-addon .sa-check:disabled{background:#b0bec5}
      #short-answer-addon .sa-result{display:none;margin-top:10px;border-radius:7px;padding:10px 12px;font-size:.87rem;line-height:1.55}.sa-result.show{display:block}.sa-result.correct{background:#e8f5e9;color:#1b5e20}.sa-result.partial{background:#fff3e0;color:#6d4c41}.sa-result.wrong{background:#ffebee;color:#b71c1c}
      #short-answer-addon .sa-reset{float:right;border:1px solid #d58d94;background:#fff;color:#8f2731;border-radius:7px;padding:5px 10px;font-weight:800;cursor:pointer}
      @media(max-width:560px){#short-answer-addon .sa-row{flex-direction:column}#short-answer-addon .sa-check{min-height:42px}}
      @media print{#short-answer-addon .sa-score{position:static}}
    `;
    document.head.appendChild(style);
  }

  function init() {
    if (document.getElementById('short-answer-addon')) return;
    const items = selectQuestions();
    if (!items.length) return;
    addStyles();
    const meta = document.querySelector('header .meta, .subtitle');
    if (meta && !/주관식/.test(meta.textContent)) {
      meta.textContent = meta.textContent.trim() + ' | 단답형 주관식 ' + items.length + '문항';
    }
    const section = document.createElement('section');
    section.id = 'short-answer-addon';
    section.innerHTML = '<div class="sa-heading">단답형 주관식 ' + items.length + '문항</div>' +
      '<p class="sa-guide">객관식에서 다룬 핵심 내용을 보기 없이 직접 적어 보세요. 띄어쓰기·기호 차이는 자동으로 보정하며, 채점 후 정답과 해설을 확인할 수 있습니다.</p>' +
      '<div class="sa-score"><span id="sa-score-text">0 / ' + items.length + '</span><button type="button" class="sa-reset">다시 풀기</button></div>';

    let score = 0;
    items.forEach(function (item, index) {
      const card = document.createElement('article');
      card.className = 'sa-card';
      const safeQuestion = document.createElement('div');
      safeQuestion.textContent = item.q;
      card.innerHTML = '<div class="sa-num">단답형 ' + (index + 1) + '</div><div class="sa-q"></div><div class="sa-row"><input class="sa-input" type="text" autocomplete="off" placeholder="정답 입력"><button type="button" class="sa-check">채점</button></div><div class="sa-result"></div>';
      card.querySelector('.sa-q').textContent = safeQuestion.textContent;
      const input = card.querySelector('.sa-input');
      const button = card.querySelector('.sa-check');
      const result = card.querySelector('.sa-result');
      function check() {
        const entered = normalize(input.value);
        const answer = normalize(item.answer);
        if (!entered) { input.focus(); input.placeholder = '답을 먼저 입력하세요'; return; }
        const exact = entered === answer || (entered.length >= 3 && answer.includes(entered)) || (answer.length >= 3 && entered.includes(answer));
        const tokens = cleanText(item.answer).split(/[\s·,()（）/]+/).map(normalize).filter(function (v) { return v.length >= 2; });
        const partial = !exact && tokens.some(function (token) { return entered.includes(token); });
        input.disabled = true; button.disabled = true; result.classList.add('show');
        if (exact) { score++; card.classList.add('correct'); result.classList.add('correct'); result.textContent = '정답입니다. 정답: ' + item.answer + (item.exp ? ' — ' + item.exp : ''); }
        else if (partial) { result.classList.add('partial'); result.textContent = '부분정답입니다. 정답: ' + item.answer + (item.exp ? ' — ' + item.exp : ''); }
        else { card.classList.add('wrong'); result.classList.add('wrong'); result.textContent = '오답입니다. 정답: ' + item.answer + (item.exp ? ' — ' + item.exp : ''); }
        section.querySelector('#sa-score-text').textContent = score + ' / ' + items.length;
      }
      button.addEventListener('click', check);
      input.addEventListener('keydown', function (event) { if (event.key === 'Enter') check(); });
      section.appendChild(card);
    });
    section.querySelector('.sa-reset').addEventListener('click', function () { window.location.reload(); });
    const footer = document.querySelector('footer, .footer, .forest-back-link-bottom');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 0);
})();
