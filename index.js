import express from 'express';

import path from 'path';
const __dirname = path.resolve();

import request from 'request';

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

const regionMap = {
  BR: 'BR1',
  EUNE: 'EUN1',
  EUW: 'EUW1',
  KR: 'KR',
  LAN: 'LA1',
  LAS: 'LA2',
  NA: 'NA1',
  OCE: 'OC1',
  TR: 'TR1',
  RU: 'RU',
  JP: 'JP1',
  VN: 'VN2',
  TW: 'TW2',
  TH: 'TH2',
  SG: 'SG2',
  PH: 'PH2'
};


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

let data = [];
let challengeData = [
  {
    "id": 0,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 750,
      "CHALLENGER": 27245,
      "MASTER": 24500,
      "PLATINUM": 8600,
      "GRANDMASTER": 26610,
      "DIAMOND": 13800,
      "IRON": 0,
      "GOLD": 4300,
      "SILVER": 1650
    },
    "translation": {
      "description": "Total Challenge Points gained by leveling up Challenges",
      "name": "Challenge Points Leaderboard",
      "shortDescription": "Total Challenge Points"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "isCategory": "true",
      "source": "CHALLENGES"
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.005,
      "BRONZE": 0.299,
      "GOLD": 0.108,
      "IRON": 0.988,
      "GRANDMASTER": 0,
      "SILVER": 0.214,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.037
    },
    "leaderboardThresholds": [
      27840,
      1,
      27245,
      3,
      26610,
      7
    ]
  },
  {
    "id": 1,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 175,
      "MASTER": 3500,
      "PLATINUM": 1200,
      "DIAMOND": 2000,
      "IRON": 75,
      "GOLD": 700,
      "SILVER": 300
    },
    "translation": {
      "description": "",
      "name": "IMAGINATION",
      "shortDescription": "IMAGINATION capstone"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "isCategory": "true",
      "parent": "0",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "GOLD": 0.105,
      "NONE": 1,
      "BRONZE": 0.284,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.383,
      "PLATINUM": 0.05,
      "DIAMOND": 0.011,
      "GRANDMASTER": 0,
      "SILVER": 0.195
    }
  },
  {
    "id": 2,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 275,
      "MASTER": 5500,
      "PLATINUM": 1800,
      "DIAMOND": 3200,
      "IRON": 125,
      "GOLD": 1100,
      "SILVER": 500
    },
    "translation": {
      "description": "",
      "name": "EXPERTISE",
      "shortDescription": "EXPERTISE capstone"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "isCategory": "true",
      "parent": "0",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.012,
      "BRONZE": 0.226,
      "GOLD": 0.1,
      "IRON": 0.28,
      "GRANDMASTER": 0,
      "SILVER": 0.175,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.052
    }
  },
  {
    "id": 3,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 275,
      "MASTER": 4500,
      "PLATINUM": 1500,
      "DIAMOND": 2700,
      "IRON": 150,
      "GOLD": 1000,
      "SILVER": 400
    },
    "translation": {
      "description": "",
      "name": "VETERANCY",
      "shortDescription": "VETERANCY capstone"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "isCategory": "true",
      "parent": "0",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.217,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.053,
      "GRANDMASTER": 0,
      "DIAMOND": 0.013,
      "IRON": 0.272,
      "GOLD": 0.089,
      "NONE": 1,
      "SILVER": 0.18
    }
  },
  {
    "id": 4,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 200,
      "MASTER": 6500,
      "PLATINUM": 2100,
      "DIAMOND": 3800,
      "IRON": 100,
      "GOLD": 1300,
      "SILVER": 350
    },
    "translation": {
      "description": "",
      "name": "TEAMWORK",
      "shortDescription": "TEAMWORK capstone"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "isCategory": "true",
      "parent": "0",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.249,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.034,
      "GRANDMASTER": 0,
      "DIAMOND": 0.001,
      "IRON": 0.295,
      "GOLD": 0.082,
      "NONE": 1,
      "SILVER": 0.203
    }
  },
  {
    "id": 5,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 175,
      "MASTER": 3500,
      "PLATINUM": 1100,
      "DIAMOND": 2000,
      "IRON": 75,
      "GOLD": 700,
      "SILVER": 300
    },
    "translation": {
      "description": "",
      "name": "COLLECTION",
      "shortDescription": "COLLECTION capstone"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "isCategory": "true",
      "parent": "0",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "GOLD": 0.133,
      "NONE": 1,
      "BRONZE": 0.298,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.443,
      "PLATINUM": 0.085,
      "DIAMOND": 0.02,
      "GRANDMASTER": 0,
      "SILVER": 0.221
    }
  },
  {
    "id": 302100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 20,
      "MASTER": 475,
      "PLATINUM": 160,
      "DIAMOND": 290,
      "IRON": 10,
      "GOLD": 100,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Strategy group",
      "name": "Strategy",
      "shortDescription": "Earn points from challenges in the Strategy group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "302000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "302000",
    "parentCategory": "4",
    "title": "Strategist",
    "percentiles": {
      "BRONZE": 0.267,
      "MASTER": 0.002,
      "CHALLENGER": 0,
      "PLATINUM": 0.088,
      "GRANDMASTER": 0,
      "DIAMOND": 0.025,
      "IRON": 0.318,
      "GOLD": 0.125,
      "NONE": 1,
      "SILVER": 0.205
    }
  },
  {
    "id": 302101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 372,
      "MASTER": 130,
      "PLATINUM": 35,
      "GRANDMASTER": 227,
      "DIAMOND": 75,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 7
    },
    "translation": {
      "description": "Get takedowns on enemy champions before jungle camps spawn (1:30)",
      "name": "Level 1 Fiesta",
      "shortDescription": "Get takedowns before jungle camps spawn"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302100",
      "source": "EOGD"
    },
    "parent": "302100",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0.182,
      "MASTER": 0.01,
      "PLATINUM": 0.057,
      "CHALLENGER": 0,
      "DIAMOND": 0.025,
      "IRON": 0.249,
      "GRANDMASTER": 0.002,
      "GOLD": 0.098,
      "NONE": 1,
      "SILVER": 0.136
    },
    "leaderboardThresholds": [
      2606,
      1,
      372,
      7573,
      227,
      37857
    ]
  },
  {
    "id": 302102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 650,
      "MASTER": 225,
      "PLATINUM": 75,
      "GRANDMASTER": 400,
      "DIAMOND": 125,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "As a Jungler, get takedowns on laners before 10 minutes",
      "name": "Farm Champs not Camps",
      "shortDescription": "As jungler, get takedowns on laners before 10min"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302100",
      "source": "EOGD"
    },
    "parent": "302100",
    "parentCategory": "4",
    "title": "Champ Farmer",
    "percentiles": {
      "GOLD": 0.035,
      "NONE": 1,
      "BRONZE": 0.101,
      "MASTER": 0.002,
      "CHALLENGER": 0,
      "IRON": 0.228,
      "PLATINUM": 0.012,
      "DIAMOND": 0.006,
      "GRANDMASTER": 0,
      "SILVER": 0.064
    },
    "leaderboardThresholds": [
      2261,
      1,
      649,
      1316,
      399,
      6880
    ]
  },
  {
    "id": 302103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 6,
      "MASTER": 4,
      "PLATINUM": 2,
      "GRANDMASTER": 5,
      "DIAMOND": 3,
      "GOLD": 1
    },
    "translation": {
      "description": "As a laner, in a single game, get kills before 10 minutes outside your lane (anyone but your lane opponent)",
      "name": "Overwhelming Presence",
      "shortDescription": "As a laner, in 1 game, get kills outside your lane before 10 min"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302100",
      "source": "EOGD"
    },
    "parent": "302100",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.028,
      "BRONZE": 0.267,
      "GOLD": 0.076,
      "IRON": 0,
      "GRANDMASTER": 0.003,
      "SILVER": 0.076,
      "CHALLENGER": 0.001,
      "MASTER": 0.012,
      "PLATINUM": 0.052
    },
    "leaderboardThresholds": [
      105,
      1,
      6,
      8726,
      5,
      43626
    ]
  },
  {
    "id": 302104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 50,
      "MASTER": 12,
      "PLATINUM": 3,
      "GRANDMASTER": 20,
      "DIAMOND": 7,
      "GOLD": 1
    },
    "translation": {
      "description": "As a laner, get a takedown in all three lanes within 10 minutes",
      "name": "Whose Lane is it Anyway",
      "shortDescription": "As a laner, get takedowns in all lanes before 10min"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302100",
      "source": "EOGD"
    },
    "parent": "302100",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.017,
      "CHALLENGER": 0,
      "DIAMOND": 0.004,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0.063,
      "NONE": 1,
      "SILVER": 0
    },
    "leaderboardThresholds": [
      228,
      1,
      49,
      369,
      20,
      5072
    ]
  },
  {
    "id": 302105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 237,
      "MASTER": 12,
      "PLATINUM": 4,
      "GRANDMASTER": 91,
      "DIAMOND": 8,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Have a control ward active in the river or enemy half of the map for more than 65% of the game duration",
      "name": "Global Defense System",
      "shortDescription": "Have a control ward in enemy jungle for 65+% of the game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302100",
      "source": "EOGD"
    },
    "parent": "302100",
    "parentCategory": "4",
    "title": "In Control",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.084,
      "PLATINUM": 0.122,
      "CHALLENGER": 0.004,
      "DIAMOND": 0.098,
      "IRON": 0,
      "GRANDMASTER": 0.021,
      "GOLD": 0.149,
      "NONE": 1,
      "SILVER": 0.18
    },
    "leaderboardThresholds": [
      3050,
      1,
      237,
      63888,
      91,
      319434
    ]
  },
  {
    "id": 302106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 750,
      "MASTER": 300,
      "PLATINUM": 75,
      "GRANDMASTER": 500,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "Generate a 2500 gold advantage during your Baron Buff",
      "name": "Baron Power Play",
      "shortDescription": "Generate 2500 gold advantage with Baron Buff"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302100",
      "source": "EOGD"
    },
    "parent": "302100",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.04,
      "BRONZE": 0.216,
      "GOLD": 0.131,
      "IRON": 0.315,
      "GRANDMASTER": 0.003,
      "SILVER": 0.179,
      "CHALLENGER": 0.001,
      "MASTER": 0.013,
      "PLATINUM": 0.075
    },
    "leaderboardThresholds": [
      2959,
      1,
      749,
      8819,
      499,
      46767
    ]
  },
  {
    "id": 203303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 4470,
      "MASTER": 1800,
      "PLATINUM": 540,
      "GRANDMASTER": 2967,
      "DIAMOND": 1080,
      "IRON": 10,
      "GOLD": 180,
      "SILVER": 90
    },
    "translation": {
      "description": "Kill enemy champions while they are near their own turret",
      "name": "No Quarter",
      "shortDescription": "Kill champions under their own turret"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203300",
      "source": "EOGD"
    },
    "parent": "203300",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0.01,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "SILVER": 0.153,
      "IRON": 0.274,
      "DIAMOND": 0.026,
      "NONE": 1,
      "GOLD": 0.115,
      "PLATINUM": 0.057,
      "BRONZE": 0.214
    },
    "leaderboardThresholds": [
      19134,
      1,
      4470,
      7991,
      2967,
      39949
    ]
  },
  {
    "id": 203302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 4332,
      "MASTER": 1800,
      "PLATINUM": 540,
      "GRANDMASTER": 2897,
      "DIAMOND": 1080,
      "IRON": 10,
      "GOLD": 180,
      "SILVER": 90
    },
    "translation": {
      "description": "Get kills while more enemy champions than friendly ones are nearby",
      "name": "Never Tell Me the Odds",
      "shortDescription": "Get kills while outnumbered"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203300",
      "source": "EOGD"
    },
    "parent": "203300",
    "parentCategory": "2",
    "title": "Lucky",
    "percentiles": {
      "SILVER": 0.143,
      "CHALLENGER": 0,
      "DIAMOND": 0.022,
      "MASTER": 0.008,
      "PLATINUM": 0.05,
      "GRANDMASTER": 0.002,
      "GOLD": 0.106,
      "BRONZE": 0.203,
      "IRON": 0.264,
      "NONE": 1
    },
    "leaderboardThresholds": [
      19949,
      1,
      4332,
      6143,
      2897,
      30709
    ]
  },
  {
    "id": 203301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 6931,
      "MASTER": 3000,
      "PLATINUM": 1000,
      "GRANDMASTER": 4710,
      "DIAMOND": 2000,
      "IRON": 15,
      "GOLD": 300,
      "SILVER": 150
    },
    "translation": {
      "description": "Get solo kills (no assists from allied champions)",
      "name": "Solo Bolo",
      "shortDescription": "Get solo kills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203300",
      "source": "EOGD"
    },
    "parent": "203300",
    "parentCategory": "2",
    "title": "Lone Wolf",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.012,
      "BRONZE": 0.193,
      "GOLD": 0.092,
      "IRON": 0.262,
      "GRANDMASTER": 0.001,
      "SILVER": 0.13,
      "CHALLENGER": 0,
      "MASTER": 0.005,
      "PLATINUM": 0.034
    },
    "leaderboardThresholds": [
      30896,
      1,
      6931,
      3843,
      4710,
      19207
    ]
  },
  {
    "id": 203300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 400,
      "PLATINUM": 135,
      "DIAMOND": 240,
      "IRON": 15,
      "GOLD": 85,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Slayer group",
      "name": "Slayer",
      "shortDescription": "Earn points from challenges in the Slayer group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "203000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "203000",
    "parentCategory": "2",
    "title": "Maverick",
    "percentiles": {
      "BRONZE": 0.221,
      "MASTER": 0.004,
      "CHALLENGER": 0,
      "PLATINUM": 0.052,
      "GRANDMASTER": 0,
      "DIAMOND": 0.017,
      "IRON": 0.257,
      "GOLD": 0.104,
      "NONE": 1,
      "SILVER": 0.18
    }
  },
  {
    "id": 301100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 500,
      "PLATINUM": 135,
      "DIAMOND": 370,
      "IRON": 10,
      "GOLD": 65,
      "SILVER": 30
    },
    "translation": {
      "description": "Earn points from challenges in the Monster Hunter group",
      "name": "Monster Hunter",
      "shortDescription": "Earn points from challenges in the Monster Hunter group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "301000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301000",
    "parentCategory": "4",
    "title": "Big Game Hunter",
    "percentiles": {
      "BRONZE": 0.247,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "PLATINUM": 0.114,
      "GRANDMASTER": 0,
      "DIAMOND": 0.019,
      "IRON": 0.274,
      "GOLD": 0.166,
      "NONE": 1,
      "SILVER": 0.203
    }
  },
  {
    "id": 301101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 936,
      "MASTER": 400,
      "PLATINUM": 150,
      "GRANDMASTER": 622,
      "DIAMOND": 250,
      "IRON": 3,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Kill Epic Monsters within 30 seconds of them spawning. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Always On Time",
      "shortDescription": "Kill Epic Monsters within 30 seconds of spawn"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "source": "EOGD"
    },
    "parent": "301100",
    "parentCategory": "4",
    "title": "Epic",
    "percentiles": {
      "IRON": 0.166,
      "GRANDMASTER": 0,
      "MASTER": 0.001,
      "SILVER": 0.064,
      "NONE": 1,
      "PLATINUM": 0.008,
      "BRONZE": 0.106,
      "CHALLENGER": 0,
      "GOLD": 0.036,
      "DIAMOND": 0.003
    },
    "leaderboardThresholds": [
      3398,
      1,
      936,
      669,
      622,
      3338
    ]
  },
  {
    "id": 203305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 500,
      "MASTER": 150,
      "PLATINUM": 40,
      "GRANDMASTER": 300,
      "DIAMOND": 80,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 7
    },
    "translation": {
      "description": "Kill champions from full health within 1.5 seconds with mostly your damage (90% or more)",
      "name": "Blink and You'll Miss It",
      "shortDescription": "Kill champions from full health in 1.5 seconds"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203300",
      "source": "EOGD"
    },
    "parent": "203300",
    "parentCategory": "2",
    "percentiles": {
      "GOLD": 0.056,
      "NONE": 1,
      "BRONZE": 0.133,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "IRON": 0.191,
      "PLATINUM": 0.023,
      "DIAMOND": 0.009,
      "GRANDMASTER": 0.001,
      "SILVER": 0.09
    },
    "leaderboardThresholds": [
      14603,
      1,
      499,
      1638,
      299,
      7721
    ]
  },
  {
    "id": 301102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 75,
      "MASTER": 15,
      "PLATINUM": 5,
      "GRANDMASTER": 36,
      "DIAMOND": 10,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Your team takes Barons before 21 minutes",
      "name": "Gets The Wurm",
      "shortDescription": "Take Barons before 21 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "301100",
    "parentCategory": "4",
    "title": "Early Bird",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.037,
      "BRONZE": 0,
      "GOLD": 0.119,
      "IRON": 0,
      "GRANDMASTER": 0.006,
      "SILVER": 0.168,
      "CHALLENGER": 0.001,
      "MASTER": 0.023,
      "PLATINUM": 0.068
    },
    "leaderboardThresholds": [
      624,
      1,
      75,
      17883,
      36,
      89409
    ]
  },
  {
    "id": 203304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 9,
      "CHALLENGER": 1555,
      "MASTER": 650,
      "PLATINUM": 180,
      "GRANDMASTER": 1016,
      "DIAMOND": 350,
      "IRON": 3,
      "GOLD": 60,
      "SILVER": 27
    },
    "translation": {
      "description": "Destroy side lane turrets solo (majority damage dealt by you) after 14 minutes without dying",
      "name": "Splitpush Strategy",
      "shortDescription": "Take side lane turrets solo without dying"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203300",
      "source": "EOGD"
    },
    "parent": "203300",
    "parentCategory": "2",
    "percentiles": {
      "SILVER": 0.101,
      "CHALLENGER": 0,
      "DIAMOND": 0.009,
      "MASTER": 0.002,
      "PLATINUM": 0.024,
      "GRANDMASTER": 0.001,
      "GOLD": 0.066,
      "BRONZE": 0.155,
      "IRON": 0.213,
      "NONE": 1
    },
    "leaderboardThresholds": [
      6459,
      1,
      1555,
      1622,
      1016,
      8105
    ]
  },
  {
    "id": 301103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 13,
      "MASTER": 3,
      "PLATINUM": 1,
      "GRANDMASTER": 5,
      "DIAMOND": 2
    },
    "translation": {
      "description": "Your team takes Elder Dragons before 28 minutes",
      "name": "Dragon Hunt",
      "shortDescription": "Take Elder Dragons before 28 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "301100",
    "parentCategory": "4",
    "percentiles": {
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.002,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      52,
      1,
      13,
      49,
      5,
      239
    ]
  },
  {
    "id": 510007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 7,
      "PLATINUM": 5,
      "DIAMOND": 6,
      "IRON": 1,
      "GOLD": 4,
      "SILVER": 3
    },
    "translation": {
      "description": "Collect ultimate champion skins",
      "name": "Haute Couture",
      "shortDescription": "Collect ultimate champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championSkinQuery": "[?(@.rarity== 'kUltimate' && @.type!='kRecolor')].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "MASTER": 0.007,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.05,
      "IRON": 0.137,
      "DIAMOND": 0.012,
      "NONE": 1,
      "GOLD": 0.031,
      "PLATINUM": 0.019,
      "BRONZE": 0.078
    }
  },
  {
    "id": 510006,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 5,
      "PLATINUM": 3,
      "DIAMOND": 4,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Collect victorious champion skins",
      "name": "Victorious Regalia",
      "shortDescription": "Collect victorious champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championSkinQuery": "$[?('7' in @.skinlines[*].id && @.type!='kRecolor')].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "title": "Elegant",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0.032,
      "SILVER": 0.112,
      "NONE": 1,
      "PLATINUM": 0.057,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.077,
      "DIAMOND": 0.043
    }
  },
  {
    "id": 510005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 200,
      "PLATINUM": 60,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 40,
      "SILVER": 20
    },
    "translation": {
      "description": "Collect legacy champion skins",
      "name": "Vintage Look",
      "shortDescription": "Collect legacy champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championSkinQuery": "$[?(@.isLegacy== true && @.type!='kRecolor')].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "SILVER": 0.108,
      "CHALLENGER": 0,
      "DIAMOND": 0.015,
      "MASTER": 0.003,
      "PLATINUM": 0.036,
      "GRANDMASTER": 0,
      "GOLD": 0.061,
      "BRONZE": 0.15,
      "IRON": 0.292,
      "NONE": 1
    }
  },
  {
    "id": 510004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 75,
      "PLATINUM": 25,
      "DIAMOND": 50,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Collect 5 or more skins for a champion",
      "name": "Need a Bigger Closet",
      "shortDescription": "Collect 5 or more skins for a champion"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championQuery": "$[?(@.skinCount >= 5)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "BRONZE": 0.068,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "PLATINUM": 0.014,
      "GRANDMASTER": 0,
      "DIAMOND": 0.006,
      "IRON": 0.113,
      "GOLD": 0.032,
      "NONE": 1,
      "SILVER": 0.051
    }
  },
  {
    "id": 301104,
    "state": "ARCHIVED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 4,
      "CHALLENGER": 628,
      "MASTER": 180,
      "PLATINUM": 50,
      "GRANDMASTER": 382,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 19,
      "SILVER": 9
    },
    "translation": {
      "description": "Your team takes both Rift Heralds in a game",
      "name": "Two Shells are Better Than One",
      "shortDescription": "Take both Rift Heralds in a game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "301100",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.059,
      "BRONZE": 0.226,
      "GOLD": 0.142,
      "IRON": 0.316,
      "GRANDMASTER": 0.008,
      "SILVER": 0.181,
      "CHALLENGER": 0.002,
      "MASTER": 0.033,
      "PLATINUM": 0.093
    },
    "leaderboardThresholds": [
      3885,
      1,
      628,
      25178,
      382,
      125882
    ]
  },
  {
    "id": 510003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 15,
      "PLATINUM": 7,
      "DIAMOND": 12,
      "IRON": 1,
      "GOLD": 4,
      "SILVER": 3
    },
    "translation": {
      "description": "Collect many skins for a single champion",
      "name": "That Drip",
      "shortDescription": "Collect many skins for a single champion"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "MASTER": 0.008,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.185,
      "IRON": 0.381,
      "DIAMOND": 0.02,
      "NONE": 1,
      "GOLD": 0.144,
      "PLATINUM": 0.071,
      "BRONZE": 0.246
    }
  },
  {
    "id": 301105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 250,
      "MASTER": 90,
      "PLATINUM": 30,
      "GRANDMASTER": 144,
      "DIAMOND": 50,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Claim Dragon Souls without the enemy team taking a single dragon",
      "name": "Soul Sweep",
      "shortDescription": "Claim Dragon Souls 4-0"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "301100",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.037,
      "BRONZE": 0.213,
      "GOLD": 0.12,
      "IRON": 0.264,
      "GRANDMASTER": 0.003,
      "SILVER": 0.157,
      "CHALLENGER": 0,
      "MASTER": 0.013,
      "PLATINUM": 0.062
    },
    "leaderboardThresholds": [
      1006,
      1,
      249,
      4303,
      144,
      50595
    ]
  },
  {
    "id": 301106,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "DIAMOND": 1
    },
    "translation": {
      "description": "Kill three Barons in a single game",
      "name": "Can of Wurms",
      "shortDescription": "Kill three Barons in a single game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301100",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.135,
      "BRONZE": 0,
      "GOLD": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 510001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 500,
      "PLATINUM": 75,
      "DIAMOND": 200,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 10
    },
    "translation": {
      "description": "Obtain champion skins",
      "name": "Fashion Forward",
      "shortDescription": "Collect champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.047,
      "BRONZE": 0.269,
      "GOLD": 0.17,
      "IRON": 0.381,
      "GRANDMASTER": 0,
      "SILVER": 0.228,
      "CHALLENGER": 0,
      "MASTER": 0.008,
      "PLATINUM": 0.115
    }
  },
  {
    "id": 301107,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "DIAMOND": 1
    },
    "translation": {
      "description": "Kill two Elder Dragons in a single game",
      "name": "Draconic Extinction",
      "shortDescription": "Kill two Elder Dragons in a single game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301100",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301100",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.1,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 510000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 40,
      "MASTER": 725,
      "PLATINUM": 240,
      "DIAMOND": 430,
      "IRON": 20,
      "GOLD": 150,
      "SILVER": 70
    },
    "translation": {
      "description": "Earn points from challenges in the Connoisseur group",
      "name": "Connoisseur",
      "shortDescription": "Earn points from challenges in the Connoisseur group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "5",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "5",
    "parentCategory": "0",
    "title": "Connoisseur",
    "percentiles": {
      "BRONZE": 0.233,
      "MASTER": 0.005,
      "CHALLENGER": 0,
      "PLATINUM": 0.06,
      "GRANDMASTER": 0,
      "DIAMOND": 0.019,
      "IRON": 0.304,
      "GOLD": 0.104,
      "NONE": 1,
      "SILVER": 0.178
    }
  },
  {
    "id": 202303,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 75,
      "PLATINUM": 30,
      "DIAMOND": 50,
      "IRON": 2,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Win a game without dying with different champions",
      "name": "Invincible",
      "shortDescription": "Win without dying with different champions"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202300",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202300",
    "parentCategory": "2",
    "percentiles": {
      "GOLD": 0.019,
      "NONE": 1,
      "BRONZE": 0.084,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.16,
      "PLATINUM": 0.002,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.038
    }
  },
  {
    "id": 510011,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 100,
      "PLATINUM": 30,
      "DIAMOND": 60,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Collect chromas",
      "name": "Fashionista",
      "shortDescription": "Collect chromas"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "title": "Fashionista",
    "percentiles": {
      "MASTER": 0.016,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.084,
      "IRON": 0.192,
      "DIAMOND": 0.027,
      "NONE": 1,
      "GOLD": 0.069,
      "PLATINUM": 0.046,
      "BRONZE": 0.114
    }
  },
  {
    "id": 202302,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 7,
      "PLATINUM": 2,
      "DIAMOND": 4,
      "GOLD": 1
    },
    "translation": {
      "description": "Become Legendary (eight kill streak) within 15 minutes",
      "name": "Prodigy",
      "shortDescription": "Become Legendary within 15 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202300",
    "parentCategory": "2",
    "title": "Prodigy",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.03,
      "CHALLENGER": 0,
      "PLATINUM": 0.094,
      "GRANDMASTER": 0,
      "DIAMOND": 0.055,
      "IRON": 0,
      "GOLD": 0.146,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 510010,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 250,
      "PLATINUM": 100,
      "DIAMOND": 175,
      "IRON": 1,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Collect epic champion skins",
      "name": "Fancy Garb",
      "shortDescription": "Collect epic champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championSkinQuery": "$[?(@.rarity== 'kEpic' && @.type!='kRecolor')].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "IRON": 0.31,
      "GRANDMASTER": 0,
      "MASTER": 0.006,
      "SILVER": 0.121,
      "NONE": 1,
      "PLATINUM": 0.035,
      "BRONZE": 0.171,
      "CHALLENGER": 0,
      "GOLD": 0.078,
      "DIAMOND": 0.013
    }
  },
  {
    "id": 202301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Win games with eight or more kills without dying",
      "name": "Immortal",
      "shortDescription": "Win a game with more than eight kills without dying"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202300",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0.013,
      "SILVER": 0.137,
      "NONE": 1,
      "PLATINUM": 0.06,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.085,
      "DIAMOND": 0.035
    }
  },
  {
    "id": 510009,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 45,
      "PLATINUM": 20,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 12,
      "SILVER": 7
    },
    "translation": {
      "description": "Collect legendary champion skins",
      "name": "Legendary Wardrobe",
      "shortDescription": "Collect legendary champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championSkinQuery": "$[?(@.rarity == 'kLegendary' && @.type != 'kRecolor')].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "title": "Trendsetter",
    "percentiles": {
      "IRON": 0.24,
      "GRANDMASTER": 0,
      "MASTER": 0.007,
      "SILVER": 0.107,
      "NONE": 1,
      "PLATINUM": 0.037,
      "BRONZE": 0.163,
      "CHALLENGER": 0,
      "GOLD": 0.07,
      "DIAMOND": 0.019
    }
  },
  {
    "id": 202300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 400,
      "PLATINUM": 105,
      "DIAMOND": 190,
      "IRON": 5,
      "GOLD": 65,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Perfection group",
      "name": "Perfection",
      "shortDescription": "Earn points from challenges in the Perfection group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "202000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202000",
    "parentCategory": "2",
    "title": "Perfect",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.029,
      "BRONZE": 0.22,
      "GOLD": 0.108,
      "IRON": 0.288,
      "GRANDMASTER": 0,
      "SILVER": 0.177,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.069
    }
  },
  {
    "id": 510008,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 25,
      "PLATINUM": 15,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 6
    },
    "translation": {
      "description": "Collect mythic champion skins",
      "name": "Formal Attire",
      "shortDescription": "Collect mythic champion skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "510000",
      "championSkinQuery": "$[?(@.rarity=='kMythic' && @.type!='kRecolor')].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "510000",
    "parentCategory": "5",
    "percentiles": {
      "SILVER": 0.027,
      "CHALLENGER": 0,
      "DIAMOND": 0.005,
      "MASTER": 0.004,
      "PLATINUM": 0.009,
      "GRANDMASTER": 0,
      "GOLD": 0.015,
      "BRONZE": 0.053,
      "IRON": 0.159,
      "NONE": 1
    }
  },
  {
    "id": 402502,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 500,
      "CHALLENGER": 65000,
      "MASTER": 25000,
      "PLATINUM": 6000,
      "GRANDMASTER": 41876,
      "DIAMOND": 15000,
      "IRON": 100,
      "GOLD": 2000,
      "SILVER": 1200
    },
    "translation": {
      "description": "Immobilize enemy champions",
      "name": "Immediate Immobilization",
      "shortDescription": "Immobilize enemies"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402500",
      "source": "EOGD"
    },
    "parent": "402500",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.03,
      "BRONZE": 0.196,
      "GOLD": 0.127,
      "IRON": 0.28,
      "GRANDMASTER": 0.003,
      "SILVER": 0.152,
      "CHALLENGER": 0.001,
      "MASTER": 0.013,
      "PLATINUM": 0.073
    },
    "leaderboardThresholds": [
      477693,
      1,
      64999,
      9147,
      41876,
      48015
    ]
  },
  {
    "id": 2023006,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 25,
      "CHALLENGER": 4953,
      "MASTER": 250,
      "PLATINUM": 144,
      "GRANDMASTER": 1894,
      "DIAMOND": 200,
      "IRON": 5,
      "GOLD": 100,
      "SILVER": 50
    },
    "translation": {
      "description": "Hit snowballs on champions in ARAM",
      "name": "Perfect Aim: 2023",
      "shortDescription": "Hit snowballs on champions"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.078,
      "BRONZE": 0.131,
      "GOLD": 0.096,
      "IRON": 0.169,
      "GRANDMASTER": 0.018,
      "SILVER": 0.114,
      "CHALLENGER": 0.004,
      "MASTER": 0.072,
      "PLATINUM": 0.086
    },
    "leaderboardThresholds": [
      69671,
      1,
      4953,
      54997,
      1894,
      274981
    ]
  },
  {
    "id": 402503,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 4400,
      "CHALLENGER": 651003,
      "MASTER": 260000,
      "PLATINUM": 65000,
      "GRANDMASTER": 432360,
      "DIAMOND": 148000,
      "IRON": 1100,
      "GOLD": 27000,
      "SILVER": 11000
    },
    "translation": {
      "description": "Use Abilities",
      "name": "Ability Abuse",
      "shortDescription": "Use Abilities"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402500",
      "source": "EOGD"
    },
    "parent": "402500",
    "parentCategory": "3",
    "percentiles": {
      "SILVER": 0.169,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.036,
      "MASTER": 0.014,
      "PLATINUM": 0.076,
      "GRANDMASTER": 0.003,
      "GOLD": 0.122,
      "BRONZE": 0.218,
      "IRON": 0.293,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3712589,
      1,
      651003,
      10633,
      432360,
      53157
    ]
  },
  {
    "id": 2023007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "CHALLENGER": 3,
      "MASTER": 1,
      "GRANDMASTER": 2
    },
    "translation": {
      "description": "Kill Baron Nashor solo",
      "name": "Legendary Slayer: 2023",
      "shortDescription": "Kill Baron Nashor solo"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0.02,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 202305,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 6,
      "MASTER": 350,
      "PLATINUM": 90,
      "DIAMOND": 180,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 14
    },
    "translation": {
      "description": "Earn more than 450 Gold Per Minute",
      "name": "Golden",
      "shortDescription": "Have more than 450 gold per minute in a game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202300",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202300",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0.008,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.135,
      "IRON": 0.277,
      "DIAMOND": 0.024,
      "NONE": 1,
      "GOLD": 0.098,
      "PLATINUM": 0.049,
      "BRONZE": 0.178
    }
  },
  {
    "id": 402500,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 10,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Mystic group",
      "name": "Mystic",
      "shortDescription": "Earn points from challenges in the Mystic group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "402000",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "402000",
    "parentCategory": "3",
    "title": "Enchanted",
    "percentiles": {
      "BRONZE": 0.243,
      "MASTER": 0.006,
      "PLATINUM": 0.082,
      "CHALLENGER": 0,
      "DIAMOND": 0.035,
      "IRON": 0.28,
      "GRANDMASTER": 0,
      "GOLD": 0.132,
      "NONE": 1,
      "SILVER": 0.195
    }
  },
  {
    "id": 2023004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "CHALLENGER": 3,
      "MASTER": 1,
      "GRANDMASTER": 2
    },
    "translation": {
      "description": "Steal two Epic Monsters in one game. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Objective Secured: 2023",
      "shortDescription": "Steal two Epic Monsters in one game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "MASTER": 0.027,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0,
      "PLATINUM": 0,
      "BRONZE": 0
    }
  },
  {
    "id": 202304,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 1
    },
    "translation": {
      "description": "Get two pentakills in a single game",
      "name": "Decimator",
      "shortDescription": "Get two pentakills in one game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202300",
      "priority": "100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202300",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.003,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 402501,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 24000,
      "CHALLENGER": 7489404,
      "MASTER": 1400000,
      "PLATINUM": 450000,
      "GRANDMASTER": 3464023,
      "DIAMOND": 800000,
      "IRON": 6000,
      "GOLD": 150000,
      "SILVER": 72000
    },
    "translation": {
      "description": "Do effective healing or shielding on your allies (self healing/shield doesn't count). Effective healing must actually restore health, and effective shielding must actually block damage",
      "name": "Field Medic",
      "shortDescription": "Effectively heal or shield allies"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402500",
      "source": "EOGD"
    },
    "parent": "402500",
    "parentCategory": "3",
    "title": "Protector",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.019,
      "BRONZE": 0.161,
      "GOLD": 0.077,
      "IRON": 0.224,
      "GRANDMASTER": 0.002,
      "SILVER": 0.11,
      "CHALLENGER": 0,
      "MASTER": 0.01,
      "PLATINUM": 0.035
    },
    "leaderboardThresholds": [
      77051135,
      1,
      7489404,
      7431,
      3464023,
      37147
    ]
  },
  {
    "id": 2023005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "CHALLENGER": 300,
      "MASTER": 200,
      "PLATINUM": 90,
      "GRANDMASTER": 250,
      "DIAMOND": 140,
      "IRON": 3,
      "GOLD": 60,
      "SILVER": 30
    },
    "translation": {
      "description": "Kill enemies near one of their own turrets in ARAM",
      "name": "Can Run, Can't Hide: 2023",
      "shortDescription": "Kill enemies near one of their turrets"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.086,
      "BRONZE": 0.147,
      "GOLD": 0.109,
      "IRON": 0.191,
      "GRANDMASTER": 0,
      "SILVER": 0.128,
      "CHALLENGER": 0,
      "MASTER": 0.076,
      "PLATINUM": 0.098
    }
  },
  {
    "id": 2023002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 12,
      "MASTER": 1,
      "GRANDMASTER": 4
    },
    "translation": {
      "description": "Deal 40% or more of your team's total damage to champions in ARAM",
      "name": "It's All Me: 2023",
      "shortDescription": "Deal 40%+ of your team's champion damage"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.014,
      "MASTER": 0.057,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0.003,
      "GOLD": 0,
      "DIAMOND": 0
    },
    "leaderboardThresholds": [
      1158,
      1,
      12,
      43666,
      4,
      218324
    ]
  },
  {
    "id": 2023003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1493,
      "MASTER": 200,
      "PLATINUM": 100,
      "GRANDMASTER": 735,
      "DIAMOND": 150,
      "IRON": 3,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Secure kills while more enemy champions than allies are nearby",
      "name": "Outmanned, Never Outgunned: 2023",
      "shortDescription": "Secure kills while outnumbered"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.202,
      "MASTER": 0.069,
      "CHALLENGER": 0.003,
      "PLATINUM": 0.101,
      "GRANDMASTER": 0.017,
      "DIAMOND": 0.082,
      "IRON": 0.249,
      "GOLD": 0.132,
      "NONE": 1,
      "SILVER": 0.163
    },
    "leaderboardThresholds": [
      11032,
      1,
      1493,
      52859,
      735,
      264288
    ]
  },
  {
    "id": 2023000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 70,
      "MASTER": 1600,
      "PLATINUM": 375,
      "DIAMOND": 670,
      "IRON": 35,
      "GOLD": 235,
      "SILVER": 105
    },
    "translation": {
      "description": "Earn points from challenges in the 2023 Seasonal group",
      "name": "2023 Seasonal",
      "shortDescription": "Earn points from challenges in the 2023 Seasonal group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "season": "14",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "title": "Challenjour '23",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.106,
      "BRONZE": 0.235,
      "GOLD": 0.174,
      "IRON": 0.256,
      "GRANDMASTER": 0,
      "SILVER": 0.224,
      "CHALLENGER": 0,
      "MASTER": 0.005,
      "PLATINUM": 0.141
    }
  },
  {
    "id": 2023001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 23,
      "MASTER": 1,
      "GRANDMASTER": 8
    },
    "translation": {
      "description": "Win games with 0 deaths and at least 30% kill participation",
      "name": "Death Fears Me: 2023",
      "shortDescription": "Win games with 0 deaths and at least 30% kill participation"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0,
      "IRON": 0,
      "GRANDMASTER": 0.039,
      "SILVER": 0,
      "CHALLENGER": 0.008,
      "MASTER": 0.156,
      "PLATINUM": 0
    },
    "leaderboardThresholds": [
      888,
      1,
      23,
      119570,
      8,
      597845
    ]
  },
  {
    "id": 210003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 736,
      "MASTER": 250,
      "PLATINUM": 75,
      "GRANDMASTER": 461,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "Earn S- grades or higher",
      "name": "Top Performer",
      "shortDescription": "Earn S- grade or higher"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "210000",
      "source": "EOGD"
    },
    "parent": "210000",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.289,
      "GRANDMASTER": 0.004,
      "MASTER": 0.017,
      "SILVER": 0.166,
      "NONE": 1,
      "PLATINUM": 0.065,
      "BRONZE": 0.202,
      "CHALLENGER": 0.001,
      "GOLD": 0.119,
      "DIAMOND": 0.034
    },
    "leaderboardThresholds": [
      3517,
      1,
      736,
      12635,
      461,
      63167
    ]
  },
  {
    "id": 210002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 145,
      "MASTER": 30,
      "PLATINUM": 15,
      "GRANDMASTER": 71,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Get a Pentakill with different champions",
      "name": "Same Penta, Different Champ",
      "shortDescription": "Get a Pentakill with different champions"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "210000",
      "championQuery": "$[*].id",
      "source": "EOGD"
    },
    "parent": "210000",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.004,
      "IRON": 0.07,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0,
      "PLATINUM": 0,
      "BRONZE": 0.013
    },
    "leaderboardThresholds": [
      165,
      1,
      145,
      3,
      71,
      9
    ]
  },
  {
    "id": 210001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 170,
      "MASTER": 150,
      "PLATINUM": 50,
      "GRANDMASTER": 165,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 15
    },
    "translation": {
      "description": "Earn an S+ grade on different champions",
      "name": "Perfectionist",
      "shortDescription": "Earn an S+ grade with different champions"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "210000",
      "priority": "50",
      "championQuery": "$[*].id",
      "source": "EOGD"
    },
    "parent": "210000",
    "parentCategory": "2",
    "title": "S+",
    "percentiles": {
      "BRONZE": 0.09,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.001,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0.223,
      "GOLD": 0.007,
      "NONE": 1,
      "SILVER": 0.027
    },
    "leaderboardThresholds": [
      0,
      0,
      167,
      1,
      165,
      7
    ]
  },
  {
    "id": 210000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 500,
      "PLATINUM": 160,
      "DIAMOND": 300,
      "IRON": 15,
      "GOLD": 100,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Magnum Opus group",
      "name": "Magnum Opus",
      "shortDescription": "Earn points from challenges in the Magnum Opus group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "2",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2",
    "parentCategory": "0",
    "title": "Top Tier",
    "percentiles": {
      "IRON": 0.226,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.139,
      "NONE": 1,
      "PLATINUM": 0.027,
      "BRONZE": 0.185,
      "CHALLENGER": 0,
      "GOLD": 0.063,
      "DIAMOND": 0.002
    }
  },
  {
    "id": 210006,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 6,
      "DIAMOND": 8,
      "GOLD": 4,
      "SILVER": 2
    },
    "translation": {
      "description": "End season splits ranked Gold or higher",
      "name": "Forever Triumphant",
      "shortDescription": "End season splits ranked Gold or higher"
    },
    "reversed": false,
    "queueIds": [
      420,
      440,
      422,
      442
    ],
    "tags": {
      "parent": "210000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "210000",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.008,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0.014,
      "NONE": 1,
      "SILVER": 0.047
    }
  },
  {
    "id": 210005,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1004,
      "MASTER": 400,
      "PLATINUM": 125,
      "GRANDMASTER": 660,
      "DIAMOND": 250,
      "IRON": 1,
      "GOLD": 50,
      "SILVER": 20
    },
    "translation": {
      "description": "Get a KDA over 3 in Ranked Solo/Duo Queue",
      "name": "KDA Player",
      "shortDescription": "Get a KDA over 3 in Solo/Duo Queue"
    },
    "reversed": false,
    "queueIds": [
      420,
      422
    ],
    "tags": {
      "parent": "210000",
      "source": "EOGD"
    },
    "parent": "210000",
    "parentCategory": "2",
    "title": "KDA Player",
    "percentiles": {
      "GOLD": 0.069,
      "NONE": 1,
      "BRONZE": 0.13,
      "MASTER": 0.006,
      "CHALLENGER": 0,
      "IRON": 0.199,
      "PLATINUM": 0.034,
      "DIAMOND": 0.014,
      "GRANDMASTER": 0.001,
      "SILVER": 0.105
    },
    "leaderboardThresholds": [
      3819,
      1,
      1004,
      4436,
      660,
      22175
    ]
  },
  {
    "id": 402000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 165,
      "MASTER": 2700,
      "PLATINUM": 910,
      "DIAMOND": 1625,
      "IRON": 80,
      "GOLD": 570,
      "SILVER": 250
    },
    "translation": {
      "description": "Earn points from challenges in the Executioner, Commando, Resourceful, and Mystic groups",
      "name": "Medal of Honor",
      "shortDescription": "Earn points from challenges in the Executioner, Commando, Resourceful, and Mystic groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "3",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "3",
    "parentCategory": "0",
    "title": "Veteran",
    "percentiles": {
      "IRON": 0.28,
      "GRANDMASTER": 0,
      "MASTER": 0.004,
      "SILVER": 0.2,
      "NONE": 1,
      "PLATINUM": 0.074,
      "BRONZE": 0.232,
      "CHALLENGER": 0,
      "GOLD": 0.121,
      "DIAMOND": 0.027
    }
  },
  {
    "id": 210004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 8,
      "MASTER": 2,
      "PLATINUM": 5,
      "DIAMOND": 3,
      "IRON": 9,
      "GOLD": 6,
      "SILVER": 7
    },
    "translation": {
      "description": "Earn rank in Ranked Solo/Duo Queue. You must finish provisionals.",
      "name": "Ladder Climber",
      "shortDescription": "Earn rank in Solo/Duo Queue"
    },
    "reversed": true,
    "queueIds": [
      420,
      422
    ],
    "tags": {
      "parent": "210000",
      "valueMapping": "tierNames",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "210000",
    "parentCategory": "2",
    "title": "Masterful",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.009,
      "BRONZE": 0.172,
      "GOLD": 0.084,
      "IRON": 0.51,
      "GRANDMASTER": 0,
      "SILVER": 0.133,
      "CHALLENGER": 0,
      "MASTER": 0.003,
      "PLATINUM": 0.045
    }
  },
  {
    "id": 103000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 50,
      "MASTER": 1150,
      "PLATINUM": 400,
      "DIAMOND": 675,
      "IRON": 20,
      "GOLD": 230,
      "SILVER": 100
    },
    "translation": {
      "description": "Earn points from challenges in the Style, Innovation, and Tactician groups",
      "name": "Cleverness and Creativity",
      "shortDescription": "Earn points from challenges in the Style, Innovation, and Tactician groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "1",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "1",
    "parentCategory": "0",
    "title": "Galaxy Brain",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.018,
      "BRONZE": 0.338,
      "GOLD": 0.126,
      "IRON": 0.359,
      "GRANDMASTER": 0,
      "SILVER": 0.235,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.06
    }
  },
  {
    "id": 303204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 30,
      "PLATINUM": 15,
      "DIAMOND": 21,
      "IRON": 2,
      "GOLD": 9,
      "SILVER": 5
    },
    "translation": {
      "description": "Play with the same team in different Clash tournaments",
      "name": "Dream Team",
      "shortDescription": "Play with the same team in Clash tournaments"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "303200",
      "source": "CLASH",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303200",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0.002,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0.006,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0.001
    }
  },
  {
    "id": 2022014,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 75,
      "MASTER": 30,
      "PLATINUM": 12,
      "GRANDMASTER": 48,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 8,
      "SILVER": 5
    },
    "translation": {
      "description": "Steal Epic Monsters on Summoner's Rift. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Clutch Steal: 2022",
      "shortDescription": "Steal Epic monsters"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.109,
      "GRANDMASTER": 0.001,
      "MASTER": 0.002,
      "SILVER": 0.038,
      "NONE": 1,
      "PLATINUM": 0.013,
      "BRONZE": 0.075,
      "CHALLENGER": 0,
      "GOLD": 0.023,
      "DIAMOND": 0.005
    },
    "leaderboardThresholds": [
      561,
      1,
      75,
      1575,
      48,
      7868
    ]
  },
  {
    "id": 303205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 6,
      "MASTER": 60,
      "PLATINUM": 30,
      "DIAMOND": 45,
      "IRON": 2,
      "GOLD": 18,
      "SILVER": 12
    },
    "translation": {
      "description": "Finish with more wins than losses in Clash",
      "name": "Scoreboard",
      "shortDescription": "Get more wins than losses in Clash"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "303200",
      "source": "CLASH",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303200",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0.019,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.001,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0.004,
      "CHALLENGER": 0,
      "GOLD": 0,
      "DIAMOND": 0
    }
  },
  {
    "id": 2022015,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 15,
      "CHALLENGER": 590,
      "MASTER": 180,
      "PLATINUM": 75,
      "GRANDMASTER": 364,
      "DIAMOND": 120,
      "IRON": 5,
      "GOLD": 45,
      "SILVER": 25
    },
    "translation": {
      "description": "Get killing sprees on Summoner's Rift (you can get multiple, one for killing spree, one more for Rampage, etc)",
      "name": "Killing Spree Spree: 2022",
      "shortDescription": "Get killing sprees"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.037,
      "BRONZE": 0.118,
      "GOLD": 0.075,
      "IRON": 0.158,
      "GRANDMASTER": 0.006,
      "SILVER": 0.098,
      "CHALLENGER": 0.001,
      "MASTER": 0.023,
      "PLATINUM": 0.055
    },
    "leaderboardThresholds": [
      2307,
      1,
      590,
      17397,
      364,
      86979
    ]
  },
  {
    "id": 303200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 400,
      "PLATINUM": 135,
      "DIAMOND": 240,
      "IRON": 15,
      "GOLD": 85,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Clash group",
      "name": "Clash",
      "shortDescription": "Earn points from challenges in the Clash group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "303000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303000",
    "parentCategory": "4",
    "title": "Clash Master",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.018,
      "GOLD": 0.004,
      "IRON": 0.025,
      "GRANDMASTER": 0,
      "SILVER": 0.011,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.001
    }
  },
  {
    "id": 2022010,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 4,
      "CHALLENGER": 168,
      "MASTER": 60,
      "PLATINUM": 25,
      "GRANDMASTER": 104,
      "DIAMOND": 40,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 8
    },
    "translation": {
      "description": "Take both of the initial 2 scuttle crab spawn on Summoner's Rift",
      "name": "Crab Wrangler: 2022",
      "shortDescription": "Take both of the first scuttle crab spawns"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.099,
      "GRANDMASTER": 0.001,
      "MASTER": 0.002,
      "SILVER": 0.031,
      "NONE": 1,
      "PLATINUM": 0.01,
      "BRONZE": 0.05,
      "CHALLENGER": 0,
      "GOLD": 0.018,
      "DIAMOND": 0.005
    },
    "leaderboardThresholds": [
      1638,
      1,
      168,
      1686,
      104,
      8424
    ]
  },
  {
    "id": 303201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 4,
      "CHALLENGER": 300,
      "MASTER": 150,
      "PLATINUM": 35,
      "GRANDMASTER": 225,
      "DIAMOND": 75,
      "IRON": 1,
      "GOLD": 20,
      "SILVER": 10
    },
    "translation": {
      "description": "Win games in Clash",
      "name": "Clash Contenders",
      "shortDescription": "Win games in Clash"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "303200",
      "source": "CLASH"
    },
    "parent": "303200",
    "parentCategory": "4",
    "title": "Clasher",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.021,
      "GOLD": 0.002,
      "IRON": 0.041,
      "GRANDMASTER": 0,
      "SILVER": 0.008,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    },
    "leaderboardThresholds": [
      0,
      0,
      0,
      1,
      0,
      2
    ]
  },
  {
    "id": 2022011,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 8,
      "CHALLENGER": 329,
      "MASTER": 90,
      "PLATINUM": 35,
      "GRANDMASTER": 187,
      "DIAMOND": 60,
      "IRON": 3,
      "GOLD": 22,
      "SILVER": 12
    },
    "translation": {
      "description": "Have over 2 Vision Score per minute on Summoner's Rift",
      "name": "All-Seeing: 2022",
      "shortDescription": "Have over 2 vision score per minute"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.038,
      "GRANDMASTER": 0.001,
      "MASTER": 0.002,
      "SILVER": 0.016,
      "NONE": 1,
      "PLATINUM": 0.007,
      "BRONZE": 0.021,
      "CHALLENGER": 0,
      "GOLD": 0.01,
      "DIAMOND": 0.004
    },
    "leaderboardThresholds": [
      1198,
      1,
      329,
      1549,
      187,
      7740
    ]
  },
  {
    "id": 303202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 70,
      "MASTER": 40,
      "PLATINUM": 12,
      "GRANDMASTER": 55,
      "DIAMOND": 25,
      "IRON": 1,
      "GOLD": 8,
      "SILVER": 4
    },
    "translation": {
      "description": "Win Clash brackets",
      "name": "Clash Champion",
      "shortDescription": "Win Clash brackets"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "303200",
      "source": "CLASH"
    },
    "parent": "303200",
    "parentCategory": "4",
    "percentiles": {
      "GOLD": 0,
      "NONE": 1,
      "BRONZE": 0.005,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.016,
      "PLATINUM": 0,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.001
    },
    "leaderboardThresholds": [
      0,
      0,
      0,
      1,
      0,
      2
    ]
  },
  {
    "id": 2022008,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 77,
      "MASTER": 18,
      "PLATINUM": 8,
      "GRANDMASTER": 39,
      "DIAMOND": 12,
      "IRON": 1,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Kill 2 players with the same ability cast on Summoner's Rift",
      "name": "One Stone: 2022",
      "shortDescription": "Kill 2 players with one ability cast"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.022,
      "BRONZE": 0.084,
      "GOLD": 0.048,
      "IRON": 0.116,
      "GRANDMASTER": 0.003,
      "SILVER": 0.067,
      "CHALLENGER": 0.001,
      "MASTER": 0.013,
      "PLATINUM": 0.033
    },
    "leaderboardThresholds": [
      2356,
      1,
      77,
      9859,
      39,
      49287
    ]
  },
  {
    "id": 303203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 30,
      "PLATINUM": 12,
      "DIAMOND": 21,
      "IRON": 1,
      "GOLD": 6,
      "SILVER": 3
    },
    "translation": {
      "description": "Have Clash logos owned by the entire team",
      "name": "Coordinated Clash",
      "shortDescription": "Have Clash logos owned by entire team"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "303200",
      "source": "CLASH",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303200",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.004,
      "BRONZE": 0.017,
      "GOLD": 0.01,
      "IRON": 0.023,
      "GRANDMASTER": 0,
      "SILVER": 0.014,
      "CHALLENGER": 0,
      "MASTER": 0.002,
      "PLATINUM": 0.006
    }
  },
  {
    "id": 2022009,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 2343,
      "MASTER": 900,
      "PLATINUM": 375,
      "GRANDMASTER": 1513,
      "DIAMOND": 600,
      "IRON": 10,
      "GOLD": 225,
      "SILVER": 100
    },
    "translation": {
      "description": "Get solo kills on Summoner's Rift (no assists from allied champions)",
      "name": "Solo Bolo: 2022",
      "shortDescription": "Get solo kills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.107,
      "MASTER": 0.007,
      "PLATINUM": 0.028,
      "CHALLENGER": 0,
      "DIAMOND": 0.015,
      "IRON": 0.169,
      "GRANDMASTER": 0.002,
      "GOLD": 0.046,
      "NONE": 1,
      "SILVER": 0.079
    },
    "leaderboardThresholds": [
      10676,
      1,
      2343,
      5255,
      1513,
      26268
    ]
  },
  {
    "id": 2022006,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 174,
      "MASTER": 60,
      "PLATINUM": 25,
      "GRANDMASTER": 109,
      "DIAMOND": 40,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Deal the most damage to champions in the game on Summoner's Rift",
      "name": "Pain Prescriber: 2022",
      "shortDescription": "Deal the most damage to champions in the game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.017,
      "BRONZE": 0.088,
      "GOLD": 0.047,
      "IRON": 0.154,
      "GRANDMASTER": 0.002,
      "SILVER": 0.061,
      "CHALLENGER": 0,
      "MASTER": 0.009,
      "PLATINUM": 0.03
    },
    "leaderboardThresholds": [
      1088,
      1,
      174,
      7004,
      109,
      35015
    ]
  },
  {
    "id": 2022007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "DIAMOND": 1
    },
    "translation": {
      "description": "Become Legendary (8 kill streak) within 15 minutes on Summoner's Rift",
      "name": "Prodigy: 2022",
      "shortDescription": "Become Legendary within 15 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.065,
      "BRONZE": 0,
      "GOLD": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 2022004,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 30,
      "MASTER": 6,
      "PLATINUM": 2,
      "GRANDMASTER": 15,
      "DIAMOND": 4,
      "GOLD": 1
    },
    "translation": {
      "description": "Win games without dying and with at least 30% kill participation on Summoner's Rift",
      "name": "Unkillable Demon King: 2022",
      "shortDescription": "Win games without dying and 30% kill participation"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.01,
      "MASTER": 0.038,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.089,
      "BRONZE": 0,
      "CHALLENGER": 0.002,
      "GOLD": 0.128,
      "DIAMOND": 0.055
    },
    "leaderboardThresholds": [
      683,
      1,
      30,
      29022,
      15,
      145106
    ]
  },
  {
    "id": 2022005,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 109,
      "MASTER": 30,
      "PLATINUM": 12,
      "GRANDMASTER": 63,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 7,
      "SILVER": 3
    },
    "translation": {
      "description": "End the early laning phase (7 minutes) with 20% more gold and experience than your role opponent on Summoner's Rift",
      "name": "Lane Command: 2022",
      "shortDescription": "Be up 20% gold and XP at 7min"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.042,
      "BRONZE": 0.145,
      "GOLD": 0.088,
      "IRON": 0.179,
      "GRANDMASTER": 0.007,
      "SILVER": 0.126,
      "CHALLENGER": 0.001,
      "MASTER": 0.027,
      "PLATINUM": 0.064
    },
    "leaderboardThresholds": [
      1183,
      1,
      109,
      20401,
      63,
      101999
    ]
  },
  {
    "id": 2022002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 57,
      "MASTER": 20,
      "PLATINUM": 10,
      "GRANDMASTER": 36,
      "DIAMOND": 15,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Take the first turret in ARAM before 5 minutes have passed",
      "name": "Rapid Demolition: 2022",
      "shortDescription": "Take the first turret before 5 min"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.013,
      "BRONZE": 0.096,
      "GOLD": 0.041,
      "IRON": 0,
      "GRANDMASTER": 0.002,
      "SILVER": 0.057,
      "CHALLENGER": 0,
      "MASTER": 0.008,
      "PLATINUM": 0.022
    },
    "leaderboardThresholds": [
      351,
      1,
      57,
      6068,
      36,
      30335
    ]
  },
  {
    "id": 2022003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 237,
      "MASTER": 60,
      "PLATINUM": 25,
      "GRANDMASTER": 136,
      "DIAMOND": 40,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Earn total S- grades or higher on Summoner's Rift",
      "name": "Top Performer: 2022",
      "shortDescription": "Earn S- grade or higher"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.181,
      "GRANDMASTER": 0.007,
      "MASTER": 0.027,
      "SILVER": 0.093,
      "NONE": 1,
      "PLATINUM": 0.058,
      "BRONZE": 0.119,
      "CHALLENGER": 0.001,
      "GOLD": 0.077,
      "DIAMOND": 0.041
    },
    "leaderboardThresholds": [
      1421,
      1,
      237,
      20668,
      136,
      103333
    ]
  },
  {
    "id": 401000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 105,
      "MASTER": 1700,
      "PLATINUM": 560,
      "DIAMOND": 1000,
      "IRON": 55,
      "GOLD": 350,
      "SILVER": 160
    },
    "translation": {
      "description": "Earn points from challenges in the Guru, Virtuoso, and Ace groups",
      "name": "Sage",
      "shortDescription": "Earn points from challenges in the Guru, Virtuoso, and Ace groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "3",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "3",
    "parentCategory": "0",
    "title": "Sage",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.11,
      "IRON": 0.226,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0.036,
      "PLATINUM": 0.008,
      "BRONZE": 0.153
    }
  },
  {
    "id": 2022000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 75,
      "MASTER": 1400,
      "PLATINUM": 455,
      "DIAMOND": 860,
      "IRON": 35,
      "GOLD": 265,
      "SILVER": 115
    },
    "translation": {
      "description": "Earn points from challenges in the 2022 Seasonal group",
      "name": "2022 Seasonal",
      "shortDescription": "Earn points from challenges in the 2022 Seasonal group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "season": "12",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "title": "Challenjour '22",
    "percentiles": {
      "BRONZE": 0.147,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.049,
      "GRANDMASTER": 0,
      "DIAMOND": 0.013,
      "IRON": 0.182,
      "GOLD": 0.08,
      "NONE": 1,
      "SILVER": 0.125
    }
  },
  {
    "id": 2022001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 47,
      "MASTER": 20,
      "PLATINUM": 10,
      "GRANDMASTER": 32,
      "DIAMOND": 15,
      "IRON": 1,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Earn an S- grade or higher on different champions in ARAM",
      "name": "All Random All Champions: 2022",
      "shortDescription": "Earn an S- grade on different champions"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "championQuery": "$[*].id",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "MASTER": 0.01,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "SILVER": 0.064,
      "IRON": 0.1,
      "DIAMOND": 0.017,
      "NONE": 1,
      "GOLD": 0.049,
      "PLATINUM": 0.028,
      "BRONZE": 0.077
    },
    "leaderboardThresholds": [
      162,
      1,
      47,
      7901,
      32,
      39500
    ]
  },
  {
    "id": 2023020,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 132,
      "MASTER": 15,
      "PLATINUM": 9,
      "GRANDMASTER": 56,
      "DIAMOND": 12,
      "IRON": 1,
      "GOLD": 7,
      "SILVER": 5
    },
    "translation": {
      "description": "Win games queued as Fill role",
      "name": "Unstoppable, Unshakeable: 2023",
      "shortDescription": "Win games queued as Fill"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.046,
      "MASTER": 0.018,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.025,
      "GRANDMASTER": 0.004,
      "DIAMOND": 0.021,
      "IRON": 0.072,
      "GOLD": 0.03,
      "NONE": 1,
      "SILVER": 0.036
    },
    "leaderboardThresholds": [
      1170,
      1,
      132,
      13530,
      56,
      67642
    ]
  },
  {
    "id": 2023018,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 25,
      "CHALLENGER": 1875,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 754,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Place useful Control Wards. Useful wards are any wards placed outside of your base.",
      "name": "Brave The Darkness: 2023",
      "shortDescription": "Place Control Wards"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.067,
      "BRONZE": 0.121,
      "GOLD": 0.084,
      "IRON": 0.151,
      "GRANDMASTER": 0.015,
      "SILVER": 0.098,
      "CHALLENGER": 0.003,
      "MASTER": 0.061,
      "PLATINUM": 0.075
    },
    "leaderboardThresholds": [
      19696,
      1,
      1875,
      46905,
      754,
      234520
    ]
  },
  {
    "id": 2023019,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 25,
      "CHALLENGER": 1883,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 888,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Destroy turrets",
      "name": "Breakable: 2023",
      "shortDescription": "Destroy turrets"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.186,
      "MASTER": 0.107,
      "PLATINUM": 0.125,
      "CHALLENGER": 0.005,
      "DIAMOND": 0.115,
      "IRON": 0.226,
      "GRANDMASTER": 0.027,
      "GOLD": 0.137,
      "NONE": 1,
      "SILVER": 0.155
    },
    "leaderboardThresholds": [
      14099,
      1,
      1883,
      81607,
      888,
      408031
    ]
  },
  {
    "id": 2023016,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 300,
      "CHALLENGER": 22774,
      "MASTER": 2000,
      "PLATINUM": 1200,
      "GRANDMASTER": 10644,
      "DIAMOND": 1500,
      "IRON": 100,
      "GOLD": 900,
      "SILVER": 600
    },
    "translation": {
      "description": "Immobilize enemy champions",
      "name": "Immediate Immobilization: 2023",
      "shortDescription": "Immobilize enemies"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.106,
      "BRONZE": 0.172,
      "GOLD": 0.127,
      "IRON": 0.217,
      "GRANDMASTER": 0.023,
      "SILVER": 0.144,
      "CHALLENGER": 0.005,
      "MASTER": 0.093,
      "PLATINUM": 0.115
    },
    "leaderboardThresholds": [
      289350,
      1,
      22774,
      71494,
      10644,
      357462
    ]
  },
  {
    "id": 2023017,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 4131,
      "MASTER": 500,
      "PLATINUM": 200,
      "GRANDMASTER": 1817,
      "DIAMOND": 300,
      "IRON": 10,
      "GOLD": 100,
      "SILVER": 50
    },
    "translation": {
      "description": "Kill jungle monsters in the enemy jungle",
      "name": "I Shall Feast: 2023",
      "shortDescription": "Kill jungle monsters in the enemy jungle"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.165,
      "MASTER": 0.053,
      "CHALLENGER": 0.003,
      "PLATINUM": 0.089,
      "GRANDMASTER": 0.013,
      "DIAMOND": 0.073,
      "IRON": 0.204,
      "GOLD": 0.117,
      "NONE": 1,
      "SILVER": 0.145
    },
    "leaderboardThresholds": [
      66814,
      1,
      4131,
      40217,
      1817,
      201078
    ]
  },
  {
    "id": 2023014,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 48,
      "MASTER": 10,
      "PLATINUM": 5,
      "GRANDMASTER": 22,
      "DIAMOND": 7,
      "IRON": 1,
      "GOLD": 4,
      "SILVER": 3
    },
    "translation": {
      "description": "Get wins with the same group of 5 players",
      "name": "Making History As 5: 2023",
      "shortDescription": "Get wins with a premade of 5"
    },
    "reversed": false,
    "queueIds": [
      400,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "MASTER": 0.006,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "SILVER": 0.05,
      "IRON": 0.112,
      "DIAMOND": 0.011,
      "NONE": 1,
      "GOLD": 0.029,
      "PLATINUM": 0.019,
      "BRONZE": 0.079
    },
    "leaderboardThresholds": [
      274,
      1,
      48,
      4553,
      22,
      22757
    ]
  },
  {
    "id": 2023015,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 18,
      "MASTER": 10,
      "PLATINUM": 5,
      "GRANDMASTER": 13,
      "DIAMOND": 7,
      "IRON": 1,
      "GOLD": 4,
      "SILVER": 3
    },
    "translation": {
      "description": "Get First Bloods",
      "name": "In Delightful Agony: 2023",
      "shortDescription": "Get First Bloods"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "5",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.116,
      "BRONZE": 0.179,
      "GOLD": 0.143,
      "IRON": 0.22,
      "GRANDMASTER": 0,
      "SILVER": 0.158,
      "CHALLENGER": 0,
      "MASTER": 0.099,
      "PLATINUM": 0.132
    }
  },
  {
    "id": 2023012,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 716,
      "MASTER": 50,
      "PLATINUM": 20,
      "GRANDMASTER": 229,
      "DIAMOND": 35,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Save an ally who would have otherwise taken lethal damage with a heal or shield",
      "name": "Got Your Back: 2023",
      "shortDescription": "Save an ally with a heal or shield"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.13,
      "MASTER": 0.052,
      "CHALLENGER": 0.003,
      "PLATINUM": 0.084,
      "GRANDMASTER": 0.013,
      "DIAMOND": 0.064,
      "IRON": 0.185,
      "GOLD": 0.094,
      "NONE": 1,
      "SILVER": 0.107
    },
    "leaderboardThresholds": [
      17877,
      1,
      716,
      39466,
      229,
      197322
    ]
  },
  {
    "id": 2023013,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 10,
      "PLATINUM": 5,
      "DIAMOND": 7,
      "IRON": 1,
      "GOLD": 4,
      "SILVER": 3
    },
    "translation": {
      "description": "Play with the same team in different Clash tournaments",
      "name": "All In, Together: 2023",
      "shortDescription": "Play with the same team in Clash tournaments"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "2023000",
      "source": "CLASH",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.033,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.001,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0.004,
      "CHALLENGER": 0,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 302200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 10,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Demolition group",
      "name": "Demolition",
      "shortDescription": "Earn points from challenges in the Demolition group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "302000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "302000",
    "parentCategory": "4",
    "title": "Demolisher",
    "percentiles": {
      "SILVER": 0.132,
      "CHALLENGER": 0,
      "DIAMOND": 0.005,
      "MASTER": 0,
      "PLATINUM": 0.024,
      "GRANDMASTER": 0,
      "GOLD": 0.056,
      "BRONZE": 0.202,
      "IRON": 0.245,
      "NONE": 1
    }
  },
  {
    "id": 2023010,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 162,
      "MASTER": 20,
      "PLATINUM": 12,
      "GRANDMASTER": 65,
      "DIAMOND": 15,
      "IRON": 1,
      "GOLD": 9,
      "SILVER": 6
    },
    "translation": {
      "description": "Get 12 or more assists without dying",
      "name": "Trust Nothing But Me: 2023",
      "shortDescription": "Get an assist streak of 12+ without dying"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.1,
      "MASTER": 0.029,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.044,
      "GRANDMASTER": 0.007,
      "DIAMOND": 0.037,
      "IRON": 0.155,
      "GOLD": 0.054,
      "NONE": 1,
      "SILVER": 0.07
    },
    "leaderboardThresholds": [
      1415,
      1,
      162,
      21878,
      65,
      109386
    ]
  },
  {
    "id": 302201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 600,
      "MASTER": 400,
      "PLATINUM": 105,
      "GRANDMASTER": 500,
      "DIAMOND": 225,
      "IRON": 1,
      "GOLD": 35,
      "SILVER": 20
    },
    "translation": {
      "description": "Participate in taking 2 turrets with the same Rift Herald",
      "name": "Go Shelly Go!",
      "shortDescription": "Take 2 turrets with the same Rift Herald"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302200",
      "source": "EOGD"
    },
    "parent": "302200",
    "parentCategory": "4",
    "percentiles": {
      "SILVER": 0.041,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.001,
      "GRANDMASTER": 0,
      "GOLD": 0.018,
      "BRONZE": 0.115,
      "IRON": 0.224,
      "NONE": 1
    },
    "leaderboardThresholds": [
      722,
      1,
      587,
      2,
      487,
      4
    ]
  },
  {
    "id": 2023011,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 6,
      "MASTER": 1,
      "GRANDMASTER": 2
    },
    "translation": {
      "description": "Destroy the first turret in under 10 minutes",
      "name": "First To Fall: 2023",
      "shortDescription": "Destroy the first turret in under 10 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0,
      "IRON": 0,
      "GRANDMASTER": 0.018,
      "SILVER": 0,
      "CHALLENGER": 0.004,
      "MASTER": 0.073,
      "PLATINUM": 0
    },
    "leaderboardThresholds": [
      248,
      1,
      6,
      55757,
      2,
      278780
    ]
  },
  {
    "id": 302202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 450,
      "MASTER": 150,
      "PLATINUM": 45,
      "GRANDMASTER": 264,
      "DIAMOND": 90,
      "IRON": 1,
      "GOLD": 20,
      "SILVER": 7
    },
    "translation": {
      "description": "Destroy turrets before Turret Plates fall.",
      "name": "Shattered Plates",
      "shortDescription": "Destroy turrets before plates fall"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302200",
      "source": "EOGD"
    },
    "parent": "302200",
    "parentCategory": "4",
    "title": "Lumberjack",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.025,
      "BRONZE": 0.218,
      "GOLD": 0.098,
      "IRON": 0.294,
      "GRANDMASTER": 0.003,
      "SILVER": 0.162,
      "CHALLENGER": 0,
      "MASTER": 0.011,
      "PLATINUM": 0.055
    },
    "leaderboardThresholds": [
      3670,
      1,
      449,
      6827,
      264,
      40561
    ]
  },
  {
    "id": 2023008,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 182,
      "MASTER": 15,
      "PLATINUM": 9,
      "GRANDMASTER": 81,
      "DIAMOND": 12,
      "IRON": 1,
      "GOLD": 6,
      "SILVER": 3
    },
    "translation": {
      "description": "Earn a three or more level lead over your role opponent at any point in the game",
      "name": "Rise Above the Rest: 2023",
      "shortDescription": "Be up more levels than role opponent at any point"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "GOLD": 0.147,
      "NONE": 1,
      "BRONZE": 0.203,
      "MASTER": 0.103,
      "CHALLENGER": 0.005,
      "IRON": 0.241,
      "PLATINUM": 0.127,
      "DIAMOND": 0.114,
      "GRANDMASTER": 0.026,
      "SILVER": 0.182
    },
    "leaderboardThresholds": [
      1391,
      1,
      182,
      78678,
      81,
      393384
    ]
  },
  {
    "id": 302203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 226,
      "MASTER": 120,
      "PLATINUM": 40,
      "GRANDMASTER": 168,
      "DIAMOND": 70,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Destroy the first turret in under 10 minutes",
      "name": "Ten Minute Turret",
      "shortDescription": "Destroy the first turret in under 10 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302200",
      "source": "EOGD"
    },
    "parent": "302200",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0.1,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.01,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0.046,
      "CHALLENGER": 0,
      "GOLD": 0.002,
      "DIAMOND": 0
    },
    "leaderboardThresholds": [
      288,
      1,
      226,
      3,
      168,
      8
    ]
  },
  {
    "id": 2023009,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 1
    },
    "translation": {
      "description": "Win games after being down 15 kills",
      "name": "Made My Mark: 2023",
      "shortDescription": "Win after being down 15 kills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2023000",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2023000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.128,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 203403,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 135,
      "MASTER": 25,
      "PLATINUM": 9,
      "GRANDMASTER": 61,
      "DIAMOND": 15,
      "GOLD": 4,
      "SILVER": 1
    },
    "translation": {
      "description": "As jungler, get 70 CS from jungle monsters before 10 minutes",
      "name": "Clean Clears",
      "shortDescription": "Get 70 CS from jungle monsters before 10 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "PLATINUM": 0.011,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.007,
      "IRON": 0,
      "GOLD": 0.023,
      "NONE": 1,
      "SILVER": 0.059
    },
    "leaderboardThresholds": [
      1359,
      1,
      135,
      2676,
      61,
      13375
    ]
  },
  {
    "id": 101000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 85,
      "MASTER": 1850,
      "PLATINUM": 590,
      "DIAMOND": 1075,
      "IRON": 40,
      "GOLD": 360,
      "SILVER": 140
    },
    "translation": {
      "description": "Earn points from challenges in the ARAM Warrior, ARAM Finesse, and ARAM Champion groups",
      "name": "ARAM Authority",
      "shortDescription": "Earn points from challenges in the ARAM Warrior, ARAM Finesse, and ARAM Champion groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "1",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "1",
    "parentCategory": "0",
    "title": "ARAM God",
    "percentiles": {
      "BRONZE": 0.172,
      "MASTER": 0.004,
      "CHALLENGER": 0,
      "PLATINUM": 0.066,
      "GRANDMASTER": 0,
      "DIAMOND": 0.026,
      "IRON": 0.201,
      "GOLD": 0.102,
      "NONE": 1,
      "SILVER": 0.149
    }
  },
  {
    "id": 203402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 16,
      "CHALLENGER": 2866,
      "MASTER": 1200,
      "PLATINUM": 360,
      "GRANDMASTER": 1853,
      "DIAMOND": 600,
      "IRON": 4,
      "GOLD": 120,
      "SILVER": 40
    },
    "translation": {
      "description": "Take buff jungle monsters from the enemy jungle",
      "name": "Buff Burglar",
      "shortDescription": "Take enemy buffs"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.218,
      "GRANDMASTER": 0,
      "MASTER": 0.001,
      "SILVER": 0.1,
      "NONE": 1,
      "PLATINUM": 0.013,
      "BRONZE": 0.146,
      "CHALLENGER": 0,
      "GOLD": 0.049,
      "DIAMOND": 0.005
    },
    "leaderboardThresholds": [
      15170,
      1,
      2866,
      616,
      1853,
      3075
    ]
  },
  {
    "id": 203401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 703,
      "MASTER": 300,
      "PLATINUM": 75,
      "GRANDMASTER": 452,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "Assist in taking the first dragon before 8 minutes",
      "name": "Dragon On Too Long",
      "shortDescription": "Take down first dragon before eight minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "SILVER": 0.117,
      "CHALLENGER": 0,
      "DIAMOND": 0.006,
      "MASTER": 0.001,
      "PLATINUM": 0.022,
      "GRANDMASTER": 0,
      "GOLD": 0.071,
      "BRONZE": 0.153,
      "IRON": 0.25,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3139,
      1,
      703,
      639,
      452,
      3190
    ]
  },
  {
    "id": 203400,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 30,
      "MASTER": 725,
      "PLATINUM": 240,
      "DIAMOND": 430,
      "IRON": 15,
      "GOLD": 150,
      "SILVER": 55
    },
    "translation": {
      "description": "Earn points from challenges in the Predator group",
      "name": "Predator",
      "shortDescription": "Earn points from challenges in the Predator group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "203000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "203000",
    "parentCategory": "2",
    "title": "Predator",
    "percentiles": {
      "IRON": 0.21,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.12,
      "NONE": 1,
      "PLATINUM": 0.017,
      "BRONZE": 0.167,
      "CHALLENGER": 0,
      "GOLD": 0.041,
      "DIAMOND": 0.003
    }
  },
  {
    "id": 203407,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 28,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 13,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As jungler, at 10 minutes, take more of the opponent's jungle than they have",
      "name": "It's My Jungle Now",
      "shortDescription": "Take more of the opponent's jungle than them"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0.001,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.007,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.041,
      "DIAMOND": 0.003
    },
    "leaderboardThresholds": [
      416,
      1,
      27,
      418,
      13,
      4095
    ]
  },
  {
    "id": 203406,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 8,
      "CHALLENGER": 832,
      "MASTER": 328,
      "PLATINUM": 98,
      "GRANDMASTER": 537,
      "DIAMOND": 208,
      "IRON": 3,
      "GOLD": 38,
      "SILVER": 18
    },
    "translation": {
      "description": "Secure Epic Monsters with the enemy jungler nearby. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Target Secured",
      "shortDescription": "Secure Epic Monsters with the enemy jungler nearby"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0.134,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "PLATINUM": 0.023,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.007,
      "IRON": 0.185,
      "GOLD": 0.059,
      "NONE": 1,
      "SILVER": 0.094
    },
    "leaderboardThresholds": [
      4494,
      1,
      832,
      2023,
      537,
      10108
    ]
  },
  {
    "id": 203405,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 4,
      "CHALLENGER": 575,
      "MASTER": 250,
      "PLATINUM": 75,
      "GRANDMASTER": 381,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "As jungler, take both of the initial two scuttle crab spawns",
      "name": "Crab Wrangler",
      "shortDescription": "Take both of the first scuttle crab spawns"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "title": "Crab Wrangler",
    "percentiles": {
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.064,
      "IRON": 0.172,
      "DIAMOND": 0.003,
      "NONE": 1,
      "GOLD": 0.033,
      "PLATINUM": 0.01,
      "BRONZE": 0.1
    },
    "leaderboardThresholds": [
      2375,
      1,
      575,
      552,
      381,
      2753
    ]
  },
  {
    "id": 203404,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 353,
      "MASTER": 100,
      "PLATINUM": 25,
      "GRANDMASTER": 190,
      "DIAMOND": 60,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "As jungler, take three of the first four buff camps",
      "name": "Three Buffed",
      "shortDescription": "Take 3 of the first 4 buff camps"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "SILVER": 0.053,
      "CHALLENGER": 0,
      "DIAMOND": 0.003,
      "MASTER": 0.001,
      "PLATINUM": 0.011,
      "GRANDMASTER": 0,
      "GOLD": 0.03,
      "BRONZE": 0.095,
      "IRON": 0.137,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1852,
      1,
      353,
      958,
      190,
      4784
    ]
  },
  {
    "id": 301204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 1
    },
    "translation": {
      "description": "Win a game despite an AFK teammate",
      "name": "Who Needs 'Em",
      "shortDescription": "Win a game despite an AFK teammate"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301200",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.194,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 301205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 18,
      "PLATINUM": 5,
      "DIAMOND": 12,
      "GOLD": 3,
      "SILVER": 1
    },
    "translation": {
      "description": "Take Elder Dragons while your opponent has the Dragon Soul",
      "name": "No Loyalty Among Dragons",
      "shortDescription": "Take Elder Dragons when enemy has the Dragon Soul"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301200",
    "parentCategory": "4",
    "title": "Incendiary",
    "percentiles": {
      "GOLD": 0.101,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0.012,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0.071,
      "DIAMOND": 0.026,
      "GRANDMASTER": 0,
      "SILVER": 0.171
    }
  },
  {
    "id": 203409,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 6,
      "PLATINUM": 2,
      "DIAMOND": 3,
      "GOLD": 1
    },
    "translation": {
      "description": "Steal two Epic Monsters in one game. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Epic Steal",
      "shortDescription": "Steal two Epic Monsters in one game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "203400",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0.009,
      "NONE": 1,
      "GOLD": 0.041,
      "PLATINUM": 0.016,
      "BRONZE": 0
    }
  },
  {
    "id": 203408,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 336,
      "MASTER": 120,
      "PLATINUM": 35,
      "GRANDMASTER": 203,
      "DIAMOND": 70,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 5
    },
    "translation": {
      "description": "As jungler, get kills on the enemy jungler in their own jungle before 10 minutes",
      "name": "The Most Dangerous Game",
      "shortDescription": "As jungler, kill the enemy jungler in their jungle before 10 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203400",
      "source": "EOGD"
    },
    "parent": "203400",
    "parentCategory": "2",
    "title": "Invader",
    "percentiles": {
      "BRONZE": 0.102,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "PLATINUM": 0.009,
      "GRANDMASTER": 0,
      "DIAMOND": 0.003,
      "IRON": 0.138,
      "GOLD": 0.026,
      "NONE": 1,
      "SILVER": 0.062
    },
    "leaderboardThresholds": [
      2238,
      1,
      336,
      674,
      203,
      3364
    ]
  },
  {
    "id": 301200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 350,
      "PLATINUM": 135,
      "DIAMOND": 220,
      "GOLD": 65,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Steadfast group",
      "name": "Steadfast",
      "shortDescription": "Earn points from challenges in the Steadfast group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "301000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301000",
    "parentCategory": "4",
    "title": "Courageous",
    "percentiles": {
      "IRON": 0.001,
      "GRANDMASTER": 0,
      "MASTER": 0.017,
      "SILVER": 0.259,
      "NONE": 1,
      "PLATINUM": 0.111,
      "BRONZE": 0.3,
      "CHALLENGER": 0,
      "GOLD": 0.184,
      "DIAMOND": 0.062
    }
  },
  {
    "id": 301201,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 7,
      "PLATINUM": 2,
      "DIAMOND": 4,
      "GOLD": 1
    },
    "translation": {
      "description": "Win games with an open nexus",
      "name": "Open Victory",
      "shortDescription": "Win with an open nexus"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301200",
    "parentCategory": "4",
    "title": "Comeback Kid",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.085,
      "BRONZE": 0,
      "GOLD": 0.184,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0.054,
      "PLATINUM": 0.129
    }
  },
  {
    "id": 301202,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 1,
      "MASTER": 75,
      "PLATINUM": 15,
      "DIAMOND": 45,
      "GOLD": 7,
      "SILVER": 3
    },
    "translation": {
      "description": "Win games after losing an inhibitor",
      "name": "Uninhibited",
      "shortDescription": "Win after losing an inhibitor"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301200",
    "parentCategory": "4",
    "title": "Uninhibited",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.035,
      "BRONZE": 0.271,
      "GOLD": 0.136,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.187,
      "CHALLENGER": 0,
      "MASTER": 0.014,
      "PLATINUM": 0.093
    }
  },
  {
    "id": 301203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 12,
      "PLATINUM": 4,
      "DIAMOND": 8,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Win games after being down 15 kills",
      "name": "Comeback Kids",
      "shortDescription": "Win after being down 15 kills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301200",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301200",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.019,
      "CHALLENGER": 0,
      "PLATINUM": 0.071,
      "GRANDMASTER": 0,
      "DIAMOND": 0.035,
      "IRON": 0,
      "GOLD": 0.116,
      "NONE": 1,
      "SILVER": 0.174
    }
  },
  {
    "id": 2022020,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 70,
      "MASTER": 50,
      "PLATINUM": 25,
      "GRANDMASTER": 60,
      "DIAMOND": 40,
      "IRON": 3,
      "GOLD": 15,
      "SILVER": 8
    },
    "translation": {
      "description": "Win Clash brackets",
      "name": "Clash Champion: 2022",
      "shortDescription": "Win Clash brackets"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "CLASH"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    },
    "leaderboardThresholds": [
      0,
      0,
      0,
      1,
      0,
      2
    ]
  },
  {
    "id": 2022018,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 53,
      "MASTER": 7,
      "PLATINUM": 5,
      "GRANDMASTER": 27,
      "DIAMOND": 6,
      "IRON": 1,
      "GOLD": 4,
      "SILVER": 3
    },
    "translation": {
      "description": "Claim Dragon Souls without the enemy team taking a single dragon on Summoner's Rift.",
      "name": "Soul Sweep: 2022",
      "shortDescription": "Claim a Dragon Soul 4-0"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.128,
      "MASTER": 0.074,
      "PLATINUM": 0.088,
      "CHALLENGER": 0.004,
      "DIAMOND": 0.081,
      "IRON": 0.162,
      "GRANDMASTER": 0.019,
      "GOLD": 0.098,
      "NONE": 1,
      "SILVER": 0.11
    },
    "leaderboardThresholds": [
      600,
      1,
      53,
      56873,
      27,
      284357
    ]
  },
  {
    "id": 2022019,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 237,
      "MASTER": 100,
      "PLATINUM": 60,
      "GRANDMASTER": 159,
      "DIAMOND": 80,
      "IRON": 5,
      "GOLD": 40,
      "SILVER": 20
    },
    "translation": {
      "description": "Get wins with a premade party of two in a ranked queue",
      "name": "Power Pair: 2022",
      "shortDescription": "Win with a premade party of two in a ranked queue"
    },
    "reversed": false,
    "queueIds": [
      420,
      422,
      440,
      442
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.004,
      "BRONZE": 0.041,
      "GOLD": 0.012,
      "IRON": 0.058,
      "GRANDMASTER": 0.001,
      "SILVER": 0.025,
      "CHALLENGER": 0,
      "MASTER": 0.002,
      "PLATINUM": 0.007
    },
    "leaderboardThresholds": [
      896,
      1,
      237,
      1777,
      159,
      8881
    ]
  },
  {
    "id": 2022016,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 9,
      "MASTER": 3,
      "PLATINUM": 1,
      "GRANDMASTER": 5,
      "DIAMOND": 2
    },
    "translation": {
      "description": "Get Pentakills on Summoner's Rift",
      "name": "PENTAKIIIIIIIIL!!: 2022",
      "shortDescription": "Get a Pentakill"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.001,
      "MASTER": 0.005,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.032,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0,
      "DIAMOND": 0.011
    },
    "leaderboardThresholds": [
      2939,
      1,
      9,
      3987,
      5,
      19930
    ]
  },
  {
    "id": 2022017,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 8,
      "CHALLENGER": 234,
      "MASTER": 90,
      "PLATINUM": 40,
      "GRANDMASTER": 149,
      "DIAMOND": 60,
      "IRON": 3,
      "GOLD": 25,
      "SILVER": 15
    },
    "translation": {
      "description": "Get 12 or more assists without dying on Summoner's Rift.",
      "name": "Leading by Example: 2022",
      "shortDescription": "Get an assist streak of 12+ without dying"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2022000",
      "seasonal": "true",
      "source": "EOGD"
    },
    "parent": "2022000",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.002,
      "BRONZE": 0.032,
      "GOLD": 0.01,
      "IRON": 0.065,
      "GRANDMASTER": 0,
      "SILVER": 0.018,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.005
    },
    "leaderboardThresholds": [
      1351,
      1,
      234,
      780,
      149,
      3895
    ]
  },
  {
    "id": 505007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 40,
      "PLATINUM": 20,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Obtain tank champions",
      "name": "Invulnerable",
      "shortDescription": "Obtain tank champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[?('tank' in @.classes)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.125,
      "BRONZE": 0.403,
      "GOLD": 0.263,
      "IRON": 0.523,
      "GRANDMASTER": 0,
      "SILVER": 0.358,
      "CHALLENGER": 0,
      "MASTER": 0.087,
      "PLATINUM": 0.168
    }
  },
  {
    "id": 505006,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 30,
      "PLATINUM": 15,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Obtain support champions",
      "name": "Inspiring",
      "shortDescription": "Obtain support champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[?('support' in @.classes)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "GOLD": 0.216,
      "NONE": 1,
      "BRONZE": 0.398,
      "MASTER": 0.093,
      "CHALLENGER": 0,
      "IRON": 0.529,
      "PLATINUM": 0.171,
      "DIAMOND": 0.141,
      "GRANDMASTER": 0,
      "SILVER": 0.322
    }
  },
  {
    "id": 505005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 30,
      "PLATINUM": 15,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Obtain marksman champions",
      "name": "Ingenious",
      "shortDescription": "Obtain marksman champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[?('marksman' in @.classes)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.129,
      "BRONZE": 0.414,
      "GOLD": 0.214,
      "IRON": 0.571,
      "GRANDMASTER": 0,
      "SILVER": 0.329,
      "CHALLENGER": 0,
      "MASTER": 0.063,
      "PLATINUM": 0.164
    }
  },
  {
    "id": 505004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 65,
      "PLATINUM": 25,
      "DIAMOND": 45,
      "IRON": 1,
      "GOLD": 18,
      "SILVER": 12
    },
    "translation": {
      "description": "Obtain mage champions",
      "name": "Incandescent",
      "shortDescription": "Obtain mage champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[?('mage' in @.classes)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "IRON": 0.564,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.252,
      "NONE": 1,
      "PLATINUM": 0.17,
      "BRONZE": 0.387,
      "CHALLENGER": 0,
      "GOLD": 0.202,
      "DIAMOND": 0.109
    }
  },
  {
    "id": 505003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 70,
      "PLATINUM": 30,
      "DIAMOND": 50,
      "IRON": 1,
      "GOLD": 20,
      "SILVER": 12
    },
    "translation": {
      "description": "Obtain fighter champions",
      "name": "Indomitable",
      "shortDescription": "Obtain fighter champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[?('fighter' in @.classes)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.115,
      "BRONZE": 0.41,
      "GOLD": 0.219,
      "IRON": 0.589,
      "GRANDMASTER": 0,
      "SILVER": 0.305,
      "CHALLENGER": 0,
      "MASTER": 0.061,
      "PLATINUM": 0.171
    }
  },
  {
    "id": 505002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 45,
      "PLATINUM": 25,
      "DIAMOND": 35,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Obtain assassin champions",
      "name": "Invisible",
      "shortDescription": "Obtain assassin champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[?('assassin' in @.classes)].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "GOLD": 0.193,
      "NONE": 1,
      "BRONZE": 0.347,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.548,
      "PLATINUM": 0.139,
      "DIAMOND": 0.095,
      "GRANDMASTER": 0,
      "SILVER": 0.242
    }
  },
  {
    "id": 505001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 150,
      "PLATINUM": 100,
      "DIAMOND": 125,
      "IRON": 5,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Obtain champions",
      "name": "Spice of Life",
      "shortDescription": "Obtain champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "505000",
      "championQuery": "$[*].id",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "505000",
    "parentCategory": "5",
    "percentiles": {
      "MASTER": 0.075,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.202,
      "IRON": 0.489,
      "DIAMOND": 0.101,
      "NONE": 1,
      "GOLD": 0.16,
      "PLATINUM": 0.129,
      "BRONZE": 0.309
    }
  },
  {
    "id": 505000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 35,
      "MASTER": 550,
      "PLATINUM": 185,
      "DIAMOND": 340,
      "IRON": 20,
      "GOLD": 115,
      "SILVER": 55
    },
    "translation": {
      "description": "Earn points from challenges in the Champion group",
      "name": "Champion",
      "shortDescription": "Earn points from challenges in the Champion group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "5",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "5",
    "parentCategory": "0",
    "title": "Collector",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.119,
      "BRONZE": 0.465,
      "GOLD": 0.233,
      "IRON": 0.521,
      "GRANDMASTER": 0,
      "SILVER": 0.396,
      "CHALLENGER": 0,
      "MASTER": 0.065,
      "PLATINUM": 0.178
    }
  },
  {
    "id": 402102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 5000,
      "MASTER": 1000,
      "PLATINUM": 300,
      "GRANDMASTER": 2500,
      "DIAMOND": 600,
      "IRON": 10,
      "GOLD": 150,
      "SILVER": 60
    },
    "translation": {
      "description": "Play Games on Summoner's Rift. Blind Pick, Draft and Ranked Modes count.",
      "name": "Master of the Rift",
      "shortDescription": "Play Summoner's Rift Games"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "MASTER": 0.019,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "SILVER": 0.168,
      "IRON": 0.274,
      "DIAMOND": 0.042,
      "NONE": 1,
      "GOLD": 0.117,
      "PLATINUM": 0.079,
      "BRONZE": 0.207
    },
    "leaderboardThresholds": [
      10262,
      1,
      4998,
      229,
      2499,
      14892
    ]
  },
  {
    "id": 402103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 295,
      "MASTER": 125,
      "PLATINUM": 25,
      "GRANDMASTER": 197,
      "DIAMOND": 65,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Become Legendary (8-0 kill streak)",
      "name": "Legendary Legend",
      "shortDescription": "Become Legendary"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.016,
      "BRONZE": 0.235,
      "GOLD": 0.097,
      "IRON": 0,
      "GRANDMASTER": 0.001,
      "SILVER": 0.135,
      "CHALLENGER": 0,
      "MASTER": 0.004,
      "PLATINUM": 0.051
    },
    "leaderboardThresholds": [
      1489,
      1,
      295,
      3240,
      197,
      16194
    ]
  },
  {
    "id": 402100,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 40,
      "CHALLENGER": 900,
      "MASTER": 725,
      "PLATINUM": 240,
      "GRANDMASTER": 825,
      "DIAMOND": 430,
      "IRON": 20,
      "GOLD": 150,
      "SILVER": 60
    },
    "translation": {
      "description": "Earn points from challenges in the Executioner group",
      "name": "Executioner",
      "shortDescription": "Earn points from challenges in the Executioner group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "402000",
      "isCapstone": "Y",
      "source": "CHALLENGES"
    },
    "parent": "402000",
    "parentCategory": "3",
    "title": "Executioner",
    "percentiles": {
      "MASTER": 0.006,
      "GRANDMASTER": 0.002,
      "CHALLENGER": 0,
      "SILVER": 0.206,
      "IRON": 0.288,
      "DIAMOND": 0.028,
      "NONE": 1,
      "GOLD": 0.118,
      "PLATINUM": 0.073,
      "BRONZE": 0.24
    },
    "leaderboardThresholds": [
      900,
      1,
      900,
      4578,
      825,
      22882
    ]
  },
  {
    "id": 2024108,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 40,
      "MASTER": 22,
      "PLATINUM": 11,
      "GRANDMASTER": 30,
      "DIAMOND": 16,
      "IRON": 1,
      "GOLD": 7,
      "SILVER": 4
    },
    "translation": {
      "description": "Kill Epic Monsters within 30 seconds of them spawning. Epic Monsters include Dragons, Voidgrubs, the Rift Herald, and Baron Nashor.",
      "name": "Always On Time: 2024 Split 1",
      "shortDescription": "Kill Epic Monsters within 30 seconds of spawn"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      490
    ],
    "tags": {
      "parent": "2024100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "SILVER": 0.019,
      "CHALLENGER": 0,
      "DIAMOND": 0.003,
      "MASTER": 0.001,
      "PLATINUM": 0.005,
      "GRANDMASTER": 0,
      "GOLD": 0.01,
      "BRONZE": 0.035,
      "IRON": 0.055,
      "NONE": 1
    }
  },
  {
    "id": 402101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 15,
      "CHALLENGER": 1500,
      "MASTER": 500,
      "PLATINUM": 150,
      "GRANDMASTER": 1000,
      "DIAMOND": 300,
      "IRON": 3,
      "GOLD": 75,
      "SILVER": 30
    },
    "translation": {
      "description": "Win games of Ranked Solo/Duo or Ranked Flex",
      "name": "Movin' On Up",
      "shortDescription": "Win ranked games in Solo/Duo or Flex queue"
    },
    "reversed": false,
    "queueIds": [
      420,
      440,
      422,
      442
    ],
    "tags": {
      "parent": "402100",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "BRONZE": 0.134,
      "MASTER": 0.008,
      "PLATINUM": 0.043,
      "CHALLENGER": 0,
      "DIAMOND": 0.02,
      "IRON": 0.188,
      "GRANDMASTER": 0.001,
      "GOLD": 0.07,
      "NONE": 1,
      "SILVER": 0.108
    },
    "leaderboardThresholds": [
      5161,
      1,
      1499,
      2420,
      999,
      15527
    ]
  },
  {
    "id": 2024106,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 90,
      "MASTER": 45,
      "PLATINUM": 20,
      "GRANDMASTER": 65,
      "DIAMOND": 30,
      "IRON": 2,
      "GOLD": 14,
      "SILVER": 9
    },
    "translation": {
      "description": "Takedown Barons",
      "name": "Wurm Fishing: 2024 Split 1",
      "shortDescription": "Takedown Barons"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2024100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.008,
      "BRONZE": 0.059,
      "GOLD": 0.028,
      "IRON": 0.084,
      "GRANDMASTER": 0,
      "SILVER": 0.041,
      "CHALLENGER": 0,
      "MASTER": 0.003,
      "PLATINUM": 0.017
    }
  },
  {
    "id": 2024107,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 3,
      "PLATINUM": 1,
      "DIAMOND": 2
    },
    "translation": {
      "description": "Recall while unseen by a nearby enemy champion",
      "name": "Right Under Their Noses: 2024 Split 1",
      "shortDescription": "Recall while unseen by a nearby champion"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2024100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.002,
      "PLATINUM": 0.023,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 2024104,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 100,
      "MASTER": 55,
      "PLATINUM": 25,
      "GRANDMASTER": 75,
      "DIAMOND": 40,
      "IRON": 2,
      "GOLD": 15,
      "SILVER": 9
    },
    "translation": {
      "description": "End the game with 20% more vision score than your role opponent ",
      "name": "The Brush Has Eyes: 2024 Split 1",
      "shortDescription": "End the game with 20% more vision score than your role opponent"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2024100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.087,
      "GRANDMASTER": 0,
      "MASTER": 0.002,
      "SILVER": 0.044,
      "NONE": 1,
      "PLATINUM": 0.014,
      "BRONZE": 0.062,
      "CHALLENGER": 0,
      "GOLD": 0.028,
      "DIAMOND": 0.005
    }
  },
  {
    "id": 2024105,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 50,
      "MASTER": 25,
      "PLATINUM": 12,
      "GRANDMASTER": 35,
      "DIAMOND": 18,
      "IRON": 1,
      "GOLD": 7,
      "SILVER": 4
    },
    "translation": {
      "description": "Earn an S- grade or higher on different champions in ARAM",
      "name": "All Random All Champs: 2024 Split 1",
      "shortDescription": "Earn an S- grade on different champions "
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "2024100",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.024,
      "IRON": 0.057,
      "DIAMOND": 0.001,
      "NONE": 1,
      "GOLD": 0.012,
      "PLATINUM": 0.005,
      "BRONZE": 0.04
    }
  },
  {
    "id": 2024102,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 100,
      "MASTER": 55,
      "PLATINUM": 25,
      "GRANDMASTER": 75,
      "DIAMOND": 40,
      "IRON": 2,
      "GOLD": 15,
      "SILVER": 9
    },
    "translation": {
      "description": "Fully complete a support item quest (1000g) in less than 14 minutes",
      "name": "Support Subsidy: 2024 Split 1",
      "shortDescription": "Fully complete your support quest within 14 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2024100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.002,
      "BRONZE": 0.022,
      "GOLD": 0.008,
      "IRON": 0.038,
      "GRANDMASTER": 0,
      "SILVER": 0.014,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.004
    }
  },
  {
    "id": 2024103,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 90,
      "MASTER": 40,
      "PLATINUM": 15,
      "GRANDMASTER": 60,
      "DIAMOND": 25,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 6
    },
    "translation": {
      "description": "As jungler, take both of the initial two scuttle crab spawns",
      "name": "Crab Wrangler: 2024 Split 1",
      "shortDescription": "Take both of the first scuttle crab spawns"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "2024100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.015,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.001,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0.036,
      "GOLD": 0.003,
      "NONE": 1,
      "SILVER": 0.007
    }
  },
  {
    "id": 402108,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 200,
      "CHALLENGER": 35000,
      "MASTER": 15000,
      "PLATINUM": 3500,
      "GRANDMASTER": 21154,
      "DIAMOND": 6750,
      "IRON": 50,
      "GOLD": 1250,
      "SILVER": 500
    },
    "translation": {
      "description": "Get Assists",
      "name": "Above-Average Assistance",
      "shortDescription": "Get Assists"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "priority": ".1",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "IRON": 0.281,
      "GRANDMASTER": 0.001,
      "MASTER": 0.003,
      "SILVER": 0.157,
      "NONE": 1,
      "PLATINUM": 0.056,
      "BRONZE": 0.205,
      "CHALLENGER": 0,
      "GOLD": 0.109,
      "DIAMOND": 0.025
    },
    "leaderboardThresholds": [
      114233,
      1,
      34997,
      904,
      21154,
      12443
    ]
  },
  {
    "id": 2024100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 40,
      "MASTER": 650,
      "PLATINUM": 215,
      "DIAMOND": 380,
      "IRON": 20,
      "GOLD": 135,
      "SILVER": 60
    },
    "translation": {
      "description": "Earn points from challenges in the 2024 Seasonal: Split 1 group",
      "name": "2024 Seasonal: Split 1",
      "shortDescription": "Earn points from challenges in the 2024 Seasonal: Split 1 group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "season": "15",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "title": "Voidborn",
    "percentiles": {
      "BRONZE": 0.067,
      "MASTER": 0,
      "PLATINUM": 0.007,
      "CHALLENGER": 0,
      "DIAMOND": 0.001,
      "IRON": 0.092,
      "GRANDMASTER": 0,
      "GOLD": 0.02,
      "NONE": 1,
      "SILVER": 0.051
    }
  },
  {
    "id": 402109,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 150,
      "PLATINUM": 40,
      "DIAMOND": 75,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 7
    },
    "translation": {
      "description": "Get First Bloods",
      "name": "Bloodcrazed",
      "shortDescription": "Get First Bloods"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "priority": "5",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "402100",
    "parentCategory": "3",
    "title": "Bloodthirsty",
    "percentiles": {
      "GOLD": 0.113,
      "NONE": 1,
      "BRONZE": 0.207,
      "MASTER": 0.009,
      "CHALLENGER": 0,
      "IRON": 0.286,
      "PLATINUM": 0.061,
      "DIAMOND": 0.031,
      "GRANDMASTER": 0,
      "SILVER": 0.156
    }
  },
  {
    "id": 2024101,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 7,
      "MASTER": 85,
      "PLATINUM": 40,
      "DIAMOND": 60,
      "IRON": 3,
      "GOLD": 25,
      "SILVER": 16
    },
    "translation": {
      "description": "Win with different Legendary items",
      "name": "Legendary Arms: 2024 Split 1",
      "shortDescription": "Win Games with different Legendary Items"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490,
      930,
      931,
      1600
    ],
    "tags": {
      "parent": "2024100",
      "itemQuery": "$[?(@.epicness == 'EPICNESS_LEGENDARY' && 'Items/ItemGroups/OrnnItems' nin @.groups && @.id < 220000)].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2024100",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.104,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.048,
      "NONE": 1,
      "PLATINUM": 0.008,
      "BRONZE": 0.081,
      "CHALLENGER": 0,
      "GOLD": 0.027,
      "DIAMOND": 0.001
    }
  },
  {
    "id": 103101,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 1,
      "MASTER": 20,
      "PLATINUM": 5,
      "DIAMOND": 10,
      "GOLD": 3,
      "SILVER": 2
    },
    "translation": {
      "description": "Recall while unseen by a nearby enemy champion",
      "name": "Right Under Their Noses",
      "shortDescription": "Recall while unseen by a nearby champion"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103100",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.019,
      "BRONZE": 0.152,
      "GOLD": 0.075,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.1,
      "CHALLENGER": 0,
      "MASTER": 0.004,
      "PLATINUM": 0.047
    }
  },
  {
    "id": 402106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 16,
      "MASTER": 5,
      "PLATINUM": 2,
      "GRANDMASTER": 9,
      "DIAMOND": 3,
      "GOLD": 1
    },
    "translation": {
      "description": "Get Pentakills",
      "name": "PENTAKIIIIIIIIL!!",
      "shortDescription": "Get Pentakills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "title": "Pentakiller",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.002,
      "MASTER": 0.008,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.032,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.07,
      "DIAMOND": 0.018
    },
    "leaderboardThresholds": [
      2939,
      1,
      16,
      5892,
      9,
      29452
    ]
  },
  {
    "id": 103100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 175,
      "PLATINUM": 65,
      "DIAMOND": 110,
      "IRON": 5,
      "GOLD": 45,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Style group",
      "name": "Style",
      "shortDescription": "Earn points from challenges in the Style group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "103000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103000",
    "parentCategory": "1",
    "title": "Stylish",
    "percentiles": {
      "IRON": 0.25,
      "GRANDMASTER": 0,
      "MASTER": 0.006,
      "SILVER": 0.156,
      "NONE": 1,
      "PLATINUM": 0.067,
      "BRONZE": 0.223,
      "CHALLENGER": 0,
      "GOLD": 0.095,
      "DIAMOND": 0.021
    }
  },
  {
    "id": 402107,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 150,
      "CHALLENGER": 25000,
      "MASTER": 10000,
      "PLATINUM": 2000,
      "GRANDMASTER": 15000,
      "DIAMOND": 5000,
      "IRON": 35,
      "GOLD": 750,
      "SILVER": 350
    },
    "translation": {
      "description": "Get Kills",
      "name": "Hard Day's Killin'",
      "shortDescription": "Get Kills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "priority": ".1",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "MASTER": 0.006,
      "GRANDMASTER": 0.002,
      "CHALLENGER": 0,
      "SILVER": 0.163,
      "IRON": 0.289,
      "DIAMOND": 0.027,
      "NONE": 1,
      "GOLD": 0.122,
      "PLATINUM": 0.07,
      "BRONZE": 0.209
    },
    "leaderboardThresholds": [
      73033,
      1,
      24999,
      1920,
      14999,
      24436
    ]
  },
  {
    "id": 103103,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1
    },
    "translation": {
      "description": "Take down enemy champions in their fountain",
      "name": "Nowhere is Safe",
      "shortDescription": "Take down champions in their fountain"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103100",
    "parentCategory": "1",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0.159
    }
  },
  {
    "id": 402104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 12,
      "CHALLENGER": 2002,
      "MASTER": 720,
      "PLATINUM": 200,
      "GRANDMASTER": 1300,
      "DIAMOND": 400,
      "IRON": 3,
      "GOLD": 80,
      "SILVER": 30
    },
    "translation": {
      "description": "Get killing sprees (3 or more kills without dying)",
      "name": "Killing Spree Spree",
      "shortDescription": "Get killing sprees"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "IRON": 0.297,
      "GRANDMASTER": 0.005,
      "MASTER": 0.018,
      "SILVER": 0.174,
      "NONE": 1,
      "PLATINUM": 0.075,
      "BRONZE": 0.223,
      "CHALLENGER": 0.001,
      "GOLD": 0.122,
      "DIAMOND": 0.042
    },
    "leaderboardThresholds": [
      7749,
      1,
      2002,
      14098,
      1300,
      70485
    ]
  },
  {
    "id": 103102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 231,
      "MASTER": 100,
      "PLATINUM": 30,
      "GRANDMASTER": 157,
      "DIAMOND": 60,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Get takedowns within 5 seconds of gaining a level advantage in the first 10 minutes of a game",
      "name": "Get On My Level",
      "shortDescription": "Get takedowns after gaining an early level advantage"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103100",
      "source": "EOGD"
    },
    "parent": "103100",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.017,
      "BRONZE": 0.177,
      "GOLD": 0.09,
      "IRON": 0.22,
      "GRANDMASTER": 0.002,
      "SILVER": 0.125,
      "CHALLENGER": 0,
      "MASTER": 0.006,
      "PLATINUM": 0.041
    },
    "leaderboardThresholds": [
      970,
      1,
      231,
      4645,
      157,
      23217
    ]
  },
  {
    "id": 402105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 16,
      "CHALLENGER": 2570,
      "MASTER": 960,
      "PLATINUM": 300,
      "GRANDMASTER": 1654,
      "DIAMOND": 540,
      "IRON": 4,
      "GOLD": 120,
      "SILVER": 40
    },
    "translation": {
      "description": "Get Multikills",
      "name": "Multikill Madness",
      "shortDescription": "Get Multikills"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402100",
      "source": "EOGD"
    },
    "parent": "402100",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.029,
      "BRONZE": 0.207,
      "GOLD": 0.1,
      "IRON": 0.279,
      "GRANDMASTER": 0.003,
      "SILVER": 0.158,
      "CHALLENGER": 0.001,
      "MASTER": 0.011,
      "PLATINUM": 0.054
    },
    "leaderboardThresholds": [
      21365,
      1,
      2570,
      8608,
      1654,
      43034
    ]
  },
  {
    "id": 120001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 150,
      "MASTER": 50,
      "PLATINUM": 25,
      "GRANDMASTER": 100,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Win Co-Op vs AI Games",
      "name": "Malfunction",
      "shortDescription": "Win games"
    },
    "reversed": false,
    "queueIds": [
      830,
      840,
      850
    ],
    "tags": {
      "parent": "120000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "120000",
    "parentCategory": "1",
    "percentiles": {
      "GOLD": 0.088,
      "NONE": 1,
      "BRONZE": 0.148,
      "MASTER": 0.059,
      "CHALLENGER": 0,
      "IRON": 0.287,
      "PLATINUM": 0.071,
      "DIAMOND": 0.068,
      "GRANDMASTER": 0,
      "SILVER": 0.11
    }
  },
  {
    "id": 303300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 10,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Synchronicity group",
      "name": "Synchronicity",
      "shortDescription": "Earn points from challenges in the Synchronicity group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "303000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303000",
    "parentCategory": "4",
    "title": "In Sync",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.001,
      "BRONZE": 0.148,
      "GOLD": 0.047,
      "IRON": 0.191,
      "GRANDMASTER": 0,
      "SILVER": 0.095,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.016
    }
  },
  {
    "id": 120000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 30,
      "MASTER": 300,
      "PLATINUM": 120,
      "DIAMOND": 180,
      "IRON": 15,
      "GOLD": 75,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Machine-Hunting Mercenary group",
      "name": "Machine-Hunting Mercenary",
      "shortDescription": "Earn points from challenges in the Machine-Hunting Mercenary group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "1",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "1",
    "parentCategory": "0",
    "title": "Bot Blaster",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.006,
      "BRONZE": 0.101,
      "GOLD": 0.069,
      "IRON": 0.152,
      "GRANDMASTER": 0,
      "SILVER": 0.08,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.059
    }
  },
  {
    "id": 303301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 25,
      "CHALLENGER": 1500,
      "MASTER": 500,
      "PLATINUM": 150,
      "GRANDMASTER": 750,
      "DIAMOND": 300,
      "IRON": 5,
      "GOLD": 100,
      "SILVER": 60
    },
    "translation": {
      "description": "Get wins with a premade party of two in a ranked queue",
      "name": "Power Pair",
      "shortDescription": "Win with a premade party of two in a ranked queue"
    },
    "reversed": false,
    "queueIds": [
      420,
      422,
      440,
      442
    ],
    "tags": {
      "parent": "303300",
      "source": "EOGD"
    },
    "parent": "303300",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0.058,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.008,
      "GRANDMASTER": 0,
      "DIAMOND": 0.002,
      "IRON": 0.112,
      "GOLD": 0.016,
      "NONE": 1,
      "SILVER": 0.029
    },
    "leaderboardThresholds": [
      2326,
      1,
      1488,
      18,
      749,
      636
    ]
  },
  {
    "id": 120003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 150,
      "MASTER": 7500,
      "PLATINUM": 2500,
      "DIAMOND": 5000,
      "IRON": 50,
      "GOLD": 750,
      "SILVER": 300
    },
    "translation": {
      "description": "Get Kills in Co-Op vs AI Games",
      "name": "Robo Recall",
      "shortDescription": "Get kills"
    },
    "reversed": false,
    "queueIds": [
      830,
      840,
      850
    ],
    "tags": {
      "parent": "120000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "120000",
    "parentCategory": "1",
    "percentiles": {
      "BRONZE": 0.089,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "PLATINUM": 0.01,
      "GRANDMASTER": 0,
      "DIAMOND": 0.002,
      "IRON": 0.144,
      "GOLD": 0.046,
      "NONE": 1,
      "SILVER": 0.069
    }
  },
  {
    "id": 303302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 500,
      "MASTER": 250,
      "PLATINUM": 65,
      "GRANDMASTER": 350,
      "DIAMOND": 125,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 12
    },
    "translation": {
      "description": "Get wins with the same group of 5 players",
      "name": "Best Friends Forever",
      "shortDescription": "Get wins with a premade of 5"
    },
    "reversed": false,
    "queueIds": [
      400,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303300",
      "source": "EOGD"
    },
    "parent": "303300",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0.149,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.007,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0.028,
      "CHALLENGER": 0,
      "GOLD": 0.002,
      "DIAMOND": 0
    },
    "leaderboardThresholds": [
      0,
      0,
      387,
      1,
      340,
      6
    ]
  },
  {
    "id": 120002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 100,
      "PLATINUM": 30,
      "DIAMOND": 75,
      "IRON": 3,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Win a Co-Op vs AI game with different champions",
      "name": "Protean Override",
      "shortDescription": "Win games with different champions"
    },
    "reversed": false,
    "queueIds": [
      830,
      840,
      850
    ],
    "tags": {
      "parent": "120000",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "120000",
    "parentCategory": "1",
    "percentiles": {
      "GOLD": 0.041,
      "NONE": 1,
      "BRONZE": 0.107,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "IRON": 0.161,
      "PLATINUM": 0.015,
      "DIAMOND": 0.002,
      "GRANDMASTER": 0,
      "SILVER": 0.058
    }
  },
  {
    "id": 303303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 25,
      "CHALLENGER": 2248,
      "MASTER": 1200,
      "PLATINUM": 250,
      "GRANDMASTER": 1672,
      "DIAMOND": 600,
      "IRON": 5,
      "GOLD": 135,
      "SILVER": 75
    },
    "translation": {
      "description": "Play games with a premade group of any size",
      "name": "Fun with Friends",
      "shortDescription": "Play games with a group"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303300",
      "source": "EOGD"
    },
    "parent": "303300",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.017,
      "BRONZE": 0.156,
      "GOLD": 0.077,
      "IRON": 0.237,
      "GRANDMASTER": 0.001,
      "SILVER": 0.103,
      "CHALLENGER": 0,
      "MASTER": 0.003,
      "PLATINUM": 0.05
    },
    "leaderboardThresholds": [
      5890,
      1,
      2248,
      2249,
      1672,
      11237
    ]
  },
  {
    "id": 504004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 275,
      "PLATINUM": 80,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 40,
      "SILVER": 10
    },
    "translation": {
      "description": "Obtain emotes",
      "name": "Emotive",
      "shortDescription": "Obtain emotes"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "504000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "504000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.053,
      "BRONZE": 0.372,
      "GOLD": 0.17,
      "IRON": 0.636,
      "GRANDMASTER": 0,
      "SILVER": 0.291,
      "CHALLENGER": 0,
      "MASTER": 0.011,
      "PLATINUM": 0.111
    }
  },
  {
    "id": 504003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 60,
      "PLATINUM": 20,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Obtain ward skins",
      "name": "Ward Skin Collector",
      "shortDescription": "Obtain ward skins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "504000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "504000",
    "parentCategory": "5",
    "percentiles": {
      "BRONZE": 0.393,
      "MASTER": 0.008,
      "CHALLENGER": 0,
      "PLATINUM": 0.104,
      "GRANDMASTER": 0,
      "DIAMOND": 0.059,
      "IRON": 0.49,
      "GOLD": 0.168,
      "NONE": 1,
      "SILVER": 0.226
    }
  },
  {
    "id": 504002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 400,
      "PLATINUM": 100,
      "DIAMOND": 200,
      "IRON": 3,
      "GOLD": 50,
      "SILVER": 20
    },
    "translation": {
      "description": "Obtain Summoner icons",
      "name": "Icon of the Rift",
      "shortDescription": "Obtain Summoner Icons"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "504000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "504000",
    "parentCategory": "5",
    "title": "Iconic",
    "percentiles": {
      "GOLD": 0.169,
      "NONE": 1,
      "BRONZE": 0.32,
      "MASTER": 0.006,
      "CHALLENGER": 0,
      "IRON": 0.463,
      "PLATINUM": 0.106,
      "DIAMOND": 0.041,
      "GRANDMASTER": 0,
      "SILVER": 0.247
    }
  },
  {
    "id": 504001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 40,
      "PLATINUM": 10,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Obtain Clash team logos",
      "name": "Mascot Mayhem",
      "shortDescription": "Obtain Clash team logos"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "504000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "504000",
    "parentCategory": "5",
    "percentiles": {
      "IRON": 0.119,
      "GRANDMASTER": 0,
      "MASTER": 0.006,
      "SILVER": 0.068,
      "NONE": 1,
      "PLATINUM": 0.034,
      "BRONZE": 0.078,
      "CHALLENGER": 0,
      "GOLD": 0.053,
      "DIAMOND": 0.018
    }
  },
  {
    "id": 504000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 325,
      "PLATINUM": 110,
      "DIAMOND": 200,
      "IRON": 10,
      "GOLD": 70,
      "SILVER": 35
    },
    "translation": {
      "description": "Earn points from challenges in the Treasure group",
      "name": "Treasure",
      "shortDescription": "Earn points from challenges in the Treasure group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "5",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "5",
    "parentCategory": "0",
    "title": "Treasurer",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.032,
      "BRONZE": 0.35,
      "GOLD": 0.157,
      "IRON": 0.533,
      "GRANDMASTER": 0,
      "SILVER": 0.274,
      "CHALLENGER": 0,
      "MASTER": 0.003,
      "PLATINUM": 0.102
    }
  },
  {
    "id": 401102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3500,
      "CHALLENGER": 8388756,
      "MASTER": 5000000,
      "PLATINUM": 900000,
      "GRANDMASTER": 6580601,
      "DIAMOND": 2500000,
      "IRON": 1200,
      "GOLD": 220000,
      "SILVER": 35000
    },
    "translation": {
      "description": "Earn total Mastery Points",
      "name": "Wise Master",
      "shortDescription": "Earn Mastery Points"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401100",
      "priority": ".1",
      "source": "EOGD"
    },
    "parent": "401100",
    "parentCategory": "3",
    "percentiles": {
      "BRONZE": 0.383,
      "MASTER": 0.006,
      "PLATINUM": 0.123,
      "CHALLENGER": 0,
      "DIAMOND": 0.043,
      "IRON": 0.412,
      "GRANDMASTER": 0.002,
      "GOLD": 0.202,
      "NONE": 1,
      "SILVER": 0.29
    },
    "leaderboardThresholds": [
      21069510,
      1,
      8388756,
      4713,
      6580601,
      23557
    ]
  },
  {
    "id": 401103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1500,
      "CHALLENGER": 2386371,
      "MASTER": 840000,
      "PLATINUM": 110000,
      "GRANDMASTER": 1434589,
      "DIAMOND": 280000,
      "IRON": 850,
      "GOLD": 38000,
      "SILVER": 9000
    },
    "translation": {
      "description": "Earn Mastery Points on a single champion",
      "name": "One-Trick",
      "shortDescription": "Gain Mastery Points on a single champion"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401100",
      "priority": ".1",
      "source": "EOGD"
    },
    "parent": "401100",
    "parentCategory": "3",
    "percentiles": {
      "IRON": 0.41,
      "GRANDMASTER": 0.002,
      "MASTER": 0.006,
      "SILVER": 0.29,
      "NONE": 1,
      "PLATINUM": 0.123,
      "BRONZE": 0.382,
      "CHALLENGER": 0,
      "GOLD": 0.203,
      "DIAMOND": 0.047
    },
    "leaderboardThresholds": [
      14743466,
      1,
      2386371,
      4810,
      1434589,
      24045
    ]
  },
  {
    "id": 401100,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 690,
      "MASTER": 475,
      "PLATINUM": 160,
      "GRANDMASTER": 570,
      "DIAMOND": 290,
      "IRON": 15,
      "GOLD": 100,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Guru group",
      "name": "Guru",
      "shortDescription": "Earn points from challenges in the Guru group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401000",
      "isCapstone": "Y",
      "source": "CHALLENGES"
    },
    "parent": "401000",
    "parentCategory": "3",
    "title": "Guru",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.001,
      "BRONZE": 0.28,
      "GOLD": 0.09,
      "IRON": 0.391,
      "GRANDMASTER": 0,
      "SILVER": 0.2,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.023
    },
    "leaderboardThresholds": [
      0,
      0,
      0,
      1,
      540,
      1
    ]
  },
  {
    "id": 401101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 500,
      "CHALLENGER": 115000,
      "MASTER": 100000,
      "PLATINUM": 10000,
      "GRANDMASTER": 107500,
      "DIAMOND": 50000,
      "IRON": 100,
      "GOLD": 5000,
      "SILVER": 1000
    },
    "translation": {
      "description": "Have 150 champions with at least a certain number of Mastery Points.",
      "name": "Catch 'em All",
      "shortDescription": "Earn mastery points on 150 champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401100",
      "priority": "1",
      "source": "EOGD"
    },
    "parent": "401100",
    "parentCategory": "3",
    "title": "Champ Master",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.025,
      "GOLD": 0.001,
      "IRON": 0.045,
      "GRANDMASTER": 0,
      "SILVER": 0.016,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    },
    "leaderboardThresholds": [
      0,
      0,
      0,
      1,
      0,
      2
    ]
  },
  {
    "id": 401106,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 150,
      "PLATINUM": 100,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Win a game with different champions",
      "name": "Jack of All Champs",
      "shortDescription": "Win games with different champions"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401100",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401100",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.001,
      "BRONZE": 0.083,
      "GOLD": 0.015,
      "IRON": 0.161,
      "GRANDMASTER": 0,
      "SILVER": 0.035,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.005
    }
  },
  {
    "id": 401104,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 150,
      "PLATINUM": 75,
      "DIAMOND": 100,
      "IRON": 5,
      "GOLD": 50,
      "SILVER": 30
    },
    "translation": {
      "description": "Earn Mastery 5 on different champions",
      "name": "Master Yourself",
      "shortDescription": "Earn Mastery 5 on different champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401100",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401100",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.091,
      "GOLD": 0.014,
      "IRON": 0.155,
      "GRANDMASTER": 0,
      "SILVER": 0.043,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.003
    }
  },
  {
    "id": 401105,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 7,
      "MASTER": 100,
      "PLATINUM": 40,
      "DIAMOND": 60,
      "IRON": 3,
      "GOLD": 25,
      "SILVER": 15
    },
    "translation": {
      "description": "Earn Mastery 7 on different champions",
      "name": "Master the Enemy",
      "shortDescription": "Earn Mastery 7 on different champions"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401100",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401100",
    "parentCategory": "3",
    "title": "Deep Diver",
    "percentiles": {
      "SILVER": 0.016,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.001,
      "GRANDMASTER": 0,
      "GOLD": 0.005,
      "BRONZE": 0.046,
      "IRON": 0.089,
      "NONE": 1
    }
  },
  {
    "id": 302300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 400,
      "PLATINUM": 135,
      "DIAMOND": 240,
      "IRON": 15,
      "GOLD": 85,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Synergy group",
      "name": "Synergy",
      "shortDescription": "Earn points from challenges in the Synergy group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "302000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "302000",
    "parentCategory": "4",
    "title": "Synergized",
    "percentiles": {
      "MASTER": 0.005,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.191,
      "IRON": 0.269,
      "DIAMOND": 0.024,
      "NONE": 1,
      "GOLD": 0.12,
      "PLATINUM": 0.069,
      "BRONZE": 0.23
    }
  },
  {
    "id": 302301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 32,
      "CHALLENGER": 4417,
      "MASTER": 1920,
      "PLATINUM": 400,
      "GRANDMASTER": 3015,
      "DIAMOND": 1080,
      "IRON": 8,
      "GOLD": 160,
      "SILVER": 64
    },
    "translation": {
      "description": "Take down champions after waiting in a brush with at least one ally for at least 3 seconds",
      "name": "Brush Fanatic",
      "shortDescription": "Get takedowns with an ally after hiding in brush for 3+s"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302300",
      "source": "EOGD"
    },
    "parent": "302300",
    "parentCategory": "4",
    "title": "Fanatic",
    "percentiles": {
      "IRON": 0.288,
      "GRANDMASTER": 0.003,
      "MASTER": 0.01,
      "SILVER": 0.176,
      "NONE": 1,
      "PLATINUM": 0.08,
      "BRONZE": 0.212,
      "CHALLENGER": 0.001,
      "GOLD": 0.128,
      "DIAMOND": 0.031
    },
    "leaderboardThresholds": [
      18850,
      1,
      4417,
      7802,
      3015,
      39004
    ]
  },
  {
    "id": 302302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 220,
      "CHALLENGER": 28910,
      "MASTER": 13000,
      "PLATINUM": 4125,
      "GRANDMASTER": 20238,
      "DIAMOND": 7500,
      "IRON": 55,
      "GOLD": 1320,
      "SILVER": 660
    },
    "translation": {
      "description": "Get picks with at least one assisting ally. A pick is killing a single enemy without a return kill",
      "name": "Team Takedown",
      "shortDescription": "Get picks with at least one ally"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302300",
      "source": "EOGD"
    },
    "parent": "302300",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.032,
      "BRONZE": 0.216,
      "GOLD": 0.121,
      "IRON": 0.293,
      "GRANDMASTER": 0.003,
      "SILVER": 0.158,
      "CHALLENGER": 0.001,
      "MASTER": 0.011,
      "PLATINUM": 0.062
    },
    "leaderboardThresholds": [
      116832,
      1,
      28910,
      8773,
      20238,
      43860
    ]
  },
  {
    "id": 302303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 20,
      "CHALLENGER": 4042,
      "MASTER": 1000,
      "PLATINUM": 375,
      "GRANDMASTER": 2076,
      "DIAMOND": 675,
      "IRON": 5,
      "GOLD": 150,
      "SILVER": 50
    },
    "translation": {
      "description": "Save an ally who would have otherwise taken lethal damage with a heal or shield",
      "name": "That Was Close",
      "shortDescription": "Save an ally with a heal or shield"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302300",
      "source": "EOGD"
    },
    "parent": "302300",
    "parentCategory": "4",
    "title": "Guardian Angel",
    "percentiles": {
      "IRON": 0.174,
      "GRANDMASTER": 0.001,
      "MASTER": 0.003,
      "SILVER": 0.08,
      "NONE": 1,
      "PLATINUM": 0.014,
      "BRONZE": 0.118,
      "CHALLENGER": 0,
      "GOLD": 0.038,
      "DIAMOND": 0.006
    },
    "leaderboardThresholds": [
      27462,
      1,
      4042,
      2663,
      2076,
      13311
    ]
  },
  {
    "id": 204000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 40,
      "MASTER": 650,
      "PLATINUM": 210,
      "DIAMOND": 375,
      "IRON": 15,
      "GOLD": 130,
      "SILVER": 60
    },
    "translation": {
      "description": "Earn points from challenges in the Cornerstone and Visionary groups",
      "name": "Mastermind",
      "shortDescription": "Earn points from challenges in the Cornerstone and Visionary groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "2",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2",
    "parentCategory": "0",
    "title": "Mastermind",
    "percentiles": {
      "GOLD": 0.082,
      "NONE": 1,
      "BRONZE": 0.181,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "IRON": 0.255,
      "PLATINUM": 0.044,
      "DIAMOND": 0.013,
      "GRANDMASTER": 0,
      "SILVER": 0.142
    }
  },
  {
    "id": 302304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 120,
      "CHALLENGER": 14925,
      "MASTER": 7200,
      "PLATINUM": 2250,
      "GRANDMASTER": 10548,
      "DIAMOND": 4000,
      "IRON": 30,
      "GOLD": 750,
      "SILVER": 300
    },
    "translation": {
      "description": "Immobilize an enemy, then take them down with an ally",
      "name": "Stun n Gun",
      "shortDescription": "Immobilize then take down an enemy with an ally"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302300",
      "source": "EOGD"
    },
    "parent": "302300",
    "parentCategory": "4",
    "percentiles": {
      "SILVER": 0.143,
      "CHALLENGER": 0,
      "DIAMOND": 0.02,
      "MASTER": 0.005,
      "PLATINUM": 0.044,
      "GRANDMASTER": 0.001,
      "GOLD": 0.098,
      "BRONZE": 0.189,
      "IRON": 0.26,
      "NONE": 1
    },
    "leaderboardThresholds": [
      56907,
      1,
      14925,
      3680,
      10548,
      18396
    ]
  },
  {
    "id": 302305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 5815,
      "MASTER": 1800,
      "PLATINUM": 500,
      "GRANDMASTER": 3375,
      "DIAMOND": 1000,
      "IRON": 10,
      "GOLD": 150,
      "SILVER": 60
    },
    "translation": {
      "description": "Knock back enemies into your team, resulting in a takedown",
      "name": "Insec-urity Breach",
      "shortDescription": "Knock back enemies to your team and get a takedown"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302300",
      "source": "EOGD"
    },
    "parent": "302300",
    "parentCategory": "4",
    "title": "Insec-ticide",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.03,
      "BRONZE": 0.188,
      "GOLD": 0.112,
      "IRON": 0.24,
      "GRANDMASTER": 0.003,
      "SILVER": 0.154,
      "CHALLENGER": 0.001,
      "MASTER": 0.013,
      "PLATINUM": 0.058
    },
    "leaderboardThresholds": [
      39889,
      1,
      5815,
      9687,
      3375,
      48429
    ]
  },
  {
    "id": 101101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 337,
      "MASTER": 10,
      "PLATINUM": 4,
      "GRANDMASTER": 122,
      "DIAMOND": 7,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Deal more than 1800 Damage Per Minute in ARAM games",
      "name": "DPS Threat",
      "shortDescription": "Deal more than 1800 DPM"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.117,
      "BRONZE": 0,
      "GOLD": 0.159,
      "IRON": 0,
      "GRANDMASTER": 0.027,
      "SILVER": 0.188,
      "CHALLENGER": 0.005,
      "MASTER": 0.106,
      "PLATINUM": 0.135
    },
    "leaderboardThresholds": [
      7890,
      1,
      337,
      80787,
      122,
      403927
    ]
  },
  {
    "id": 101100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 650,
      "PLATINUM": 185,
      "DIAMOND": 340,
      "IRON": 10,
      "GOLD": 115,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the ARAM Warrior group",
      "name": "ARAM Warrior",
      "shortDescription": "Earn points from challenges in the ARAM Warrior group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "101000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101000",
    "parentCategory": "1",
    "title": "Unstoppable",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.039,
      "BRONZE": 0.202,
      "GOLD": 0.115,
      "IRON": 0.209,
      "GRANDMASTER": 0,
      "SILVER": 0.162,
      "CHALLENGER": 0,
      "MASTER": 0.008,
      "PLATINUM": 0.093
    }
  },
  {
    "id": 101103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 61,
      "MASTER": 15,
      "PLATINUM": 5,
      "GRANDMASTER": 32,
      "DIAMOND": 10,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Go Legendary in ARAM games",
      "name": "ARAM Legend",
      "shortDescription": "Go Legendary"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "source": "EOGD"
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.019,
      "BRONZE": 0,
      "GOLD": 0.072,
      "IRON": 0,
      "GRANDMASTER": 0.003,
      "SILVER": 0.102,
      "CHALLENGER": 0.001,
      "MASTER": 0.011,
      "PLATINUM": 0.038
    },
    "leaderboardThresholds": [
      1830,
      1,
      61,
      8433,
      32,
      42157
    ]
  },
  {
    "id": 101102,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 1
    },
    "translation": {
      "description": "Get two Pentakills in a single ARAM game",
      "name": "Double Decimation",
      "shortDescription": "Get two Pentakills in a single game"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0.015,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0,
      "DIAMOND": 0
    }
  },
  {
    "id": 101105,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 50,
      "MASTER": 2500,
      "PLATINUM": 650,
      "DIAMOND": 1500,
      "IRON": 10,
      "GOLD": 250,
      "SILVER": 125
    },
    "translation": {
      "description": "Kill enemies near one of their own turrets in ARAM",
      "name": "No Hiding",
      "shortDescription": "Kill enemies near one of their turrets"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "BRONZE": 0.142,
      "MASTER": 0.013,
      "PLATINUM": 0.056,
      "CHALLENGER": 0,
      "DIAMOND": 0.027,
      "IRON": 0.197,
      "GRANDMASTER": 0,
      "GOLD": 0.09,
      "NONE": 1,
      "SILVER": 0.112
    }
  },
  {
    "id": 301300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 50,
      "MASTER": 300,
      "PLATINUM": 105,
      "DIAMOND": 160,
      "IRON": 25,
      "GOLD": 100,
      "SILVER": 75
    },
    "translation": {
      "description": "Earn points from challenges in the Symbiosis group",
      "name": "Symbiosis",
      "shortDescription": "Earn points from challenges in the Symbiosis group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "301000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301000",
    "parentCategory": "4",
    "title": "Exceptional",
    "percentiles": {
      "IRON": 0.239,
      "GRANDMASTER": 0,
      "MASTER": 0.002,
      "SILVER": 0.132,
      "NONE": 1,
      "PLATINUM": 0.094,
      "BRONZE": 0.173,
      "CHALLENGER": 0,
      "GOLD": 0.1,
      "DIAMOND": 0.05
    }
  },
  {
    "id": 101104,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 150,
      "PLATINUM": 45,
      "DIAMOND": 90,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 7
    },
    "translation": {
      "description": "Kill opponents who recently received a health pack in ARAM",
      "name": "Bad Medicine",
      "shortDescription": "Kill enemies recently healed by a health pack"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101100",
    "parentCategory": "1",
    "title": "Angel of Mercy",
    "percentiles": {
      "IRON": 0.196,
      "GRANDMASTER": 0,
      "MASTER": 0.014,
      "SILVER": 0.117,
      "NONE": 1,
      "PLATINUM": 0.052,
      "BRONZE": 0.147,
      "CHALLENGER": 0,
      "GOLD": 0.091,
      "DIAMOND": 0.028
    }
  },
  {
    "id": 301301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 1
    },
    "translation": {
      "description": "Win Perfect Games, where the opposing team gets no kills, no dragons, no Rift Heralds or Barons, and destroys no turrets",
      "name": "Flawless Victory",
      "shortDescription": "Win a Perfect Game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301300",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301300",
    "parentCategory": "4",
    "title": "Flawless",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0.052,
      "PLATINUM": 0
    }
  },
  {
    "id": 101107,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 800,
      "CHALLENGER": 88289,
      "MASTER": 30000,
      "PLATINUM": 12500,
      "GRANDMASTER": 55943,
      "DIAMOND": 20000,
      "IRON": 200,
      "GOLD": 5000,
      "SILVER": 2000
    },
    "translation": {
      "description": "Get Takedowns in ARAM",
      "name": "Farm Champs Not Minions",
      "shortDescription": "Get Takedowns"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "source": "EOGD"
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "BRONZE": 0.138,
      "MASTER": 0.015,
      "PLATINUM": 0.044,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.027,
      "IRON": 0.187,
      "GRANDMASTER": 0.004,
      "GOLD": 0.077,
      "NONE": 1,
      "SILVER": 0.108
    },
    "leaderboardThresholds": [
      427996,
      1,
      88289,
      11809,
      55943,
      59040
    ]
  },
  {
    "id": 301302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 737,
      "MASTER": 300,
      "PLATINUM": 90,
      "GRANDMASTER": 479,
      "DIAMOND": 180,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 15
    },
    "translation": {
      "description": "Get 12 or more assists without dying",
      "name": "Leading by Example",
      "shortDescription": "Get an assist streak of 12+ without dying"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301300",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "301300",
    "parentCategory": "4",
    "percentiles": {
      "GOLD": 0.029,
      "NONE": 1,
      "BRONZE": 0.1,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "IRON": 0.19,
      "PLATINUM": 0.008,
      "DIAMOND": 0.002,
      "GRANDMASTER": 0,
      "SILVER": 0.052
    },
    "leaderboardThresholds": [
      2390,
      1,
      737,
      584,
      479,
      2913
    ]
  },
  {
    "id": 502005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 50,
      "PLATINUM": 30,
      "DIAMOND": 40,
      "IRON": 1,
      "GOLD": 20,
      "SILVER": 10
    },
    "translation": {
      "description": "Reach Gold tier on Capstones",
      "name": "No Capstone Unturned",
      "shortDescription": "Reach Gold tier on Capstones"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "502000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "502000",
    "parentCategory": "5",
    "percentiles": {
      "BRONZE": 0.201,
      "MASTER": 0.026,
      "CHALLENGER": 0,
      "PLATINUM": 0.095,
      "GRANDMASTER": 0,
      "DIAMOND": 0.068,
      "IRON": 0.362,
      "GOLD": 0.117,
      "NONE": 1,
      "SILVER": 0.157
    }
  },
  {
    "id": 101106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 36,
      "MASTER": 7,
      "PLATINUM": 3,
      "GRANDMASTER": 17,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "Get Pentakills in ARAM",
      "name": "ARAM Eradication",
      "shortDescription": "Get Pentakills"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "GOLD": 0.097,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0.023,
      "CHALLENGER": 0.001,
      "IRON": 0,
      "PLATINUM": 0.051,
      "DIAMOND": 0.033,
      "GRANDMASTER": 0.006,
      "SILVER": 0
    },
    "leaderboardThresholds": [
      1346,
      1,
      36,
      17916,
      17,
      89576
    ]
  },
  {
    "id": 301303,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GOLD": 1
    },
    "translation": {
      "description": "Destroy all three enemy inhibitors in under 25 minutes",
      "name": "Winhibitors",
      "shortDescription": "Kill all three inhibitors in under 25 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301300",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0.177,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 502004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 300,
      "PLATINUM": 75,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 15
    },
    "translation": {
      "description": "Reach Master tier on challenges",
      "name": "Masterful Performance",
      "shortDescription": "Reach Masters tier on different challenges"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "502000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "502000",
    "parentCategory": "5",
    "percentiles": {
      "BRONZE": 0.156,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.008,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0.302,
      "GOLD": 0.039,
      "NONE": 1,
      "SILVER": 0.085
    }
  },
  {
    "id": 502003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 300,
      "PLATINUM": 75,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 15
    },
    "translation": {
      "description": "Reach Diamond tier on challenges",
      "name": "Challenges are Forever",
      "shortDescription": "Reach Diamond tier on different challenges"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "502000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "502000",
    "parentCategory": "5",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.124,
      "IRON": 0.344,
      "DIAMOND": 0.001,
      "NONE": 1,
      "GOLD": 0.077,
      "PLATINUM": 0.03,
      "BRONZE": 0.198
    }
  },
  {
    "id": 101108,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 42,
      "MASTER": 7,
      "PLATINUM": 3,
      "GRANDMASTER": 17,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "Deal 40% or more of your team's damage to champions in ARAM",
      "name": "Solo Carry",
      "shortDescription": "Deal 40%+ of your team's champion damage"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "101100",
    "parentCategory": "1",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.003,
      "MASTER": 0.013,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.034,
      "BRONZE": 0,
      "CHALLENGER": 0.001,
      "GOLD": 0.082,
      "DIAMOND": 0.02
    },
    "leaderboardThresholds": [
      1161,
      1,
      42,
      9796,
      17,
      48972
    ]
  },
  {
    "id": 502002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 30,
      "PLATINUM": 20,
      "DIAMOND": 25,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Complete collection challenges by reaching the highest non-leaderboard level",
      "name": "Recursive",
      "shortDescription": "Complete collection challenges"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "502000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "502000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.001,
      "BRONZE": 0.068,
      "GOLD": 0.006,
      "IRON": 0.115,
      "GRANDMASTER": 0,
      "SILVER": 0.017,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.003
    }
  },
  {
    "id": 502001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 100,
      "PLATINUM": 45,
      "DIAMOND": 70,
      "IRON": 5,
      "GOLD": 30,
      "SILVER": 20
    },
    "translation": {
      "description": "Earn titles for different challenges",
      "name": "Entitled",
      "shortDescription": "Earn titles from challenges"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "502000",
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "502000",
    "parentCategory": "5",
    "title": "Titular",
    "percentiles": {
      "BRONZE": 0.153,
      "MASTER": 0,
      "PLATINUM": 0.027,
      "CHALLENGER": 0,
      "DIAMOND": 0.004,
      "IRON": 0.212,
      "GRANDMASTER": 0,
      "GOLD": 0.058,
      "NONE": 1,
      "SILVER": 0.094
    }
  },
  {
    "id": 502000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 400,
      "PLATINUM": 135,
      "DIAMOND": 240,
      "IRON": 15,
      "GOLD": 85,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Overachiever group",
      "name": "Overachiever",
      "shortDescription": "Earn points from challenges in the Overachiever group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "5",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "5",
    "parentCategory": "0",
    "title": "Overachiever",
    "percentiles": {
      "GOLD": 0.085,
      "NONE": 1,
      "BRONZE": 0.207,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.299,
      "PLATINUM": 0.047,
      "DIAMOND": 0.005,
      "GRANDMASTER": 0,
      "SILVER": 0.163
    }
  },
  {
    "id": 203000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 105,
      "MASTER": 2100,
      "PLATINUM": 700,
      "DIAMOND": 1250,
      "IRON": 50,
      "GOLD": 440,
      "SILVER": 190
    },
    "translation": {
      "description": "Earn points from challenges in the Flair, Behemoth, Slayer, and Predator groups",
      "name": "Might",
      "shortDescription": "Earn points from challenges in the Flair, Behemoth, Slayer, and Predator groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "2",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2",
    "parentCategory": "0",
    "title": "Legend",
    "percentiles": {
      "IRON": 0.27,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.17,
      "NONE": 1,
      "PLATINUM": 0.048,
      "BRONZE": 0.22,
      "CHALLENGER": 0,
      "GOLD": 0.095,
      "DIAMOND": 0.009
    }
  },
  {
    "id": 301304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 20,
      "MASTER": 10,
      "PLATINUM": 3,
      "GRANDMASTER": 15,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "Score aces after minions spawn but before 15 minutes",
      "name": "Team Diff",
      "shortDescription": "Score aces between minion spawn and 15 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301300",
      "source": "EOGD"
    },
    "parent": "301300",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.004,
      "CHALLENGER": 0,
      "PLATINUM": 0.046,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.022,
      "IRON": 0,
      "GOLD": 0.122,
      "NONE": 1,
      "SILVER": 0
    },
    "leaderboardThresholds": [
      929,
      1,
      19,
      2973,
      14,
      12310
    ]
  },
  {
    "id": 301305,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GOLD": 1
    },
    "translation": {
      "description": "Dance with the Rift Herald in the enemy base at the end of the game",
      "name": "Happy Feet",
      "shortDescription": "Dance with the Rift Herald in the enemy base"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301300",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301300",
    "parentCategory": "4",
    "title": "Jitterbug",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0.142,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 301306,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GOLD": 1
    },
    "translation": {
      "description": "Destroy the enemy nexus in less than 15 minutes",
      "name": "Let's Make This Quick",
      "shortDescription": "Destroy the enemy nexus in less than 15 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "301300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "301300",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0.168,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 501007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Rekindle an Eternals set for assassins",
      "name": "Assassin Specialist",
      "shortDescription": "Rekindle an Eternals set for an assassin"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[?( 'assassin' in @.classes )].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.007,
      "BRONZE": 0,
      "GOLD": 0.023,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.046,
      "CHALLENGER": 0,
      "MASTER": 0.002,
      "PLATINUM": 0.014
    }
  },
  {
    "id": 501005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 1,
      "MASTER": 30,
      "PLATINUM": 6,
      "DIAMOND": 15,
      "GOLD": 3,
      "SILVER": 2
    },
    "translation": {
      "description": "Rekindle Eternal sets. A rekindled set is one where three or more Eternals have reached level 5 or above",
      "name": "Rekindle the Old Furnace",
      "shortDescription": "Rekindle an Eternal set"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[*].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "BRONZE": 0.083,
      "MASTER": 0.002,
      "PLATINUM": 0.025,
      "CHALLENGER": 0,
      "DIAMOND": 0.009,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0.042,
      "NONE": 1,
      "SILVER": 0.056
    }
  },
  {
    "id": 501004,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1038,
      "MASTER": 125,
      "PLATINUM": 60,
      "GRANDMASTER": 421,
      "DIAMOND": 90,
      "IRON": 5,
      "GOLD": 30,
      "SILVER": 15
    },
    "translation": {
      "description": "Achieve milestones on Eternals for a single champion",
      "name": "Old Friends",
      "shortDescription": "Achieve milestones on Eternals for a single champion"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "source": "ETERNALS"
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "BRONZE": 0.108,
      "MASTER": 0.032,
      "PLATINUM": 0.054,
      "CHALLENGER": 0.002,
      "DIAMOND": 0.042,
      "IRON": 0.133,
      "GRANDMASTER": 0.008,
      "GOLD": 0.074,
      "NONE": 1,
      "SILVER": 0.093
    },
    "leaderboardThresholds": [
      194723,
      1,
      1038,
      24945,
      421,
      124720
    ]
  },
  {
    "id": 501003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 45,
      "MASTER": 25,
      "PLATINUM": 8,
      "GRANDMASTER": 35,
      "DIAMOND": 12,
      "IRON": 1,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Achieve milestone 15 or greater on an Eternal",
      "name": "Well-Rounded Traveller",
      "shortDescription": "Achieve milestone 15 or greater on an Eternal"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[*].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "GOLD": 0.02,
      "NONE": 1,
      "BRONZE": 0.042,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "IRON": 0.07,
      "PLATINUM": 0.013,
      "DIAMOND": 0.008,
      "GRANDMASTER": 0,
      "SILVER": 0.03
    }
  },
  {
    "id": 501002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 80,
      "PLATINUM": 20,
      "DIAMOND": 40,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 6
    },
    "translation": {
      "description": "Achieve milestone 5 or greater on an Eternal",
      "name": "Many Miles to Go",
      "shortDescription": "Rekindle an Eternal"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.018,
      "BRONZE": 0.085,
      "GOLD": 0.045,
      "IRON": 0.099,
      "GRANDMASTER": 0,
      "SILVER": 0.061,
      "CHALLENGER": 0,
      "MASTER": 0.007,
      "PLATINUM": 0.03
    }
  },
  {
    "id": 501001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 7,
      "CHALLENGER": 4369,
      "MASTER": 1250,
      "PLATINUM": 150,
      "GRANDMASTER": 2582,
      "DIAMOND": 600,
      "IRON": 3,
      "GOLD": 75,
      "SILVER": 15
    },
    "translation": {
      "description": "Earn milestones on any Eternal",
      "name": "Mile Marker",
      "shortDescription": "Earn milestones on any Eternal"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "source": "ETERNALS"
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.034,
      "BRONZE": 0.131,
      "GOLD": 0.078,
      "IRON": 0.146,
      "GRANDMASTER": 0.004,
      "SILVER": 0.114,
      "CHALLENGER": 0.001,
      "MASTER": 0.017,
      "PLATINUM": 0.063
    },
    "leaderboardThresholds": [
      198422,
      1,
      4369,
      12805,
      2582,
      64018
    ]
  },
  {
    "id": 501000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 875,
      "PLATINUM": 295,
      "DIAMOND": 530,
      "IRON": 10,
      "GOLD": 185,
      "SILVER": 85
    },
    "translation": {
      "description": "Earn points from challenges in the Experience group",
      "name": "Experience",
      "shortDescription": "Earn points from challenges in the Experience group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "5",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "5",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.136,
      "GRANDMASTER": 0,
      "MASTER": 0.002,
      "SILVER": 0.076,
      "NONE": 1,
      "PLATINUM": 0.029,
      "BRONZE": 0.107,
      "CHALLENGER": 0,
      "GOLD": 0.05,
      "DIAMOND": 0.012
    }
  },
  {
    "id": 202000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 75,
      "MASTER": 1450,
      "PLATINUM": 450,
      "DIAMOND": 825,
      "IRON": 35,
      "GOLD": 280,
      "SILVER": 120
    },
    "translation": {
      "description": "Earn points from challenges in the Domination, Unrivaled, and Perfection groups",
      "name": "Ascendant",
      "shortDescription": "Earn points from challenges in the Domination, Unrivaled, and Perfection groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "2",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2",
    "parentCategory": "0",
    "title": "G.O.A.T.",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.022,
      "BRONZE": 0.237,
      "GOLD": 0.115,
      "IRON": 0.288,
      "GRANDMASTER": 0,
      "SILVER": 0.198,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.068
    }
  },
  {
    "id": 501012,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Rekindle an Eternals set for tanks",
      "name": "Tank Specialist",
      "shortDescription": "Rekindle an Eternal set for a tank"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[?( 'tank' in @.classes )].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.036,
      "IRON": 0,
      "DIAMOND": 0.005,
      "NONE": 1,
      "GOLD": 0.017,
      "PLATINUM": 0.011,
      "BRONZE": 0
    }
  },
  {
    "id": 501011,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Rekindle an Eternals set for supports",
      "name": "Support Specialist",
      "shortDescription": "Rekindle an Eternal set for a support"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[?( 'support' in @.classes )].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0.002,
      "SILVER": 0.04,
      "NONE": 1,
      "PLATINUM": 0.014,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.021,
      "DIAMOND": 0.007
    }
  },
  {
    "id": 501010,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Rekindle an Eternals set for marksmen",
      "name": "Marksman Specialist",
      "shortDescription": "Rekindle an Eternal set for a marksman"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[?( 'marksman' in @.classes )].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "GOLD": 0.023,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0.016,
      "DIAMOND": 0.009,
      "GRANDMASTER": 0,
      "SILVER": 0.042
    }
  },
  {
    "id": 501009,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Rekindle an Eternals set for mages",
      "name": "Mage Specialist",
      "shortDescription": "Rekindle an Eternal set for a mage"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[?( 'mage' in @.classes )].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "GOLD": 0.028,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0.004,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0.02,
      "DIAMOND": 0.011,
      "GRANDMASTER": 0,
      "SILVER": 0.051
    }
  },
  {
    "id": 501008,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Rekindle an Eternals set for fighters",
      "name": "Fighter Specialist",
      "shortDescription": "Rekindle an Eternal set for a fighter"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "501000",
      "championQuery": "$[?( 'fighter' in @.classes )].id",
      "source": "ETERNALS",
      "leaderboardManuallyEnabled": true
    },
    "parent": "501000",
    "parentCategory": "5",
    "percentiles": {
      "SILVER": 0.052,
      "CHALLENGER": 0,
      "DIAMOND": 0.01,
      "MASTER": 0.003,
      "PLATINUM": 0.018,
      "GRANDMASTER": 0,
      "GOLD": 0.027,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 402206,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 3745,
      "MASTER": 1800,
      "PLATINUM": 550,
      "GRANDMASTER": 2645,
      "DIAMOND": 1000,
      "IRON": 10,
      "GOLD": 200,
      "SILVER": 75
    },
    "translation": {
      "description": "Take down Dragons",
      "name": "Lizard Hunting",
      "shortDescription": "Take down Dragons"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "SILVER": 0.146,
      "CHALLENGER": 0,
      "DIAMOND": 0.02,
      "MASTER": 0.005,
      "PLATINUM": 0.046,
      "GRANDMASTER": 0.001,
      "GOLD": 0.097,
      "BRONZE": 0.192,
      "IRON": 0.248,
      "NONE": 1
    },
    "leaderboardThresholds": [
      16171,
      1,
      3745,
      3670,
      2645,
      18343
    ]
  },
  {
    "id": 402207,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 8,
      "CHALLENGER": 1000,
      "MASTER": 350,
      "PLATINUM": 100,
      "GRANDMASTER": 608,
      "DIAMOND": 200,
      "IRON": 2,
      "GOLD": 50,
      "SILVER": 20
    },
    "translation": {
      "description": "Take down Barons",
      "name": "Wurm Fishing",
      "shortDescription": "Take down Barons"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "BRONZE": 0.203,
      "MASTER": 0.017,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.074,
      "GRANDMASTER": 0.004,
      "DIAMOND": 0.04,
      "IRON": 0.28,
      "GOLD": 0.109,
      "NONE": 1,
      "SILVER": 0.156
    },
    "leaderboardThresholds": [
      4370,
      1,
      999,
      9635,
      608,
      64818
    ]
  },
  {
    "id": 402204,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1600,
      "CHALLENGER": 200477,
      "MASTER": 96000,
      "PLATINUM": 30000,
      "GRANDMASTER": 139525,
      "DIAMOND": 55000,
      "IRON": 400,
      "GOLD": 12000,
      "SILVER": 4000
    },
    "translation": {
      "description": "Earn CS from jungle monsters in your jungle",
      "name": "Dine In",
      "shortDescription": "Kill jungle monsters in your jungle"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "BRONZE": 0.11,
      "MASTER": 0.001,
      "CHALLENGER": 0,
      "PLATINUM": 0.009,
      "GRANDMASTER": 0,
      "DIAMOND": 0.002,
      "IRON": 0.174,
      "GOLD": 0.03,
      "NONE": 1,
      "SILVER": 0.071
    },
    "leaderboardThresholds": [
      528322,
      1,
      200477,
      401,
      139525,
      1997
    ]
  },
  {
    "id": 402205,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 240,
      "CHALLENGER": 30623,
      "MASTER": 14000,
      "PLATINUM": 4000,
      "GRANDMASTER": 20656,
      "DIAMOND": 8000,
      "IRON": 60,
      "GOLD": 1500,
      "SILVER": 600
    },
    "translation": {
      "description": "Kill jungle monsters in the enemy jungle",
      "name": "Dine Out",
      "shortDescription": "Kill jungle monsters in the enemy jungle"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "SILVER": 0.08,
      "CHALLENGER": 0,
      "DIAMOND": 0.003,
      "MASTER": 0,
      "PLATINUM": 0.011,
      "GRANDMASTER": 0,
      "GOLD": 0.041,
      "BRONZE": 0.124,
      "IRON": 0.192,
      "NONE": 1
    },
    "leaderboardThresholds": [
      166370,
      1,
      30623,
      375,
      20656,
      1870
    ]
  },
  {
    "id": 402202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 5860,
      "MASTER": 2500,
      "PLATINUM": 750,
      "GRANDMASTER": 3990,
      "DIAMOND": 1400,
      "IRON": 10,
      "GOLD": 300,
      "SILVER": 150
    },
    "translation": {
      "description": "Participate in taking turrets with Rift Herald",
      "name": "Give 'em Shell, Shelly",
      "shortDescription": "Take turrets with Rift Herald"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "IRON": 0.303,
      "GRANDMASTER": 0.003,
      "MASTER": 0.011,
      "SILVER": 0.146,
      "NONE": 1,
      "PLATINUM": 0.062,
      "BRONZE": 0.206,
      "CHALLENGER": 0.001,
      "GOLD": 0.11,
      "DIAMOND": 0.032
    },
    "leaderboardThresholds": [
      26530,
      1,
      5860,
      8437,
      3990,
      42181
    ]
  },
  {
    "id": 402203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 6156,
      "MASTER": 2500,
      "PLATINUM": 750,
      "GRANDMASTER": 4000,
      "DIAMOND": 1400,
      "IRON": 10,
      "GOLD": 300,
      "SILVER": 150
    },
    "translation": {
      "description": "Kill Scuttle Crabs",
      "name": "Scuttle Along Now",
      "shortDescription": "Kill scuttle crabs"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "GOLD": 0.055,
      "NONE": 1,
      "BRONZE": 0.139,
      "MASTER": 0.002,
      "CHALLENGER": 0,
      "IRON": 0.217,
      "PLATINUM": 0.021,
      "DIAMOND": 0.008,
      "GRANDMASTER": 0.001,
      "SILVER": 0.086
    },
    "leaderboardThresholds": [
      25041,
      1,
      6156,
      1597,
      4000,
      7980
    ]
  },
  {
    "id": 402200,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 1160,
      "MASTER": 800,
      "PLATINUM": 265,
      "GRANDMASTER": 960,
      "DIAMOND": 480,
      "IRON": 25,
      "GOLD": 165,
      "SILVER": 75
    },
    "translation": {
      "description": "Earn points from challenges in the Commando group",
      "name": "Commando",
      "shortDescription": "Earn points from challenges in the Commando group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "402000",
      "isCapstone": "Y",
      "source": "CHALLENGES"
    },
    "parent": "402000",
    "parentCategory": "3",
    "title": "Commando",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.019,
      "BRONZE": 0.211,
      "GOLD": 0.103,
      "IRON": 0.259,
      "GRANDMASTER": 0,
      "SILVER": 0.177,
      "CHALLENGER": 0,
      "MASTER": 0.002,
      "PLATINUM": 0.058
    },
    "leaderboardThresholds": [
      0,
      0,
      1000,
      1,
      940,
      5475
    ]
  },
  {
    "id": 402201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 230,
      "MASTER": 100,
      "PLATINUM": 25,
      "GRANDMASTER": 151,
      "DIAMOND": 50,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Steal Epic Monsters. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Clutch Steal",
      "shortDescription": "Steal Epic monsters"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "title": "Thief",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.006,
      "BRONZE": 0.139,
      "GOLD": 0.055,
      "IRON": 0.185,
      "GRANDMASTER": 0,
      "SILVER": 0.089,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.02
    },
    "leaderboardThresholds": [
      1202,
      1,
      230,
      861,
      151,
      4298
    ]
  },
  {
    "id": 103201,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 250,
      "PLATINUM": 75,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 10
    },
    "translation": {
      "description": "Take down an enemy champion in the alcove",
      "name": "Alcove Gaming",
      "shortDescription": "Take down opponents in the alcove"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103200",
    "parentCategory": "1",
    "title": "Alcove Gamer",
    "percentiles": {
      "GOLD": 0.088,
      "NONE": 1,
      "BRONZE": 0.217,
      "MASTER": 0.005,
      "CHALLENGER": 0,
      "IRON": 0.288,
      "PLATINUM": 0.043,
      "DIAMOND": 0.016,
      "GRANDMASTER": 0,
      "SILVER": 0.147
    }
  },
  {
    "id": 103200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 20,
      "MASTER": 400,
      "PLATINUM": 175,
      "DIAMOND": 280,
      "IRON": 10,
      "GOLD": 85,
      "SILVER": 30
    },
    "translation": {
      "description": "Earn points from challenges in the Innovation group",
      "name": "Innovation",
      "shortDescription": "Earn points from challenges in the Innovation group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "103000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103000",
    "parentCategory": "1",
    "title": "Innovative",
    "percentiles": {
      "BRONZE": 0.348,
      "MASTER": 0.004,
      "PLATINUM": 0.066,
      "CHALLENGER": 0,
      "DIAMOND": 0.019,
      "IRON": 0.357,
      "GRANDMASTER": 0,
      "GOLD": 0.191,
      "NONE": 1,
      "SILVER": 0.338
    }
  },
  {
    "id": 103203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "MASTER": 125,
      "PLATINUM": 35,
      "DIAMOND": 70,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 5
    },
    "translation": {
      "description": "Get multikills shortly after flashing towards an enemy champion",
      "name": "Aggressive Positioning",
      "shortDescription": "Get multikills after flashing towards an enemy"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103200",
    "parentCategory": "1",
    "title": "Flashy",
    "percentiles": {
      "IRON": 0.228,
      "GRANDMASTER": 0,
      "MASTER": 0.006,
      "SILVER": 0.139,
      "NONE": 1,
      "PLATINUM": 0.044,
      "BRONZE": 0.189,
      "CHALLENGER": 0,
      "GOLD": 0.083,
      "DIAMOND": 0.019
    }
  },
  {
    "id": 103202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 64,
      "MASTER": 25,
      "PLATINUM": 8,
      "GRANDMASTER": 41,
      "DIAMOND": 15,
      "GOLD": 3,
      "SILVER": 2
    },
    "translation": {
      "description": "Knock yourself and an enemy champion in different directions after hitting a blast cone",
      "name": "Plant Tactics",
      "shortDescription": "Use blast cones to escape enemies"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD"
    },
    "parent": "103200",
    "parentCategory": "1",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.002,
      "MASTER": 0.007,
      "SILVER": 0.117,
      "NONE": 1,
      "PLATINUM": 0.043,
      "BRONZE": 0.164,
      "CHALLENGER": 0,
      "GOLD": 0.093,
      "DIAMOND": 0.019
    },
    "leaderboardThresholds": [
      846,
      1,
      64,
      5406,
      41,
      27026
    ]
  },
  {
    "id": 103205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GOLD": 1
    },
    "translation": {
      "description": "Survive champion combat on single digit health",
      "name": "Not Even Close",
      "shortDescription": "Survive champion combat on single digit health"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103200",
    "parentCategory": "1",
    "title": "Survivor",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0.267,
      "PLATINUM": 0,
      "BRONZE": 0
    }
  },
  {
    "id": 402210,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 35,
      "CHALLENGER": 4895,
      "MASTER": 1800,
      "PLATINUM": 600,
      "GRANDMASTER": 3184,
      "DIAMOND": 1350,
      "IRON": 10,
      "GOLD": 200,
      "SILVER": 100
    },
    "translation": {
      "description": "Take down turrets",
      "name": "Turret Toppler",
      "shortDescription": "Destroy turrets"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.032,
      "BRONZE": 0.225,
      "GOLD": 0.13,
      "IRON": 0.297,
      "GRANDMASTER": 0.005,
      "SILVER": 0.167,
      "CHALLENGER": 0.001,
      "MASTER": 0.02,
      "PLATINUM": 0.072
    },
    "leaderboardThresholds": [
      23257,
      1,
      4895,
      15393,
      3184,
      76961
    ]
  },
  {
    "id": 103204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 1
    },
    "translation": {
      "description": "Kill 20 minions within three Seconds",
      "name": "Wave Goodbye",
      "shortDescription": "Kill 20 minions within 3 Seconds"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103200",
    "parentCategory": "1",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0,
      "PLATINUM": 0.3,
      "BRONZE": 0
    }
  },
  {
    "id": 103207,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 1
    },
    "translation": {
      "description": "Have both teams be aced in the same fight",
      "name": "Double Ace",
      "shortDescription": "Have both teams be aced in the same fight"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103200",
    "parentCategory": "1",
    "title": "Ace",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "PLATINUM": 0.049,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 402208,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1704,
      "MASTER": 600,
      "PLATINUM": 180,
      "GRANDMASTER": 1032,
      "DIAMOND": 300,
      "IRON": 3,
      "GOLD": 65,
      "SILVER": 25
    },
    "translation": {
      "description": "Take down Rift Heralds",
      "name": "Shell Collecting",
      "shortDescription": "Take down Rift Heralds"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "IRON": 0.23,
      "GRANDMASTER": 0.001,
      "MASTER": 0.005,
      "SILVER": 0.122,
      "NONE": 1,
      "PLATINUM": 0.033,
      "BRONZE": 0.168,
      "CHALLENGER": 0,
      "GOLD": 0.076,
      "DIAMOND": 0.017
    },
    "leaderboardThresholds": [
      9349,
      1,
      1704,
      3651,
      1032,
      18251
    ]
  },
  {
    "id": 103206,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 6,
      "MASTER": 420,
      "PLATINUM": 120,
      "DIAMOND": 225,
      "IRON": 2,
      "GOLD": 40,
      "SILVER": 18
    },
    "translation": {
      "description": "Kill opponents with help from an Epic monster. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "A Drake and a Hard Place",
      "shortDescription": "Kill opponents with help from an Epic monster"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103200",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103200",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.012,
      "BRONZE": 0.187,
      "GOLD": 0.088,
      "IRON": 0.251,
      "GRANDMASTER": 0,
      "SILVER": 0.129,
      "CHALLENGER": 0,
      "MASTER": 0.002,
      "PLATINUM": 0.034
    }
  },
  {
    "id": 402209,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 35,
      "CHALLENGER": 4511,
      "MASTER": 1800,
      "PLATINUM": 600,
      "GRANDMASTER": 2989,
      "DIAMOND": 1350,
      "IRON": 10,
      "GOLD": 200,
      "SILVER": 100
    },
    "translation": {
      "description": "Take turret plates",
      "name": "Dinner's Ready",
      "shortDescription": "Take Turret Plates"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402200",
      "source": "EOGD"
    },
    "parent": "402200",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.021,
      "BRONZE": 0.214,
      "GOLD": 0.116,
      "IRON": 0.29,
      "GRANDMASTER": 0.003,
      "SILVER": 0.154,
      "CHALLENGER": 0.001,
      "MASTER": 0.012,
      "PLATINUM": 0.057
    },
    "leaderboardThresholds": [
      24310,
      1,
      4511,
      9389,
      2989,
      46938
    ]
  },
  {
    "id": 201003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 100,
      "MASTER": 25,
      "PLATINUM": 7,
      "GRANDMASTER": 48,
      "DIAMOND": 15,
      "GOLD": 3,
      "SILVER": 1
    },
    "translation": {
      "description": "Win games without dying and with at least 30% kill participation",
      "name": "Unkillable Demon King",
      "shortDescription": "Win games without dying and at least 30% kill participation"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "201000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "201000",
    "parentCategory": "2",
    "title": "Unkillable Demon",
    "percentiles": {
      "GOLD": 0.132,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0.019,
      "CHALLENGER": 0.001,
      "IRON": 0,
      "PLATINUM": 0.08,
      "DIAMOND": 0.04,
      "GRANDMASTER": 0.005,
      "SILVER": 0.213
    },
    "leaderboardThresholds": [
      1056,
      1,
      99,
      7775,
      48,
      74227
    ]
  },
  {
    "id": 303404,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 25,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 14,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with a revive, immunity, or zombie ability",
      "name": "They Just... Don't... DIE!",
      "shortDescription": "Win in a full party with 3+ champs that defy death"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'revive' in @.abilities[*].traits[*] || 'immunity' in @.abilities[*].traits[*] || 'zombie' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "GOLD": 0.052,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0.005,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0.019,
      "DIAMOND": 0.01,
      "GRANDMASTER": 0.001,
      "SILVER": 0
    },
    "leaderboardThresholds": [
      168,
      1,
      25,
      3504,
      14,
      17516
    ]
  },
  {
    "id": 201002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 240,
      "MASTER": 50,
      "PLATINUM": 15,
      "GRANDMASTER": 117,
      "DIAMOND": 30,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Kill 80 lane minions within 10 minutes",
      "name": "Lethal Efficiency",
      "shortDescription": "Kill 80 minions within 10 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "201000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "201000",
    "parentCategory": "2",
    "title": "Minion",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.015,
      "BRONZE": 0.128,
      "GOLD": 0.061,
      "IRON": 0,
      "GRANDMASTER": 0.002,
      "SILVER": 0.079,
      "CHALLENGER": 0,
      "MASTER": 0.008,
      "PLATINUM": 0.029
    },
    "leaderboardThresholds": [
      2481,
      1,
      240,
      6483,
      117,
      32408
    ]
  },
  {
    "id": 303405,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 18,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 12,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with stealth (camouflage or invisibility count)",
      "name": "Where'd They Go?",
      "shortDescription": "Win with a 5-stack with 3+ champs with stealth"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'stealth' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.002,
      "MASTER": 0,
      "PLATINUM": 0.005,
      "GRANDMASTER": 0,
      "GOLD": 0.027,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      121,
      1,
      18,
      326,
      12,
      1623
    ]
  },
  {
    "id": 201001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 412,
      "MASTER": 150,
      "PLATINUM": 60,
      "GRANDMASTER": 265,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Get a Takedown (kill or assist) on the first turret of the game",
      "name": "Shoddy Construction",
      "shortDescription": "Take down the first turret"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "201000",
      "source": "EOGD"
    },
    "parent": "201000",
    "parentCategory": "2",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.033,
      "BRONZE": 0.195,
      "GOLD": 0.132,
      "IRON": 0.307,
      "GRANDMASTER": 0.004,
      "SILVER": 0.155,
      "CHALLENGER": 0.001,
      "MASTER": 0.018,
      "PLATINUM": 0.058
    },
    "leaderboardThresholds": [
      2456,
      1,
      412,
      13393,
      265,
      66958
    ]
  },
  {
    "id": 303406,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 35,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 18,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more \"poke\" champions",
      "name": "We're Good Over Here",
      "shortDescription": "Win with a 5-stack with 3+ poke champs"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'poke' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.022,
      "BRONZE": 0,
      "GOLD": 0.073,
      "IRON": 0,
      "GRANDMASTER": 0.003,
      "SILVER": 0,
      "CHALLENGER": 0.001,
      "MASTER": 0.013,
      "PLATINUM": 0.035
    },
    "leaderboardThresholds": [
      428,
      1,
      35,
      9789,
      18,
      48937
    ]
  },
  {
    "id": 201000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 300,
      "PLATINUM": 110,
      "DIAMOND": 200,
      "IRON": 5,
      "GOLD": 70,
      "SILVER": 30
    },
    "translation": {
      "description": "Earn points from challenges in the Adept group",
      "name": "Adept",
      "shortDescription": "Earn points from challenges in the Adept group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "2",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "2",
    "parentCategory": "0",
    "title": "Lethal",
    "percentiles": {
      "IRON": 0.32,
      "GRANDMASTER": 0,
      "MASTER": 0.007,
      "SILVER": 0.195,
      "NONE": 1,
      "PLATINUM": 0.065,
      "BRONZE": 0.253,
      "CHALLENGER": 0,
      "GOLD": 0.113,
      "DIAMOND": 0.026
    }
  },
  {
    "id": 303407,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 17,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 10,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions with a summon or a pet",
      "name": "Summoners on the Rift",
      "shortDescription": "Win with a 5-stack of champs with a summon or pet"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'summon' in @.abilities[*].traits[*] || 'pet' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0,
      "PLATINUM": 0,
      "BRONZE": 0
    },
    "leaderboardThresholds": [
      29,
      1,
      17,
      8,
      10,
      36
    ]
  },
  {
    "id": 303400,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 100,
      "MASTER": 950,
      "PLATINUM": 320,
      "DIAMOND": 580,
      "IRON": 50,
      "GOLD": 200,
      "SILVER": 150
    },
    "translation": {
      "description": "Earn points from challenges in the Harmony group",
      "name": "Harmony",
      "shortDescription": "Earn points from challenges in the Harmony group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "303000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303000",
    "parentCategory": "4",
    "title": "Harmonious",
    "percentiles": {
      "GOLD": 0.048,
      "NONE": 1,
      "BRONZE": 0.075,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.11,
      "PLATINUM": 0.027,
      "DIAMOND": 0.007,
      "GRANDMASTER": 0,
      "SILVER": 0.059
    }
  },
  {
    "id": 303401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 31,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 17,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with a global ability",
      "name": "Nowhere to Hide",
      "shortDescription": "Win with a 5-stack of champs with 3+ global abilities"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'global' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.018,
      "BRONZE": 0,
      "GOLD": 0.068,
      "IRON": 0,
      "GRANDMASTER": 0.003,
      "SILVER": 0,
      "CHALLENGER": 0.001,
      "MASTER": 0.01,
      "PLATINUM": 0.03
    },
    "leaderboardThresholds": [
      236,
      1,
      31,
      7677,
      17,
      38377
    ]
  },
  {
    "id": 303402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 86,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 36,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with an ultimate with a large Area of Effect",
      "name": "It Has \"Ultimate\" In the Name!",
      "shortDescription": "Win with a 5-stack with 3+ champs with a large AOE ult"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'largeAoe' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.012,
      "MASTER": 0.047,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.079,
      "BRONZE": 0,
      "CHALLENGER": 0.002,
      "GOLD": 0.123,
      "DIAMOND": 0.062
    },
    "leaderboardThresholds": [
      956,
      1,
      86,
      36131,
      36,
      180647
    ]
  },
  {
    "id": 201004,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 127,
      "MASTER": 48,
      "PLATINUM": 12,
      "GRANDMASTER": 79,
      "DIAMOND": 28,
      "GOLD": 5,
      "SILVER": 2
    },
    "translation": {
      "description": "Get 12 Takedowns (kill or assist) on enemy champions by 15 minutes",
      "name": "Death Incarnate",
      "shortDescription": "Take down 12 champions within 15 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "201000",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "201000",
    "parentCategory": "2",
    "percentiles": {
      "GOLD": 0.081,
      "NONE": 1,
      "BRONZE": 0.195,
      "MASTER": 0.004,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0.038,
      "DIAMOND": 0.011,
      "GRANDMASTER": 0.001,
      "SILVER": 0.139
    },
    "leaderboardThresholds": [
      693,
      1,
      127,
      2797,
      79,
      13977
    ]
  },
  {
    "id": 303403,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 25,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 14,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with a heal or shield. Self-heals and self-shields do not count",
      "name": "We Protec",
      "shortDescription": "Win with a 5-stack of 3+ champs with heals or shields. "
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'heal' in @.abilities[*].traits[*] || 'shield' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "MASTER": 0.003,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0.007,
      "NONE": 1,
      "GOLD": 0.045,
      "PLATINUM": 0.014,
      "BRONZE": 0
    },
    "leaderboardThresholds": [
      179,
      1,
      25,
      2305,
      14,
      11520
    ]
  },
  {
    "id": 303412,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 43,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 21,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with 2 or more immobilizing spells",
      "name": "Hold That Pose",
      "shortDescription": "Win with a 5-stack with 3+ champs with 2+ immobilizing spells"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      705,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( !(@.abilities[?( 'immobilizing' in @.traits )] size 0 || @.abilities[?( 'immobilizing' in @.traits )] size 1) )].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.005,
      "MASTER": 0.02,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.046,
      "BRONZE": 0,
      "CHALLENGER": 0.001,
      "GOLD": 0.085,
      "DIAMOND": 0.031
    },
    "leaderboardThresholds": [
      395,
      1,
      43,
      15629,
      21,
      78137
    ]
  },
  {
    "id": 401206,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 40,
      "PLATINUM": 20,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Earn Mastery 7 on different tanks",
      "name": "Master Tank",
      "shortDescription": "Get Mastery 7 on different tanks"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401200",
      "championQuery": "$[?( 'tank' in @.classes )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401200",
    "parentCategory": "3",
    "title": "Juggernaut",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.026,
      "GOLD": 0.002,
      "IRON": 0.078,
      "GRANDMASTER": 0,
      "SILVER": 0.011,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 401204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 30,
      "PLATINUM": 15,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Earn Mastery 7 on different marksmen",
      "name": "Master Marksman",
      "shortDescription": "Get Mastery 7 on different marksmen"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401200",
      "championQuery": "$[?( 'marksman' in @.classes )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401200",
    "parentCategory": "3",
    "title": "Deadeye",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.03,
      "GOLD": 0.005,
      "IRON": 0.074,
      "GRANDMASTER": 0,
      "SILVER": 0.017,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0.001
    }
  },
  {
    "id": 401205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "MASTER": 30,
      "PLATINUM": 15,
      "DIAMOND": 20,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "Earn Mastery 7 on different supports",
      "name": "Master Support",
      "shortDescription": "Get Mastery 7 on different supports"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401200",
      "championQuery": "$[?( 'support' in @.classes )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401200",
    "parentCategory": "3",
    "title": "Warden",
    "percentiles": {
      "BRONZE": 0.031,
      "MASTER": 0,
      "PLATINUM": 0.001,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0.086,
      "GRANDMASTER": 0,
      "GOLD": 0.003,
      "NONE": 1,
      "SILVER": 0.015
    }
  },
  {
    "id": 303408,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 24,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 10,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade of 5, win games as 5 champions of one class (assassin, mage, marksman, tank, support, or fighter)",
      "name": "Variety's Overrated",
      "shortDescription": "Win with a 5-stack of all one class"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.001,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.012,
      "DIAMOND": 0
    },
    "leaderboardThresholds": [
      97,
      1,
      24,
      43,
      10,
      209
    ]
  },
  {
    "id": 401202,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 70,
      "PLATINUM": 30,
      "DIAMOND": 50,
      "IRON": 1,
      "GOLD": 20,
      "SILVER": 12
    },
    "translation": {
      "description": "Earn Mastery 7 on different fighters",
      "name": "Master Fighter",
      "shortDescription": "Get Mastery 7 on different fighters"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401200",
      "championQuery": "$[?( 'fighter' in @.classes )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401200",
    "parentCategory": "3",
    "title": "Warlord",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0.023,
      "GOLD": 0.001,
      "IRON": 0.103,
      "GRANDMASTER": 0,
      "SILVER": 0.004,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 303409,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 28,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 16,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with a displacement",
      "name": "Get Over Here",
      "shortDescription": "Win with a 5-stack with 3+ champs with displacements"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      702,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'hook' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.002,
      "MASTER": 0.007,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0.024,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.059,
      "DIAMOND": 0.013
    },
    "leaderboardThresholds": [
      153,
      1,
      28,
      5134,
      16,
      25665
    ]
  },
  {
    "id": 401203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 65,
      "PLATINUM": 25,
      "DIAMOND": 45,
      "IRON": 1,
      "GOLD": 18,
      "SILVER": 12
    },
    "translation": {
      "description": "Earn Mastery 7 on different mages",
      "name": "Master Mage",
      "shortDescription": "Get Mastery 7 on different mages"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401200",
      "championQuery": "$[?( 'mage' in @.classes )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401200",
    "parentCategory": "3",
    "title": "Archmage",
    "percentiles": {
      "IRON": 0.101,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.003,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0.022,
      "CHALLENGER": 0,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 303410,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 19,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 12,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with a trap",
      "name": "It's a Trap!",
      "shortDescription": "Win with a 5-stack with 3+  champs with traps"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      703,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'trap' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0.007,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    },
    "leaderboardThresholds": [
      42,
      1,
      19,
      26,
      12,
      123
    ]
  },
  {
    "id": 401200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 30,
      "MASTER": 475,
      "PLATINUM": 160,
      "DIAMOND": 290,
      "IRON": 15,
      "GOLD": 100,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Virtuoso group",
      "name": "Virtuoso",
      "shortDescription": "Earn points from challenges in the Virtuoso group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401000",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401000",
    "parentCategory": "3",
    "title": "Peerless",
    "percentiles": {
      "BRONZE": 0.05,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0.101,
      "GRANDMASTER": 0,
      "GOLD": 0.002,
      "NONE": 1,
      "SILVER": 0.024
    }
  },
  {
    "id": 303411,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 17,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 10,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 3 or more champions with the ability to create terrain",
      "name": "I'm Helping",
      "shortDescription": "Win with a 5-stack of champs with 3+ champs with terrain creation"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      704,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303400",
      "championQuery": "$[?( 'terrainCreation' in @.abilities[*].traits[*])].id",
      "source": "EOGD"
    },
    "parent": "303400",
    "parentCategory": "4",
    "percentiles": {
      "GOLD": 0.003,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0
    },
    "leaderboardThresholds": [
      28,
      1,
      17,
      10,
      10,
      44
    ]
  },
  {
    "id": 401201,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 45,
      "PLATINUM": 25,
      "DIAMOND": 35,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Earn Mastery 7 on different assassins",
      "name": "Master Assassin",
      "shortDescription": "Get Mastery 7 on different assassins"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401200",
      "championQuery": "$[?( 'assassin' in @.classes )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "401200",
    "parentCategory": "3",
    "title": "Deathmaster",
    "percentiles": {
      "BRONZE": 0.016,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0.091,
      "GRANDMASTER": 0,
      "GOLD": 0.001,
      "NONE": 1,
      "SILVER": 0.004
    }
  },
  {
    "id": 302404,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 20,
      "CHALLENGER": 2500,
      "MASTER": 1000,
      "PLATINUM": 375,
      "GRANDMASTER": 1500,
      "DIAMOND": 675,
      "IRON": 5,
      "GOLD": 100,
      "SILVER": 50
    },
    "translation": {
      "description": "Get takedowns after teleporting into a fight involving 4 or more champions",
      "name": "Fashionably Late",
      "shortDescription": "Get a takedown after teleporting to a >4 champion fight"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302400",
      "source": "EOGD"
    },
    "parent": "302400",
    "parentCategory": "4",
    "title": "Party Crasher",
    "percentiles": {
      "BRONZE": 0.042,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0.094,
      "GOLD": 0.005,
      "NONE": 1,
      "SILVER": 0.016
    },
    "leaderboardThresholds": [
      0,
      0,
      0,
      1,
      1475,
      1
    ]
  },
  {
    "id": 204103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 881,
      "MASTER": 250,
      "PLATINUM": 75,
      "GRANDMASTER": 508,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 12
    },
    "translation": {
      "description": "Fully complete a support item quest (1000g) in less than 14 minutes",
      "name": "Support Subsidy",
      "shortDescription": "Fully complete your support quest in 14 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "204100",
      "source": "EOGD"
    },
    "parent": "204100",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0.118,
      "MASTER": 0.006,
      "CHALLENGER": 0,
      "PLATINUM": 0.024,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.011,
      "IRON": 0.205,
      "GOLD": 0.055,
      "NONE": 1,
      "SILVER": 0.082
    },
    "leaderboardThresholds": [
      3979,
      1,
      881,
      4269,
      508,
      21341
    ]
  },
  {
    "id": 302400,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 10,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Team Spirit group",
      "name": "Team Spirit",
      "shortDescription": "Earn points from challenges in the Team Spirit group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "302000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "302000",
    "parentCategory": "4",
    "title": "Spirited",
    "percentiles": {
      "IRON": 0.274,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.175,
      "NONE": 1,
      "PLATINUM": 0.055,
      "BRONZE": 0.228,
      "CHALLENGER": 0,
      "GOLD": 0.104,
      "DIAMOND": 0.022
    }
  },
  {
    "id": 204102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 995,
      "MASTER": 300,
      "PLATINUM": 75,
      "GRANDMASTER": 590,
      "DIAMOND": 150,
      "IRON": 5,
      "GOLD": 25,
      "SILVER": 15
    },
    "translation": {
      "description": "Have over 2 vision score per minute",
      "name": "All-Seeing",
      "shortDescription": "Have over 2 vision score per minute"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "204100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "204100",
    "parentCategory": "2",
    "title": "All-Seeing",
    "percentiles": {
      "IRON": 0.062,
      "GRANDMASTER": 0,
      "MASTER": 0.002,
      "SILVER": 0.036,
      "NONE": 1,
      "PLATINUM": 0.011,
      "BRONZE": 0.045,
      "CHALLENGER": 0,
      "GOLD": 0.026,
      "DIAMOND": 0.005
    },
    "leaderboardThresholds": [
      3810,
      1,
      995,
      1509,
      590,
      7538
    ]
  },
  {
    "id": 302401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 750,
      "MASTER": 300,
      "PLATINUM": 90,
      "GRANDMASTER": 500,
      "DIAMOND": 170,
      "IRON": 1,
      "GOLD": 35,
      "SILVER": 15
    },
    "translation": {
      "description": "Ace the enemy team with no allied deaths",
      "name": "Flawless Ace",
      "shortDescription": "Ace the enemy team with no allied deaths"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302400",
      "source": "EOGD"
    },
    "parent": "302400",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0.314,
      "GRANDMASTER": 0.001,
      "MASTER": 0.006,
      "SILVER": 0.149,
      "NONE": 1,
      "PLATINUM": 0.053,
      "BRONZE": 0.212,
      "CHALLENGER": 0,
      "GOLD": 0.103,
      "DIAMOND": 0.023
    },
    "leaderboardThresholds": [
      4581,
      1,
      749,
      906,
      499,
      10040
    ]
  },
  {
    "id": 204101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1500,
      "MASTER": 600,
      "PLATINUM": 150,
      "GRANDMASTER": 900,
      "DIAMOND": 300,
      "IRON": 3,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Finish your support quest at least 60 seconds faster than the enemy support",
      "name": "Superior Supporting",
      "shortDescription": "Finish your support quest faster than your opponent"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "204100",
      "source": "EOGD"
    },
    "parent": "204100",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.053,
      "IRON": 0.142,
      "DIAMOND": 0.003,
      "NONE": 1,
      "GOLD": 0.032,
      "PLATINUM": 0.01,
      "BRONZE": 0.087
    },
    "leaderboardThresholds": [
      3369,
      1,
      1498,
      194,
      899,
      2138
    ]
  },
  {
    "id": 302402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 12,
      "CHALLENGER": 1779,
      "MASTER": 650,
      "PLATINUM": 200,
      "GRANDMASTER": 1157,
      "DIAMOND": 400,
      "IRON": 3,
      "GOLD": 75,
      "SILVER": 30
    },
    "translation": {
      "description": "Get a takedown where your entire team participates (gets the kill or an assist)",
      "name": "Making the Dream Work",
      "shortDescription": "Get a takedown with your entire team"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "302400",
      "source": "EOGD"
    },
    "parent": "302400",
    "parentCategory": "4",
    "percentiles": {
      "GOLD": 0.127,
      "NONE": 1,
      "BRONZE": 0.217,
      "MASTER": 0.022,
      "CHALLENGER": 0.001,
      "IRON": 0.287,
      "PLATINUM": 0.078,
      "DIAMOND": 0.043,
      "GRANDMASTER": 0.005,
      "SILVER": 0.172
    },
    "leaderboardThresholds": [
      7556,
      1,
      1779,
      16588,
      1157,
      82936
    ]
  },
  {
    "id": 204100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 10,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Cornerstone group",
      "name": "Cornerstone",
      "shortDescription": "Earn points from challenges in the Cornerstone group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "204000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "204000",
    "parentCategory": "2",
    "title": "Cornerstone",
    "percentiles": {
      "SILVER": 0.084,
      "CHALLENGER": 0,
      "DIAMOND": 0.008,
      "MASTER": 0.001,
      "PLATINUM": 0.021,
      "GRANDMASTER": 0,
      "GOLD": 0.044,
      "BRONZE": 0.119,
      "IRON": 0.143,
      "NONE": 1
    }
  },
  {
    "id": 101201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1000,
      "CHALLENGER": 129282,
      "MASTER": 45000,
      "PLATINUM": 15000,
      "GRANDMASTER": 81488,
      "DIAMOND": 30000,
      "IRON": 200,
      "GOLD": 5000,
      "SILVER": 2500
    },
    "translation": {
      "description": "Hit skillshots (ranged untargeted abilities) on champions in ARAM",
      "name": "Another Day, Another Bullseye",
      "shortDescription": "Hit skillshots on champions"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101200",
      "source": "EOGD"
    },
    "parent": "101200",
    "parentCategory": "1",
    "percentiles": {
      "IRON": 0.192,
      "GRANDMASTER": 0.003,
      "MASTER": 0.011,
      "SILVER": 0.106,
      "NONE": 1,
      "PLATINUM": 0.044,
      "BRONZE": 0.136,
      "CHALLENGER": 0.001,
      "GOLD": 0.083,
      "DIAMOND": 0.022
    },
    "leaderboardThresholds": [
      506708,
      1,
      129282,
      8736,
      81488,
      43675
    ]
  },
  {
    "id": 101200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 30,
      "MASTER": 400,
      "PLATINUM": 140,
      "DIAMOND": 250,
      "IRON": 10,
      "GOLD": 90,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the ARAM Finesse group",
      "name": "ARAM Finesse",
      "shortDescription": "Earn points from challenges in the ARAM Finesse group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "101000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101000",
    "parentCategory": "1",
    "title": "Swift",
    "percentiles": {
      "BRONZE": 0.156,
      "MASTER": 0.007,
      "PLATINUM": 0.061,
      "CHALLENGER": 0,
      "DIAMOND": 0.024,
      "IRON": 0.205,
      "GRANDMASTER": 0,
      "GOLD": 0.092,
      "NONE": 1,
      "SILVER": 0.133
    }
  },
  {
    "id": 101203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 12970,
      "MASTER": 3000,
      "PLATINUM": 600,
      "GRANDMASTER": 6986,
      "DIAMOND": 1200,
      "IRON": 15,
      "GOLD": 300,
      "SILVER": 150
    },
    "translation": {
      "description": "Hit snowballs on champions in ARAM",
      "name": "Snow Day",
      "shortDescription": "Hit snowballs on champions"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101200",
      "source": "EOGD"
    },
    "parent": "101200",
    "parentCategory": "1",
    "title": "Avalanche",
    "percentiles": {
      "BRONZE": 0.139,
      "MASTER": 0.018,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.064,
      "GRANDMASTER": 0.004,
      "DIAMOND": 0.043,
      "IRON": 0.175,
      "GOLD": 0.085,
      "NONE": 1,
      "SILVER": 0.106
    },
    "leaderboardThresholds": [
      121565,
      1,
      12970,
      13690,
      6986,
      68446
    ]
  },
  {
    "id": 101202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1200,
      "CHALLENGER": 183569,
      "MASTER": 78000,
      "PLATINUM": 21600,
      "GRANDMASTER": 124368,
      "DIAMOND": 44000,
      "IRON": 300,
      "GOLD": 7200,
      "SILVER": 3600
    },
    "translation": {
      "description": "Dodge skillshots (ranged untargeted abilities) in ARAM",
      "name": "It was a... Near-Hit",
      "shortDescription": "Dodge skillshots"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101200",
      "source": "EOGD"
    },
    "parent": "101200",
    "parentCategory": "1",
    "percentiles": {
      "IRON": 0.197,
      "GRANDMASTER": 0.002,
      "MASTER": 0.007,
      "SILVER": 0.108,
      "NONE": 1,
      "PLATINUM": 0.045,
      "BRONZE": 0.145,
      "CHALLENGER": 0,
      "GOLD": 0.085,
      "DIAMOND": 0.02
    },
    "leaderboardThresholds": [
      827680,
      1,
      183569,
      5167,
      124368,
      25828
    ]
  },
  {
    "id": 101205,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 97,
      "MASTER": 30,
      "PLATINUM": 9,
      "GRANDMASTER": 53,
      "DIAMOND": 18,
      "GOLD": 4,
      "SILVER": 2
    },
    "translation": {
      "description": "Successfully Execute to the outer turret before 10 minutes in ARAM",
      "name": "Free Ticket to Base",
      "shortDescription": "Execute to turret before 10 min"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101200",
      "source": "EOGD"
    },
    "parent": "101200",
    "parentCategory": "1",
    "percentiles": {
      "BRONZE": 0.111,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "PLATINUM": 0.021,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.008,
      "IRON": 0,
      "GOLD": 0.048,
      "NONE": 1,
      "SILVER": 0.077
    },
    "leaderboardThresholds": [
      7885,
      1,
      97,
      2285,
      53,
      11417
    ]
  },
  {
    "id": 101204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 900,
      "MASTER": 54000,
      "PLATINUM": 17000,
      "DIAMOND": 30000,
      "IRON": 225,
      "GOLD": 5000,
      "SILVER": 2250
    },
    "translation": {
      "description": "Kill minions in ARAM",
      "name": "Free Money",
      "shortDescription": "Kill minions"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101200",
      "priority": ".1",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101200",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.023,
      "BRONZE": 0.143,
      "GOLD": 0.086,
      "IRON": 0.193,
      "GRANDMASTER": 0,
      "SILVER": 0.113,
      "CHALLENGER": 0,
      "MASTER": 0.009,
      "PLATINUM": 0.042
    }
  },
  {
    "id": 101206,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 1
    },
    "translation": {
      "description": "Cause a Poro to explode in ARAM",
      "name": "Pop Goes the Poro",
      "shortDescription": "Cause a Poro to explode"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101200",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101200",
    "parentCategory": "1",
    "title": "Poroyalty",
    "percentiles": {
      "GOLD": 0,
      "NONE": 1,
      "BRONZE": 0.142,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0
    }
  },
  {
    "id": 203103,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1
    },
    "translation": {
      "description": "Cleanse yourself or someone else of an immobilizing effect (using Summoner Spell Cleanse, Quicksilver, or Mikael's Blessing) within 0.25s of the effect start",
      "name": "Captain Jack",
      "shortDescription": "Cleanse an immobilizing effect within 0.25s"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203100",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "203100",
    "parentCategory": "2",
    "title": "Captain Jack",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.064,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0,
      "PLATINUM": 0,
      "BRONZE": 0
    }
  },
  {
    "id": 203102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 20,
      "CHALLENGER": 8008,
      "MASTER": 1000,
      "PLATINUM": 350,
      "GRANDMASTER": 4144,
      "DIAMOND": 600,
      "IRON": 5,
      "GOLD": 120,
      "SILVER": 45
    },
    "translation": {
      "description": "Dodge five skillshots (ranged untargeted abilities) within eight seconds",
      "name": "The Jukes!",
      "shortDescription": "Dodge five skillshots within eight seconds"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203100",
      "source": "EOGD"
    },
    "parent": "203100",
    "parentCategory": "2",
    "title": "Fancy Feet",
    "percentiles": {
      "BRONZE": 0.293,
      "MASTER": 0.091,
      "CHALLENGER": 0.005,
      "PLATINUM": 0.145,
      "GRANDMASTER": 0.023,
      "DIAMOND": 0.117,
      "IRON": 0.344,
      "GOLD": 0.201,
      "NONE": 1,
      "SILVER": 0.253
    },
    "leaderboardThresholds": [
      47971,
      1,
      8008,
      69831,
      4144,
      349148
    ]
  },
  {
    "id": 203101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 205,
      "MASTER": 50,
      "PLATINUM": 12,
      "GRANDMASTER": 105,
      "DIAMOND": 25,
      "GOLD": 5,
      "SILVER": 2
    },
    "translation": {
      "description": "Land 20 skillshots (ranged untargeted abilities) before seven minutes",
      "name": "Can't Miss",
      "shortDescription": "Land 20 skillshots before seven minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203100",
      "source": "EOGD"
    },
    "parent": "203100",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0.174,
      "MASTER": 0.01,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.049,
      "GRANDMASTER": 0.003,
      "DIAMOND": 0.025,
      "IRON": 0,
      "GOLD": 0.084,
      "NONE": 1,
      "SILVER": 0.131
    },
    "leaderboardThresholds": [
      3141,
      1,
      205,
      7785,
      105,
      38921
    ]
  },
  {
    "id": 203100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 20,
      "MASTER": 400,
      "PLATINUM": 145,
      "DIAMOND": 250,
      "IRON": 5,
      "GOLD": 95,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Flair group",
      "name": "Flair",
      "shortDescription": "Earn points from challenges in the Flair group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "203000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "203000",
    "parentCategory": "2",
    "title": "Show-Off",
    "percentiles": {
      "SILVER": 0.18,
      "CHALLENGER": 0,
      "DIAMOND": 0.023,
      "MASTER": 0.001,
      "PLATINUM": 0.087,
      "GRANDMASTER": 0,
      "GOLD": 0.119,
      "BRONZE": 0.252,
      "IRON": 0.356,
      "NONE": 1
    }
  },
  {
    "id": 203106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 259,
      "MASTER": 73,
      "PLATINUM": 23,
      "GRANDMASTER": 138,
      "DIAMOND": 43,
      "GOLD": 8,
      "SILVER": 3
    },
    "translation": {
      "description": "Kill two players with the same ability cast",
      "name": "One Stone",
      "shortDescription": "Kill two players with one ability cast"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203100",
      "source": "EOGD"
    },
    "parent": "203100",
    "parentCategory": "2",
    "percentiles": {
      "GOLD": 0.084,
      "NONE": 1,
      "BRONZE": 0.203,
      "MASTER": 0.008,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0.039,
      "DIAMOND": 0.02,
      "GRANDMASTER": 0.002,
      "SILVER": 0.133
    },
    "leaderboardThresholds": [
      2712,
      1,
      259,
      6404,
      138,
      32013
    ]
  },
  {
    "id": 203105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 89,
      "MASTER": 25,
      "PLATINUM": 8,
      "GRANDMASTER": 48,
      "DIAMOND": 13,
      "GOLD": 3,
      "SILVER": 1
    },
    "translation": {
      "description": "Fully stack Mejai's Soulstealer before 20 minutes",
      "name": "Stacks on Stacks on Stacks",
      "shortDescription": "Fully stack Mejai's before 20 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203100",
      "source": "EOGD"
    },
    "parent": "203100",
    "parentCategory": "2",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.003,
      "BRONZE": 0,
      "GOLD": 0.019,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.052,
      "CHALLENGER": 0,
      "MASTER": 0.001,
      "PLATINUM": 0.006
    },
    "leaderboardThresholds": [
      528,
      1,
      89,
      818,
      48,
      4086
    ]
  },
  {
    "id": 203104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 300,
      "MASTER": 75,
      "PLATINUM": 20,
      "GRANDMASTER": 150,
      "DIAMOND": 40,
      "IRON": 1,
      "GOLD": 8,
      "SILVER": 3
    },
    "translation": {
      "description": "Steal an Epic jungle monster without using Summoner Smite. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "TY for Leash",
      "shortDescription": "Steal an Epic Monster without Smite"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203100",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.181,
      "GRANDMASTER": 0,
      "MASTER": 0.002,
      "SILVER": 0.113,
      "NONE": 1,
      "PLATINUM": 0.025,
      "BRONZE": 0.136,
      "CHALLENGER": 0,
      "GOLD": 0.062,
      "DIAMOND": 0.008
    },
    "leaderboardThresholds": [
      1150,
      1,
      299,
      189,
      149,
      3135
    ]
  },
  {
    "id": 202103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 328,
      "MASTER": 125,
      "PLATINUM": 30,
      "GRANDMASTER": 213,
      "DIAMOND": 70,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 5
    },
    "translation": {
      "description": "End the early laning phase (7 minutes) with 20% more gold and experience than your role opponent",
      "name": "Lane Command",
      "shortDescription": "Be up 20% gold and XP at 7min"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202100",
      "source": "EOGD"
    },
    "parent": "202100",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.296,
      "GRANDMASTER": 0.003,
      "MASTER": 0.013,
      "SILVER": 0.182,
      "NONE": 1,
      "PLATINUM": 0.075,
      "BRONZE": 0.244,
      "CHALLENGER": 0.001,
      "GOLD": 0.139,
      "DIAMOND": 0.033
    },
    "leaderboardThresholds": [
      1926,
      1,
      328,
      9767,
      213,
      48830
    ]
  },
  {
    "id": 202102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 460,
      "MASTER": 180,
      "PLATINUM": 50,
      "GRANDMASTER": 302,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 20,
      "SILVER": 8
    },
    "translation": {
      "description": "End the laning phase (14 minutes) with 20% more gold and experience than your role opponent",
      "name": "Lane Domination",
      "shortDescription": "Be up 20% gold and XP at 14min"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202100",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.308,
      "GRANDMASTER": 0.003,
      "MASTER": 0.011,
      "SILVER": 0.168,
      "NONE": 1,
      "PLATINUM": 0.064,
      "BRONZE": 0.231,
      "CHALLENGER": 0.001,
      "GOLD": 0.114,
      "DIAMOND": 0.031
    },
    "leaderboardThresholds": [
      2435,
      1,
      460,
      8601,
      302,
      42998
    ]
  },
  {
    "id": 202101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 250,
      "MASTER": 60,
      "PLATINUM": 20,
      "GRANDMASTER": 103,
      "DIAMOND": 35,
      "GOLD": 8,
      "SILVER": 4
    },
    "translation": {
      "description": "Win games where you were at least 100CS ahead of your role opponent at any point in the game",
      "name": "Flame Horizon",
      "shortDescription": "Win games with 100+ more CS than role opponent"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202100",
    "parentCategory": "2",
    "title": "Spitfire",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0.001,
      "MASTER": 0.004,
      "SILVER": 0.096,
      "NONE": 1,
      "PLATINUM": 0.025,
      "BRONZE": 0.19,
      "CHALLENGER": 0,
      "GOLD": 0.06,
      "DIAMOND": 0.011
    },
    "leaderboardThresholds": [
      1307,
      1,
      249,
      704,
      103,
      15463
    ]
  },
  {
    "id": 202100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 400,
      "PLATINUM": 135,
      "DIAMOND": 240,
      "IRON": 10,
      "GOLD": 85,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Domination group",
      "name": "Domination",
      "shortDescription": "Earn points from challenges in the Domination group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "202000",
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202000",
    "parentCategory": "2",
    "title": "Dominant",
    "percentiles": {
      "SILVER": 0.214,
      "CHALLENGER": 0,
      "DIAMOND": 0.028,
      "MASTER": 0.008,
      "PLATINUM": 0.073,
      "GRANDMASTER": 0,
      "GOLD": 0.127,
      "BRONZE": 0.257,
      "IRON": 0.318,
      "NONE": 1
    }
  },
  {
    "id": 202105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 4,
      "CHALLENGER": 575,
      "MASTER": 240,
      "PLATINUM": 75,
      "GRANDMASTER": 387,
      "DIAMOND": 135,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "Earn a three or more level lead over your role opponent at any point in the game",
      "name": "On Another Level",
      "shortDescription": "Be up three more levels than role opponent at any point"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202100",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.318,
      "GRANDMASTER": 0.002,
      "MASTER": 0.009,
      "SILVER": 0.165,
      "NONE": 1,
      "PLATINUM": 0.053,
      "BRONZE": 0.222,
      "CHALLENGER": 0,
      "GOLD": 0.112,
      "DIAMOND": 0.026
    },
    "leaderboardThresholds": [
      2538,
      1,
      575,
      6856,
      387,
      34276
    ]
  },
  {
    "id": 202104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1212,
      "MASTER": 500,
      "PLATINUM": 125,
      "GRANDMASTER": 813,
      "DIAMOND": 300,
      "IRON": 3,
      "GOLD": 45,
      "SILVER": 20
    },
    "translation": {
      "description": "End the game with 20% more vision score than your role opponent",
      "name": "The Brush Has Eyes",
      "shortDescription": "Finish a game up 20% Vision Score"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202100",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202100",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0.011,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "SILVER": 0.167,
      "IRON": 0.279,
      "DIAMOND": 0.028,
      "NONE": 1,
      "GOLD": 0.123,
      "PLATINUM": 0.069,
      "BRONZE": 0.206
    },
    "leaderboardThresholds": [
      5093,
      1,
      1212,
      8340,
      813,
      41694
    ]
  },
  {
    "id": 103301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 8,
      "PLATINUM": 3,
      "DIAMOND": 5,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Get multikills with the Elder Dragon Buff",
      "name": "Dragon's Fury",
      "shortDescription": "Get multikills with Elder Dragon"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103300",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.021,
      "BRONZE": 0,
      "GOLD": 0.065,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.109,
      "CHALLENGER": 0,
      "MASTER": 0.008,
      "PLATINUM": 0.043
    }
  },
  {
    "id": 103300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 325,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 5,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Tactician group",
      "name": "Tactician",
      "shortDescription": "Earn points from challenges in the Tactician group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "103000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103000",
    "parentCategory": "1",
    "title": "Tactical",
    "percentiles": {
      "SILVER": 0.141,
      "CHALLENGER": 0,
      "DIAMOND": 0.018,
      "MASTER": 0,
      "PLATINUM": 0.048,
      "GRANDMASTER": 0,
      "GOLD": 0.078,
      "BRONZE": 0.213,
      "IRON": 0.276,
      "NONE": 1
    }
  },
  {
    "id": 103303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 400,
      "MASTER": 150,
      "PLATINUM": 45,
      "GRANDMASTER": 250,
      "DIAMOND": 80,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 7
    },
    "translation": {
      "description": "Take down junglers near a damaged Epic Monster before it is killed. Epic Monsters include Dragons, the Rift Herald, and Baron Nashor.",
      "name": "Target Selection",
      "shortDescription": "Take down junglers near a damaged Epic Monster"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103300",
      "source": "EOGD"
    },
    "parent": "103300",
    "parentCategory": "1",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.036,
      "BRONZE": 0.208,
      "GOLD": 0.12,
      "IRON": 0.274,
      "GRANDMASTER": 0.003,
      "SILVER": 0.161,
      "CHALLENGER": 0,
      "MASTER": 0.012,
      "PLATINUM": 0.063
    },
    "leaderboardThresholds": [
      1434,
      1,
      399,
      5985,
      249,
      44922
    ]
  },
  {
    "id": 103302,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 15,
      "PLATINUM": 6,
      "DIAMOND": 12,
      "GOLD": 3,
      "SILVER": 1
    },
    "translation": {
      "description": "Kill Baron Nashor solo",
      "name": "Nashor Slasher",
      "shortDescription": "Kill Baron Nashor solo"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103300",
      "priority": "50",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103300",
    "parentCategory": "1",
    "percentiles": {
      "SILVER": 0.032,
      "CHALLENGER": 0,
      "DIAMOND": 0.001,
      "MASTER": 0.001,
      "PLATINUM": 0.003,
      "GRANDMASTER": 0,
      "GOLD": 0.008,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 303500,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 100,
      "MASTER": 1050,
      "PLATINUM": 385,
      "DIAMOND": 620,
      "IRON": 50,
      "GOLD": 215,
      "SILVER": 150
    },
    "translation": {
      "description": "Earn points from challenges in the Globetrotter group",
      "name": "Globetrotter",
      "shortDescription": "Earn points from challenges in the Globetrotter group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "303000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303000",
    "parentCategory": "4",
    "title": "Runeterran",
    "percentiles": {
      "GOLD": 0,
      "NONE": 1,
      "BRONZE": 0.001,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.003,
      "PLATINUM": 0,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.001
    }
  },
  {
    "id": 103304,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 1
    },
    "translation": {
      "description": "Do at least 2000 damage and destroy the enemy nexus while outnumbered by enemy champions",
      "name": "The Disrespect",
      "shortDescription": "Destroy the enemy nexus while outnumbered"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "103300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "103300",
    "parentCategory": "1",
    "title": "Disrespectful",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.005,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 303501,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Bandle City",
      "name": "5 Under 5'",
      "shortDescription": "Win with a 5-stack of champs from Bandle City"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'bandlecity' || @.tags.race == 'yordle')].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.002,
      "DIAMOND": 0
    }
  },
  {
    "id": 303502,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Bilgewater",
      "name": "All Hands on Deck",
      "shortDescription": "Win with a 5-stack of champs from Bilgewater"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'bilgewater' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0.001,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 303503,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Demacia",
      "name": "FOR DEMACIA",
      "shortDescription": "Win with a 5-stack of champs from Demacia"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'demacia' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0.002,
      "PLATINUM": 0,
      "BRONZE": 0
    }
  },
  {
    "id": 303508,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Piltover",
      "name": "Calculated",
      "shortDescription": "Win with a 5-stack of champs from Piltover"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'piltover' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 401302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 1000,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 500,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Win games as a Support",
      "name": "Support Diff",
      "shortDescription": "Win games as a Support"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401300",
      "source": "EOGD"
    },
    "parent": "401300",
    "parentCategory": "3",
    "title": "Support Diff",
    "percentiles": {
      "IRON": 0.102,
      "GRANDMASTER": 0.001,
      "MASTER": 0.013,
      "SILVER": 0.039,
      "NONE": 1,
      "PLATINUM": 0.021,
      "BRONZE": 0.056,
      "CHALLENGER": 0,
      "GOLD": 0.027,
      "DIAMOND": 0.016
    },
    "leaderboardThresholds": [
      3647,
      1,
      999,
      1812,
      499,
      21100
    ]
  },
  {
    "id": 303509,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from the Shadow Isles",
      "name": "Spooky Scary Skeletons",
      "shortDescription": "Win with a 5-stack of champs from the Shadow Isles"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'shadowisles' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 401303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 1000,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 500,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Win games as a Bot Carry",
      "name": "Bot Diff",
      "shortDescription": "Win games as a Bot Carry"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401300",
      "source": "EOGD"
    },
    "parent": "401300",
    "parentCategory": "3",
    "title": "Bot Diff",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.016,
      "BRONZE": 0.06,
      "GOLD": 0.029,
      "IRON": 0.107,
      "GRANDMASTER": 0.001,
      "SILVER": 0.041,
      "CHALLENGER": 0,
      "MASTER": 0.012,
      "PLATINUM": 0.021
    },
    "leaderboardThresholds": [
      2651,
      1,
      999,
      1373,
      499,
      16484
    ]
  },
  {
    "id": 303510,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Shurima",
      "name": "The Sun Disc Never Sets",
      "shortDescription": "Win with a 5-stack of champs from Shurima"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'shurima' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "GOLD": 0.001,
      "NONE": 1,
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0,
      "PLATINUM": 0,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0
    }
  },
  {
    "id": 401300,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 690,
      "MASTER": 475,
      "PLATINUM": 160,
      "GRANDMASTER": 570,
      "DIAMOND": 290,
      "IRON": 15,
      "GOLD": 100,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Ace group",
      "name": "Ace",
      "shortDescription": "Earn points from challenges in the Ace group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "401000",
      "isCapstone": "Y",
      "source": "CHALLENGES"
    },
    "parent": "401000",
    "parentCategory": "3",
    "title": "Just Better",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.083,
      "IRON": 0.137,
      "DIAMOND": 0.006,
      "NONE": 1,
      "GOLD": 0.056,
      "PLATINUM": 0.024,
      "BRONZE": 0.1
    },
    "leaderboardThresholds": [
      0,
      0,
      600,
      1,
      560,
      577
    ]
  },
  {
    "id": 303511,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Targon",
      "name": "Peak Performance",
      "shortDescription": "Win with a 5-stack of champs from Targon"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'mttargon' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 401301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 1000,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 500,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Win games as a Jungler",
      "name": "Jungle Diff",
      "shortDescription": "Win games as a Jungler"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401300",
      "source": "EOGD"
    },
    "parent": "401300",
    "parentCategory": "3",
    "title": "Jungle Diff",
    "percentiles": {
      "BRONZE": 0.06,
      "MASTER": 0.013,
      "PLATINUM": 0.022,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "IRON": 0.103,
      "GRANDMASTER": 0.001,
      "GOLD": 0.029,
      "NONE": 1,
      "SILVER": 0.042
    },
    "leaderboardThresholds": [
      3838,
      1,
      999,
      1389,
      499,
      16749
    ]
  },
  {
    "id": 303504,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from the Freljord",
      "name": "Ice, Ice, Baby",
      "shortDescription": "Win with a 5-stack of champs from the Freljord"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'freljord' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.002,
      "DIAMOND": 0
    }
  },
  {
    "id": 303505,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Ionia",
      "name": "Everybody was Wuju Fighting",
      "shortDescription": "Win with a 5-stack of champs from Ionia"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'ionia' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0.002,
      "DIAMOND": 0
    }
  },
  {
    "id": 303506,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Ixtal",
      "name": "Elemental, My Dear Watson",
      "shortDescription": "Win with a 5-stack of champs from Ixtal"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'ixtal' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0.001,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 303507,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Noxus",
      "name": "Strength Above All",
      "shortDescription": "Win with a 5-stack of champs from Noxus"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'noxus' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0.001,
      "IRON": 0,
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 303000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 60,
      "MASTER": 2950,
      "PLATINUM": 1030,
      "DIAMOND": 1775,
      "IRON": 30,
      "GOLD": 620,
      "SILVER": 90
    },
    "translation": {
      "description": "Earn points from challenges in the Clash, Synchronicity, Harmony, and Globetrotter groups",
      "name": "Alliance",
      "shortDescription": "Earn points from challenges in the Clash, Synchronicity, Harmony, and Globetrotter groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "4",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "4",
    "parentCategory": "0",
    "title": "Team Player",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.103,
      "IRON": 0.156,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0.015,
      "PLATINUM": 0.002,
      "BRONZE": 0.122
    }
  },
  {
    "id": 303512,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from the Void",
      "name": "(Inhuman Screeching Sounds)",
      "shortDescription": "Win with a 5-stack of champs from the Void"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'void' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0,
      "NONE": 1,
      "GOLD": 0.001,
      "PLATINUM": 0,
      "BRONZE": 0
    }
  },
  {
    "id": 401306,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 365,
      "MASTER": 115,
      "PLATINUM": 65,
      "GRANDMASTER": 215,
      "DIAMOND": 90,
      "IRON": 5,
      "GOLD": 40,
      "SILVER": 20
    },
    "translation": {
      "description": "Win games queued as Fill, where you play the position you filled into",
      "name": "Player Diff",
      "shortDescription": "Win games queued as Fill"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401300",
      "source": "EOGD"
    },
    "parent": "401300",
    "parentCategory": "3",
    "title": "Player Diff",
    "percentiles": {
      "BRONZE": 0.034,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "PLATINUM": 0.007,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.004,
      "IRON": 0.049,
      "GOLD": 0.012,
      "NONE": 1,
      "SILVER": 0.021
    },
    "leaderboardThresholds": [
      1802,
      1,
      365,
      2101,
      215,
      10497
    ]
  },
  {
    "id": 303513,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 10,
      "PLATINUM": 3,
      "DIAMOND": 6,
      "GOLD": 1
    },
    "translation": {
      "description": "As a premade 5, win games with 5 champions from Zaun",
      "name": "Chemtech Comrades",
      "shortDescription": "Win with a 5-stack of champs from Zaun"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "303500",
      "championQuery": "$[?( @.tags.faction == 'zaun' )].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "303500",
    "parentCategory": "4",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0.001,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 401304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 1000,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 500,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Win games as Mid",
      "name": "Mid Diff",
      "shortDescription": "Win games as Mid"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401300",
      "source": "EOGD"
    },
    "parent": "401300",
    "parentCategory": "3",
    "title": "Mid Diff",
    "percentiles": {
      "BRONZE": 0.06,
      "MASTER": 0.013,
      "CHALLENGER": 0,
      "PLATINUM": 0.022,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.016,
      "IRON": 0.106,
      "GOLD": 0.029,
      "NONE": 1,
      "SILVER": 0.042
    },
    "leaderboardThresholds": [
      3636,
      1,
      999,
      905,
      499,
      14648
    ]
  },
  {
    "id": 401305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 30,
      "CHALLENGER": 1000,
      "MASTER": 150,
      "PLATINUM": 100,
      "GRANDMASTER": 500,
      "DIAMOND": 125,
      "IRON": 10,
      "GOLD": 75,
      "SILVER": 50
    },
    "translation": {
      "description": "Win games as Top",
      "name": "Top Diff",
      "shortDescription": "Win games as Top"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "401300",
      "source": "EOGD"
    },
    "parent": "401300",
    "parentCategory": "3",
    "title": "Top Diff",
    "percentiles": {
      "BRONZE": 0.059,
      "MASTER": 0.013,
      "PLATINUM": 0.021,
      "CHALLENGER": 0,
      "DIAMOND": 0.016,
      "IRON": 0.105,
      "GRANDMASTER": 0.001,
      "GOLD": 0.029,
      "NONE": 1,
      "SILVER": 0.041
    },
    "leaderboardThresholds": [
      3036,
      1,
      999,
      1274,
      499,
      16556
    ]
  },
  {
    "id": 601001,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 3,
      "CHALLENGER": 90,
      "MASTER": 40,
      "PLATINUM": 15,
      "GRANDMASTER": 60,
      "DIAMOND": 25,
      "IRON": 1,
      "GOLD": 10,
      "SILVER": 6
    },
    "translation": {
      "description": "Deal the most damage to champions in the game",
      "name": "Cream of the Crop",
      "shortDescription": "Deal the most damage to champions in the game"
    },
    "reversed": false,
    "queueIds": [
      1700,
      1701,
      1704
    ],
    "tags": {
      "parent": "601000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "601000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.04,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.013,
      "NONE": 1,
      "PLATINUM": 0.004,
      "BRONZE": 0.022,
      "CHALLENGER": 0,
      "GOLD": 0.007,
      "DIAMOND": 0.001
    }
  },
  {
    "id": 601000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 20,
      "MASTER": 400,
      "PLATINUM": 145,
      "DIAMOND": 250,
      "IRON": 5,
      "GOLD": 95,
      "SILVER": 45
    },
    "translation": {
      "description": "Earn points from challenges in the Arena Brawler Group",
      "name": "Arena Brawler",
      "shortDescription": "Deal the most damage to champions in the game"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "title": "Arena Brawler",
    "percentiles": {
      "SILVER": 0.046,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "MASTER": 0.009,
      "PLATINUM": 0.026,
      "GRANDMASTER": 0,
      "GOLD": 0.033,
      "BRONZE": 0.058,
      "IRON": 0.069,
      "NONE": 1
    }
  },
  {
    "id": 601003,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 100,
      "MASTER": 40,
      "PLATINUM": 20,
      "GRANDMASTER": 65,
      "DIAMOND": 28,
      "IRON": 2,
      "GOLD": 14,
      "SILVER": 9
    },
    "translation": {
      "description": "Get double kills",
      "name": "Double Down",
      "shortDescription": "Get double kills"
    },
    "reversed": false,
    "queueIds": [
      1700,
      1701,
      1704
    ],
    "tags": {
      "parent": "601000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "601000",
    "parentCategory": "0",
    "percentiles": {
      "MASTER": 0.012,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.033,
      "IRON": 0.056,
      "DIAMOND": 0.017,
      "NONE": 1,
      "GOLD": 0.026,
      "PLATINUM": 0.021,
      "BRONZE": 0.042
    }
  },
  {
    "id": 601002,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 300,
      "MASTER": 140,
      "PLATINUM": 60,
      "GRANDMASTER": 200,
      "DIAMOND": 90,
      "IRON": 4,
      "GOLD": 32,
      "SILVER": 18
    },
    "translation": {
      "description": "Dodge five skillshots (ranged untargeted abilities) within eight seconds",
      "name": "Dancing Shoes",
      "shortDescription": "Dodge five skillshots within eight seconds"
    },
    "reversed": false,
    "queueIds": [
      1700,
      1701,
      1704
    ],
    "tags": {
      "parent": "601000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "601000",
    "parentCategory": "0",
    "percentiles": {
      "SILVER": 0.049,
      "CHALLENGER": 0,
      "DIAMOND": 0.027,
      "MASTER": 0.021,
      "PLATINUM": 0.033,
      "GRANDMASTER": 0,
      "GOLD": 0.042,
      "BRONZE": 0.055,
      "IRON": 0.062,
      "NONE": 1
    }
  },
  {
    "id": 601005,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 70,
      "MASTER": 35,
      "PLATINUM": 14,
      "GRANDMASTER": 50,
      "DIAMOND": 22,
      "IRON": 1,
      "GOLD": 8,
      "SILVER": 4
    },
    "translation": {
      "description": "Get kills while more enemy champions than friendly ones are nearby",
      "name": "Outplaying the Odds",
      "shortDescription": "Get kills while outnumbered"
    },
    "reversed": false,
    "queueIds": [
      1700,
      1701,
      1704
    ],
    "tags": {
      "parent": "601000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "601000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.055,
      "GRANDMASTER": 0,
      "MASTER": 0.006,
      "SILVER": 0.034,
      "NONE": 1,
      "PLATINUM": 0.016,
      "BRONZE": 0.045,
      "CHALLENGER": 0,
      "GOLD": 0.024,
      "DIAMOND": 0.011
    }
  },
  {
    "id": 601004,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 70,
      "MASTER": 36,
      "PLATINUM": 15,
      "GRANDMASTER": 50,
      "DIAMOND": 24,
      "GOLD": 9,
      "SILVER": 5
    },
    "translation": {
      "description": "Take 10000 pre-mitigation damage from champions in a single fight without dying",
      "name": "The Wall",
      "shortDescription": "Take 10k damage in a fight and survive"
    },
    "reversed": false,
    "queueIds": [
      1700,
      1701,
      1704
    ],
    "tags": {
      "parent": "601000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "601000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0.01,
      "SILVER": 0.037,
      "NONE": 1,
      "PLATINUM": 0.021,
      "BRONZE": 0.05,
      "CHALLENGER": 0,
      "GOLD": 0.028,
      "DIAMOND": 0.015
    }
  },
  {
    "id": 601006,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 6,
      "CHALLENGER": 120,
      "MASTER": 65,
      "PLATINUM": 30,
      "GRANDMASTER": 90,
      "DIAMOND": 45,
      "IRON": 2,
      "GOLD": 20,
      "SILVER": 12
    },
    "translation": {
      "description": "Save an ally who would have otherwise taken lethal damage with a heal or shield",
      "name": "I've Got You!",
      "shortDescription": "Save an ally with a heal or shield"
    },
    "reversed": false,
    "queueIds": [
      1700,
      1701,
      1704
    ],
    "tags": {
      "parent": "601000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "601000",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0.049,
      "GRANDMASTER": 0,
      "MASTER": 0.009,
      "SILVER": 0.026,
      "NONE": 1,
      "PLATINUM": 0.017,
      "BRONZE": 0.034,
      "CHALLENGER": 0,
      "GOLD": 0.021,
      "DIAMOND": 0.013
    }
  },
  {
    "id": 204203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 198,
      "MASTER": 40,
      "PLATINUM": 12,
      "GRANDMASTER": 96,
      "DIAMOND": 24,
      "GOLD": 6,
      "SILVER": 2
    },
    "translation": {
      "description": "Kill two or more Sight Wards with a single Sweeper activation",
      "name": "Incredible Value",
      "shortDescription": "Kill two wards with one sweeper activation"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "204200",
      "source": "EOGD"
    },
    "parent": "204200",
    "parentCategory": "2",
    "percentiles": {
      "MASTER": 0.016,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "SILVER": 0.121,
      "IRON": 0,
      "DIAMOND": 0.028,
      "NONE": 1,
      "GOLD": 0.075,
      "PLATINUM": 0.05,
      "BRONZE": 0.153
    },
    "leaderboardThresholds": [
      5455,
      1,
      198,
      12250,
      96,
      61242
    ]
  },
  {
    "id": 204202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 729,
      "MASTER": 300,
      "PLATINUM": 75,
      "GRANDMASTER": 491,
      "DIAMOND": 150,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 12
    },
    "translation": {
      "description": "Protect wards by being nearby when an enemy damages it but it survives",
      "name": "Ward Ward-en",
      "shortDescription": "Protect wards"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "204200",
      "source": "EOGD"
    },
    "parent": "204200",
    "parentCategory": "2",
    "title": "Ward Warden",
    "percentiles": {
      "BRONZE": 0.209,
      "MASTER": 0.012,
      "PLATINUM": 0.071,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.038,
      "IRON": 0.302,
      "GRANDMASTER": 0.003,
      "GOLD": 0.126,
      "NONE": 1,
      "SILVER": 0.163
    },
    "leaderboardThresholds": [
      2880,
      1,
      729,
      9317,
      491,
      46579
    ]
  },
  {
    "id": 204201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 75,
      "MASTER": 25,
      "PLATINUM": 8,
      "GRANDMASTER": 41,
      "DIAMOND": 15,
      "GOLD": 3,
      "SILVER": 2
    },
    "translation": {
      "description": "Destroy 10 wards before 20 minutes",
      "name": "Ward Hunter",
      "shortDescription": "Destroy 10 wards before 20 minutes"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "204200",
      "source": "EOGD"
    },
    "parent": "204200",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0.138,
      "MASTER": 0.003,
      "CHALLENGER": 0,
      "PLATINUM": 0.024,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.009,
      "IRON": 0,
      "GOLD": 0.065,
      "NONE": 1,
      "SILVER": 0.088
    },
    "leaderboardThresholds": [
      1637,
      1,
      74,
      1873,
      41,
      11010
    ]
  },
  {
    "id": 204200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 15,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 5,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Visionary group",
      "name": "Visionary",
      "shortDescription": "Earn points from challenges in the Visionary group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "204000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "204000",
    "parentCategory": "2",
    "title": "Visionary",
    "percentiles": {
      "BRONZE": 0.202,
      "MASTER": 0.003,
      "PLATINUM": 0.066,
      "CHALLENGER": 0,
      "DIAMOND": 0.028,
      "IRON": 0.307,
      "GRANDMASTER": 0,
      "GOLD": 0.108,
      "NONE": 1,
      "SILVER": 0.165
    }
  },
  {
    "id": 101301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 5,
      "MASTER": 150,
      "PLATINUM": 50,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 30,
      "SILVER": 15
    },
    "translation": {
      "description": "Earn an S- grade or higher on different champions in ARAM",
      "name": "All Random All Champions",
      "shortDescription": "Earn an S- grade on different champions"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "championQuery": "$[*].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101300",
    "parentCategory": "1",
    "percentiles": {
      "GOLD": 0.034,
      "NONE": 1,
      "BRONZE": 0.108,
      "MASTER": 0,
      "CHALLENGER": 0,
      "IRON": 0.173,
      "PLATINUM": 0.012,
      "DIAMOND": 0,
      "GRANDMASTER": 0,
      "SILVER": 0.065
    }
  },
  {
    "id": 302000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 95,
      "MASTER": 1700,
      "PLATINUM": 560,
      "DIAMOND": 1000,
      "IRON": 45,
      "GOLD": 350,
      "SILVER": 150
    },
    "translation": {
      "description": "Earn points from challenges in the Strategy, Demolition, Synergy, and Team Spirit groups",
      "name": "Captain",
      "shortDescription": "Earn points from challenges in the Strategy, Demolition, Synergy, and Team Spirit groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "4",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "4",
    "parentCategory": "0",
    "title": "Playmaker",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.199,
      "IRON": 0.289,
      "DIAMOND": 0.018,
      "NONE": 1,
      "GOLD": 0.115,
      "PLATINUM": 0.065,
      "BRONZE": 0.238
    }
  },
  {
    "id": 101300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 550,
      "PLATINUM": 185,
      "DIAMOND": 340,
      "IRON": 15,
      "GOLD": 100,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the ARAM Champion group",
      "name": "ARAM Champion",
      "shortDescription": "Earn points from challenges in the ARAM Champion group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "101000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101000",
    "parentCategory": "1",
    "title": "Abyssal",
    "percentiles": {
      "IRON": 0.169,
      "GRANDMASTER": 0,
      "MASTER": 0.001,
      "SILVER": 0.127,
      "NONE": 1,
      "PLATINUM": 0.043,
      "BRONZE": 0.148,
      "CHALLENGER": 0,
      "GOLD": 0.08,
      "DIAMOND": 0.015
    }
  },
  {
    "id": 101303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 250,
      "MASTER": 60,
      "PLATINUM": 15,
      "GRANDMASTER": 100,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Take the first turret in ARAM before five minutes have passed",
      "name": "Rapid Demolition",
      "shortDescription": "Take the first turret before 5 min"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "source": "EOGD"
    },
    "parent": "101300",
    "parentCategory": "1",
    "percentiles": {
      "MASTER": 0.003,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "SILVER": 0.094,
      "IRON": 0.148,
      "DIAMOND": 0.013,
      "NONE": 1,
      "GOLD": 0.073,
      "PLATINUM": 0.032,
      "BRONZE": 0.112
    },
    "leaderboardThresholds": [
      954,
      1,
      249,
      97,
      99,
      7840
    ]
  },
  {
    "id": 101302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 300,
      "MASTER": 75,
      "PLATINUM": 20,
      "GRANDMASTER": 150,
      "DIAMOND": 35,
      "IRON": 1,
      "GOLD": 8,
      "SILVER": 4
    },
    "translation": {
      "description": "Earn S grades or higher in ARAM",
      "name": "All Random All Flawless",
      "shortDescription": "Earn S grades or higher"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "source": "EOGD"
    },
    "parent": "101300",
    "parentCategory": "1",
    "percentiles": {
      "MASTER": 0.012,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0,
      "SILVER": 0.106,
      "IRON": 0.161,
      "DIAMOND": 0.031,
      "NONE": 1,
      "GOLD": 0.082,
      "PLATINUM": 0.05,
      "BRONZE": 0.131
    },
    "leaderboardThresholds": [
      1991,
      1,
      299,
      4437,
      149,
      41762
    ]
  },
  {
    "id": 101305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 502,
      "MASTER": 250,
      "PLATINUM": 50,
      "GRANDMASTER": 351,
      "DIAMOND": 125,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "Have over 90% Kill Participation in ARAM games",
      "name": "Active Participant",
      "shortDescription": "Have over 90% Kill Participation in games"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "101300",
    "parentCategory": "1",
    "percentiles": {
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "SILVER": 0.047,
      "IRON": 0.14,
      "DIAMOND": 0.001,
      "NONE": 1,
      "GOLD": 0.02,
      "PLATINUM": 0.007,
      "BRONZE": 0.071
    },
    "leaderboardThresholds": [
      1129,
      1,
      502,
      59,
      351,
      291
    ]
  },
  {
    "id": 101304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 22,
      "MASTER": 8,
      "PLATINUM": 3,
      "GRANDMASTER": 14,
      "DIAMOND": 5,
      "GOLD": 1
    },
    "translation": {
      "description": "Win ARAM games before 13 minutes have passed",
      "name": "Lightning Round",
      "shortDescription": "Win games before 13 min"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "source": "EOGD"
    },
    "parent": "101300",
    "parentCategory": "1",
    "percentiles": {
      "MASTER": 0.013,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "SILVER": 0,
      "IRON": 0,
      "DIAMOND": 0.027,
      "NONE": 1,
      "GOLD": 0.103,
      "PLATINUM": 0.047,
      "BRONZE": 0
    },
    "leaderboardThresholds": [
      221,
      1,
      22,
      10119,
      14,
      50587
    ]
  },
  {
    "id": 101307,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 15,
      "CHALLENGER": 1390,
      "MASTER": 500,
      "PLATINUM": 150,
      "GRANDMASTER": 895,
      "DIAMOND": 300,
      "IRON": 5,
      "GOLD": 70,
      "SILVER": 35
    },
    "translation": {
      "description": "Win ARAM Games",
      "name": "NA-RAM",
      "shortDescription": "Win games"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "source": "EOGD"
    },
    "parent": "101300",
    "parentCategory": "1",
    "percentiles": {
      "BRONZE": 0.133,
      "MASTER": 0.013,
      "PLATINUM": 0.053,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.028,
      "IRON": 0.174,
      "GRANDMASTER": 0.003,
      "GOLD": 0.081,
      "NONE": 1,
      "SILVER": 0.105
    },
    "leaderboardThresholds": [
      7232,
      1,
      1390,
      10210,
      895,
      51043
    ]
  },
  {
    "id": 101306,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "MASTER": 3,
      "PLATINUM": 1,
      "DIAMOND": 2
    },
    "translation": {
      "description": "Win ARAM games without being killed by an enemy champion (you can still be executed)",
      "name": "Can't Touch This",
      "shortDescription": "Win without being killed by an enemy"
    },
    "reversed": false,
    "queueIds": [
      450,
      930,
      451,
      452,
      860,
      931,
      720,
      721
    ],
    "tags": {
      "parent": "101300",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "101300",
    "parentCategory": "1",
    "title": "Untouchable",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0.005,
      "PLATINUM": 0.031,
      "CHALLENGER": 0,
      "DIAMOND": 0.011,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 203203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 40,
      "CHALLENGER": 6488,
      "MASTER": 3000,
      "PLATINUM": 750,
      "GRANDMASTER": 4554,
      "DIAMOND": 1500,
      "IRON": 10,
      "GOLD": 250,
      "SILVER": 100
    },
    "translation": {
      "description": "Take three or more immobilizing abilities in a single fight and survive",
      "name": "Go Where You Please",
      "shortDescription": "Tank three immobilizing effects in a fight and survive"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203200",
      "source": "EOGD"
    },
    "parent": "203200",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0.212,
      "MASTER": 0.008,
      "PLATINUM": 0.063,
      "CHALLENGER": 0,
      "DIAMOND": 0.03,
      "IRON": 0.285,
      "GRANDMASTER": 0.002,
      "GOLD": 0.119,
      "NONE": 1,
      "SILVER": 0.165
    },
    "leaderboardThresholds": [
      22214,
      1,
      6488,
      5839,
      4554,
      29190
    ]
  },
  {
    "id": 203202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 25,
      "MASTER": 12,
      "PLATINUM": 5,
      "GRANDMASTER": 17,
      "DIAMOND": 8,
      "GOLD": 2,
      "SILVER": 1
    },
    "translation": {
      "description": "Get kills while taking damage from all five enemy champions and survive",
      "name": "Damage Sponge",
      "shortDescription": "Get kills while tanking all five enemies and survive"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203200",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "203200",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0,
      "MASTER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GOLD": 0.031,
      "NONE": 1,
      "SILVER": 0.11
    },
    "leaderboardThresholds": [
      51,
      1,
      18,
      3,
      16,
      6
    ]
  },
  {
    "id": 203201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 2,
      "CHALLENGER": 261,
      "MASTER": 65,
      "PLATINUM": 15,
      "GRANDMASTER": 141,
      "DIAMOND": 30,
      "IRON": 1,
      "GOLD": 5,
      "SILVER": 3
    },
    "translation": {
      "description": "Take 10000 pre-mitigation damage from champions in a single fight without dying",
      "name": "Not Even a Scratch",
      "shortDescription": "Take 10k damage in a fight and survive"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "203200",
      "source": "EOGD"
    },
    "parent": "203200",
    "parentCategory": "2",
    "title": "Absolute Unit",
    "percentiles": {
      "MASTER": 0.014,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "SILVER": 0.129,
      "IRON": 0.182,
      "DIAMOND": 0.035,
      "NONE": 1,
      "GOLD": 0.105,
      "PLATINUM": 0.059,
      "BRONZE": 0.148
    },
    "leaderboardThresholds": [
      4476,
      1,
      261,
      11080,
      141,
      55394
    ]
  },
  {
    "id": 600011,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 3,
      "MASTER": 1,
      "GRANDMASTER": 2
    },
    "translation": {
      "description": "Finish any season split at Rank 1 for Ranked Solo/Duo",
      "name": "Best of the Best",
      "shortDescription": "Finish a season split at Rank 1 for Solo/Duo"
    },
    "reversed": false,
    "queueIds": [
      420,
      422
    ],
    "tags": {
      "source": "RANKED"
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "IRON": 0,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0,
      "NONE": 1,
      "PLATINUM": 0,
      "BRONZE": 0,
      "CHALLENGER": 0,
      "GOLD": 0,
      "DIAMOND": 0
    },
    "leaderboardThresholds": [
      3,
      1,
      0,
      1,
      1,
      2
    ]
  },
  {
    "id": 203200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 10,
      "MASTER": 250,
      "PLATINUM": 80,
      "DIAMOND": 140,
      "IRON": 5,
      "GOLD": 50,
      "SILVER": 25
    },
    "translation": {
      "description": "Earn points from challenges in the Behemoth group",
      "name": "Behemoth",
      "shortDescription": "Earn points from challenges in the Behemoth group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "203000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "203000",
    "parentCategory": "2",
    "title": "Behemoth",
    "percentiles": {
      "IRON": 0.289,
      "GRANDMASTER": 0,
      "MASTER": 0,
      "SILVER": 0.161,
      "NONE": 1,
      "PLATINUM": 0.066,
      "BRONZE": 0.23,
      "CHALLENGER": 0,
      "GOLD": 0.108,
      "DIAMOND": 0.02
    }
  },
  {
    "id": 600010,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "CHALLENGER": 1,
      "MASTER": 1,
      "GRANDMASTER": 1
    },
    "translation": {
      "description": "Reach region first Challenger in Ranked Solo/Duo in a season split",
      "name": "First to the Top",
      "shortDescription": "Reach region first Challenger in Ranked Solo/Duo in a season split"
    },
    "reversed": false,
    "queueIds": [
      420,
      422
    ],
    "tags": {
      "source": "RANKED"
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1,
      1,
      0,
      1,
      1,
      2
    ]
  },
  {
    "id": 600012,
    "state": "ENABLED",
    "endTimestamp": 1666234800000,
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 1
    },
    "translation": {
      "description": "In case you didn't know. We're sure you know. Now you know. Did you know?",
      "name": "Challenges are Here!",
      "shortDescription": "Survived the Challenges launch tooltip"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "source": "CAP_INVENTORY",
      "leaderboardManuallyEnabled": true
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "BRONZE": 0.222,
      "MASTER": 0,
      "PLATINUM": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "IRON": 0,
      "GRANDMASTER": 0,
      "GOLD": 0,
      "NONE": 1,
      "SILVER": 0
    }
  },
  {
    "id": 301000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 40,
      "MASTER": 1400,
      "PLATINUM": 450,
      "DIAMOND": 900,
      "IRON": 20,
      "GOLD": 270,
      "SILVER": 85
    },
    "translation": {
      "description": "Earn points from challenges in the Monster Hunter, Steadfast, and Symbiosis groups",
      "name": "Determination",
      "shortDescription": "Earn points from challenges in the Monster Hunter, Steadfast, and Symbiosis groups"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "4",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "4",
    "parentCategory": "0",
    "title": "Tenacious",
    "percentiles": {
      "GOLD": 0.153,
      "NONE": 1,
      "BRONZE": 0.294,
      "MASTER": 0.002,
      "CHALLENGER": 0,
      "IRON": 0.325,
      "PLATINUM": 0.108,
      "DIAMOND": 0.035,
      "GRANDMASTER": 0,
      "SILVER": 0.248
    }
  },
  {
    "id": 600006,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 15,
      "CHALLENGER": 763,
      "MASTER": 350,
      "PLATINUM": 125,
      "GRANDMASTER": 555,
      "DIAMOND": 250,
      "IRON": 10,
      "GOLD": 65,
      "SILVER": 30
    },
    "translation": {
      "description": "Increase your summoner level",
      "name": "Been Here a While",
      "shortDescription": "Increase your summoner level"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "source": "SUMMONER"
    },
    "parent": "0",
    "parentCategory": "0",
    "percentiles": {
      "GOLD": 0.195,
      "NONE": 1,
      "BRONZE": 0.439,
      "MASTER": 0.039,
      "CHALLENGER": 0.002,
      "IRON": 0.519,
      "PLATINUM": 0.133,
      "DIAMOND": 0.069,
      "GRANDMASTER": 0.01,
      "SILVER": 0.356
    },
    "leaderboardThresholds": [
      2959,
      1,
      763,
      29946,
      555,
      149724
    ]
  },
  {
    "id": 202203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 441,
      "MASTER": 150,
      "PLATINUM": 50,
      "GRANDMASTER": 274,
      "DIAMOND": 100,
      "IRON": 1,
      "GOLD": 15,
      "SILVER": 10
    },
    "translation": {
      "description": "Deal the most damage to champions in the game",
      "name": "Pain Prescriber",
      "shortDescription": "Deal the most damage to champions in the game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202200",
      "source": "EOGD"
    },
    "parent": "202200",
    "parentCategory": "2",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.021,
      "BRONZE": 0.16,
      "GOLD": 0.103,
      "IRON": 0.255,
      "GRANDMASTER": 0.003,
      "SILVER": 0.124,
      "CHALLENGER": 0.001,
      "MASTER": 0.011,
      "PLATINUM": 0.046
    },
    "leaderboardThresholds": [
      2729,
      1,
      441,
      8649,
      274,
      43240
    ]
  },
  {
    "id": 202202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 6,
      "CHALLENGER": 937,
      "MASTER": 400,
      "PLATINUM": 120,
      "GRANDMASTER": 626,
      "DIAMOND": 240,
      "IRON": 3,
      "GOLD": 36,
      "SILVER": 18
    },
    "translation": {
      "description": "Take down the most wards in the game (you must take down at least one ward)",
      "name": "Darkness Distributer",
      "shortDescription": "Take down the most wards in the game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202200",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202200",
    "parentCategory": "2",
    "title": "Scout",
    "percentiles": {
      "IRON": 0.208,
      "GRANDMASTER": 0.001,
      "MASTER": 0.002,
      "SILVER": 0.108,
      "NONE": 1,
      "PLATINUM": 0.023,
      "BRONZE": 0.167,
      "CHALLENGER": 0,
      "GOLD": 0.073,
      "DIAMOND": 0.007
    },
    "leaderboardThresholds": [
      3965,
      1,
      937,
      1676,
      626,
      8372
    ]
  },
  {
    "id": 202201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5,
      "CHALLENGER": 597,
      "MASTER": 250,
      "PLATINUM": 80,
      "GRANDMASTER": 400,
      "DIAMOND": 160,
      "IRON": 1,
      "GOLD": 25,
      "SILVER": 10
    },
    "translation": {
      "description": "Have the highest Crowd Control Score in the game",
      "name": "Bouncer",
      "shortDescription": "Get the highest crowd control score in the game"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202200",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202200",
    "parentCategory": "2",
    "percentiles": {
      "BRONZE": 0.154,
      "MASTER": 0.002,
      "CHALLENGER": 0,
      "PLATINUM": 0.024,
      "GRANDMASTER": 0,
      "DIAMOND": 0.007,
      "IRON": 0.251,
      "GOLD": 0.073,
      "NONE": 1,
      "SILVER": 0.118
    },
    "leaderboardThresholds": [
      3346,
      1,
      597,
      1590,
      399,
      6798
    ]
  },
  {
    "id": 202200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 25,
      "MASTER": 400,
      "PLATINUM": 135,
      "DIAMOND": 240,
      "IRON": 10,
      "GOLD": 85,
      "SILVER": 40
    },
    "translation": {
      "description": "Earn points from challenges in the Unrivaled group",
      "name": "Unrivaled",
      "shortDescription": "Earn points from challenges in the Unrivaled group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "isCapstone": "Y",
      "parent": "202000",
      "source": "CHALLENGES",
      "leaderboardManuallyEnabled": true
    },
    "parent": "202000",
    "parentCategory": "2",
    "title": "Unrivaled",
    "percentiles": {
      "SILVER": 0.164,
      "CHALLENGER": 0,
      "DIAMOND": 0.016,
      "MASTER": 0.002,
      "PLATINUM": 0.051,
      "GRANDMASTER": 0,
      "GOLD": 0.098,
      "BRONZE": 0.201,
      "IRON": 0.27,
      "NONE": 1
    }
  },
  {
    "id": 202205,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 1,
      "CHALLENGER": 104,
      "MASTER": 30,
      "PLATINUM": 10,
      "GRANDMASTER": 58,
      "DIAMOND": 20,
      "GOLD": 5,
      "SILVER": 2
    },
    "translation": {
      "description": "Win games where you took 35% of damage dealt to champions on your team",
      "name": "Meat Shield",
      "shortDescription": "Win the game taking at least 35% of team damage"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202200",
      "priority": "50",
      "source": "EOGD"
    },
    "parent": "202200",
    "parentCategory": "2",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.011,
      "BRONZE": 0.129,
      "GOLD": 0.049,
      "IRON": 0,
      "GRANDMASTER": 0.001,
      "SILVER": 0.089,
      "CHALLENGER": 0,
      "MASTER": 0.006,
      "PLATINUM": 0.026
    },
    "leaderboardThresholds": [
      872,
      1,
      104,
      4565,
      58,
      22820
    ]
  },
  {
    "id": 202204,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 10,
      "CHALLENGER": 1207,
      "MASTER": 480,
      "PLATINUM": 125,
      "GRANDMASTER": 806,
      "DIAMOND": 275,
      "IRON": 3,
      "GOLD": 40,
      "SILVER": 20
    },
    "translation": {
      "description": "Deal more than 700 Damage Per Minute",
      "name": "Damage Dispenser",
      "shortDescription": "Deal over 700 Damage Per Minute"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "202200",
      "source": "EOGD"
    },
    "parent": "202200",
    "parentCategory": "2",
    "percentiles": {
      "IRON": 0.253,
      "GRANDMASTER": 0.003,
      "MASTER": 0.012,
      "SILVER": 0.153,
      "NONE": 1,
      "PLATINUM": 0.063,
      "BRONZE": 0.188,
      "CHALLENGER": 0.001,
      "GOLD": 0.118,
      "DIAMOND": 0.029
    },
    "leaderboardThresholds": [
      5468,
      1,
      1207,
      8859,
      806,
      44290
    ]
  },
  {
    "id": 402406,
    "state": "ARCHIVED",
    "leaderboard": false,
    "thresholds": {
      "BRONZE": 4,
      "MASTER": 23,
      "PLATINUM": 16,
      "DIAMOND": 20,
      "IRON": 2,
      "GOLD": 12,
      "SILVER": 8
    },
    "translation": {
      "description": "Win with each of different mythic items",
      "name": "Multi-Weapon Master",
      "shortDescription": "Win with different mythic items"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "itemQuery": "$[?(@.epicness == 'EPICNESS_MYTHIC' && 'Items/ItemGroups/OrnnItems' nin @.groups)].id",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "402400",
    "parentCategory": "3",
    "title": "Mythic",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.064,
      "BRONZE": 0.226,
      "GOLD": 0.119,
      "IRON": 0.289,
      "GRANDMASTER": 0,
      "SILVER": 0.16,
      "CHALLENGER": 0,
      "MASTER": 0.047,
      "PLATINUM": 0.089
    }
  },
  {
    "id": 402407,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 3000,
      "CHALLENGER": 336200,
      "MASTER": 120000,
      "PLATINUM": 37500,
      "GRANDMASTER": 216214,
      "DIAMOND": 67500,
      "IRON": 750,
      "GOLD": 15000,
      "SILVER": 7500
    },
    "translation": {
      "description": "Kill minions",
      "name": "Do These Things Have Souls?",
      "shortDescription": "Kill minions"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "priority": ".1",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "percentiles": {
      "BRONZE": 0.198,
      "MASTER": 0.018,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.067,
      "GRANDMASTER": 0.004,
      "DIAMOND": 0.039,
      "IRON": 0.275,
      "GOLD": 0.113,
      "NONE": 1,
      "SILVER": 0.15
    },
    "leaderboardThresholds": [
      1350392,
      1,
      336200,
      13401,
      216214,
      66997
    ]
  },
  {
    "id": 402404,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 16,
      "CHALLENGER": 2042,
      "MASTER": 960,
      "PLATINUM": 240,
      "GRANDMASTER": 1446,
      "DIAMOND": 520,
      "IRON": 4,
      "GOLD": 80,
      "SILVER": 40
    },
    "translation": {
      "description": "Kill players under your own turret",
      "name": "Nice Try",
      "shortDescription": "Kill enemies under your own turret"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "priority": "5",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "percentiles": {
      "SILVER": 0.162,
      "CHALLENGER": 0,
      "DIAMOND": 0.028,
      "MASTER": 0.008,
      "PLATINUM": 0.065,
      "GRANDMASTER": 0.002,
      "GOLD": 0.124,
      "BRONZE": 0.216,
      "IRON": 0.302,
      "NONE": 1
    },
    "leaderboardThresholds": [
      7589,
      1,
      2042,
      5853,
      1446,
      29261
    ]
  },
  {
    "id": 402402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 300,
      "CHALLENGER": 36648,
      "MASTER": 15000,
      "PLATINUM": 3750,
      "GRANDMASTER": 23729,
      "DIAMOND": 9000,
      "IRON": 75,
      "GOLD": 1500,
      "SILVER": 750
    },
    "translation": {
      "description": "Place useful Stealth Wards. A useful ward is one that contributes to your Vision Score.",
      "name": "Little Inanimate Spies",
      "shortDescription": "Place Stealth Wards"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "percentiles": {
      "NONE": 1,
      "DIAMOND": 0.016,
      "BRONZE": 0.179,
      "GOLD": 0.099,
      "IRON": 0.25,
      "GRANDMASTER": 0.001,
      "SILVER": 0.133,
      "CHALLENGER": 0,
      "MASTER": 0.005,
      "PLATINUM": 0.052
    },
    "leaderboardThresholds": [
      139941,
      1,
      36648,
      3758,
      23729,
      18786
    ]
  },
  {
    "id": 402403,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 40,
      "CHALLENGER": 6083,
      "MASTER": 1800,
      "PLATINUM": 500,
      "GRANDMASTER": 3501,
      "DIAMOND": 900,
      "IRON": 10,
      "GOLD": 200,
      "SILVER": 100
    },
    "translation": {
      "description": "Place useful Control Wards. A useful ward is one that contributes to your Vision Score.",
      "name": "Goodbye to the Darkness!",
      "shortDescription": "Place Control Wards"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "percentiles": {
      "SILVER": 0.106,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.026,
      "MASTER": 0.01,
      "PLATINUM": 0.045,
      "GRANDMASTER": 0.003,
      "GOLD": 0.079,
      "BRONZE": 0.143,
      "IRON": 0.197,
      "NONE": 1
    },
    "leaderboardThresholds": [
      37124,
      1,
      6083,
      7705,
      3501,
      38517
    ]
  },
  {
    "id": 402400,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 40,
      "CHALLENGER": 940,
      "MASTER": 650,
      "PLATINUM": 215,
      "GRANDMASTER": 780,
      "DIAMOND": 380,
      "IRON": 20,
      "GOLD": 135,
      "SILVER": 60
    },
    "translation": {
      "description": "Earn points from challenges in the Resourceful group",
      "name": "Resourceful",
      "shortDescription": "Earn points from challenges in the Resourceful group"
    },
    "reversed": false,
    "queueIds": [
      
    ],
    "tags": {
      "parent": "402000",
      "isCapstone": "Y",
      "source": "CHALLENGES"
    },
    "parent": "402000",
    "parentCategory": "3",
    "title": "Resourceful",
    "percentiles": {
      "BRONZE": 0.24,
      "MASTER": 0.007,
      "CHALLENGER": 0,
      "PLATINUM": 0.087,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.041,
      "IRON": 0.288,
      "GOLD": 0.132,
      "NONE": 1,
      "SILVER": 0.205
    },
    "leaderboardThresholds": [
      0,
      0,
      800,
      1,
      760,
      12522
    ]
  },
  {
    "id": 402401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 50,
      "CHALLENGER": 7780,
      "MASTER": 2400,
      "PLATINUM": 600,
      "GRANDMASTER": 4654,
      "DIAMOND": 1200,
      "IRON": 10,
      "GOLD": 200,
      "SILVER": 100
    },
    "translation": {
      "description": "Take down wards",
      "name": "Darkness is Everywhere",
      "shortDescription": "Take down wards"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "percentiles": {
      "GOLD": 0.133,
      "NONE": 1,
      "BRONZE": 0.198,
      "MASTER": 0.02,
      "CHALLENGER": 0.001,
      "IRON": 0.271,
      "PLATINUM": 0.08,
      "DIAMOND": 0.048,
      "GRANDMASTER": 0.005,
      "SILVER": 0.165
    },
    "leaderboardThresholds": [
      67995,
      1,
      7780,
      15558,
      4654,
      77785
    ]
  },
  {
    "id": 402408,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 5000,
      "CHALLENGER": 727100,
      "MASTER": 300000,
      "PLATINUM": 90000,
      "GRANDMASTER": 492925,
      "DIAMOND": 160000,
      "IRON": 1250,
      "GOLD": 30000,
      "SILVER": 15000
    },
    "translation": {
      "description": "Claim bounty gold from shutting down opposing champions",
      "name": "Everyone Pays!",
      "shortDescription": "Earn bounty gold"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "title": "Bounty Hunter",
    "percentiles": {
      "MASTER": 0.013,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "SILVER": 0.158,
      "IRON": 0.295,
      "DIAMOND": 0.036,
      "NONE": 1,
      "GOLD": 0.121,
      "PLATINUM": 0.063,
      "BRONZE": 0.218
    },
    "leaderboardThresholds": [
      3534800,
      1,
      727100,
      9650,
      492925,
      48244
    ]
  },
  {
    "id": 402409,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "BRONZE": 222000,
      "CHALLENGER": 50000000,
      "MASTER": 15000000,
      "PLATINUM": 4150000,
      "GRANDMASTER": 25000000,
      "DIAMOND": 7500000,
      "IRON": 55500,
      "GOLD": 1110000,
      "SILVER": 555000
    },
    "translation": {
      "description": "Earn gold",
      "name": "Get Paid, and Get Out",
      "shortDescription": "Earn gold"
    },
    "reversed": false,
    "queueIds": [
      400,
      420,
      430,
      440,
      700,
      401,
      402,
      411,
      412,
      421,
      422,
      431,
      432,
      441,
      442,
      490
    ],
    "tags": {
      "parent": "402400",
      "priority": ".1",
      "source": "EOGD"
    },
    "parent": "402400",
    "parentCategory": "3",
    "percentiles": {
      "IRON": 0.301,
      "GRANDMASTER": 0.002,
      "MASTER": 0.01,
      "SILVER": 0.173,
      "NONE": 1,
      "PLATINUM": 0.066,
      "BRONZE": 0.223,
      "CHALLENGER": 0,
      "GOLD": 0.136,
      "DIAMOND": 0.036
    },
    "leaderboardThresholds": [
      122818578,
      1,
      49990167,
      574,
      24999752,
      27106
    ]
  }
];



