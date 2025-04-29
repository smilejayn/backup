// Function to remove all layers from a composition
function removeAllLayersFromComp(comp) {
    // Iterate backward through the layers since we are deleting layers
    for (var i = comp.numLayers; i >= 1; i--) {
        comp.layer(i).remove();
    }
}

// Function to process all selected compositions in the Project panel
function removeAllLayersFromSelectedComps() {
    var selectedItems = app.project.selection;

    // Check if there are selected compositions
    if (selectedItems.length == 0) {
        alert("No compositions are selected in the Project panel.");
        return;
    }

    // Start Undo Group
    app.beginUndoGroup("Remove All Layers from Selected Comps");

    // Loop through all selected items
    for (var i = 0; i < selectedItems.length; i++) {
        // Process only composition items
        if (selectedItems[i] instanceof CompItem) {
            removeAllLayersFromComp(selectedItems[i]);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
removeAllLayersFromSelectedComps();
