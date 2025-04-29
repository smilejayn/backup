// Function to execute a menu command by its string ID
function executeMenuCommand(menuCmd) {
    try {
        app.executeCommand(app.findMenuCommandId(menuCmd));
    } catch (e) {
        alert("Menu command not found: " + menuCmd);
    }
}

if (app.project !== null) {
    app.beginUndoGroup("Clear, Add, and Lock Guides");

    for (var i = 0; i < app.project.selection.length; i++) {
        var item = app.project.selection[i];
        if (item instanceof CompItem) {
            for (var j = item.numGuides; j > 0; j--) {
                item.removeGuide(j - 1);
            }

            item.addGuide(0, 830);
            item.addGuide(0, 940);
            item.addGuide(0, 960);                        
            item.addGuide(1, 315);

            // Attempt to lock guides using a menu command
            executeMenuCommand("Lock Guides"); // Replace with the exact menu command string if different
        }
    }

    app.endUndoGroup();
} else {
    alert("No project open");
}
