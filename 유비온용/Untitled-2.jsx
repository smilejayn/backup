function displayFullLayerInfo(layer) {
    // Duplicate the Smart Object
    var duplicatedLayer = layer.duplicate();
    
    // Rasterize the duplicated layer
    duplicatedLayer.rasterize(RasterizeType.ENTIRELAYER);

    // Create a new solid color layer below the duplicated layer
    var solidColorLayer = app.activeDocument.artLayers.add();
    solidColorLayer.move(duplicatedLayer, ElementPlacement.PLACEBEFORE);
    var fillColor = new SolidColor();
    fillColor.rgb.red = 255;
    fillColor.rgb.green = 255;
    fillColor.rgb.blue = 255;
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(fillColor);
    app.activeDocument.selection.deselect();

    // Merge the two layers
    var mergedLayer = solidColorLayer.merge();

    // Get the bounds of the merged layer
    var bounds = mergedLayer.bounds;
    var currentX = bounds[0].value; // Current left edge
    var currentY = bounds[1].value; // Current top edge
    var width = bounds[2].value - currentX;
    var height = bounds[3].value - currentY;

    // Delete the merged layer
    mergedLayer.remove();

    // Display the info
    alert(
        "Position: X = " + currentX + ", Y = " + currentY + "\n" +
        "Size: Width = " + width + ", Height = " + height
    );
}

// Check if the active layer is a Smart Object or a raster layer
if (app.activeDocument.activeLayer.kind == LayerKind.SMARTOBJECT || app.activeDocument.activeLayer.kind == LayerKind.NORMAL) {
    displayFullLayerInfo(app.activeDocument.activeLayer);
} else {
    alert("The active layer is not suitable for this operation.");
}
