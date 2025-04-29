(async function () {
  try {
    const { editDocument } = require('application');
    const { LayerKind, BatchPlay } = require('photoshop');
    
    // 현재 액티브 문서에서 선택된 레이어그룹들을 가져옴
    const selectedLayerGroups = await batchPlay(
      [
        {
          "_obj": "get",
          "_target": [
            {
              "_property": "targetLayers"
            }
          ],
          "layerID": 0
        },
        {
          "_obj": "get",
          "_target": [
            {
              "_property": "layers"
            }
          ],
          "_ref": [
            {
              "_property": "targetLayers"
            }
          ]
        },
        {
          "_obj": "filter",
          "_target": [
            {
              "_property": "layer"
            },
            {
              "_ref": "layerSection"
            },
            {
              "_enum": "ordinal",
              "_value": "targetEnum"
            }
          ],
          "keyOriginType": "userSupplied",
          "keyOriginName": "layerSection",
          "match": "equals",
          "criteria": "layerSectionSelected"
        }
      ],{
        synchronousExecution: true,
        modalBehavior: "fail"
      }
    );

    // 선택된 레이어그룹들을 스마트 오브젝트로 변환
    for (let i = 0; i < selectedLayerGroups.length; i++) {
      const layerGroup = selectedLayerGroups[i];
      await batchPlay(
        [
          {
            "_obj": "newPlacedLayer",
            "smartObject": true
          }
        ],
        {
          "layerID": layerGroup["layer"]["_id"],
          synchronousExecution: true,
          modalBehavior: "fail"
        }
      );
    }

    // 변경된 문서를 저장
    await editDocument({ editLabel: 'Convert to Smart Object' });
  } catch (err) {
    console.log(err);
  }
})();