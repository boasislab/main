(function () {
  'use strict';
  const file = decodeURIComponent(location.pathname.split('/').pop() || '');
  const topicsByFile = {
    '20260313_응급처치_정리본.html': ['응급처치의 목적','행동 절차','심폐소생술','가슴압박','기도폐쇄','자동심장충격기','드레싱','쇼크'],
    '20260317_야외활동지도_정리본.html': ['세로토닌','알파파','피톤치드','유아','살모사','중증열성혈소판감소증후군','중독식물'],
    '20260404_생명의숲밧줄놀이_정리본.html': ['트리 플레잉','수목 선정','기대효과','클로브히치','에반스매듭'],
    '0224_산림교육의이해_정리본_최종.html': ['산림교육전문가','산림의 정의','산림청','치산녹화','천이','극상림','BOBOS'],
    '도시숲가꾸기_통합정리본.html': ['산림과 삼림','혼효림','벌기령','극단적 양수','천연림','산림의 6가지 기능','가지치기','솎아베기','지륭부','흉고직경','지하고','그린짐','교목','관목'],
    '20260411_자연생태놀이_정리본.html': ['자연놀이·숲놀이·생태놀이','자연놀이 8대 영역','그린워싱','자유놀이와 기획놀이','자발성','자율성','치유 경관','바이오필리아','자연결핍','비타민 N','안전과 위험'],
    '20260711_커뮤니케이션_정리본.html': ['커뮤니케이션의 어원','언어적 커뮤니케이션','비언어적 커뮤니케이션','EAR','경청','피드백','두괄식','AIDA','공감적 경청','산파술','비공식적 커뮤니케이션','투사적 경청'],
    '20260226_산림휴양문화_정리본_최종.html': ['여가','휴양','산림휴양','숲과 산림','Forest','Wood','치유','치료','둘레길','트레일','지리산 둘레길','자아실현','생애주기별 산림복지','LNT','샤토브리앙','무형적 산림문화재'],
    '0307_야생동물의이해_통합정리본.html': ['항온동물','기낭','모래주머니','경부','부척','파상형','정지비행','철새','큰뒷부리도요','넓적부리도요','중대백로','대백로','가창오리','순천만','흑두루미','우제목','5지 구조','쇠족제비','분장','똥돌','똥굴','꼬마물떼새'],
    '0328_산림토양학_정리본_최종.html': ['산림토양의 특성','공극','토심','표층','심토층','석회','피트모스','코코피트','매토종자','토양 층위','침투수','표면수','입단구조','토성 삼각도','비료의 3요소','잔뿌리','수관','리본법'],
    '20260711_숲해설프로그램개발_정리본.html': ['해설가','산림교육','가치관','6W1H','프리먼 틸든','산림휴양','존 뮤어','이노스 밀스','기대효과','평가와 피드백','ADDIE','사전답사','인지','정서','행동','실즈','글래스고','TORE'],
    '0310_나무숲임업_정리본_최종.html': ['반송','소나무재선충병','아조변이','대목','접수','운향과','견과','산림욕장','질소고정','공익적 가치','산림자원','단풍나무','가지치기']
  };
  const topics = topicsByFile[file];
  if (!topics) return;
  const style = document.createElement('style');
  style.textContent = '.team-oak-important{position:relative;outline:3px solid #f2c94c!important;outline-offset:3px;border-radius:8px;background-image:linear-gradient(rgba(255,248,210,.42),rgba(255,248,210,.42))!important}.team-oak-important-badge{display:inline-flex;align-items:center;margin:4px 6px 4px 0;padding:4px 8px;border-radius:999px;background:#7a5700;color:#fff;font-size:12px;font-weight:900;line-height:1.2;vertical-align:middle}.team-oak-legend{margin:14px 0;padding:12px 14px;border:1px solid #e2c35b;border-radius:12px;background:#fff9df;color:#5d4808;font-size:14px}.team-oak-legend strong{color:#704f00}';
  document.head.appendChild(style);
  const candidates = Array.from(document.querySelectorAll('h1,h2,h3,h4,tr,li,p,dt,dd,.card,.box,.important,.tip')).filter(el => !el.closest('nav,footer,script,style'));
  let marked = 0;
  topics.forEach(topic => {
    const matches = candidates.filter(el => (el.textContent || '').replace(/\s+/g,' ').includes(topic));
    if (!matches.length) return;
    matches.sort((a,b) => a.textContent.length - b.textContent.length);
    let target = matches[0];
    if (/^H[1-4]$/.test(target.tagName)) target = target.closest('section,article,.card,.box') || target;
    if (target.classList.contains('team-oak-important')) return;
    target.classList.add('team-oak-important');
    const badge = document.createElement('span');
    badge.className = 'team-oak-important-badge';
    badge.textContent = '★ 6인 취합 주관식 중요';
    target.insertAdjacentElement('afterbegin',badge);
    marked += 1;
  });
  if (marked) {
    const legend = document.createElement('div');
    legend.className = 'team-oak-legend';
    legend.innerHTML = '<strong>★ 떡갈나무팀 6인 취합 주관식 중요</strong><br>취합 문제와 직접 연결되는 기존 강의 내용을 강조했습니다. 검증이 끝나지 않은 답은 강조 대상에서 제외했습니다.';
    const main = document.querySelector('main,.container,.wrap,body');
    const firstHeading = main.querySelector('h1');
    if (firstHeading) firstHeading.insertAdjacentElement('afterend',legend); else main.insertAdjacentElement('afterbegin',legend);
  }
})();
