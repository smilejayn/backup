var doc = app.activeDocument;
//거의 완벽.. while루프로 한번ㄷ ㅓ 짜보기
// 프로그레스바
var progressBar = new Window("palette", "Processing Layers", [150, 150, 600, 480]);
var progressText = progressBar.add("statictext", [10, 10, 450, 20], "Processing Layers... (0/" + doc.layers.length + ")");
var progressBarInner = progressBar.add("progressbar", [10, 35, 440, 60], 0, 100);
progressBarInner.value = 0;
progressBar.show();

// 그룹 안의 레이어이름을 변경
function renameLayers(layers, idx) {
    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i];
        if (layer.typename === "LayerSet") {
            // 레이어 그룹일 경우 그룹 안의 레이어를 다시
            var numLayersInGroup = layer.layers.length;
            totalLayers += numLayersInGroup - 1;
            idx = renameLayers(layer.layers, idx);
        } else {
            // 레이어 이름을 변경
            layer.name = (idx++) + "｜" + layer.name;
        }

        // 프로그레스바 상태를 갱신
        progressBarInner.value = Math.min(Math.round((idx / totalLayers) * 100), 100);
        progressText.text = "Processing Layers... (" + idx + "/" + totalLayers + ")";
        progressBar.update();
    }

    return idx;
}

var totalLayers = doc.layers.length;
renameLayers(doc.layers, 1);


progressBar.close();