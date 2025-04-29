var savedState = app.activeDocument.historyStates.length; // 현재 문서 상태 저장
app.activeDocument.suspendHistory("Convert to Smart Object", "main()"); // 히스토리 기능 끄기

function main() {
  var layers = app.activeDocument.layers;
  convertToSmartObject(layers);
}

function convertToSmartObject(layers) {
  var wasVisible = []; // 레이어의 visible 속성을 임시로 저장할 배열
  for (var i = 0; i < layers.length; i++) {
    try {
      var layer = layers[i];
      wasVisible.push(layer.visible); // 현재 visible 상태 저장
      
      if ((layer.typename == "LayerSet" || layer.typename == "ArtLayer") && layer.opacity < 100) {
        layer.visible = true; // 레이어를 일시적으로 표시
        app.activeDocument.activeLayer = layer;
        var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
        executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
      }
      if (layer.typename == "LayerSet") {
        convertToSmartObject(layer.layers); // 하위 레이어도 반복
      }

    } catch (e) {
      if (e.message !== "User cancelled the operation") {
        // visible 속성 원래 값으로 복원
        for (var j = 0; j < wasVisible.length; j++) {
          layers[j].visible = wasVisible[j];
        }
        // alert("Error on layer " + (i + 1) + ": " + e.message);
      } else {
        break;
      }
    }
  }
  // 마지막 레이어 visible 속성 원래 값으로 복원
  for (var k = 0; k < wasVisible.length; k++) {
    layers[k].visible = wasVisible[k];
  }
}

app.activeDocument.activeHistoryState = app.activeDocument.historyStates[savedState]; // 문서 상태 복원