import { LolApi, RiotApi, Constants  } from 'twisted';


let apikey = process.env.key;




const api = new RiotApi({
  key: apikey
});

const lolapi = new LolApi({
  key: apikey
});



const skipChallenges = [0,1,2,3,4,5, 601000, 2022000, 2023000, 2024100, 402406 , 301104 ];

function isLegacy(challengeInfo) {

      if ((skipChallenges.indexOf(challengeInfo.id) > -1) ||   (skipChallenges.indexOf(challengeInfo.parent) > -1)) {
        return true;
      }

      if (challengeInfo.parent == 601000 || challengeInfo.parent == 2022000 || challengeInfo.parent == 2023000 || challengeInfo.parent == 2024100 || challengeInfo.parent == 0) {
        return true;
      }

      return false;

}

function challengeMaxed (challenge) {
  if (challenge.challengeId == 101206 && (challenge.level == 'BRONZE')) {
    return true;
  }
  if (challenge.challengeId == 103103 && (challenge.level == 'SILVER')) {
    return true;
  }
  if (challenge.challengeId == 103204 && (challenge.level == 'PLATINUM')) {
    return true;
  }
  if (challenge.challengeId == 103205 && (challenge.level == 'GOLD')) {
    return true;
  }
  if (challenge.challengeId == 103207 && (challenge.level == 'PLATINUM')) {
    return true;
  }
  if (challenge.challengeId == 203103 && (challenge.level == 'SILVER')) {
    return true;
  }
  if (challenge.challengeId == 301106 && (challenge.level == 'DIAMOND')) {
    return true;
  }
  if (challenge.challengeId == 301107 && (challenge.level == 'DIAMOND')) {
    return true;
  }
  if (challenge.challengeId == 301204 && (challenge.level == 'PLATINUM')) {
    return true;
  }
  if (challenge.challengeId == 301305 && (challenge.level == 'GOLD')) {
    return true;
  }
  if (challenge.challengeId == 301306 && (challenge.level == 'GOLD')) {
    return true;
  }
  if (challenge.challengeId == 2022007 && (challenge.level == 'DIAMOND')) {
    return true;
  }

  if (challenge.level == 'MASTER' || challenge.level == 'GRANDMASTER' || challenge.level == 'CHALLENGER') {
    return true;
  }


}

