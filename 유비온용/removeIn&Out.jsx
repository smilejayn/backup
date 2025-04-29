// Check if there's an active project
var project = app.project;
if (project) {
    // Get the selected project items
    var selectedItems = project.selection;
    
    // Loop through all selected items
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        
        // Check if the item is a sequence
        if (item.type === "Sequence") {
            // Clear In & Out points
            item.setInPoint(-1);
            item.setOutPoint(-1);
        }
    }
    
    alert('Cleared In & Out points for selected sequences.');
} else {
    alert('No active project.');
}