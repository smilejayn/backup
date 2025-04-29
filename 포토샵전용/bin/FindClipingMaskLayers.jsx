// 현재 문서를 가져옵니다
var doc = app.activeDocument;

// 하위 레이어 그룹을 가져옵니다
var subLayerGroup = doc.activeLayer;

// 클리핑 마스크 레이어를 찾습니다
var clippingMask = false;
for (var i = 0; i < subLayerGroup.layers.length; i++) {
  if (subLayerGroup.layers[i].kind == LayerKind.CLIPPINGMASK) {
    clippingMask = true;
    break;
  }
}

// 클리핑 마스크 레이어가 없으면 문서를 닫습니다
if (!clippingMask) {
  doc.close(SaveOptions.DONOTSAVECHANGES);
}