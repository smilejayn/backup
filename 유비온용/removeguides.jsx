// Check if we have a project open
if (app.project !== null) {
    // Begin undo group
    app.beginUndoGroup("Clear Guides");

    // Iterate over selected items in the project
    for (var i = 0; i < app.project.selection.length; i++) {
        var item = app.project.selection[i];
        // Check if the item is a composition
        if (item instanceof CompItem) {
            // Iterate through the guides from the end to the beginning
            while (item.guides.length > 0) {
                // Remove the last guide
                item.removeGuide(item.guides.length - 1);
            }
        }
    }

    // End undo group
    app.endUndoGroup();
} else {
    alert("No project open");
}
