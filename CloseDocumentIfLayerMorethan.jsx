// 문서에서 활성 레이어의 하위 그룹에 있는 모든 레이어 수가 20개를 초과하면 문서를 닫습니다.
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var layerCount = countLayers(doc.activeLayer);
  if (layerCount > 25) {
    doc.close(SaveOptions.SAVECHANGES);
  }
}

function countLayers(layer) {
  var count = 0;
  if (!layer.typename || layer.typename == 'Layer') {
    count++;
  } else if (layer.typename == 'LayerSet') {
    for (var i = 0; i < layer.layers.length; i++) {
      count += countLayers(layer.layers[i]);
    }
  }
  return count;
}