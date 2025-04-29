var doc = app.activeDocument;

// 프로그레스바
var progressBar = new Window("palette", "Processing Layers", [150, 150, 600, 480]);
var progressText = progressBar.add("statictext", [10, 10, 450, 20], "Processing Layers... (0/" + doc.layers.length + ")");
var progressBarInner = progressBar.add("progressbar", [10, 35, 440, 60], 0, 100);
progressBarInner.value = 0;
progressBar.show();

// 그룹 안의 레이어 이름을 변경
function renameLayers(layers, idx) {
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    if (layer.typename === "LayerSet") {
      // 그룹 안의 레이어 수 계산
      var numLayersInGroup = layer.layers.length;
      totalLayers += numLayersInGroup;
      // 그룹 안의 레이어를 처리
      idx = renameLayers(layer.layers, idx);
      // 그룹 이름 변경
      layer.name = (idx++) + "|" + layer.name;
    } else {
      layer.name = (idx++) + "|" + layer.name;
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