// Reference the currently active document
var doc = app.activeDocument;

// Select the bottom-most layer or group
var bottomLayer = doc.layers[doc.layers.length-1];
while (bottomLayer.typename == "LayerSet" || bottomLayer.typename == "SmartObject") {
    bottomLayer = bottomLayer.layers[bottomLayer.layers.length-1];
}

// Lock the layer
bottomLayer.allLocked = true;