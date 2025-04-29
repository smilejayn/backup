// Create a ScriptUI Panel
var myPanel = (this instanceof Panel) ? this : new Window("palette", "Set Layer Position", undefined);
myPanel.orientation = "column";

var runButton = myPanel.add("button", undefined, "Run");
runButton.onClick = function() {
    setLeftEdgeOfSelectedLayers();
}

myPanel.center();
myPanel.show();

// Function to set the anchor point to the bottom center of the layer
function setAnchorPointToBottomCenter(layer, compTime) {
    var sourceRect = layer.sourceRectAtTime(compTime, true);
    var anchorX = sourceRect.left + sourceRect.width / 2;
    var anchorY = sourceRect.top + sourceRect.height;

    // Adjust the anchor point without moving the layer
    var currentPos = layer.position.value;
    layer.anchorPoint.setValue([anchorX, anchorY]);
    layer.position.setValue(currentPos);
}

// Function to set selected layers' left edge at a specific X position
function setLayerLeftEdgeAtXPosition(layer, xPosition, compTime) {
    var currentYPosition = layer.position.value[1]; // Keep the current Y position

    if (layer.source) {
        var layerWidth = layer.source.width * (layer.scale.value[0] / 100);
        var newXPosition = xPosition + (layerWidth / 2);
        layer.position.setValue([newXPosition, currentYPosition]);
    } else {
        var sourceRect = layer.sourceRectAtTime(compTime, false);
        var layerWidth = sourceRect.width * (layer.scale.value[0] / 100);
        var newXPosition = xPosition + (layerWidth / 2) - (sourceRect.left * (layer.scale.value[0] / 100));
        layer.position.setValue([newXPosition, currentYPosition]);
    }
}

// Function to process the selected layers
function setLeftEdgeOfSelectedLayers() {
    var comp = app.project.activeItem;

    if (!comp || !(comp instanceof CompItem) || comp.selectedLayers.length === 0) {
        alert("Please select at least one layer in a composition.");
        return;
    }

    app.beginUndoGroup("Set Layer Left Edge at X Position");

    for (var i = 0; i < comp.selectedLayers.length; i++) {
        var selectedLayer = comp.selectedLayers[i];
        setAnchorPointToBottomCenter(selectedLayer, comp.time);
        setLayerLeftEdgeAtXPosition(selectedLayer, 300, comp.time); // Set X position to 300px
    }

    app.endUndoGroup();
}
