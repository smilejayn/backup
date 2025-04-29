// 하위 레이어 그룹을 선택합니다.
var layerGroup = app.activeDocument.activeLayer;
if (layerGroup.typename != "LayerSet") {
    alert("하위 레이어 그룹을 선택해주세요.");
} else {
    // 그룹 내 레이어들을 검사합니다.
    var layers = layerGroup.layers;
    var hasGroupedLayer = false;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].grouped == true) {
            hasGroupedLayer = true;
            break;
        }
    }
    // grouped == true 레이어가 없으면 문서를 닫습니다.
    if (!hasGroupedLayer) {
        app.activeDocument.close(SaveOptions.SAVECHANGES);
    }
}