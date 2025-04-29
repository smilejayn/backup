// 현재 열려있는 문서에서 레이어명이 '｜R'로 끝나는 모든 레이어를 삭제하는 스크립트

// 현재 열려있는 문서를 가져옵니다.
var doc = app.activeDocument;

// 레이어 수 만큼 반복하는 함수
function deleteLayers(layers) {
  for(var i=layers.length-1; i>=0; i--){
    // 레이어명이 '｜R'로 끝나는 경우
    if(layers[i].name.substr(-2) == '｜R'){
      // 해당 레이어를 삭제합니다.
      layers[i].remove();
    }
    // 하위 그룹이 있는 경우, 재귀적으로 deleteLayers 함수를 호출합니다.
    if(layers[i].typename == 'LayerSet'){
      deleteLayers(layers[i].layers);
    }
  }
}

// 레이어를 삭제합니다.
deleteLayers(doc.layers);