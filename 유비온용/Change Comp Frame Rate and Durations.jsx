// Create an undo group to encapsulate all changes
app.beginUndoGroup("Adjust Comps Frame Rate and Duration");

// First Part: Change the frame rate of all compositions to 29.97 fps
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        item.frameRate = 29.97;
    }
}

// Second Part: Set the duration of selected compositions to 15 seconds
for (var j = 0; j < app.project.selection.length; j++) {
    var selectedItem = app.project.selection[j];
    if (selectedItem instanceof CompItem) {
        selectedItem.duration = 60;
    }
}

// Close the undo group
app.endUndoGroup();
