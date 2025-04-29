// 레이어 수를 재귀적으로 계산하는 함수
function countLayersRecursive(layer, count) {
  count++;

  if (layer.layers) {
    for (var i = 0; i < layer.layers.length; i++) {
      count = countLayersRecursive(layer.layers[i], count);
    }
  }
  return count;
}

// 현재 문서에서 레이어 수를 세는 함수
function countLayers() {
  var layers = app.activeDocument.layers;
  var count = 0;

  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];

    if (layer.visible) {
      count = countLayersRecursive(layer, count);
    }
  }
  return count;
}

// 알림창에 레이어 수를 표시하는 함수
function showLayerCount() {
  var count = countLayers();
  alert("레이어 수: " + count);
}

showLayerCount(); // 함수 실행