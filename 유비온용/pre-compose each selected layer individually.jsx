// Function to pre-compose each selected layer individually, preserving timing
function preComposeIndividualLayers() {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("No active composition selected.");
        return;
    }

    app.beginUndoGroup("Pre-Compose Individual Layers"); // Start undo group

    var selectedLayers = comp.selectedLayers.slice(); // Copy selected layers array
    if (selectedLayers.length === 0) {
        alert("No layers selected.");
        return;
    }

    for (var i = selectedLayers.length - 1; i >= 0; i--) { // Iterate in reverse to avoid indexing issues
        var layer = selectedLayers[i];
        var layerIndex = layer.index;

        // Move the layer start time to 0 relative to the composition start time
        var preCompName = layer.name + "_PreComp";
        var preComp = comp.layers.precompose([layerIndex], preCompName, true);

        var preCompLayer = comp.layer(preCompName);

        preCompLayer.startTime = layer.startTime - comp.displayStartTime;
        preCompLayer.inPoint = layer.inPoint;
        preCompLayer.outPoint = layer.outPoint;
    }

    app.endUndoGroup(); // End undo group
}

// Run the function
preComposeIndividualLayers();
