if (app.project !== null) {
    // Begin undo group
    app.beginUndoGroup("Enable Snap, Visibility, and Lock Guides in Selected Comps");

    // Iterate over selected items in the project
    for (var i = 0; i < app.project.selection.length; i++) {
        var item = app.project.selection[i];

        // Check if the item is a composition
        if (item instanceof CompItem) {
            // Open the composition in the viewer
            app.executeCommand(app.findMenuCommandId("Open Composition"));

            // Wait for the composition to be active in the viewer
            // This might be necessary to ensure the composition is active before applying settings
            // Adjust the delay as needed or implement a more robust method to check if the composition is active
            $.sleep(3000);

            // Check if there is an active viewer
            if (app.activeViewer !== null) {
                var viewOptions = app.activeViewer.views[0].options;
                viewOptions.guidesSnap = true;
                viewOptions.guidesVisibility = true;
                viewOptions.guidesLocked = true;
            }
        }
    }

    // End undo group
    app.endUndoGroup();
} else {
    alert("No project open");
}
