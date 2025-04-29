Attribute VB_Name = "Module1"
Sub InvertSelection()
' Invert current selection
' Anything that's selected gets unselected
' Anything that's unselected gets selected

    Dim x As Long
    Dim oSh As Shape

    ' Test: IS there a current selection?
    On Error Resume Next
    If ActiveWindow.Selection.ShapeRange.Count = 0 Then
        MsgBox "Please select one or more shapes on the current slide, then try again."
        Exit Sub
    End If

    ' Record current selection
    For Each oSh In ActiveWindow.Selection.ShapeRange
        Call oSh.Tags.Add("Sel", "Y")
    Next

    ' deselect everything
    ActiveWindow.Selection.Unselect

    ' select everything, filtering out previously selected items
    For Each oSh In ActiveWindow.Selection.SlideRange.Shapes
        If Len(oSh.Tags("Sel")) = 0 Then
            ' add it to the selection
            oSh.Select (msoFalse)
        Else
            ' clear the tag
            oSh.Tags.Delete ("Sel")
        End If
    Next

End Sub
