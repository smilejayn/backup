// Create an Undo group
app.beginUndoGroup("Reset Layer Names");

// Get the active composition
var comp = app.project.activeItem;

// Check if it's a composition
if (comp != null && comp instanceof CompItem) {
    // Loop through selected layers
    for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];

        // Check if the layer is a shape or solid layer
        if (layer instanceof ShapeLayer || (layer.source && layer.source.mainSource instanceof SolidSource)) {
            // Skip renaming shape and solid layers
            continue;
        }

        // Check if the layer is a text layer
        else if (layer instanceof TextLayer) {
            // Rename the layer to its text content
            var textDocument = layer.property("Source Text").value;
            layer.name = textDocument.text;
        } 
        else if (layer.source) {
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
        else {
            // Assign a default name based on layer type
            layer.name = "Layer " + (i + 1);
        }
    }
}

// Close the Undo group
app.endUndoGroup();
