(function disableAllLayerStyles() {
    function processComp(comp) {
        for (var i = 1; i <= comp.layers.length; i++) {
            var layer = comp.layers[i];
            if (layer instanceof TextLayer && layer.property("Layer Styles") && layer.property("Layer Styles").canSetEnabled) {
                layer.property("Layer Styles").enabled = false;
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

    app.beginUndoGroup("Disable All Layer Styles");

    for (var i = 1; i <= app.project.numItems; i++) {
        var item = app.project.item(i);
        iterateComps(item);
    }

    app.endUndoGroup();
})();