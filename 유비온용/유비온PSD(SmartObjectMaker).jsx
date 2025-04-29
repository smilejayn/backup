var doc = app.activeDocument;



// Step 1: Create a layer named 'Guide' and fill it with white solid
var guideLayer = app.activeDocument.artLayers.add();
guideLayer.name = "Guide";

// Fill 'Guide' layer with white color
var fillColor = new SolidColor();
fillColor.rgb.red = 255;
fillColor.rgb.green = 255;
fillColor.rgb.blue = 255;
app.activeDocument.selection.selectAll();
app.activeDocument.selection.fill(fillColor);
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
//  var mainFrameDocument = app.activeDocument;
//  var guideLayer = mainFrameDocument.layerSets.getByName("MainFrame").artLayers.getByName("Guide");
//  guideLayer.visible = false;

// Step 8: Save and close the opened PSB document
var mainFrameDocument = app.activeDocument;
mainFrameDocument.save();
mainFrameDocument.close(SaveOptions.DONOTSAVECHANGES);

// Step 9: Add file name as prefix to 'MainFrame' layer name
var mainFrameSmartObject = app.activeDocument.layers.getByName("MainFrame");
var fileName = app.activeDocument.name.replace(/\.[^\.]+$/, '');
mainFrameSmartObject.name = fileName + "_" + mainFrameSmartObject.name;

// Step 10: Duplicate the active layer
var duplicatedLayer = app.activeDocument.activeLayer.duplicate();

// Make the duplicated layer active
app.activeDocument.activeLayer = duplicatedLayer;

// Step 11: Add layer mask to the duplicated layer

        
        addMask();
        
        
// Step 12: Duplicate the active layer multiple times
    // Get a reference to the active layer
    var activeLayer = doc.activeLayer;

    // Create a new layer group
    var group = doc.layerSets.add();
    
    
activeLayer.move(group, ElementPlacement.INSIDE);

for (var i = 0; i < 7; i++) {
  // Duplicate the active layer
  var duplicate = activeLayer.duplicate();
  duplicate.move(group, ElementPlacement.PLACEATEND);
  
  // Optionally, you can perform any modifications to the duplicated layer here
}


// Step 13: Set the opacity of the bottom layer to 60%
        // Get the number of layers in the document
        var layerCount = doc.layers.length;
        // Select the layer at the very bottom
        var bottomLayer = doc.layers[layerCount - 1];
        bottomLayer.visible = true; // Ensure the layer is visible
        doc.activeLayer = bottomLayer;
        // Get a reference to the active layer
        var activeLayer = doc.activeLayer;
        // Set the opacity of the active layer to 60%
        activeLayer.opacity = 60;
        
        


// Function to add a layer mask to the layer
function addMask(layer) {
  var idMk = charIDToTypeID("Mk  ");
  var desc2 = new ActionDescriptor();
  var idNw = charIDToTypeID("Nw  ");
  var idChnl = charIDToTypeID("Chnl");
  desc2.putClass(idNw, idChnl);
  var idAt = charIDToTypeID("At  ");
  var ref1 = new ActionReference();
  var idChnl = charIDToTypeID("Chnl");
  var idChnl = charIDToTypeID("Chnl");
  var idMsk = charIDToTypeID("Msk ");
  ref1.putEnumerated(idChnl, idChnl, idMsk);
  desc2.putReference(idAt, ref1);
  var idUsng = charIDToTypeID("Usng");
  var idUsrM = charIDToTypeID("UsrM");
  var idHdAl = charIDToTypeID("HdAl");
  desc2.putEnumerated(idUsng, idUsrM, idHdAl);
  
  // Execute the action on the specific layer
  duplicatedLayer = layer;
  executeAction(idMk, desc2, DialogModes.NO);
}