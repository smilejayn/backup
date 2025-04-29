// Function to check if a string starts with a given prefix
function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

// Function to hide layers starting with a specific prefix in a composition
function hideLayersWithPrefix(comp, prefix) {
    // Loop through all layers in the composition
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        // Check if the layer's name starts with the specified prefix
        if (startsWith(layer.name, prefix)) {
            // Hide the layer
            layer.enabled = false;
        }
    }
}

// Function to process all compositions in the project
function hideLayersWithPrefixInAllComps(prefix) {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Hide Layers Starting with '" + prefix + "' in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            hideLayersWithPrefix(allItems[i], prefix);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Change 'prefixToHide' to the prefix of the layer names you want to hide
var prefixToHide = '상단로고'; // Example: 'Audio'

// Run the function
hideLayersWithPrefixInAllComps(prefixToHide);
