// Function to delete empty text layers in a composition
function deleteEmptyTextLayers(comp) {
    // Iterate backward through all layers since we're potentially deleting layers
    for (var i = comp.numLayers; i >= 1; i--) {
        var layer = comp.layer(i);

        // Check if the layer is a text layer
        if (layer instanceof TextLayer) {
            // Get the text property of the layer
            var textProperty = layer.property("Source Text");
            var textValue = textProperty.value;

            // Check if the text is empty
            if (textValue.text == "") {
                // Delete the layer
                layer.remove();
            }
        }
    }
}

// Function to process all compositions in the project
function deleteEmptyTextLayersInAllComps() {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Delete Empty Text Layers in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            deleteEmptyTextLayers(allItems[i]);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
deleteEmptyTextLayersInAllComps();
