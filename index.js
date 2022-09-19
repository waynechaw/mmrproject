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
  PLATINUM1:2300,
  PLATINUM2:2200,
  PLATINUM3:2100,
  PLATINUM4 :2000,
  GOLD1:1900,
  GOLD2:1800,
  GOLD3:1700,
  GOLD4:1600,
  SILVER1:1500,
  SILVER2:1400,
  SILVER3:1300,
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

      request.post(`https://na.op.gg/api/summoners/na/${encryptedID}/renewal`, function (error, response, body) {
        body = JSON.parse(body);

        console.log(body);


        let renewedFinished = false;;
        if (body && body.message == 'Already renewed.') {
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

  console.log(12312313);

  request.post(`https://na.op.gg/api/summoners/na/${req.params.encryptedID}/renewal-status`, function (error, response, body) {

    console.log(body);
    body = JSON.parse(body);


    let renewedFinished = false;
    let error;
    if (body && ((body.message == 'Already renewed.') || (body.message == 'Failed to renew.')) ) {
      renewedFinished = true;
    }

    if (body && body.code == '404') {

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




app.get('/mmr/:encryptedID', function (req, res) {


  request(`https://na.op.gg/api/games/na/summoners/${req.params.encryptedID}?hl=en_US&game_type=NORMAL`, function (error, response, body) {

    let jsonData = JSON.parse(body);
    jsonData.data = jsonData.data.filter(match => match.average_tier_info);

    if (jsonData.data.length == 0) {
      return res.send('no matches for this user')
    }
    let recentMatchesTiers = jsonData.data.map(match => match.average_tier_info.tier + match.average_tier_info.division);
    let recentMatchesAvgMMR = jsonData.data.map(match => rankToMMR[match.average_tier_info.tier + match.average_tier_info.division]).reduce((a, b) => a + b)/jsonData.data.length;

    let rawData =  jsonData.data.map(match => {
      delete match.participants;
      delete match.teams;
      delete match.myData;
      return match;
    });

    res.json({
      recentMatchesAvgMMR: recentMatchesAvgMMR,
      rankToMMR: rankToMMR,
      rawData: rawData
    });

  });



})

app.listen(port, () => console.log(`App listening on port ${port}!`));