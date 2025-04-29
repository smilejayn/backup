// Step 1: Import PDF file
var pdfFile = File.openDialog("Select PDF file");
var pdfOptions = new PDFOpenOptions();
pdfOptions.page = 1; // Import the first page only
var pdfDoc = app.open(pdfFile, pdfOptions);

// Step 2: Convert each page into a separate PSD file
var outputPath = Folder.selectDialog("Select output folder");
for (var i = 0; i < pdfDoc.pages.length; i++) {
  var page = pdfDoc.pages[i];
  
  // Set page crop option to 'media box'
  page.cropBox = page.artBox;
  
  // Create a new PSD document
  var psdDoc = app.documents.add(
    page.width,
    page.height,
    page.resolution,
    page.name,
    NewDocumentMode.RGB,
    DocumentFill.TRANSPARENT
  );
  
  // Place the PDF page as a Smart Object
  var pdfPlacedLayer = psdDoc.artLayers.add();
  pdfPlacedLayer.name = "PDF Page";
  pdfPlacedLayer.kind = LayerKind.SMARTOBJECT;
  pdfPlacedLayer.file = pdfFile;
  
  // Resize the Smart Object to fit the document size
  pdfPlacedLayer.resize(
    psdDoc.width / page.width * 100,
    psdDoc.height / page.height * 100,
    AnchorPosition.TOPLEFT
  );
  
  // Save the PSD file
  var psdOptions = new PhotoshopSaveOptions();
  psdOptions.layers = true;
  psdOptions.annotations = false;
  psdOptions.alphaChannels = false;
  psdOptions.spotColors = false;
  psdOptions.embedColorProfile = true;
  psdOptions.maximizeCompatibility = true;
  var psdFileName = page.name.replace(".pdf", ".psd");
  var psdFilePath = new File(outputPath + "/" + psdFileName);
  psdDoc.saveAs(psdFilePath, psdOptions, true);
  
  // Close the PSD document without saving changes
  psdDoc.close(SaveOptions.DONOTSAVECHANGES);
}

// Close the PDF document without saving changes
pdfDoc.close(SaveOptions.DONOTSAVECHANGES);