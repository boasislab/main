(function(){
  var wrongKey='forest_wrong_notes_v1';
  var reviewKey='forest_learning_review_v1';
  var migrationKey='forest_oak_study_wrong_seed_20260914_v1';
  var enrichmentKey='forest_oak_study_wrong_enrichment_20260915_v4';
  if(localStorage.getItem(enrichmentKey)) return;
  var legacyDone=!!localStorage.getItem(migrationKey);

  var plan={
    '일요일':{
      '객관식':{'응급처치':[12,13],'야외활동지도':[6],'생명의숲 밧줄놀이':[7],'산림교육의 이해':[6]},
      '주관식':{'응급처치':[2],'야외활동지도':[4],'산림교육의 이해':[1]}
    },
    '월요일':{
      '객관식':{'도시숲가꾸기의 이해':[6,8],'자연생태놀이':[1],'커뮤니케이션':[6,8],'산림문화휴양':[8]},
      '주관식':{'도시숲가꾸기의 이해':[5,6,7],'자연생태놀이':[3,4,5,6,7],'커뮤니케이션':[3,7],'산림문화휴양':[2,3,14]}
    },
    '화요일':{
      '객관식':{'산림토양학':[3],'숲해설프로그램개발':[4]},
      '주관식':{'야생동물의 이해':[1,6,8,19],'산림토양학':[1,2,3,5,6,8,9,10,11,13,14,16,17,18,19,20],'숲해설프로그램개발':[3,4,5,6,7,8,9,10,11,13,14,15,16],'나무·숲·임업':[3,4,5,6,8,9,10,11,12,14,15,24,25,26]}
    },
    '수요일':{
      '객관식':{'계절을 찾아가는 식물':[9],'교육프로그램 운영실습':[2]},
      '주관식':{'계절을 찾아가는 식물':[2,4,5,9,10],'양서·파충류':[1,2,3,6,7,9],'교육프로그램 운영실습':[1,2,3,4,5,6,8,9,11],'식물의 이해':[1,3,4,5,6,7,8,9]}
    },
    '목요일':{
      '객관식':{'곤충의 이해':[8],'수서생물':[5],'식물의 이해–목본':[7]},
      '주관식':{'곤충의 이해':[1,3,7,8,11,12,13],'수서생물':[8,10],'기후변화':[3,7],'식물의 이해–목본':[2,3,6]}
    },
    '금요일':{
      '객관식':{'인간관계학':[9,13],'산림생태학':[4,6,18],'숲해설개론':[2,10]},
      '주관식':{'인간관계학':[1,2,3,4,9,10],'숲해설기법':[1,2,3,4,5,7,8,9,10,11],'산림생태학':[1,4,6,7,8,9,10],'숲해설개론':[1,2,5,7]}
    }
  };
  var noteLinks={
    '응급처치':'20260313_응급처치_정리본.html','야외활동지도':'20260317_야외활동지도_정리본.html','생명의숲 밧줄놀이':'20260404_생명의숲밧줄놀이_정리본.html','산림교육의 이해':'0224_산림교육의이해_정리본_최종.html','도시숲가꾸기의 이해':'도시숲가꾸기_통합정리본.html','자연생태놀이':'20260411_자연생태놀이_정리본.html','커뮤니케이션':'20260711_커뮤니케이션_정리본.html','산림문화휴양':'20260226_산림휴양문화_정리본_최종.html','야생동물의 이해':'0307_야생동물의이해_통합정리본.html','산림토양학':'0328_산림토양학_정리본_최종.html','숲해설프로그램개발':'20260711_숲해설프로그램개발_정리본.html','나무·숲·임업':'0310_나무숲임업_정리본_최종.html','계절을 찾아가는 식물':'20260331_계절을찾아가는식물이야기_정리본.html','교육프로그램 운영실습':'20260708_교육프로그램운영실습1_정리초안.html','양서·파충류':'0416_양서파충류_정리본.html','식물의 이해':'식물의이해_초본목본_통합정리본.html','곤충의 이해':'0407_곤충의이해_정리본_완전본.html','수서생물':'20260613_수서생물_정리본.html','기후변화':'기후위기탄소중립_통합정리본.html','식물의 이해–목본':'식물의이해_초본목본_통합정리본.html','인간관계학':'0228_인간관계학_정리본.html','산림생태학':'0421_산림생태학_정리본_최종.html','숲해설개론':'0519_숲해설개론_정리본_최종.html','숲해설기법':'20260711_커뮤니케이션_정리본.html#forest-technique'
  };
  function study(file,text){return file+'#study='+encodeURIComponent(text)}
  var topicLinks={
    '응급처치':{
      '심장발작 위험요인과 응급 대응':study('20260313_응급처치_정리본.html','4. 심장발작'),
      '심폐소생술의 원리와 시행 기준':study('20260313_응급처치_정리본.html','5. 심폐소생술'),
      '응급처치 목적과 기본 절차':study('20260313_응급처치_정리본.html','1. 응급처치의 정의와 목적')},
    '야외활동지도':{
      '자연선호 이론과 야외활동 효과':'20260317_야외활동지도_정리본.html#forest-comfort-theories',
      '야외활동 효과와 안전':study('20260317_야외활동지도_정리본.html','야외에서의 안전 점검 및 준비')},
    '생명의숲 밧줄놀이':{'밧줄 설치 수목 선정과 안전':study('20260404_생명의숲밧줄놀이_정리본.html','나무(수목) 선정 기준')},
    '산림교육의 이해':{
      '산림교육 관련 법적 정의':study('0224_산림교육의이해_정리본_최종.html','산림교육 및 복지 전문가'),
      '산림교육 법·제도':study('0224_산림교육의이해_정리본_최종.html','산림교육법')},
    '도시숲가꾸기의 이해':{
      '도시숲 구성과 숲가꾸기':study('도시숲가꾸기_통합정리본.html','9. 숲가꾸기'),
      '산림 소유 구분과 공유림':study('도시숲가꾸기_통합정리본.html','2. 산림 기본 용어'),
      '혼효림 판정 기준':study('도시숲가꾸기_통합정리본.html','3. 임상')},
    '자연생태놀이':{
      '자연놀이 유형과 운영원칙':study('20260411_자연생태놀이_정리본.html','4. 자연놀이·숲놀이·생태놀이'),
      '자연생태놀이의 원리':study('20260411_자연생태놀이_정리본.html','9. 자연놀이 8대 영역')},
    '커뮤니케이션':{
      '의사소통·경청·피드백':'20260711_커뮤니케이션_정리본.html#listening',
      '대상별 눈높이 커뮤니케이션':'20260711_커뮤니케이션_정리본.html#target',
      '도입과 관계 형성':'20260711_커뮤니케이션_정리본.html#process'},
    '산림문화휴양':{
      '산림문화·여가·휴양':study('20260226_산림휴양문화_정리본_최종.html','19. 산림문화의 개념과 어원'),
      '여가·휴양 개념과 어원':study('20260226_산림휴양문화_정리본_최종.html','4. 여가')},
    '야생동물의 이해':{'조류·포유류 생태와 식별':study('0307_야생동물의이해_통합정리본.html','1. 조류의 특징')},
    '산림토양학':{
      '토양 구조·층위·수분·양분':study('0328_산림토양학_정리본_최종.html','8. 토양 단면'),
      '토양의 지지 기능과 구조':study('0328_산림토양학_정리본_최종.html','13. 입단')},
    '숲해설프로그램개발':{
      '프로그램 기획·개발·평가':study('20260711_숲해설프로그램개발_정리본.html','프로그램 개발 프로세스'),
      '프로그램 운영의 참여·흥미':study('20260711_숲해설프로그램개발_정리본.html','도입, 전개, 마무리')},
    '나무·숲·임업':{'수목 형태·생리·분류':study('0310_나무숲임업_정리본_최종.html','나무의 구조')},
    '계절을 찾아가는 식물':{
      '계절식물 관찰과 식별':study('20260331_계절을찾아가는식물이야기_정리본.html','계절별 식물'),
      '단엽·복엽과 겨드랑눈 판별':study('20260331_계절을찾아가는식물이야기_정리본.html','홑잎(단엽), 겹잎(복엽)')},
    '교육프로그램 운영실습':{
      '현장 운영 전 사전점검':study('20260708_교육프로그램운영실습1_정리초안.html','장소·등산로 사전조사'),
      '현장 운영·평가·안전':study('20260708_교육프로그램운영실습1_정리초안.html','도입·전개·절정·마무리 구성')},
    '양서·파충류':{'양서·파충류 분류·생태·보전':study('0416_양서파충류_정리본.html','14. 멸종위기종과 생태계 보전')},
    '식물의 이해':{'초본의 형태·분류·생식':study('식물의이해_초본목본_통합정리본.html','4. 식물의 기관')},
    '곤충의 이해':{
      '곤충 구조·변태·생태':study('0407_곤충의이해_정리본_완전본.html','Ⅲ. 곤충의 구조'),
      '곤충의 분류학적 위치':study('0407_곤충의이해_정리본_완전본.html','Ⅷ. 곤충의 분류')},
    '수서생물':{
      '하천 생태와 수서생물':study('20260613_수서생물_정리본.html','1. 수환경의 3대 요소'),
      '하천연속성과 생태 연결성':study('20260613_수서생물_정리본.html','하천연속성 개념')},
    '기후변화':{'기후위기·탄소중립':study('기후위기탄소중립_통합정리본.html','7. 기후변화의 영향')},
    '식물의 이해–목본':{
      '목본 형태·분류·생리':study('식물의이해_초본목본_통합정리본.html','2. 수목 식별 · 분류 · 명명'),
      '소나무·곰솔 형태 구별':study('식물의이해_초본목본_통합정리본.html','소나무 계열 구별')},
    '인간관계학':{
      '고전적 기질과 성격유형':study('0228_인간관계학_정리본.html','3. 네 가지 기질 유형'),
      '기질 유형 ET·EF·IT·IF':study('0228_인간관계학_정리본.html','네 유형의 상세 행동 특성'),
      '자기이해·성격유형·관계':study('0228_인간관계학_정리본.html','1. 자기이해에서 시작하는 인간관계')},
    '산림생태학':{
      '귀화식물 유입과 생태계 영향':study('0421_산림생태학_정리본_최종.html','귀화식물 유입 경로'),
      '귀화식물의 경쟁력과 관리':study('0421_산림생태학_정리본_최종.html','대표적인 문제 귀화식물'),
      '백두대간 지형과 생태축':study('0421_산림생태학_정리본_최종.html','산림생태계 구성 요소'),
      '산림생태계 구조·천이·보전':study('0421_산림생태학_정리본_최종.html','천이(遷移)란')},
    '숲해설개론':{
      '산림문화와 전통 숲 사례':study('0519_숲해설개론_정리본_최종.html','자연/문화의 복합 자원의 적극적 소개'),
      '숲길 법·제도와 기본계획':study('0519_숲해설개론_정리본_최종.html','숲길 조성 및 관리 기본계획'),
      '숲해설 목적·탐방·생태감수성':study('0519_숲해설개론_정리본_최종.html','숲 해설의 목적')},
    '숲해설기법':{'해설기법·매체·스토리텔링':'20260711_커뮤니케이션_정리본.html#forest-technique'}
  };
  var wrong=[];try{wrong=JSON.parse(localStorage.getItem(wrongKey)||'[]')}catch(e){wrong=[]}
  var grouped={};
  Object.keys(plan).forEach(function(day){Object.keys(plan[day]).forEach(function(type){Object.keys(plan[day][type]).forEach(function(subject){plan[day][type][subject].forEach(function(no){
    var id=day+'-'+type+'-'+subject+'-'+no;
    if(!legacyDone&&!wrong.some(function(x){return x.key==='oak-study-20260914::'+id})) wrong.push({key:'oak-study-20260914::'+id,subject:subject,questionNo:day+' '+type+' '+no+'번',question:'떡갈나무팀 6인 취합본에서 틀린 문제 — '+subject+' '+no+'번',chosen:'직접 풀이에서 오답',correct:'합본 정답표와 강의 정리로 재확인',explanation:'문제의 핵심 개념을 심화학습 목록에 연결했습니다.',source:noteLinks[subject]||'team_oak_activity.html',attempts:1,lastWrongAt:new Date().toISOString(),mastered:false});
    (grouped[subject]||(grouped[subject]=[])).push(day+' '+type+' '+no+'번');
  })})})});
  var bank=window.OAK_STUDY_QUESTION_BANK||{};
  wrong.forEach(function(note){
    if(String(note.key||'').indexOf('oak-study-20260914::')!==0)return;
    var raw=note.key.split('::')[1]||'',parts=raw.split('-'),day=parts.shift(),type=parts.shift(),no=parts.pop(),subject=parts.join('-');
    var info=bank[day+'|'+type+'|'+subject+'|'+no];
    if(!info)return;
    note.question=info.question;
    if(info.correct)note.correct=info.correct;
    note.learningTopic=info.learningTopic;
    note.studyPath=info.studyPath;
    note.explanation=(info.explanation?info.explanation+' ':'')+'학습과정: '+info.studyPath;
    note.day=day;note.questionType=type;note.questionNumber=Number(no);
  });
  localStorage.setItem(wrongKey,JSON.stringify(wrong));

  var reviews=[];try{reviews=JSON.parse(localStorage.getItem(reviewKey)||'[]')}catch(e){reviews=[]}
  Object.keys(grouped).forEach(function(subject){
    var id='oak-wrong-review-20260914-'+subject,topics=[];
    wrong.filter(function(n){return n.subject===subject&&n.learningTopic}).forEach(function(n){if(topics.indexOf(n.learningTopic)<0)topics.push(n.learningTopic)});
    var old=reviews.find(function(x){return x.id===id});
    var cleanTopics=topics.length?topics:[subject+' 핵심 개념 재학습'];
    var deepLinks=cleanTopics.map(function(label){return {label:label,href:(topicLinks[subject]&&topicLinks[subject][label])||noteLinks[subject]||'team_oak_activity.html'};});
    var item={id:id,subject:(subject==='숲해설기법'?'커뮤니케이션':subject)+' 심화',topic:cleanTopics.join(' · '),source:(deepLinks[0]&&deepLinks[0].href)||noteLinks[subject]||'team_oak_activity.html',links:deepLinks,done:old?!!old.done:false,createdAt:old&&old.createdAt||new Date().toISOString()};
    if(old)Object.assign(old,item);else if(!legacyDone)reviews.unshift(item);
  });
  localStorage.setItem(reviewKey,JSON.stringify(reviews));
  if(!legacyDone)localStorage.setItem(migrationKey,new Date().toISOString());
  localStorage.setItem(enrichmentKey,new Date().toISOString());
  location.reload();
})();
