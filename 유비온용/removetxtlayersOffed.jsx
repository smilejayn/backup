(function deleteInvisibleTextLayersInAllComps() {
    function processComp(comp) {
        for (var i = comp.layers.length; i > 0; i--) {
            var layer = comp.layers[i];

            if (layer instanceof TextLayer && !layer.enabled) {
                layer.remove();
            }
        }
    }

    function iterateComps(item) {
        if (item instanceof CompItem) {
            processComp(item);
        } else if (item instanceof FolderItem) {
            for (var i = 1; i <= item.numItems; i++) {
                iterateComps(item.item(i));
            }
        }
    }

    app.beginUndoGroup("Delete Invisible Text Layers In All Comps");

    for (var i = 1; i <= app.project.numItems; i++) {
        var item = app.project.item(i);
        iterateComps(item);
    }

    app.endUndoGroup();
})();