import express from 'express';

import path from 'path';
const __dirname = path.resolve();

import request from 'request';

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

let rankToMMR = {
  CHALLENGER: 6000,
  GRANDMASTER1: 5000,
  MASTER1: 4000,
  DIAMOND1:3500,
  DIAMOND2:3300,
  DIAMOND3:3150,
  DIAMOND4:3000,
  EMERALD1: 2900,
  EMERALD2: 2800, 
  EMERALD3: 2700,
  EMERALD4:2600,
  PLATINUM1:2500,
  PLATINUM2:2300,
  PLATINUM3:2150,
  PLATINUM4 :2000,
  GOLD1:1900,
  GOLD2:1800,
  GOLD3:1700,
  GOLD4:1550,
  SILVER1:1440,
  SILVER2:1360,
  SILVER3:1280,
  SILVER4:1000,
  BRONZE1:900,
  BRONZE2:800,
  BRONZE3:650,
  BRONZE4:500,
  IRON1:400,
  IRON2:300,
  IRON3:200,
  IRON4:100
}

import { LolApi, RiotApi, Constants  } from 'twisted';


let apikey = process.env.key;
console.log(apikey);




const api = new RiotApi({
  key: apikey
});

const lolapi = new LolApi({
  key: apikey
});

export async function getMastery(name, tag, region, regionGroup, req, res) {



  try {

   const resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
   const resByPuuid = (await api.Account.getByPUUID(resByRiotId.puuid,   regionGroup)).response
   const response = await fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${resByRiotId.puuid}?api_key=${apikey}`)
   const data = await response.json();

    return res.json({
      error: false,
      data: data.slice(0, 150),
      id: resByRiotId.puuid
    });

  } catch (error) {

    if (error && error.body && error.status) {

      return res.json({
        error: true,
        errorDetail: error.body.status.message
      });

    } else {
      return res.json({
        error: true,
        errorDetail: error.message
      });
    }
  }

}


app.get('/catch/:name/:tag/:region', function (req, res) {

  let name = req.params.name;
  let tag = req.params.tag;
  let region = req.params.region;

  let regionGroup = Constants.regionToRegionGroup(region);

  getMastery(name, tag, region, regionGroup, req, res);

})




app.post('/renew/:region', function (req, res) {

  console.log(123123, req.body);

  let region = req.params.region;

  request(encodeURI(`https://na.op.gg/summoners/${region}/${req.body.name}`), function (error, response, body) {
      let opggdata = body;

      console.log(encodeURI(`https://na.op.gg/summoners/${region}/${req.body.name}`));

      var encryptedID = opggdata.match(/"summoner_id":"(.*?)","acct_id/);

      if (!encryptedID) {
        return res.send('user does not exist');
      }


      encryptedID = encryptedID[1];

      console.log(encryptedID);



      request.post(`https://op.gg/api/v1.0/internal/bypass/summoners/${region}/${encryptedID}/renewal`, function (error, response, body) {

        body = JSON.parse(body);




        let renewedFinished = false;;
        if (body && body.data && body.data.message == 'Already renewed.') {
          renewedFinished = true;
        }

        res.json({
          renewedFinished: renewedFinished,
          encryptedID: encryptedID,
          data: opggdata
        });


      })

  })


})

app.get('/renew-status/:encryptedID/:region', function (req, res) {

  console.log(`getting renew status for ${req.params.encryptedID}`);

  let region = req.params.region;

  if (!req.params.encryptedID) {
    console.log('no encryptedID, aborting');
      return res.json({
        error: true,
        errorDetail: 'no encryptedID'
      });
  }

  request.get(`https://op.gg/api/v1.0/internal/bypass/summoners/${region}/${req.params.encryptedID}/renewal-status`, function (errorResp, response, body) {


    body = JSON.parse(body);


    let renewedFinished = false;
    let error;
    if (body && body.data && ((body.data.message == 'Already renewed.') || (body.data.message == 'Failed to renew.')) ) {
      renewedFinished = true;
    }

    if (body && body.status == '404') {

      res.json({
        error: true,
        errorDetail: body
      });

    } else  {
      res.json({
        renewedFinished: renewedFinished,
      });
    }



  })


})


function average(array) {
  const sum = array.reduce((acc, curr) => acc + curr, 0);
  const average = sum / array.length;
  return average;
}


app.get('/mmr/:encryptedID/:region/:mode', function (req, res) {

  let region = req.params.region;
  let mode = req.params.mode;


  request(`https://op.gg/api/v1.0/internal/bypass/games/${region}/summoners/${req.params.encryptedID}?&limit=20&hl=en_US&game_type=${mode}`, function (error, response, body) {

    let jsonData = JSON.parse(body);
    jsonData.data = jsonData.data.filter(match => match.average_tier_info);

    if (jsonData.data.length == 0) {
      return res.send('no matches for this user')
    }
    let recentMatchesTiers = jsonData.data.map(match => match.average_tier_info.tier + match.average_tier_info.division);
    // let recentMatchesAvgMMR = jsonData.data.map(match => rankToMMR[match.average_tier_info.tier + match.average_tier_info.division]).reduce((a, b) => a + b)/jsonData.data.length;

    let rawData =  jsonData.data.map(match => {
      delete match.participants;
      delete match.teams;
      delete match.myData;
      return match;
    });



    res.json({
      recentMatchesAvgMMR: average(recentMatchesTiers.map(tier => rankToMMR[tier])),
      rankToMMR: rankToMMR,
      rawData: rawData
    });

  });



})

app.listen(port, () => console.log(`App listening on port ${port}!`));