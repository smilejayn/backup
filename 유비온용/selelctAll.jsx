// Function to select all layers in a composition
function selectAllLayersInComp(comp) {
    // Loop through all layers and select them
    for (var i = 1; i <= comp.numLayers; i++) {
        comp.layer(i).selected = true;
    }
}

// Function to process all compositions in the project
function selectAllLayersInAllComps() {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Select All Layers in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            selectAllLayersInComp(allItems[i]);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
selectAllLayersInAllComps();
