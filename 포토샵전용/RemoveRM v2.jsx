//수정노트
// 지정문구(R/M)으로 시작하는 레이어명까지 삭제하는 문제점 해결
// 레이어 삭제시마다 히스토리저장되지않게 변경


function main() {

    function deleteLayersInGroup(group, progressBar) {
      for (var i = group.layers.length - 1; i >= 0; i--) {
        var layer = group.layers[i];
        if (layer.typename === "LayerSet") {
          deleteLayersInGroup(layer, progressBar);
          continue;
        }
        if (layer.name === "R" || layer.name === "M" || layer.name === "R copy"|| layer.name === "M copy") {
          layer.remove();
        }
        progressBar.value = progressBar.value + 1;
      }
    }

    function deleteLayersInAllGroups(group) {
      for (var i = group.layerSets.length - 1; i >= 0; i--) {
        var layerSet = group.layerSets[i];
        if (layerSet.name.indexOf("back") !== -1) {
          var progressBar = new ProgressBar(layerSet.name, "Deleting layers...");
          progressBar.show();
          deleteLayersInGroup(layerSet, progressBar);
          progressBar.hide();
        }
        deleteLayersInAllGroups(layerSet);
      }
    }


    function ProgressBar(title, message) {
      this.window = new Window("palette", title);
      this.window.preferredSize = [300, 20];
      this.window.center();
      this.label = this.window.add("statictext", undefined, message);
      this.progress = this.window.add("progressbar", undefined, 0, 100);
      this.progress.preferredSize.width = 280;
    }

    ProgressBar.prototype.show = function() {
      this.window.show();
    }

    ProgressBar.prototype.hide = function() {
      this.window.hide();
    }

    ProgressBar.prototype.setValue = function(value) {
      this.progress.value = value;
    }

    var doc = app.activeDocument;
    var progressBar = new ProgressBar("Deleting Layers", "Deleting layers...");
    progressBar.show();
    deleteLayersInAllGroups(doc);
    progressBar.hide();


}

app.activeDocument.suspendHistory("Delete Layers", "main()");