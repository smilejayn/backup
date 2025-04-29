// Create an Undo group
app.beginUndoGroup("Reset Layer Names");

// Iterate over all compositions in the project
for (var compIndex = 1; compIndex <= app.project.numItems; compIndex++) {
    var item = app.project.item(compIndex);
    
    // Check if the item is a composition
    if (item instanceof CompItem) {
        var comp = item;

        // Loop through all layers in the composition
        for (var layerIndex = 1; layerIndex <= comp.numLayers; layerIndex++) {
            var layer = comp.layer(layerIndex);

            // Remember the original lock state
            var wasLocked = layer.locked;

            // Unlock the layer if it is locked
            if (wasLocked) {
                layer.locked = false;
            }

            // Check if the layer is a text layer
            if (layer instanceof TextLayer) {
                // Set the layer name to an empty string
                layer.name = "";
            } 
            else if (!wasLocked && layer instanceof ShapeLayer || (layer.source && layer.source.mainSource instanceof SolidSource)) {
                // Skip renaming shape and solid layers, only if they were not locked
                continue;
            } 
            else if (!wasLocked && layer.source) {
                // Check if the source has a file extension and remove it
                var fileName = layer.source.name;
                var fileExtension = fileName.lastIndexOf(".");
                if (fileExtension > 0) {
                    // Remove the extension from the file name
                    fileName = fileName.substring(0, fileExtension);
                }

                // Rename the layer to its source name without the extension
                layer.name = fileName;
            } 
            else if (!wasLocked) {
                // Assign a default name based on layer type
                layer.name = "Layer " + layerIndex;
            }

            // Re-lock the layer if it was originally locked
            if (wasLocked) {
                layer.locked = true;
            }
        }
    }
}

// Close the Undo group
app.endUndoGroup();
