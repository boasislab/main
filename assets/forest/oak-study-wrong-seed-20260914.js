(function(){
  var wrongKey='forest_wrong_notes_v1';
  var reviewKey='forest_learning_review_v1';
  var migrationKey='forest_oak_study_wrong_seed_20260914_v1';
  if(localStorage.getItem(migrationKey)) return;

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
  var wrong=[];try{wrong=JSON.parse(localStorage.getItem(wrongKey)||'[]')}catch(e){wrong=[]}
  var grouped={};
  Object.keys(plan).forEach(function(day){Object.keys(plan[day]).forEach(function(type){Object.keys(plan[day][type]).forEach(function(subject){plan[day][type][subject].forEach(function(no){
    var id=day+'-'+type+'-'+subject+'-'+no;
    if(!wrong.some(function(x){return x.key==='oak-study-20260914::'+id})) wrong.push({key:'oak-study-20260914::'+id,subject:subject,questionNo:day+' '+type+' '+no+'번',question:'떡갈나무팀 6인 취합본에서 틀린 문제 — '+subject+' '+no+'번',chosen:'직접 풀이에서 오답',correct:'합본 정답표와 강의 정리로 재확인',explanation:'문제의 핵심 개념을 심화학습 목록에 연결했습니다.',source:noteLinks[subject]||'team_oak_activity.html',attempts:1,lastWrongAt:new Date().toISOString(),mastered:false});
    (grouped[subject]||(grouped[subject]=[])).push(day+' '+type+' '+no+'번');
  })})})});
  localStorage.setItem(wrongKey,JSON.stringify(wrong));

  var reviews=[];try{reviews=JSON.parse(localStorage.getItem(reviewKey)||'[]')}catch(e){reviews=[]}
  Object.keys(grouped).forEach(function(subject){var id='oak-wrong-review-20260914-'+subject;var item={id:id,subject:(subject==='숲해설기법'?'커뮤니케이션':subject)+' 심화',topic:'6인 취합본 오답 복습 — '+grouped[subject].join(' · '),source:noteLinks[subject]||'team_oak_activity.html',done:false,createdAt:new Date().toISOString()};if(!reviews.some(function(x){return x.id===id}))reviews.unshift(item)});
  localStorage.setItem(reviewKey,JSON.stringify(reviews));
  localStorage.setItem(migrationKey,new Date().toISOString());
  location.reload();
})();
