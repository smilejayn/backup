// Function to check if a string starts with a given prefix
function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

// Function to enable shy for layers starting with a specific prefix in a composition
function shyLayersWithPrefix(comp, prefix) {
    // Ensure shy layers are hidden in the timeline
    comp.hideShyLayers = true;

    // Loop through all layers in the composition
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        // Check if the layer's name starts with the specified prefix
        if (startsWith(layer.name, prefix)) {
            // Temporarily unlock the layer if it is locked
            var wasLocked = layer.locked;
            if (wasLocked) layer.locked = false;

            // Enable shy mode for the layer
            layer.shy = true;

            // Re-lock the layer if it was originally locked
            if (wasLocked) layer.locked = true;
        }

        // Recursively apply shy if this layer is a pre-comp
        if (layer instanceof AVLayer && layer.source instanceof CompItem) {
            shyLayersWithPrefix(layer.source, prefix); // Recursive call for nested composition
        }
    }
}

// Function to process all compositions in the project
function shyLayersWithPrefixInAllComps(prefix) {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Enable Shy for Layers Starting with '" + prefix + "' in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            shyLayersWithPrefix(allItems[i], prefix);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Change 'prefixToHide' to the prefix of the layer names you want to enable shy
var prefixToHide = '본문BG'; // Example: 'Audio'

// Run the function
shyLayersWithPrefixInAllComps(prefixToHide);
