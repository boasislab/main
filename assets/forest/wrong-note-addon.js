(function () {
  'use strict';
  var STORAGE_KEY = 'forest_wrong_notes_v1';

  function loadNotes() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    updateCount(notes);
  }

  function clean(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function pageSubject() {
    var h1 = document.querySelector('h1');
    return clean(h1 ? h1.textContent.replace(/[—-]?\s*기출문제집.*$/, '') : document.title);
  }

  function updateCount(notes) {
    var count = notes.filter(function (note) { return !note.mastered; }).length;
    document.querySelectorAll('[data-wrong-note-count]').forEach(function (el) {
      el.textContent = String(count);
    });
  }

  function addToolbar() {
    var host = document.querySelector('.score-board') || document.querySelector('header');
    if (!host || document.querySelector('.wrong-note-link')) return;
    var link = document.createElement('a');
    link.className = 'wrong-note-link';
    link.href = 'forest_wrong_notes.html';
    link.innerHTML = '📕 오답노트 <strong data-wrong-note-count>0</strong>';
    link.style.cssText = 'display:inline-flex;align-items:center;gap:6px;background:#fff1f0;color:#991b1b;border:1px solid #f0a5a0;border-radius:8px;padding:9px 13px;text-decoration:none;font-weight:800;font-size:14px;';
    host.appendChild(link);
    updateCount(loadNotes());
  }

  function recordWrong(option) {
    if (!option.classList.contains('wrong')) return;
    var card = option.closest('.question-card');
    if (!card) return;
    var qid = card.id || clean(card.querySelector('.question-num') && card.querySelector('.question-num').textContent);
    var question = clean(card.querySelector('.question-text') && card.querySelector('.question-text').textContent).replace(/★/g, '').trim();
    var answerBox = card.querySelector('.answer-box');
    var correctOption = card.querySelector('.options li.correct');
    var subject = pageSubject();
    var key = location.pathname.split('/').pop() + '::' + qid;
    var notes = loadNotes();
    var existing = notes.find(function (note) { return note.key === key; });
    var data = {
      key: key,
      subject: subject,
      questionNo: clean(card.querySelector('.question-num') && card.querySelector('.question-num').textContent) || qid,
      question: question,
      chosen: clean(option.textContent),
      correct: clean(correctOption && correctOption.textContent),
      explanation: clean(answerBox && answerBox.textContent).replace(/^정답:\s*[^ ]+\s*/, ''),
      source: location.pathname.split('/').pop(),
      updatedAt: new Date().toISOString(),
      mastered: false,
      attempts: existing ? (existing.attempts || 1) + 1 : 1
    };
    if (existing) notes[notes.indexOf(existing)] = data;
    else notes.unshift(data);
    saveNotes(notes);
    var old = card.querySelector('.wrong-note-saved');
    if (!old) {
      old = document.createElement('div');
      old.className = 'wrong-note-saved';
      old.style.cssText = 'margin-top:9px;color:#991b1b;font-size:13px;font-weight:800;';
      card.appendChild(old);
    }
    old.textContent = '📕 오답노트에 자동 저장됨';
  }

  document.addEventListener('click', function (event) {
    var option = event.target.closest('.question-card .options li');
    if (!option) return;
    setTimeout(function () { recordWrong(option); }, 0);
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addToolbar);
  else addToolbar();
})();
