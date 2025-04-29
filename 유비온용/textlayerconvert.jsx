// Create an Undo group
app.beginUndoGroup("Convert to Point Text");

// Get the active composition
var comp = app.project.activeItem;

// Check if it's a composition
if (comp != null && comp instanceof CompItem) {
    // Loop through selected layers
    for (var i = comp.selectedLayers.length - 1; i >= 0; i--) {
        var layer = comp.selectedLayers[i];

        // Check if the layer is a text layer and is paragraph text (box text)
        if (layer instanceof TextLayer && layer.property("Source Text").value.boxText) {
            // Store original layer properties
            var textDocument = layer.property("Source Text").value;
            var layerName = layer.name;
            var layerEffects = layer("Effects");
            var layerParent = layer.parent;

            // Create a new point text layer
            var newTextLayer = comp.layers.addText(textDocument.text);
            newTextLayer.name = layerName;

            // Copy properties from the original layer
            newTextLayer.transform.position.setValue(layer.transform.position.value);
            newTextLayer.transform.scale.setValue(layer.transform.scale.value);
            newTextLayer.transform.rotation.setValue(layer.transform.rotation.value);
            newTextLayer.transform.opacity.setValue(layer.transform.opacity.value);

            // Copy effects
            for (var j = 1; j <= layerEffects.numProperties; j++) {
                var effect = layerEffects.property(j);
                newTextLayer("Effects").addProperty(effect.matchName);
                newTextLayer("Effects")(j).setValue(effect.value);
            }

            // Set parent
            if (layerParent != null) {
                newTextLayer.parent = layerParent;
            }

            // Remove the original paragraph text layer
            layer.remove();
        }
    }
}

// Close the Undo group
app.endUndoGroup();
