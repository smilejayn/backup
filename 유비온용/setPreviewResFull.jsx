function setResolutionForAllComps(item) {
    if (item instanceof FolderItem) {
        // If the item is a folder, recursively search its contents
        for (var i = 1; i <= item.numItems; i++) {
            setResolutionForAllComps(item.item(i));
        }
    } else if (item instanceof CompItem) {
        // If the item is a composition, set its resolutionFactor
        item.resolutionFactor = [1, 1];
    }
}

// Start the recursive search from the root of the project
for (var j = 1; j <= app.project.rootFolder.numItems; j++) {
    setResolutionForAllComps(app.project.rootFolder.item(j));
}
