const express = require('express');
const app = express();
app.use(express.json());

app.post('/UpdateLastLoginedInfo', (req, res) => {
    const entityProfile = req.body.CallerEntityProfile;

    console.log("PlayFabからのデータ:", req.body);

    const resultPayload = {
        "PlayerProfile": {
          "AdCampaignAttributions": null,
          "AvatarUrl": null,
          "BannedUntil": null,
          "ContactEmailAddresses": null,
          "Created": null,
          "DisplayName": null,
          "ExperimentVariants": null,
          "LastLogin": "2026-04-05T09:44:24.171Z",
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
