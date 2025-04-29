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
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}