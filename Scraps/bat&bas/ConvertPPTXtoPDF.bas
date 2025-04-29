Attribute VB_Name = "ConvertPPTXtoPDF"
Sub ConvertPPTXtoPDF()
    Dim SourceFolder As String
    Dim FileName As String
    Dim SourcePresentation As Presentation
    Dim fileDialog As FileDialog

    ' Set up the File Dialog.
    Set fileDialog = Application.FileDialog(msoFileDialogFolderPicker)

    If fileDialog.Show = -1 Then
        ' Get the path to the selected folder.
        SourceFolder = fileDialog.SelectedItems(1)
    Else
        ' User didn't select a folder and clicked "Cancel".
        Exit Sub
    End If

    ' Ensure there's a backslash at the end of the path.
    If Right(SourceFolder, 1) <> "\" Then
        SourceFolder = SourceFolder & "\"
    End If

    ' Get the first .pptx file in the source folder.
    FileName = Dir(SourceFolder & "*.pptx")

    ' Loop through each .pptx file in the source folder.
    While FileName <> ""
        ' Open the .pptx file.
        Set SourcePresentation = Presentations.Open(SourceFolder & FileName)

        ' Save the presentation as a .pdf file.
        SourcePresentation.ExportAsFixedFormat SourceFolder & Replace(FileName, ".pptx", ".pdf"), ppFixedFormatTypePDF

        ' Close the presentation without saving changes.
        SourcePresentation.Close

        ' Get the next .pptx file in the source folder.
        FileName = Dir
    Wend
End Sub


