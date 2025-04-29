// Start with the app in a suspended state to prevent any unwanted changes
app.enableQE();
var project = app.project;

// Loop through all items in the project
for (var i = 0; i < project.rootItem.children.numItems; i++) {
    var item = project.rootItem.children[i];
    
    // Check if the item is a file (not a bin/folder)
    if (item.type === ProjectItemType.CLIP) {
        var itemPath = item.getMediaPath();
        
        // Check if the item is a PSD based on its path
        if (itemPath.endsWith('.psd')) {
            
            // Create the new path for the PNG file
            var baseName = itemPath.substring(0, itemPath.lastIndexOf('.')); // Removes the .psd extension
            var pngPath = baseName + '.png';
            
            // Replace the PSD with the PNG
            item.replaceMedia(pngPath, MediaType.IMAGE);
        }
    }
}
