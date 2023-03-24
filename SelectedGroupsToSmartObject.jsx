// 선택된 그룹들 스마트오브젝트로 변환, 

if (documents.length) {
  sTT = stringIDToTypeID; 
  (ref = new ActionReference()).putProperty(sTT('property'), 
    json = sTT('json'));
  ref.putEnumerated(sTT('document'), sTT('ordinal'), sTT('targetEnum')), 
  (dsc = new ActionDescriptor()).putReference(sTT('null'), ref);
  dsc.putBoolean(sTT('includeAncestors'), false), 
  dsc.putBoolean(sTT('selectedLayers'), true), 
  evl = eval('(' + executeAction(sTT('get'), dsc).getString(json) + ')');
  
  function slct(layerSetValue) {
    (ref = new ActionReference()).putIdentifier(sTT('layer'), layerSetValue.id), 
    dsc.putReference(sTT('null'), ref), 
    executeAction(sTT('select'), dsc)
  }
  
  (function(v) {
    while (v && lngth = v.length) {
      var lst = lngth - 1, 
      layerSet = v[lst];
      callee(layerSet.layers), 
      slct(layerSet), 
      executeAction(sTT('newPlacedLayer')), 
      v.length = lst
    }
  })(evl.layers)
}