// Create a new document
var docWidth = 1920; // Width of the document in pixels
var docHeight = 1080; // Height of the document in pixels
var docResolution = 72; // Resolution of the document in pixels per inch
var docColorMode = NewDocumentMode.RGB; // Color mode of the document (RGB in this case)

app.documents.add(docWidth, docHeight, docResolution, "My New Document", docColorMode);