const express = require("express");
const request = require("request");
const app = express();
var bodyParser = require('body-parser')
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/public'));

let rankToMMR = {
  CHALLENGER: 9001,
  GRANDMASTER1: 3100,
  MASTER1: 3000,
  DIAMOND1:2700,
  DIAMOND2:2600,
  DIAMOND3:2500,
  DIAMOND4:2400,
  EMERALD1: 2350,
  EMERALD2: 2300,
  EMERALD3: 2240,
  EMERALD4:2160,
  PLATINUM1:2080,
  PLATINUM2:2000,
  PLATINUM3:1920,
  PLATINUM4 :1840,
  GOLD1:1760,
  GOLD2:1680,
  GOLD3:1600,
  GOLD4:1520,
  SILVER1:1440,
  SILVER2:1360,
  SILVER3:1280,
  SILVER4:1200,
  BRONZE1:1100,
  BRONZE2:1000,
  BRONZE3:900,
  BRONZE4:880,
  IRON1:700,
  IRON2:600,
  IRON3:500,
  IRON4:400
}

app.get('/mmr', function (req, res) {



  let mmrRows = '';

  for (const property in rankToMMR) {
    mmrRows = mmrRows + `
      <tr>
        <td>${property}</td>
        <td>${rankToMMR[property]}</td>
      </tr>
    `;
  }


  res.send(`

    <h1>Simple MMR Checker</h1>

    <p>This tool checks user's MMR in normals. Currently only works for NA. <br> 
    To get the most accurate mmr, <b>play 20 games solo in normals</b>. Queueing with other players will cause inaccurate result.<br>
    The tool uses below table to convert rank to mmr. This is mostly a guess, so contact wayne to help improve this table</p>    

    <form method='post' action='/mmr/submit'>
         <input placeholder="Enter Summoner's Name" name="summonerName" value=""/>
         <button type='submit'>Submit</button>
    </form>

    <br><br>
    <table>
      <tr>
        <th>Rank</th>
        <th>MMR</th>
      </tr>
      ${mmrRows}
    </table>


  `);
})

app.post('/mmr/submit', function (req, res) {
  console.log('submit');
  return res.redirect(`/mmr/${req.body.summonerName}`); 
})

app.get('/renew/:name', function (req, res) {

  request(`https://na.op.gg/summoners/na/${req.params.name}`, function (error, response, body) {
      let opggdata = body;
      var encryptedID = opggdata.match(/"summoner_id":"(.*?)","acct_id/);

      if (!encryptedID) {
        return res.send('user does not exist');
      }


      encryptedID = encryptedID[1];

      console.log(encryptedID);



      request.post(`https://op.gg/api/v1.0/internal/bypass/summoners/na/${encryptedID}/renewal`, function (error, response, body) {
        console.log(123, body);
        body = JSON.parse(body);

        console.log(222, body);


        let renewedFinished = false;;
        if (body && body.data.message == 'Already renewed.') {
          renewedFinished = true;
        }

        res.json({
          renewedFinished: renewedFinished,
          encryptedID: encryptedID
        });


      })

  })


})

app.get('/renew-status/:encryptedID', function (req, res) {

  console.log(`getting renew status for ${req.params.encryptedID}`);

  if (!req.params.encryptedID) {
    console.log('no encryptedID, aborting');
      return res.json({
        error: true,
        errorDetail: 'no encryptedID'
      });
  }

  request.get(`https://op.gg/api/v1.0/internal/bypass/summoners/na/${req.params.encryptedID}/renewal-status`, function (errorResp, response, body) {

    console.log(11113,`https://op.gg/api/v1.0/internal/bypass/summoners/na/${req.params.encryptedID}/renewal-status` );

    console.log(`renew status for ${req.params.encryptedID}: ${body}`);
    body = JSON.parse(body);


    let renewedFinished = false;
    let error;
    if (body && ((body.data.message == 'Already renewed.') || (body.data.message == 'Failed to renew.')) ) {
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


app.get('/mmr/:encryptedID', function (req, res) {


  request(`https://op.gg/api/v1.0/internal/bypass/games/na/summoners/${req.params.encryptedID}?&limit=20&hl=en_US&game_type=normal`, function (error, response, body) {

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

    console.log(recentMatchesTiers.map(tier => rankToMMR[tier]));

    res.json({
      recentMatchesAvgMMR: average(recentMatchesTiers.map(tier => rankToMMR[tier])),
      rankToMMR: rankToMMR,
      rawData: rawData
    });

  });



})

app.listen(port, () => console.log(`App listening on port ${port}!`));