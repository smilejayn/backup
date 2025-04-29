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

// Function to process all compositions in the project
function lockSpecificNamedLayersInAllComps(layerName) {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Lock Specific Named Layers in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            lockSpecificNamedLayers(allItems[i], layerName);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Change 'LayerNameToLock' to the name of the layer you want to lock
var layerNameToLock = '바로 쓰는 영어 프롬프트'; // Example: 'BoardBackground'

// Run the function
lockSpecificNamedLayersInAllComps(layerNameToLock);
