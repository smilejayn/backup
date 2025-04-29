if (app.project !== null) {
    // Begin undo group
    app.beginUndoGroup("Change Composition Settings");

    // Iterate over selected items in the project
    for (var i = 0; i < app.project.selection.length; i++) {
        var item = app.project.selection[i];

        // Check if the item is a composition
        if (item instanceof CompItem) {
            // Change duration to 30 seconds
            item.duration = 30;
        }
    }

    // End undo group
    app.endUndoGroup();
} else {
    alert("No project open");
}
