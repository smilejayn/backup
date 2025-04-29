#target photoshop
// 이 코드는 빠름
var doc = app.activeDocument;

// 진행 상황을 나타낼 프로그레스바를 생성합니다.
var progressBar = new Window("palette", "Processing Layers", [150, 150, 600, 480]);
var progressText = progressBar.add("statictext", [10, 10, 450, 20], "Processing Layers... (0/" + doc.layers.length + ")");
var progressBarInner = progressBar.add("progressbar", [10, 35, 440, 60], 0, 100);
progressBarInner.value = 0;
progressBar.show();

// 그룹 안의 레이어들을 순회하며 이름을 변경합니다.
function renameLayers(layers, idx) {
    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i];
        if (layer.typename === "LayerSet") {
            // 레이어 그룹일 경우 그룹 안의 레이어를 다시 처리합니다.
            idx = renameLayers(layer.layers, idx);
        } else {
            // 레이어 이름을 변경합니다.
            layer.name = (idx++) + "_" + layer.name;
        }

        // 프로그레스바의 상태를 갱신합니다.
        progressBarInner.value = Math.min(Math.round((idx / totalLayers) * 100), 100);
        progressText.text = "Processing Layers... (" + idx + "/" + totalLayers + ")";
        progressBar.update();
    }

    return idx;
}

var totalLayers = doc.layers.length;
renameLayers(doc.layers, 1);

// 작업이 완료되면 프로그레스바를 닫습니다.
progressBar.close();