let scoreArray = [];

let challengeCount = 0;

export async function getScore(region, name, tag) {

  let mappedRegion = regionMap[region];

  let regionGroup = Constants.regionToRegionGroup(mappedRegion);

  regionGroup = regionGroup == 'SEA' ? 'ASIA' : regionGroup



    let resByRiotId;
    let response;
    try {
      resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
    } catch (error) {
      console.log(name, tag, regionGroup);
      console.log(error);
      return;
    }


    try {
      response = await fetch(encodeURI(`https://${mappedRegion}.api.riotgames.com/lol/challenges/v1/player-data/${resByRiotId.puuid}?api_key=${apikey}`))
    } catch (error) {
      console.log(name, tag, regionGroup);
      console.log(error);
      return;
    }

    // const resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
    // const response = await fetch(encodeURI(`https://${mappedRegion}.api.riotgames.com/lol/challenges/v1/player-data/${resByRiotId.puuid}?api_key=${apikey}`))

    const data = await response.json();

    let score = 0;

    let challenges = data.challenges;

    let challengeCompleted = 0;
    let legacyCompleted = 0;
    let mostNotableChallengePosition = Infinity;
    let mostNotableChallenge;

    try {
            challenges.forEach(challenge => {

              let challengeId = challenge.challengeId;

              let challengeInfo;

              challengeInfo = challengeData.find(challenge => {
                return challenge.id == challengeId;
              })

              if ((challengeId > 5) && (challenge.level == "CHALLENGER") && (!isLegacy(challengeInfo)) && (challenge.position < mostNotableChallengePosition)) {
                mostNotableChallenge = challengeInfo;
                mostNotableChallengePosition = challenge.position;
              }


              if (isLegacy(challengeInfo)) {
                if (challengeMaxed(challenge)) {
                  legacyCompleted ++;
                }
              } else {
                challengeCount++;
                if (challengeMaxed(challenge)) {
                  challengeCompleted ++;
                }
              }


              if (isLegacy(challengeInfo)) {
                return;
              }

              let challengePoint = 0;

              if (challenge.level == 'IRON') {
                challengePoint = 5;
              } else if (challenge.level == 'BRONZE') {
                challengePoint = 10;
              } else if (challenge.level == 'SILVER') {
                challengePoint = 15;
              } else if (challenge.level == 'GOLD') {
                challengePoint = 25;
              } else if (challenge.level == 'PLATINUM') {
                challengePoint = 40;
              } else if (challenge.level == 'DIAMOND') {
                challengePoint = 60;
              } else if (challenge.level == 'MASTER') {
                challengePoint = 100;
              } else if (challenge.level == 'GRANDMASTER') {
                challengePoint = 100;
              } else if (challenge.level == 'CHALLENGER') {
                challengePoint = 100;
              }
              score = score + challengePoint;
            })
          }catch(error) {
            console.log(data);
            console.log(error);
          }



    scoreArray.push({
      name: `${name}#${tag}`,
      score: score,
      region: region,
      completed: challengeCompleted,
      legacyCompleted: legacyCompleted,
      mostNotableChallenge: mostNotableChallenge,
      mostNotableChallengePosition: mostNotableChallengePosition

    });



}

// data.forEach(item => {
//   let name = item.name.split('#')[0];
//   let tag =  item.name.split('#')[1];

//   getScore(item.server, name, tag);
// })

app.get('/table', function (req, res) {

  data.forEach(item => {
    let name = item.name.split('#')[0];
    let tag =  item.name.split('#')[1];

    getScore(item.server, name, tag);
  })

  res.json({
    data: scoreArray,
    challengeCount: challengeCount
  });

})

app.get('/table2', function (req, res) {

  res.json({
    data: scoreArray.push,
    challengeCount: challengeCount
  });

})






export async function getMastery(name, tag, region, regionGroup, req, res) {



  try {

   const resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
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


  let region = req.params.region;

  request(encodeURI(`https://na.op.gg/summoners/${region}/${req.body.name}`), function (error, response, body) {
      let opggdata = body;

      console.log(encodeURI(`https://na.op.gg/summoners/${region}/${req.body.name}`));

      var encryptedID = opggdata.match(/"summoner_id":"(.*?)","acct_id/);

      if (!encryptedID) {
        return res.send('user does not exist');
      }


      encryptedID = encryptedID[1];



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



  let region = req.params.region;

  if (!req.params.encryptedID) {

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