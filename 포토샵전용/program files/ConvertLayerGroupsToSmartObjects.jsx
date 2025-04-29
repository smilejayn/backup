if (documents.length) {
  sTT = stringIDToTypeID;
  (ref = new ActionReference()).putProperty(sTT('property'), json = sTT('json'));
  ref.putEnumerated(sTT('document'), sTT('ordinal'), sTT('targetEnum')),
  (dsc = new ActionDescriptor()).putReference(sTT('null'), ref);
  dsc.putBoolean(sTT('includeAncestors'), true),
  dsc.putBoolean(sTT('selectedLayers'), false),
  evl = eval('(' + executeAction(sTT('get'), dsc).getString(json) + ')');

  function slct(layerSetValue) {
    (ref = new ActionReference()).putIdentifier(sTT('layer'), layerSetValue.id),
    dsc.putReference(sTT('null'), ref),
    executeAction(sTT('select'), dsc)
  }

  function deselectLayers() {
    var dsc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(sTT('layer'), sTT('ordinal'), sTT('targetEnum'));
    dsc.putReference(sTT('null'), ref);
    dsc.putEnumerated(sTT('selectionModifier'), sTT('selectionModifierType'), sTT('deselect'));
    executeAction(sTT('select'), dsc, DialogModes.NO);
  }

  function convertToSmartObject(layerSets, targetLayerGroupName) {
    for (var i = 0; i < layerSets.length; i++) {
      var layerSet = layerSets[i];
      if (layerSet.name === targetLayerGroupName && layerSet.type === 'layerSection') {
        var isVisible = layerSet.visible;
        slct(layerSet);
        executeAction(sTT('newPlacedLayer'), undefined, DialogModes.NO); 
        deselectLayers();

        var layer = activeDocument.activeLayer;
        layer.visible = isVisible;
      }
      if (layerSet.layers) {
        convertToSmartObject(layerSet.layers, targetLayerGroupName);
      }
    }
  }

  // 알림창에서 레이어 그룹 이름 입력 받기
  var targetLayerGroupName = prompt("변환할 레이어 그룹의 이름을 입력하세요:", "back");
  if (targetLayerGroupName !== null) {
    // 히스토리를 기록하지 않는 작업 시작
    activeDocument.suspendHistory("Jayn'sConvertIntoSmartObjects", "convertToSmartObject(evl.layers, targetLayerGroupName)");
  }
}