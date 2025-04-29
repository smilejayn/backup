// Step 1: Create a layer named 'Guide' and fill it with white solid
var guideLayer = app.activeDocument.artLayers.add();
guideLayer.name = "Guide";
app.activeDocument.selection.selectAll();
app.activeDocument.selection.fill(app.foregroundColor);
app.activeDocument.selection.deselect();

// Step 2: Move the 'Guide' layer below other layers
var targetIndex = app.activeDocument.layers.length - 1;
guideLayer.move(app.activeDocument.layers[targetIndex], ElementPlacement.PLACEAFTER);

// Step 3: Create a layer group named 'MainFrame'
var mainFrameGroup = app.activeDocument.layerSets.add();
mainFrameGroup.name = "MainFrame";

// Step 4: Move all layers into the 'MainFrame' group
for (var i = app.activeDocument.layers.length - 1; i >= 0; i--) {
  var layer = app.activeDocument.layers[i];
  if (layer != mainFrameGroup) {
    layer.move(mainFrameGroup, ElementPlacement.INSIDE);
  }
}

// Step 5: Convert 'MainFrame' layer group to a Smart Object
var mainFrameGroup = app.activeDocument.layerSets.getByName("MainFrame");
app.activeDocument.activeLayer = mainFrameGroup;
executeAction(stringIDToTypeID("newPlacedLayer"), undefined, DialogModes.NO);

// Step 6: Open the Smart Object 'MainFrame'
executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);

// Step 7: Make the 'Guide' layer within 'MainFrame' invisible
var mainFrameDocument = app.activeDocument;
var guideLayer = mainFrameDocument.layerSets.getByName("MainFrame").artLayers.getByName("Guide");
guideLayer.visible = false;

// Step 8: Save and close the opened PSB document
var mainFrameDocument = app.activeDocument;
mainFrameDocument.save();
mainFrameDocument.close(SaveOptions.DONOTSAVECHANGES);

// Step 9: Add file name after 'MainFrame' layer name
var mainFrameSmartObject = app.activeDocument.layers.getByName("MainFrame");
var fileName = app.activeDocument.name.replace(/\.[^\.]+$/, '');
mainFrameSmartObject.name = fileName + "_" + mainFrameSmartObject.name;

// Step 9: Save the active document
app.activeDocument.save();

// Step 10: Close the active document
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);