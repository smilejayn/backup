#target photoshop

// Function to process a subfolder
function processSubfolder(subfolder) {
    var pngFiles = subfolder.getFiles("*.png");

    if (pngFiles.length > 0) {
        // Create a new PSD document with fixed size
        var docWidth = 1920;
        var docHeight = 1080;
        var docResolution = 72; // Adjust as needed
        var docColorMode = NewDocumentMode.RGB; // Adjust as needed
        var docBitDepth = DocumentFill.TRANSPARENT; // Adjust as needed
        var psdDoc = app.documents.add(docWidth, docHeight, docResolution, null, docColorMode, docBitDepth);

        // Loop through PNG files and import them as separate layers
        for (var i = 0; i < pngFiles.length; i++) {
            var pngFile = pngFiles[i];
            var layer = psdDoc.artLayers.add();
            layer.name = pngFile.name;
            psdDoc.activeLayer = layer;

            var idPlc = charIDToTypeID("Plc ");
            var desc2 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            desc2.putPath(idnull, pngFile);
            var idFTcs = charIDToTypeID("FTcs");
            var idQCSt = charIDToTypeID("QCSt");
            var idQcsa = charIDToTypeID("Qcsa");
            desc2.putEnumerated(idFTcs, idQCSt, idQcsa);
            var idOfst = charIDToTypeID("Ofst");
            var desc3 = new ActionDescriptor();
            var idHrzn = charIDToTypeID("Hrzn");
            var idPxl = charIDToTypeID("#Pxl");
            desc3.putUnitDouble(idHrzn, idPxl, 0.000000);
            var idVrtc = charIDToTypeID("Vrtc");
            var idPxl = charIDToTypeID("#Pxl");
            desc3.putUnitDouble(idVrtc, idPxl, 0.000000);
            var idOfst = charIDToTypeID("Ofst");
            desc2.putObject(idOfst, idOfst, desc3);
            executeAction(idPlc, desc2, DialogModes.NO);
        }

        // Save the PSD document
        var psdFileName = subfolder.name + ".psd";
        var psdFile = new File(subfolder.path + "/" + psdFileName);
        psdDoc.saveAs(psdFile);
        psdDoc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

// Main function to process all subfolders in a given folder
function processFolders(parentFolder) {
    var subfolders = parentFolder.getFiles(function (file) {
        return file instanceof Folder;
    });

    for (var i = 0; i < subfolders.length; i++) {
        var subfolder = subfolders[i];
        processSubfolder(subfolder);
    }
}

// Prompt the user to select the parent folder containing the subfolders
var parentFolder = Folder.selectDialog("Select the parent folder");
if (parentFolder) {
    processFolders(parentFolder);
    alert("Conversion completed successfully!");
} else {
    alert("No folder selected. Conversion aborted.");
}
