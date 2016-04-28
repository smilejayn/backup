// 제목 부분 시작

            // 제목 텍스트 레이어 변수 선언
            var titletext = app.activeDocument.artLayers.getByName ("Title");

            //제목 바 레이어 변수 선언
            var titlebar = app.activeDocument.artLayers.getByName ("제목 바");

            var TBW = titlebar.width;

            // 텍스트 레이어 면적 소환
            var TTL = titletext.bounds;

            // 텍스트 레이어 높이 소환
            var ttlH = TTL[3].value - TTL[1].value;

            // 텍스트 레이어 너비 소환
            var ttlW = TTL[2].value - TTL[0].value;

                    //  텍스트 레이어의 너비가 140px보다 크면 제목바 너비+60px
                    if (ttlW > 140) {
                         resizeTitleBar(ttlW+60,TBW);
                        };

    function resizeTitleBar(horizontal, vertical){
                        // 유닛 지정
                        var strtRulerUnits = app.preferences.rulerUnits;

                        var strtTypeUnits = app.preferences.typeUnits;

                        app.preferences.rulerUnits = Units.PIXELS;

                        app.preferences.typeUnits = TypeUnits.PIXELS;

                        // 제목 바 변수 선언
                        var titlebar = app.activeDocument.artLayers.getByName ("제목 바");

                        // 제목바 바운드 구하기
                        var TB = titlebar.bounds;

                        var Height = TB[3].value - TB[1].value;

                        var Width = TB[2].value - TB[0].value;

                        var onePixH = 100/Height;

                        var onePixW = 100/Width;

                        var newWidth = onePixW * horizontal;

                        var newHeight = onePixH * vertical;
                        // 기존 높이 유지
                        var oldHeight = titlebar.width
                                    titlebar.resize( newWidth , oldHeight, AnchorPosition.MIDDLELEFT  );

                                    app.preferences.rulerUnits = strtRulerUnits;

                                    app.preferences.typeUnits = strtTypeUnits;

    }

// 제목 부분 종료




// 설명 부분 시작

            // 설명 텍스트 레이어 변수 선언
            var desctext = app.activeDocument.artLayers.getByName ("Description");

            // 텍스트 레이어 면적 소환
            var DTL = desctext.bounds;

            // 텍스트 레이어 높이 소환
           var Height2 = DTL[3].value - DTL[1].value;

            // 텍스트 레이어 너비 소환
           var Width2 = DTL[2].value - DTL[0].value;

                    //  텍스트 레이어의 너비가 460px보다 작으면 제목바 너비+160px
                    if (Width2 < 460) {
                         resizeDescBar(Width2+65,100);
                        };

            //  긴 문장일 때 설명 레이어 위치 변경
            var deltaY =  -18;
            var deltaX = null;

                    //  텍스트 레이어의 너비가 700px보다 크면 y-18
                    if (Width2 > 700) {
                        desctext.translate (deltaX, deltaY)
                        };



    function resizeDescBar(horizontal, vertical){
                        // 유닛 지정
                        var strtRulerUnits = app.preferences.rulerUnits;

                        var strtTypeUnits = app.preferences.typeUnits;

                        app.preferences.rulerUnits = Units.PIXELS;

                        app.preferences.typeUnits = TypeUnits.PIXELS;

                        // 자막 바 변수 선언
                        var descbar = app.activeDocument.artLayers.getByName ("자막 바");

                        // 제목바 바운드 구하기
                        var DB = descbar.bounds;

                        var Height = DB[3].value - DB[1].value;

                        var Width = DB[2].value - DB[0].value;

                        var onePixH = 100/Height;

                        var onePixW = 100/Width;

                        var newWidth = onePixW * horizontal;

                        var newHeight = onePixH * vertical;
                        // 기존 높이 유지
                        var oldHeight = descbar.width;
                                    descbar.resize( newWidth , oldHeight, AnchorPosition.MIDDLELEFT  );

                                    app.preferences.rulerUnits = strtRulerUnits;

                                    app.preferences.typeUnits = strtTypeUnits;

    }
