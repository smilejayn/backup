// Display a dialog box for folder selection
var psdFolder = Folder.selectDialog("Please select the folder containing your PSD files:");

if (psdFolder != null) { // if a folder was selected
  // Recursive function to process PSD files
  function processPSDFiles(folder) {
    var files = folder.getFiles();

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      if (file instanceof Folder) {
        // If the file is a directory, recurse into it
        processPSDFiles(file);
      } else if (file instanceof File && file.name.match(/\.psd$/i)) {
        // If the file is a PSD file, open it and process its layers
        var doc = open(file);

        for (var j = 0; j < doc.layers.length; j++) {
          var layer = doc.layers[j];

          if (layer.kind == LayerKind.SMARTOBJECT) {
            // Create a File object for the PNG file with the same name in the same directory
            // Remove the .png extension from the layer name
            var pngFile = new File(file.path + "/" + layer.name + ".png");

            if (pngFile.exists) {
              try {
                layer.smartObject.replaceContents(pngFile, true);
              } catch (e) {
                alert("Error updating Smart Object link for layer " + layer.name + " in file " + file.name + ": " + e);
              }
            }
          }
        }

        doc.save();
        doc.close();
      }
    }
  }

  // Process all PSD files in the selected folder and its subfolders
  processPSDFiles(psdFolder);
}
