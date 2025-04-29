// Function to rename shape layers in a composition
function renameShapeLayersInComp(comp) {
    // Iterate through all layers in the composition
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        // Check if the layer is a shape layer
        if (layer instanceof ShapeLayer) {
            // Store the original lock state
            var wasLocked = layer.locked;

            // Unlock the layer if it was locked
            if (wasLocked) {
                layer.locked = false;
            }

            // Rename the layer
            layer.name = "Shape Layer " + i;

            // Re-lock the layer if it was originally locked
            if (wasLocked) {
                layer.locked = true;
            }
        }
    }
}

// Function to process all selected compositions
function processSelectedComps() {
    var selectedItems = app.project.selection;

    // Check if there are selected items
    if (selectedItems.length == 0) {
        alert("No compositions are selected.");
        return;
    }

    // Start Undo Group
    app.beginUndoGroup("Rename Shape Layers in Multiple Comps");

    // Loop through all selected items
    for (var j = 0; j < selectedItems.length; j++) {
        if (selectedItems[j] instanceof CompItem) {
            // Rename shape layers in this composition
            renameShapeLayersInComp(selectedItems[j]);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
processSelectedComps();
