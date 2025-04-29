// Function to hide layers named '마우스포인터' in a composition
function hideMousePointerLayers(comp) {
    // Loop through all layers in the composition
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        // Check if the layer's name matches '마우스포인터'
        if (layer.name === '마우스포인터') {
            // Hide the layer
            layer.enabled = false;
        }
    }
}

// Function to process all compositions in the project
function hideMousePointerLayersInAllComps() {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Hide '마우스포인터' Layers in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            hideMousePointerLayers(allItems[i]);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
hideMousePointerLayersInAllComps();
