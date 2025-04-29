// 모든 하위 레이어 그룹에서 opacity 값이 100 이하인 레이어를 찾아 스마트 오브젝트로 변환합니다.
function convertToSmartObject(layer) {
  // opacity 값이 100 이하인 레이어를 찾아 스마트 오브젝트로 변환합니다.
  if (layer.opacity < 100) {
    var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);

    var idplacedLayerEditContents = stringIDToTypeID("placedLayerEditContents");
    executeAction(idplacedLayerEditContents, undefined, DialogModes.NO);

    layer = app.activeDocument.activeLayer; // 현재 레이어를 다시 가져옴
      app.activeDocument.close(SaveOptions.SAVECHANGES);
  }

  // 하위 레이어 그룹을 검색합니다.
  if (layer.typename == "LayerSet") {
    var layers = layer.layers;
    for (var i = 0; i < layers.length; i++) {
      convertToSmartObject(layers[i]);
    }
  }
}

var layerGroup = app.activeDocument.layerSets[0]; // 최상위 레이어 그룹 선택
convertToSmartObject(layerGroup); // 최상위 레이어 그룹부터 검색 시작


function checkGroupedLayers(layer) {
  if (layer.typename == "LayerSet") {
    var layers = layer.layers;
    var hasGroupedLayer = false;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].grouped == true) {
        hasGroupedLayer = true;
        break;
      } else {
        hasGroupedLayer = checkGroupedLayers(layers[i]);
        if (hasGroupedLayer) {
          break;
        }
      }
    }
    return hasGroupedLayer;
  } else {
    return layer.grouped == true;
  }
}

var layerGroup = app.activeDocument.layerSets[0]; // 최상위 레이어 그룹 선택
var hasGroupedLayer = checkGroupedLayers(layerGroup);
if (!hasGroupedLayer) {
  app.activeDocument.close(SaveOptions.SAVECHANGES);
}