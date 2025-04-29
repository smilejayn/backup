Attribute VB_Name = "SaveSlidesAsPresentations"
Sub SaveSlidesAsPresentations()
    Dim i As Integer
    Dim OriginalName As String
    Dim NewName As String
    Dim newPres As Presentation

    ' Get the original presentation name and path
    OriginalName = ActivePresentation.Name
    OriginalPath = ActivePresentation.Path

    ' Loop through each slide in the presentation
    For i = 1 To ActivePresentation.Slides.Count

        ' Select the slide
        ActiveWindow.View.GotoSlide i

        ' Copy the slide
        ActivePresentation.Slides(i).Copy

        ' Create a new presentation and paste the slide
        Set newPres = Presentations.Add
        newPres.Slides.Paste

        ' Set the slide master's background to transparent
        newPres.slideMaster.Background.Fill.Transparency = 1

        ' Create a new name for the presentation
        NewName = OriginalPath & "\" & "Slide" & Format(i, "00") & ".pptx"

        ' Save the new presentation
        newPres.SaveAs NewName

        ' Close the new presentation
        newPres.Close

    Next i

    ' Reopen the original presentation
    Presentations.Open OriginalName

    ' * 기능요약: 1. 각 슬라이드들을 개별 PPTX파일로 변환. 2. 슬라이드마스터 투명도 조정
    ' * 실행전에 기존 슬라이드들 배경들을 일괄로 빈화면으로 변경해야함.
End Sub
