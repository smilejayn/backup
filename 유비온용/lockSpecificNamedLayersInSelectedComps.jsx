// Function to lock layers with a specific name in a composition
function lockSpecificNamedLayers(comp, layerName) {
    // Loop through all layers in the composition
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        // Check if the layer's name matches the specified name
        if (layer.name === layerName) {
            // Lock the layer
            layer.locked = true;
        }
    }
}

// Function to lock specific named layers in selected compositions
function lockSpecificNamedLayersInSelectedComps(layerName) {
    var selectedItems = app.project.selection;

    // Start Undo Group
    app.beginUndoGroup("Lock Specific Named Layers in Selected Comps");

    // Loop through all selected items
    for (var i = 0; i < selectedItems.length; i++) {
        // Process only selected composition items
        if (selectedItems[i] instanceof CompItem) {
            lockSpecificNamedLayers(selectedItems[i], layerName);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Change 'LayerNameToLock' to the name of the layer you want to lock
var layerNameToLock = 'Guide02'; // Example: '교수 테두리'

// Run the function
lockSpecificNamedLayersInSelectedComps(layerNameToLock);
