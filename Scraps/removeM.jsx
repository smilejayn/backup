function deleteLayersInGroup(group, progressBar) {
  for (var i = group.layers.length - 1; i >= 0; i--) {
    var layer = group.layers[i];
    if (layer.typename === "LayerSet") {
      deleteLayersInGroup(layer, progressBar);
    } else if ((layer.name.indexOf("R") !== -1) ||(layer.name.indexOf("R copy") !== -1) ||(layer.name.indexOf("M copy") !== -1) || (layer.name.indexOf("M") !== -1)) {
      layer.remove();
    }
    // Update the progress bar
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