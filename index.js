const express = require('express');
const { PlayFabServer } = require('playfab-sdk'); 
const app = express();
app.use(express.json());

PlayFabServer.settings.titleId = process.env.PLAYFAB_TITLE_ID;
PlayFabServer.settings.developerSecretKey = process.env.PLAYFAB_SECRET_KEY;

app.post('/UpdateLastLoginedInfo', (req, res) => {
    const entityProfile = req.body.CallerEntityProfile;

    console.log("PlayFabからのデータ:", req.body);

    PlayFabServer.GetPlayerProfile({
        PlayFabId: playFabId,
        ProfileConstraints: {
            ShowDisplayName: true,
            ShowLastLogin: true
        }
    }, (error, result) => {
        if (error) {
            console.error("PlayFab Error:", error);
            return res.status(500).json({ error: error.errorMessage });
        }

        const LastLogin = result.data.PlayerProfile.LastLogin;
        const DisplayName = result.data.PlayerProfile.DisplayName;
    });


    const resultPayload = {
        "PlayerProfile": {
          "AdCampaignAttributions": null,
          "AvatarUrl": null,
          "BannedUntil": null,
          "ContactEmailAddresses": null,
          "Created": null,
          "DisplayName": DisplayName || entityProfile.Lineage.MasterPlayerAccountId,
          "ExperimentVariants": null,
          "LastLogin": LastLogin,
          "LinkedAccounts": null,
          "Locations": null,
          "Memberships": null,
          "Origination": null,
          "PlayerId": entityProfile.Lineage.MasterPlayerAccountId,
          "PublisherId": "3EEAAB5761592451",
          "PushNotificationRegistrations": null,
          "Statistics": null,
          "Tags": null,
          "TitleId": "2C099",
          "TotalValueToDateInUSD": null,
          "ValuesToDate": null
        },
        "TitlePlayerId": entityProfile.Entity.Id,
        "UserTestGroup": 0,
        "PresetList": null
    };
    
    res.status(200).json(resultPayload);
});

app.post('/ReceiveDistributedItems', (req, res) => {
    console.log("PlayFabからのデータ:", req.body);

    res.status(200).json({
        "StatusCode": "Accepted",
        "QueueName": "receivedistributeditems"
    });
});

app.post('/GetMissionGroupStats', (req, res) => {
    console.log("PlayFabからのデータ:", req.body);

    res.status(200).json({});
});

app.post('/ChangePlayerName', (req, res) => {
    console.log("PlayFabからのデータ:", req.body);

    const newName = req.body.FunctionArgument.DisplayName;
    const customId = req.body.FunctionArgument.CustomId;
    
    // 2. 操作対象の PlayFab ID を取得
    const playFabId = req.body.CallerEntityProfile.Lineage.MasterPlayerAccountId;

    console.log(`ID: ${playFabId} の名前を ${newName} に変更します。 (CustomId: ${customId})`);

    // 3. PlayFabの名前更新APIを実行
    PlayFabServer.UpdateUserTitleDisplayName({
        PlayFabId: playFabId,
        DisplayName: newName
    }, (error, result) => {
        if (error) {
            console.error("更新エラー:", error);
            return res.status(500).json({ error: error.errorMessage });
        }

        // 4. 更新後の名前とステータスをUnityに返す
        res.json({
            RawDisplayName: newName,
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
