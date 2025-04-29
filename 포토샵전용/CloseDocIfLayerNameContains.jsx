//batch - action용
// 스마트오브젝트는 검색결과 제외기능 추가
// 레이어그룹도 검색결과 걸리게 기능추가

var layerName1 = "title";
var layerName2 = "bottom";
var closeDoc = true;
var selectLayers = [];

function searchLayer(layer) {
  if (layer.typename === "LayerSet") {
    // 레이어그룹일 경우
    if (layer.name.indexOf(layerName1) != -1 || layer.name.indexOf(layerName2) != -1) {
      selectLayers.push(layer);
      closeDoc = false;
    } else {
      for (var j = 0; j < layer.layers.length; j++) {
        searchLayer(layer.layers[j]);
      }
    }
  } else if (layer.typename === "ArtLayer" && layer.kind !== LayerKind.SMARTOBJECT) {
    // 일반 레이어일 경우
    if (layer.name.indexOf(layerName1) != -1 || layer.name.indexOf(layerName2) != -1) {
      selectLayers.push(layer);
      closeDoc = false;
    }
  }
}

for (var i = 0; i < app.activeDocument.layers.length; i++) {
  searchLayer(app.activeDocument.layers[i]);
}

if (closeDoc) {
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
} else {
  for (var i = 0; i < selectLayers.length; i++) {
    selectLayers[i].selected = true;
  }
  app.activeDocument.activeLayer = selectLayers[0];
}