var result = confirm("스크립트를 실행하시겠습니까?");
if (result) {

//프로그레스바 생성
var progressBar = new Window("palette", "재인's Renamer v1", [150, 150, 600, 230]);
var progressText = progressBar.add("statictext", [10, 10, 450, 30], "Processing Layers... (001/000)");
var progressBarInner = progressBar.add("progressbar", [10, 35, 440, 60], 0, 100);
progressBarInner.value = 0;
progressBar.show();

var doc = app.activeDocument;

// 레이어 수 세기
function countLayers(layers, count) {
    count = count || { total: 0 };
    count.total += layers.length;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].typename == "LayerSet") {
            count = countLayers(layers[i].layers, count);
        }

        //레이어 수 카운팅할 때 프로그레스바 상태 갱신
        var progressPercent = Math.round((count.processed / count.total) * 100);
        progressText.text = "전체 레이어수... ("  + pad(count.total, 4)+  ")";
        count.processed++;
        progressBar.update();
    }
    return count;
}
// 그룹 안 레이어들 이름 변경
function renameLayers(layers, idx) {
    var currentLayer = 1;
    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i];
        var wasVisible = layer.visible; // save the visibility state of the layer
        if (layer.typename === "LayerSet") {
            // 레이어 그룹일 경우 그룹 안 레이어 다시 처리
            var numLayersInGroup = layer.layers.length;
            idx = renameLayers(layer.layers, idx);
            // 그룹 이름 변경
            layer.name = (idx - numLayersInGroup + 1) + "｜" + layer.name;
        } else {
            // 레이어 이름을 변경
            layer.name = pad(idx++, 3) + "｜" + layer.name;
        }
        layer.visible = wasVisible; // restore the visibility state of the layer
        // 이름 변경중일 때 프로그레스바의 상태 갱신
        currentLayer++;
        var progressPercent = Math.round((idx / totalLayers) * 100);
        progressBarInner.value = progressPercent;
        progressText.text = "레이어명 변경중... (" + pad(idx, 3) + "/" + pad(totalLayers, 4) + ")";
        progressBar.update();
    }

    return idx;
}

// 숫자를 3자리로
function pad(num, size) {
    var s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
}

// 프로그레스바 초기화
var count = countLayers(doc.layers);
var totalLayers = count.total;
progressText.text = "Processing Layers... (001/" + pad(totalLayers, 4) + ")";


// 히스토리 기능 끄기
app.activeDocument.suspendHistory("Layer Rename", "renameLayers(doc.layers, 1)");


progressBar.close();

alert("스크립트가 완료되었습니다.");
}
