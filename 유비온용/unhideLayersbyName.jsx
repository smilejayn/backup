// Define the name of the layers you want to unhide
var layerNameToUnhide = '마우스포인터'; // Replace '마우스 포인터' with the layer name you want to unhide

// Function to unhide layers with a specific name in a composition
function unhideSpecificNamedLayers(comp, layerName) {
    // Loop through all layers in the composition
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        // Check if the layer's name matches the specified name
        if (layer.name === layerName) {
            // Unhide the layer
            layer.enabled = true;
        }
    }
}

// Function to unhide specific named layers in all compositions
function unhideSpecificNamedLayersInAllComps(layerName) {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Unhide '" + layerName + "' Layers in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            unhideSpecificNamedLayers(allItems[i], layerName);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
unhideSpecificNamedLayersInAllComps(layerNameToUnhide);
