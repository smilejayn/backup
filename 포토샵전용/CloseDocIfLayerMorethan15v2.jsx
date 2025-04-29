if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var layerCount = countLayers(doc);
  if (layerCount < 15) {
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }
}

function countLayers(doc) {
  var count = 0;
  for (var i = 0; i < doc.layers.length; i++) {
    var layer = doc.layers[i];
    if (!layer.typename) {
      continue;
    } else if ((layer.typename == 'ArtLayer' || layer.typename == 'ShapeLayer' || layer.typename == 'TextLayer' || layer.kind == LayerKind.SMARTOBJECT ) && layer.visible) {
      count++;
    } else if (layer.typename == 'LayerSet') {
      count += countLayers(layer);
    }
  }
  return count;
}