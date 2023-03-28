//수정노트
//script-batch-액션용으로 용도변경
// 일반레이어와 레이어그룹이 따로 네이밍 되는 현상 수정. layer.name
// 레이어그룹은 숫자뒤앞에 G붙임. layer.name
// 최상위레이어그룹내 일반레이어 visible상태 비활성화되는 문제해결. layer.visible

var result = true;
//프로그레스바 생성
var progressBar = new Window("palette", "재인's Renamer v3.2", [150, 150, 600, 230]);
var progressText = progressBar.add("statictext", [10, 10, 450, 30], "Processing Layers... (001/000)");
var progressBarInner = progressBar.add("progressbar", [10, 35, 440, 60], 0, 100);
progressBarInner.value = 0;
progressBar.show();

var doc = app.activeDocument;

// 그룹 안 레이어들 이름 변경
function renameLayers(layers, idx) {
for (var i = layers.length - 1; i >= 0; i--) {
var layer = layers[i];
var wasVisible = layer.visible; // save the visibility state of the layer
if (layer.typename === "LayerSet") {
// 레이어 그룹일 경우 그룹 안 레이어 다시 처리
var numLayersInGroup = layer.layers.length;
var groupWasVisible = layer.visible; // save the visibility state of the group
layer.visible = true; // show the group temporarily to access its layers
idx = renameLayers(layer.layers, idx);
// 그룹 이름 변경
layer.name = pad(idx++, 3 ) + "(G)" + "｜" + layer.name;
layer.visible = groupWasVisible; // restore the visibility state of the group
} else {
// 레이어 이름을 변경
layer.name = pad(idx++, 3) + "｜" + layer.name;
}
layer.visible = wasVisible; // restore the visibility state of the layer
// 이름 변경중일 때 프로그레스바의 상태 갱신


           var progressPercent = Math.round((idx / doc.layers.length) * 100);
    progressBarInner.value = progressPercent;
    progressText.text = "레이어명 변경중... (" + pad(idx, 3) + ")";
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

// 히스토리 기능 끄기
app.activeDocument.suspendHistory("Layer Rename", "renameLayers(doc.layers, 1)");


progressBar.close();


// Save the document
var saveFile = File(doc.path + "/" + doc.name);
doc.saveAs(saveFile);

// Close the document
doc.close(SaveOptions.DONOTSAVECHANGES);
