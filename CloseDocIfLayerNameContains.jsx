//batch - action용

var layerName1 = "사각형 18";
var layerName2 = "벡터 고급 개체";
var closeDoc = true;
var selectLayers = [];

function searchLayer(layer) {
  if (layer.typename === "LayerSet") {
    for (var j = 0; j < layer.layers.length; j++) {
      searchLayer(layer.layers[j]);
    }
  } else if (layer.typename === "ArtLayer") {
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