// Function to unlock all layers in the selected compositions from the Project panel
function unlockAllLayersInSelectedComps() {
    var selectedItems = app.project.selection;

    // Check if there are selected items
    if (selectedItems.length == 0) {
        alert("No compositions are selected in the Project panel.");
        return;
    }

    // Start Undo Group
    app.beginUndoGroup("Unlock All Layers in Selected Comps");

    // Loop through all selected items
    for (var i = 0; i < selectedItems.length; i++) {
        // Process only composition items
        if (selectedItems[i] instanceof CompItem) {
            var comp = selectedItems[i];

            // Iterate through all layers in the composition and unlock them
            for (var j = 1; j <= comp.numLayers; j++) {
                comp.layer(j).locked = false;
            }
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
unlockAllLayersInSelectedComps();
