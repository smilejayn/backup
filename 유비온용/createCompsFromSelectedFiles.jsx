// Function to create compositions from selected files
function createCompsFromSelectedFiles() {
    var selectedItems = app.project.selection;
    var defaultFrameRate = 29.97; // Default frame rate set to 29.97
    var defaultDuration = 10; // Default duration set to 10 seconds

    // Check if there are selected items
    if (selectedItems.length == 0) {
        alert("No files are selected in the Project panel.");
        return;
    }

    // Start Undo Group
    app.beginUndoGroup("Create Comps from Selected Files");

    // Loop through all selected items
    for (var i = 0; i < selectedItems.length; i++) {
        // Process only footage items (videos, images, etc.)
        if (selectedItems[i] instanceof FootageItem) {
            var item = selectedItems[i];

            // Use item's frame rate or default frame rate if it's 0
            var frameRate = item.frameRate > 0 ? item.frameRate : defaultFrameRate;

            // Use item's duration or default duration if it's 0 or undefined
            var duration = (item.duration > 0 && item.duration !== undefined) ? item.duration : defaultDuration;

            // Create a new composition with the same settings as the footage
            var comp = app.project.items.addComp(item.name, item.width, item.height, item.pixelAspect, duration, frameRate);

            // Add the footage to the new composition
            var layer = comp.layers.add(item);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
createCompsFromSelectedFiles();
