var page2 = [
    {
        "name": "Avril#UwU",
        "score": 25825,
        "region": "LAS",
        "completed": 234,
        "legacyCompleted": 57,
        "mostNotableChallenge": {
            "id": 301102,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 37,
                "CHALLENGER": 77,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 15,
                "GOLD": 2,
                "DIAMOND": 10
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.006,
                "DIAMOND": 0.038,
                "BRONZE": 0,
                "GOLD": 0.118,
                "IRON": 0,
                "SILVER": 0.166,
                "MASTER": 0.024,
                "PLATINUM": 0.068
            },
            "leaderboardThresholds": [
                635,
                1,
                77,
                19197,
                37,
                95978
            ]
        },
        "mostNotableChallengePosition": 4
    },
    {
        "name": "Zerlox#Fran",
        "score": 25875,
        "region": "LAS",
        "completed": 244,
        "legacyCompleted": 57,
        "mostNotableChallenge": {
            "id": 303402,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 37,
                "CHALLENGER": 90,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0.002,
                "DIAMOND": 0.061,
                "MASTER": 0.047,
                "PLATINUM": 0.078,
                "GOLD": 0.121,
                "GRANDMASTER": 0.012,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                1014,
                1,
                90,
                37856,
                37,
                189273
            ]
        },
        "mostNotableChallengePosition": 15
    },
    {
        "name": "Kronos#BR3",
        "score": 25935,
        "region": "BR",
        "completed": 241,
        "legacyCompleted": 42,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 2
    },
    {
        "name": "Dean#Penta",
        "score": 26000,
        "region": "EUW",
        "completed": 245,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 18
    },
    {
        "name": "Nolife Fynn#EUW",
        "score": 26030,
        "region": "EUW",
        "completed": 244,
        "legacyCompleted": 38,
        "mostNotableChallenge": {
            "id": 302203,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 170,
                "CHALLENGER": 237,
                "SILVER": 5,
                "PLATINUM": 40,
                "BRONZE": 2,
                "IRON": 1,
                "MASTER": 120,
                "GOLD": 10,
                "DIAMOND": 70
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
                "PLATINUM": 0,
                "IRON": 0.101,
                "GOLD": 0.002,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.047,
                "SILVER": 0.011,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                332,
                1,
                237,
                3,
                170,
                10
            ]
        },
        "mostNotableChallengePosition": 8
    },
    {
        "name": "ßloczek#EUNE",
        "score": 25910,
        "region": "EUNE",
        "completed": 246,
        "legacyCompleted": 55,
        "mostNotableChallenge": {
            "id": 302105,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 98,
                "CHALLENGER": 258,
                "SILVER": 1,
                "PLATINUM": 4,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "PLATINUM": 0.124,
                "IRON": 0,
                "GOLD": 0.15,
                "MASTER": 0.085,
                "GRANDMASTER": 0.021,
                "CHALLENGER": 0.004,
                "BRONZE": 0,
                "SILVER": 0.18,
                "DIAMOND": 0.099,
                "NONE": 1
            },
            "leaderboardThresholds": [
                3417,
                1,
                258,
                68283,
                98,
                341408
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "갓블리#KR1",
        "score": 25450,
        "region": "KR",
        "completed": 236,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 203202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 17,
                "CHALLENGER": 25,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "SILVER": 0.109,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.031,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
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
        "mostNotableChallengePosition": 8
    },
    {
        "name": "Sayo#Shady",
        "score": 25800,
        "region": "EUW",
        "completed": 239,
        "legacyCompleted": 42,
        "mostNotableChallenge": {
            "id": 101106,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 18,
                "CHALLENGER": 38,
                "PLATINUM": 3,
                "MASTER": 7,
                "GOLD": 1,
                "DIAMOND": 5
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.006,
                "PLATINUM": 0.051,
                "IRON": 0,
                "SILVER": 0,
                "NONE": 1,
                "BRONZE": 0,
                "DIAMOND": 0.034,
                "MASTER": 0.024,
                "GOLD": 0.097
            },
            "leaderboardThresholds": [
                1384,
                1,
                38,
                19225,
                18,
                96118
            ]
        },
        "mostNotableChallengePosition": 12
    },
    {
        "name": "Arnauiih#EUW",
        "score": 25820,
        "region": "EUW",
        "completed": 242,
        "legacyCompleted": 56,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 15
    },
    {
        "name": "YIMUZIC#00001",
        "score": 25780,
        "region": "TW",
        "completed": 247,
        "legacyCompleted": 52,
        "mostNotableChallenge": {
            "id": 203102,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 4232,
                "CHALLENGER": 8235,
                "SILVER": 45,
                "PLATINUM": 350,
                "BRONZE": 20,
                "IRON": 5,
                "MASTER": 1000,
                "GOLD": 120,
                "DIAMOND": 600
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
                "PLATINUM": 0.142,
                "IRON": 0.338,
                "GOLD": 0.197,
                "MASTER": 0.09,
                "GRANDMASTER": 0.023,
                "CHALLENGER": 0.005,
                "BRONZE": 0.288,
                "SILVER": 0.249,
                "DIAMOND": 0.115,
                "NONE": 1
            },
            "leaderboardThresholds": [
                50354,
                1,
                8235,
                72009,
                4232,
                360040
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Saylan#EUX",
        "score": 25895,
        "region": "EUW",
        "completed": 243,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Eremiso#EUNE",
        "score": 26035,
        "region": "EUNE",
        "completed": 240,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 2
    },
    {
        "name": "Ножки Гвен#Feet",
        "score": 25585,
        "region": "RU",
        "completed": 249,
        "legacyCompleted": 51,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 6
    },
    {
        "name": "Le Petit Prince#EUNE",
        "score": 25815,
        "region": "EUNE",
        "completed": 250,
        "legacyCompleted": 57,
        "mostNotableChallenge": {
            "id": 201003,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 49,
                "CHALLENGER": 100,
                "SILVER": 1,
                "PLATINUM": 7,
                "MASTER": 25,
                "GOLD": 3,
                "DIAMOND": 15
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
                "SILVER": 0.21,
                "CHALLENGER": 0.001,
                "DIAMOND": 0.041,
                "MASTER": 0.02,
                "PLATINUM": 0.081,
                "GOLD": 0.131,
                "GRANDMASTER": 0.005,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                1106,
                1,
                99,
                9236,
                49,
                81367
            ]
        },
        "mostNotableChallengePosition": 28
    },
    {
        "name": "Unholy Daddy#RU1",
        "score": 25855,
        "region": "RU",
        "completed": 244,
        "legacyCompleted": 56,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 6
    },
    {
        "name": "PoCa#1102",
        "score": 25795,
        "region": "VN",
        "completed": 242,
        "legacyCompleted": 48,
        "mostNotableChallenge": {
            "id": 401102,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 6602411,
                "CHALLENGER": 8426315,
                "SILVER": 35000,
                "PLATINUM": 900000,
                "BRONZE": 3500,
                "IRON": 1200,
                "MASTER": 5000000,
                "GOLD": 220000,
                "DIAMOND": 2500000
            },
            "translation": {
                "description": "Earn total Mastery Points",
                "name": "Wise Master",
                "shortDescription": "Earn Mastery Points"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401100",
                "priority": ".1",
                "source": "EOGD"
            },
            "parent": "401100",
            "parentCategory": "3",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0.002,
                "DIAMOND": 0.042,
                "BRONZE": 0.376,
                "GOLD": 0.196,
                "IRON": 0.405,
                "SILVER": 0.283,
                "MASTER": 0.006,
                "PLATINUM": 0.119
            },
            "leaderboardThresholds": [
                21528393,
                1,
                8426315,
                4941,
                6602411,
                24698
            ]
        },
        "mostNotableChallengePosition": 9
    },
    {
        "name": "amylee#doll",
        "score": 25600,
        "region": "NA",
        "completed": 237,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 203202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 17,
                "CHALLENGER": 25,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "SILVER": 0.109,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.031,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
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
        "mostNotableChallengePosition": 2
    },
    {
        "name": "Desmond Doss#cuel",
        "score": 25765,
        "region": "EUNE",
        "completed": 235,
        "legacyCompleted": 51,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 10
    },
    {
        "name": "SvetIeishiy#RU1",
        "score": 25835,
        "region": "RU",
        "completed": 238,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 204203,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 101,
                "CHALLENGER": 214,
                "SILVER": 2,
                "PLATINUM": 12,
                "BRONZE": 1,
                "MASTER": 40,
                "GOLD": 6,
                "DIAMOND": 24
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
                "SILVER": 0.122,
                "CHALLENGER": 0.001,
                "DIAMOND": 0.031,
                "MASTER": 0.019,
                "PLATINUM": 0.053,
                "GOLD": 0.078,
                "GRANDMASTER": 0.005,
                "BRONZE": 0.153,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                6040,
                1,
                214,
                14838,
                101,
                74185
            ]
        },
        "mostNotableChallengePosition": 83
    },
    {
        "name": "Seal#Sea",
        "score": 25755,
        "region": "EUW",
        "completed": 240,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "anna#Heart",
        "score": 25640,
        "region": "NA",
        "completed": 238,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 13
    },
    {
        "name": "rnlrhdwk97#KR1",
        "score": 25710,
        "region": "KR",
        "completed": 238,
        "legacyCompleted": 56,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 16
    },
    {
        "name": "Affienia#OCE",
        "score": 25660,
        "region": "OCE",
        "completed": 247,
        "legacyCompleted": 57,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "d w#1234",
        "score": 25685,
        "region": "KR",
        "completed": 242,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Jadominik113#EUNE",
        "score": 25630,
        "region": "EUNE",
        "completed": 235,
        "legacyCompleted": 51,
        "mostNotableChallenge": {
            "id": 302404,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 1500,
                "CHALLENGER": 2500,
                "SILVER": 50,
                "PLATINUM": 375,
                "BRONZE": 20,
                "IRON": 5,
                "MASTER": 1000,
                "GOLD": 100,
                "DIAMOND": 675
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "PLATINUM": 0,
                "IRON": 0.095,
                "SILVER": 0.018,
                "NONE": 1,
                "BRONZE": 0.043,
                "DIAMOND": 0,
                "MASTER": 0,
                "GOLD": 0.006
            },
            "leaderboardThresholds": [
                0,
                0,
                1569,
                1,
                1380,
                5
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "suisooo#0530",
        "score": 25400,
        "region": "JP",
        "completed": 235,
        "legacyCompleted": 51,
        "mostNotableChallenge": {
            "id": 103202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 42,
                "CHALLENGER": 66,
                "SILVER": 2,
                "PLATINUM": 8,
                "BRONZE": 1,
                "MASTER": 25,
                "GOLD": 3,
                "DIAMOND": 15
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
                "PLATINUM": 0.044,
                "IRON": 0,
                "GOLD": 0.093,
                "MASTER": 0.008,
                "GRANDMASTER": 0.002,
                "CHALLENGER": 0,
                "BRONZE": 0.163,
                "SILVER": 0.117,
                "DIAMOND": 0.02,
                "NONE": 1
            },
            "leaderboardThresholds": [
                920,
                1,
                66,
                6332,
                42,
                31653
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Alune#001",
        "score": 25660,
        "region": "VN",
        "completed": 233,
        "legacyCompleted": 39,
        "mostNotableChallenge": {
            "id": 303404,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 26,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0.01,
                "MASTER": 0.005,
                "PLATINUM": 0.019,
                "GOLD": 0.051,
                "GRANDMASTER": 0.001,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                168,
                1,
                26,
                3786,
                15,
                18924
            ]
        },
        "mostNotableChallengePosition": 180
    },
    {
        "name": "삐 컵#KR1",
        "score": 24520,
        "region": "KR",
        "completed": 226,
        "legacyCompleted": 41,
        "mostNotableChallenge": {
            "id": 402400,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 780,
                "CHALLENGER": 940,
                "SILVER": 60,
                "PLATINUM": 215,
                "BRONZE": 40,
                "IRON": 20,
                "MASTER": 650,
                "GOLD": 135,
                "DIAMOND": 380
            },
            "translation": {
                "description": "Earn points from challenges in the Resourceful group",
                "name": "Resourceful",
                "shortDescription": "Earn points from challenges in the Resourceful group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "402000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "402000",
            "parentCategory": "3",
            "title": "Resourceful",
            "percentiles": {
                "PLATINUM": 0.084,
                "IRON": 0.284,
                "GOLD": 0.129,
                "MASTER": 0.007,
                "GRANDMASTER": 0.001,
                "CHALLENGER": 0,
                "BRONZE": 0.235,
                "SILVER": 0.201,
                "DIAMOND": 0.04,
                "NONE": 1
            },
            "leaderboardThresholds": [
                0,
                0,
                800,
                1,
                760,
                12541
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "BXN#1V9",
        "score": 25590,
        "region": "EUNE",
        "completed": 241,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 7
    },
    {
        "name": "차 방#차 방",
        "score": 25515,
        "region": "KR",
        "completed": 237,
        "legacyCompleted": 37,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "Azar06#EUW",
        "score": 25555,
        "region": "EUW",
        "completed": 233,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 2
    },
    {
        "name": "Galur#Main",
        "score": 25720,
        "region": "EUW",
        "completed": 234,
        "legacyCompleted": 54,
        "mostNotableChallenge": {
            "id": 401306,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 219,
                "CHALLENGER": 377,
                "SILVER": 20,
                "PLATINUM": 65,
                "BRONZE": 10,
                "IRON": 5,
                "MASTER": 115,
                "GOLD": 40,
                "DIAMOND": 90
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0.001,
                "PLATINUM": 0.007,
                "IRON": 0.049,
                "SILVER": 0.021,
                "NONE": 1,
                "BRONZE": 0.034,
                "DIAMOND": 0.004,
                "MASTER": 0.003,
                "GOLD": 0.012
            },
            "leaderboardThresholds": [
                1936,
                1,
                377,
                2345,
                219,
                11721
            ]
        },
        "mostNotableChallengePosition": 427
    },
    {
        "name": "Wo Hen Xiang Ta#FVK",
        "score": 25510,
        "region": "EUW",
        "completed": 234,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 303402,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 37,
                "CHALLENGER": 90,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0.002,
                "DIAMOND": 0.061,
                "MASTER": 0.047,
                "PLATINUM": 0.078,
                "GOLD": 0.121,
                "GRANDMASTER": 0.012,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                1014,
                1,
                90,
                37856,
                37,
                189273
            ]
        },
        "mostNotableChallengePosition": 39
    },
    {
        "name": "Pom#000",
        "score": 25570,
        "region": "EUW",
        "completed": 249,
        "legacyCompleted": 36,
        "mostNotableChallenge": {
            "id": 302103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 6,
                "PLATINUM": 2,
                "MASTER": 4,
                "GOLD": 1,
                "DIAMOND": 3
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.005,
                "DIAMOND": 0.051,
                "BRONZE": 0.256,
                "GOLD": 0.151,
                "IRON": 0,
                "SILVER": 0.072,
                "MASTER": 0.021,
                "PLATINUM": 0.1
            },
            "leaderboardThresholds": [
                105,
                1,
                6,
                16407,
                5,
                82029
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Reanimation#KR1",
        "score": 25395,
        "region": "KR",
        "completed": 235,
        "legacyCompleted": 39,
        "mostNotableChallenge": {
            "id": 302103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 6,
                "PLATINUM": 2,
                "MASTER": 4,
                "GOLD": 1,
                "DIAMOND": 3
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.005,
                "DIAMOND": 0.051,
                "BRONZE": 0.256,
                "GOLD": 0.151,
                "IRON": 0,
                "SILVER": 0.072,
                "MASTER": 0.021,
                "PLATINUM": 0.1
            },
            "leaderboardThresholds": [
                105,
                1,
                6,
                16407,
                5,
                82029
            ]
        },
        "mostNotableChallengePosition": 9
    },
    {
        "name": "팬 티#스타킹",
        "score": 25445,
        "region": "KR",
        "completed": 231,
        "legacyCompleted": 45,
        "mostNotableChallenge": {
            "id": 302303,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 2106,
                "CHALLENGER": 4161,
                "SILVER": 50,
                "PLATINUM": 375,
                "BRONZE": 20,
                "IRON": 5,
                "MASTER": 1000,
                "GOLD": 150,
                "DIAMOND": 675
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0.001,
                "PLATINUM": 0.015,
                "IRON": 0.172,
                "SILVER": 0.079,
                "NONE": 1,
                "BRONZE": 0.117,
                "DIAMOND": 0.007,
                "MASTER": 0.004,
                "GOLD": 0.038
            },
            "leaderboardThresholds": [
                30075,
                1,
                4161,
                2967,
                2106,
                14827
            ]
        },
        "mostNotableChallengePosition": 29
    },
    {
        "name": "하늘아 잘 해봐#KR1",
        "score": 25605,
        "region": "KR",
        "completed": 239,
        "legacyCompleted": 37,
        "mostNotableChallenge": {
            "id": 203202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 17,
                "CHALLENGER": 25,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "SILVER": 0.109,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.031,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
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
        "mostNotableChallengePosition": 4
    },
    {
        "name": "SzyNa#bebe",
        "score": 25520,
        "region": "EUNE",
        "completed": 234,
        "legacyCompleted": 49,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 20
    },
    {
        "name": "Giraffe Throat#NA1",
        "score": 25225,
        "region": "NA",
        "completed": 232,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 12
    },
    {
        "name": "Fel#Fire",
        "score": 25510,
        "region": "NA",
        "completed": 234,
        "legacyCompleted": 54,
        "mostNotableChallenge": {
            "id": 303408,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 23,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.001,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0,
                "NONE": 1,
                "GOLD": 0.012,
                "DIAMOND": 0
            },
            "leaderboardThresholds": [
                97,
                1,
                23,
                45,
                10,
                220
            ]
        },
        "mostNotableChallengePosition": 15
    },
    {
        "name": "Caracal#277",
        "score": 25370,
        "region": "EUW",
        "completed": 228,
        "legacyCompleted": 55,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 92
    },
    {
        "name": "ChocolateCookies#34202",
        "score": 25765,
        "region": "VN",
        "completed": 240,
        "legacyCompleted": 56,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 4
    },
    {
        "name": "Its Zynodor#EUW",
        "score": 25465,
        "region": "EUW",
        "completed": 235,
        "legacyCompleted": 40,
        "mostNotableChallenge": {
            "id": 302203,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 170,
                "CHALLENGER": 237,
                "SILVER": 5,
                "PLATINUM": 40,
                "BRONZE": 2,
                "IRON": 1,
                "MASTER": 120,
                "GOLD": 10,
                "DIAMOND": 70
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
                "PLATINUM": 0,
                "IRON": 0.101,
                "GOLD": 0.002,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.047,
                "SILVER": 0.011,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                332,
                1,
                237,
                3,
                170,
                10
            ]
        },
        "mostNotableChallengePosition": 4
    },
    {
        "name": "Miss#ubaby",
        "score": 25345,
        "region": "BR",
        "completed": 236,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 2
    },
    {
        "name": "topalov#EUW",
        "score": 25430,
        "region": "EUW",
        "completed": 233,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 302103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 6,
                "PLATINUM": 2,
                "MASTER": 4,
                "GOLD": 1,
                "DIAMOND": 3
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.005,
                "DIAMOND": 0.051,
                "BRONZE": 0.256,
                "GOLD": 0.151,
                "IRON": 0,
                "SILVER": 0.072,
                "MASTER": 0.021,
                "PLATINUM": 0.1
            },
            "leaderboardThresholds": [
                105,
                1,
                6,
                16407,
                5,
                82029
            ]
        },
        "mostNotableChallengePosition": 39
    },
    {
        "name": "Sleepyyvoice#212",
        "score": 25330,
        "region": "NA",
        "completed": 236,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 241
    },
    {
        "name": "堂本獸#2749",
        "score": 25455,
        "region": "TW",
        "completed": 235,
        "legacyCompleted": 45,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 81
    },
    {
        "name": "Rhio#69420",
        "score": 25255,
        "region": "EUW",
        "completed": 234,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 303406,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 19,
                "CHALLENGER": 37,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "PLATINUM": 0.035,
                "IRON": 0,
                "GOLD": 0.073,
                "MASTER": 0.013,
                "GRANDMASTER": 0.003,
                "CHALLENGER": 0.001,
                "BRONZE": 0,
                "SILVER": 0,
                "DIAMOND": 0.022,
                "NONE": 1
            },
            "leaderboardThresholds": [
                468,
                1,
                37,
                10736,
                19,
                53676
            ]
        },
        "mostNotableChallengePosition": 4
    },
    {
        "name": "유니엔마#KR1",
        "score": 25060,
        "region": "KR",
        "completed": 231,
        "legacyCompleted": 52,
        "mostNotableChallenge": {
            "id": 203407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 13,
                "CHALLENGER": 28,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0.003,
                "MASTER": 0.001,
                "PLATINUM": 0.007,
                "GOLD": 0.041,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                416,
                1,
                27,
                453,
                13,
                4264
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "Maroxin#Maro",
        "score": 25375,
        "region": "EUW",
        "completed": 235,
        "legacyCompleted": 48,
        "mostNotableChallenge": {
            "id": 303408,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 23,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.001,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0,
                "NONE": 1,
                "GOLD": 0.012,
                "DIAMOND": 0
            },
            "leaderboardThresholds": [
                97,
                1,
                23,
                45,
                10,
                220
            ]
        },
        "mostNotableChallengePosition": 25
    },
    {
        "name": "MIEL MOUTARDE#YUK",
        "score": 25230,
        "region": "EUW",
        "completed": 235,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 402102,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 2500,
                "CHALLENGER": 5000,
                "SILVER": 60,
                "PLATINUM": 300,
                "BRONZE": 30,
                "IRON": 10,
                "MASTER": 1000,
                "GOLD": 150,
                "DIAMOND": 600
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0.001,
                "PLATINUM": 0.08,
                "IRON": 0.27,
                "SILVER": 0.166,
                "NONE": 1,
                "BRONZE": 0.204,
                "DIAMOND": 0.044,
                "MASTER": 0.021,
                "GOLD": 0.116
            },
            "leaderboardThresholds": [
                11053,
                1,
                4997,
                350,
                2499,
                19929
            ]
        },
        "mostNotableChallengePosition": 11
    },
    {
        "name": "KRXX#EUW",
        "score": 25345,
        "region": "EUW",
        "completed": 229,
        "legacyCompleted": 39,
        "mostNotableChallenge": {
            "id": 302203,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 170,
                "CHALLENGER": 237,
                "SILVER": 5,
                "PLATINUM": 40,
                "BRONZE": 2,
                "IRON": 1,
                "MASTER": 120,
                "GOLD": 10,
                "DIAMOND": 70
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
                "PLATINUM": 0,
                "IRON": 0.101,
                "GOLD": 0.002,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.047,
                "SILVER": 0.011,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                332,
                1,
                237,
                3,
                170,
                10
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "魔流劍#TW2",
        "score": 25355,
        "region": "TW",
        "completed": 237,
        "legacyCompleted": 53,
        "mostNotableChallenge": {
            "id": 501001,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 2626,
                "CHALLENGER": 4473,
                "SILVER": 15,
                "PLATINUM": 150,
                "BRONZE": 7,
                "IRON": 3,
                "MASTER": 1250,
                "GOLD": 75,
                "DIAMOND": 600
            },
            "translation": {
                "description": "Earn milestones on any Eternal",
                "name": "Mile Marker",
                "shortDescription": "Earn milestones on any Eternal"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "501000",
                "source": "ETERNALS"
            },
            "parent": "501000",
            "parentCategory": "5",
            "percentiles": {
                "SILVER": 0.111,
                "CHALLENGER": 0.001,
                "DIAMOND": 0.033,
                "MASTER": 0.017,
                "PLATINUM": 0.061,
                "GOLD": 0.076,
                "GRANDMASTER": 0.004,
                "BRONZE": 0.127,
                "IRON": 0.142,
                "NONE": 1
            },
            "leaderboardThresholds": [
                198422,
                1,
                4473,
                13422,
                2626,
                67102
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Kaisa#XĐG",
        "score": 25345,
        "region": "VN",
        "completed": 234,
        "legacyCompleted": 41,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 4
    },
    {
        "name": "Zapdos#Wint",
        "score": 25245,
        "region": "EUW",
        "completed": 230,
        "legacyCompleted": 55,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 4
    },
    {
        "name": "Zargoz#47337",
        "score": 25220,
        "region": "RU",
        "completed": 237,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 302103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 6,
                "PLATINUM": 2,
                "MASTER": 4,
                "GOLD": 1,
                "DIAMOND": 3
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.005,
                "DIAMOND": 0.051,
                "BRONZE": 0.256,
                "GOLD": 0.151,
                "IRON": 0,
                "SILVER": 0.072,
                "MASTER": 0.021,
                "PLATINUM": 0.1
            },
            "leaderboardThresholds": [
                105,
                1,
                6,
                16407,
                5,
                82029
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "Xatu#EUW",
        "score": 25290,
        "region": "EUW",
        "completed": 231,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 38
    },
    {
        "name": "MårküŞ ÐęSTR#666",
        "score": 25230,
        "region": "RU",
        "completed": 233,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 401102,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 6602411,
                "CHALLENGER": 8426315,
                "SILVER": 35000,
                "PLATINUM": 900000,
                "BRONZE": 3500,
                "IRON": 1200,
                "MASTER": 5000000,
                "GOLD": 220000,
                "DIAMOND": 2500000
            },
            "translation": {
                "description": "Earn total Mastery Points",
                "name": "Wise Master",
                "shortDescription": "Earn Mastery Points"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401100",
                "priority": ".1",
                "source": "EOGD"
            },
            "parent": "401100",
            "parentCategory": "3",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0.002,
                "DIAMOND": 0.042,
                "BRONZE": 0.376,
                "GOLD": 0.196,
                "IRON": 0.405,
                "SILVER": 0.283,
                "MASTER": 0.006,
                "PLATINUM": 0.119
            },
            "leaderboardThresholds": [
                21528393,
                1,
                8426315,
                4941,
                6602411,
                24698
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "Kroou#bird",
        "score": 25185,
        "region": "EUW",
        "completed": 234,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 190
    },
    {
        "name": "max5745#TH2",
        "score": 25325,
        "region": "TH",
        "completed": 231,
        "legacyCompleted": 36,
        "mostNotableChallenge": {
            "id": 203407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 13,
                "CHALLENGER": 28,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0.003,
                "MASTER": 0.001,
                "PLATINUM": 0.007,
                "GOLD": 0.041,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                416,
                1,
                27,
                453,
                13,
                4264
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "AI Falocco DVE01#EUW",
        "score": 25095,
        "region": "EUW",
        "completed": 227,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 302203,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 170,
                "CHALLENGER": 237,
                "SILVER": 5,
                "PLATINUM": 40,
                "BRONZE": 2,
                "IRON": 1,
                "MASTER": 120,
                "GOLD": 10,
                "DIAMOND": 70
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
                "PLATINUM": 0,
                "IRON": 0.101,
                "GOLD": 0.002,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.047,
                "SILVER": 0.011,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                332,
                1,
                237,
                3,
                170,
                10
            ]
        },
        "mostNotableChallengePosition": 18
    },
    {
        "name": "EisohneWaffel#BIER",
        "score": 25190,
        "region": "EUW",
        "completed": 233,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 303410,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 12,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "PLATINUM": 0,
                "IRON": 0,
                "SILVER": 0,
                "NONE": 1,
                "BRONZE": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "GOLD": 0.007
            },
            "leaderboardThresholds": [
                45,
                1,
                20,
                28,
                12,
                132
            ]
        },
        "mostNotableChallengePosition": 47
    },
    {
        "name": "Monkey#Twoo",
        "score": 25280,
        "region": "NA",
        "completed": 229,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 37
    },
    {
        "name": "imbut#KR1",
        "score": 25020,
        "region": "KR",
        "completed": 232,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 31
    },
    {
        "name": "Heyss#3009",
        "score": 25195,
        "region": "EUW",
        "completed": 228,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 303402,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 37,
                "CHALLENGER": 90,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0.002,
                "DIAMOND": 0.061,
                "MASTER": 0.047,
                "PLATINUM": 0.078,
                "GOLD": 0.121,
                "GRANDMASTER": 0.012,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                1014,
                1,
                90,
                37856,
                37,
                189273
            ]
        },
        "mostNotableChallengePosition": 79
    },
    {
        "name": "Khang x T#2212",
        "score": 25145,
        "region": "VN",
        "completed": 233,
        "legacyCompleted": 45,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 20
    },
    {
        "name": "oro na rurach#EUNE",
        "score": 25225,
        "region": "EUNE",
        "completed": 228,
        "legacyCompleted": 40,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 8
    },
    {
        "name": "uRxp#NA1",
        "score": 25245,
        "region": "NA",
        "completed": 232,
        "legacyCompleted": 56,
        "mostNotableChallenge": {
            "id": 401300,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 570,
                "CHALLENGER": 690,
                "SILVER": 45,
                "PLATINUM": 160,
                "BRONZE": 30,
                "IRON": 15,
                "MASTER": 475,
                "GOLD": 100,
                "DIAMOND": 290
            },
            "translation": {
                "description": "Earn points from challenges in the Ace group",
                "name": "Ace",
                "shortDescription": "Earn points from challenges in the Ace group"
            },
            "reversed": false,
            "queueIds": [],
            "tags": {
                "parent": "401000",
                "isCapstone": "Y",
                "source": "CHALLENGES"
            },
            "parent": "401000",
            "parentCategory": "3",
            "title": "Just Better",
            "percentiles": {
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "DIAMOND": 0.006,
                "BRONZE": 0.1,
                "GOLD": 0.057,
                "IRON": 0.136,
                "SILVER": 0.083,
                "MASTER": 0,
                "PLATINUM": 0.026
            },
            "leaderboardThresholds": [
                0,
                0,
                600,
                1,
                560,
                767
            ]
        },
        "mostNotableChallengePosition": 26
    },
    {
        "name": "Dreamy#4442",
        "score": 24905,
        "region": "EUW",
        "completed": 229,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 104
    },
    {
        "name": "phunky#phunk",
        "score": 25100,
        "region": "NA",
        "completed": 230,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 30
    },
    {
        "name": "RIP Solo Queue#RIPs",
        "score": 25115,
        "region": "EUNE",
        "completed": 230,
        "legacyCompleted": 37,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "GH Mikasa#Lux",
        "score": 25160,
        "region": "VN",
        "completed": 233,
        "legacyCompleted": 39,
        "mostNotableChallenge": {
            "id": 303405,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 12,
                "CHALLENGER": 18,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "PLATINUM": 0.005,
                "IRON": 0,
                "GOLD": 0.027,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0,
                "SILVER": 0,
                "DIAMOND": 0.002,
                "NONE": 1
            },
            "leaderboardThresholds": [
                121,
                1,
                18,
                371,
                12,
                1850
            ]
        },
        "mostNotableChallengePosition": 39
    },
    {
        "name": "DontTouchMyToes#Slipp",
        "score": 25080,
        "region": "EUW",
        "completed": 229,
        "legacyCompleted": 53,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 34
    },
    {
        "name": "78th#78th",
        "score": 25210,
        "region": "EUW",
        "completed": 229,
        "legacyCompleted": 47,
        "mostNotableChallenge": {
            "id": 302103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 6,
                "PLATINUM": 2,
                "MASTER": 4,
                "GOLD": 1,
                "DIAMOND": 3
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.005,
                "DIAMOND": 0.051,
                "BRONZE": 0.256,
                "GOLD": 0.151,
                "IRON": 0,
                "SILVER": 0.072,
                "MASTER": 0.021,
                "PLATINUM": 0.1
            },
            "leaderboardThresholds": [
                105,
                1,
                6,
                16407,
                5,
                82029
            ]
        },
        "mostNotableChallengePosition": 181
    },
    {
        "name": "P0kimanesToilet#EUNE",
        "score": 24895,
        "region": "EUNE",
        "completed": 227,
        "legacyCompleted": 53,
        "mostNotableChallenge": {
            "id": 401306,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 219,
                "CHALLENGER": 377,
                "SILVER": 20,
                "PLATINUM": 65,
                "BRONZE": 10,
                "IRON": 5,
                "MASTER": 115,
                "GOLD": 40,
                "DIAMOND": 90
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0.001,
                "PLATINUM": 0.007,
                "IRON": 0.049,
                "SILVER": 0.021,
                "NONE": 1,
                "BRONZE": 0.034,
                "DIAMOND": 0.004,
                "MASTER": 0.003,
                "GOLD": 0.012
            },
            "leaderboardThresholds": [
                1936,
                1,
                377,
                2345,
                219,
                11721
            ]
        },
        "mostNotableChallengePosition": 9
    },
    {
        "name": "iSentinel#111",
        "score": 25135,
        "region": "EUW",
        "completed": 227,
        "legacyCompleted": 49,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 262
    },
    {
        "name": "Micoz#AARMY",
        "score": 25130,
        "region": "EUNE",
        "completed": 232,
        "legacyCompleted": 40,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 6
    },
    {
        "name": "Ash#3292",
        "score": 25105,
        "region": "NA",
        "completed": 230,
        "legacyCompleted": 48,
        "mostNotableChallenge": {
            "id": 303409,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 16,
                "CHALLENGER": 29,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "NONE": 1,
                "CHALLENGER": 0,
                "GRANDMASTER": 0.002,
                "DIAMOND": 0.014,
                "BRONZE": 0,
                "GOLD": 0.058,
                "IRON": 0,
                "SILVER": 0,
                "MASTER": 0.007,
                "PLATINUM": 0.024
            },
            "leaderboardThresholds": [
                153,
                1,
                29,
                5614,
                16,
                28066
            ]
        },
        "mostNotableChallengePosition": 131
    },
    {
        "name": "Dorweee#Coach",
        "score": 25130,
        "region": "NA",
        "completed": 220,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 303410,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 12,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "PLATINUM": 0,
                "IRON": 0,
                "SILVER": 0,
                "NONE": 1,
                "BRONZE": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "GOLD": 0.007
            },
            "leaderboardThresholds": [
                45,
                1,
                20,
                28,
                12,
                132
            ]
        },
        "mostNotableChallengePosition": 107
    },
    {
        "name": "TrollTrashRito#FFS",
        "score": 25095,
        "region": "EUW",
        "completed": 227,
        "legacyCompleted": 42,
        "mostNotableChallenge": {
            "id": 203202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 17,
                "CHALLENGER": 25,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "SILVER": 0.109,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.031,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
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
        "mostNotableChallengePosition": 2
    },
    {
        "name": "ADAMKISS#1337",
        "score": 24990,
        "region": "EUNE",
        "completed": 231,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 402503,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 442678,
                "CHALLENGER": 672708,
                "SILVER": 11000,
                "PLATINUM": 65000,
                "BRONZE": 4400,
                "IRON": 1100,
                "MASTER": 260000,
                "GOLD": 27000,
                "DIAMOND": 148000
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
                "NONE": 1,
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.004,
                "DIAMOND": 0.037,
                "BRONZE": 0.215,
                "GOLD": 0.122,
                "IRON": 0.289,
                "SILVER": 0.167,
                "MASTER": 0.015,
                "PLATINUM": 0.077
            },
            "leaderboardThresholds": [
                3995450,
                1,
                672708,
                12204,
                442678,
                61016
            ]
        },
        "mostNotableChallengePosition": 17
    },
    {
        "name": "Agiandor#EUW",
        "score": 25005,
        "region": "EUW",
        "completed": 226,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 303411,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 11,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.003,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                28,
                1,
                17,
                11,
                11,
                47
            ]
        },
        "mostNotableChallengePosition": 9
    },
    {
        "name": "Artas#artas",
        "score": 25005,
        "region": "EUNE",
        "completed": 226,
        "legacyCompleted": 49,
        "mostNotableChallenge": {
            "id": 302203,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 170,
                "CHALLENGER": 237,
                "SILVER": 5,
                "PLATINUM": 40,
                "BRONZE": 2,
                "IRON": 1,
                "MASTER": 120,
                "GOLD": 10,
                "DIAMOND": 70
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
                "PLATINUM": 0,
                "IRON": 0.101,
                "GOLD": 0.002,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.047,
                "SILVER": 0.011,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                332,
                1,
                237,
                3,
                170,
                10
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "리안드리의 고뇌#US1",
        "score": 25090,
        "region": "KR",
        "completed": 227,
        "legacyCompleted": 42,
        "mostNotableChallenge": {
            "id": 203305,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 300,
                "CHALLENGER": 500,
                "SILVER": 7,
                "PLATINUM": 40,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 150,
                "GOLD": 15,
                "DIAMOND": 80
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
                "SILVER": 0.09,
                "CHALLENGER": 0,
                "DIAMOND": 0.009,
                "MASTER": 0.003,
                "PLATINUM": 0.023,
                "GOLD": 0.057,
                "GRANDMASTER": 0.001,
                "BRONZE": 0.132,
                "IRON": 0.188,
                "NONE": 1
            },
            "leaderboardThresholds": [
                14603,
                1,
                499,
                1985,
                299,
                9046
            ]
        },
        "mostNotableChallengePosition": 5
    },
    {
        "name": "Umpa Lumpa#NaDn0",
        "score": 25075,
        "region": "RU",
        "completed": 230,
        "legacyCompleted": 51,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 9
    },
    {
        "name": "JoshButterJamal#Abdo",
        "score": 25070,
        "region": "NA",
        "completed": 229,
        "legacyCompleted": 45,
        "mostNotableChallenge": {
            "id": 303407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 10,
                "CHALLENGER": 17,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0,
                "IRON": 0,
                "NONE": 1,
                "MASTER": 0,
                "SILVER": 0,
                "DIAMOND": 0,
                "PLATINUM": 0,
                "BRONZE": 0,
                "GOLD": 0,
                "CHALLENGER": 0
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
        "mostNotableChallengePosition": 25
    },
    {
        "name": "jia KR#OCE",
        "score": 23830,
        "region": "OCE",
        "completed": 224,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 302103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 6,
                "PLATINUM": 2,
                "MASTER": 4,
                "GOLD": 1,
                "DIAMOND": 3
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
                "CHALLENGER": 0.001,
                "GRANDMASTER": 0.005,
                "DIAMOND": 0.051,
                "BRONZE": 0.256,
                "GOLD": 0.151,
                "IRON": 0,
                "SILVER": 0.072,
                "MASTER": 0.021,
                "PLATINUM": 0.1
            },
            "leaderboardThresholds": [
                105,
                1,
                6,
                16407,
                5,
                82029
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "탱글수현#탱글수현",
        "score": 24415,
        "region": "KR",
        "completed": 215,
        "legacyCompleted": 41,
        "mostNotableChallenge": {
            "id": 301103,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 5,
                "CHALLENGER": 13,
                "PLATINUM": 1,
                "MASTER": 3,
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
                "PLATINUM": 0.003,
                "GOLD": 0,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                52,
                1,
                13,
                51,
                5,
                249
            ]
        },
        "mostNotableChallengePosition": 6
    },
    {
        "name": "Shynce#EUW",
        "score": 25020,
        "region": "EUW",
        "completed": 228,
        "legacyCompleted": 55,
        "mostNotableChallenge": {
            "id": 210001,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 166,
                "CHALLENGER": 170,
                "SILVER": 15,
                "PLATINUM": 50,
                "BRONZE": 5,
                "IRON": 1,
                "MASTER": 150,
                "GOLD": 30,
                "DIAMOND": 100
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
                "GRANDMASTER": 0,
                "SILVER": 0.028,
                "CHALLENGER": 0,
                "PLATINUM": 0.001,
                "IRON": 0.22,
                "BRONZE": 0.091,
                "MASTER": 0,
                "NONE": 1,
                "GOLD": 0.007,
                "DIAMOND": 0
            },
            "leaderboardThresholds": [
                0,
                0,
                167,
                1,
                166,
                9
            ]
        },
        "mostNotableChallengePosition": 11
    },
    {
        "name": "Xshina#9527",
        "score": 25005,
        "region": "TW",
        "completed": 232,
        "legacyCompleted": 44,
        "mostNotableChallenge": {
            "id": 402409,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 25000000,
                "CHALLENGER": 50000000,
                "SILVER": 555000,
                "PLATINUM": 4150000,
                "BRONZE": 222000,
                "IRON": 55500,
                "MASTER": 15000000,
                "GOLD": 1110000,
                "DIAMOND": 7500000
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0.002,
                "PLATINUM": 0.067,
                "IRON": 0.297,
                "SILVER": 0.171,
                "NONE": 1,
                "BRONZE": 0.22,
                "DIAMOND": 0.038,
                "MASTER": 0.011,
                "GOLD": 0.135
            },
            "leaderboardThresholds": [
                132226483,
                1,
                49970251,
                898,
                24999844,
                35193
            ]
        },
        "mostNotableChallengePosition": 52
    },
    {
        "name": "퐁퐁남#3559",
        "score": 25065,
        "region": "KR",
        "completed": 229,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 103202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 42,
                "CHALLENGER": 66,
                "SILVER": 2,
                "PLATINUM": 8,
                "BRONZE": 1,
                "MASTER": 25,
                "GOLD": 3,
                "DIAMOND": 15
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
                "PLATINUM": 0.044,
                "IRON": 0,
                "GOLD": 0.093,
                "MASTER": 0.008,
                "GRANDMASTER": 0.002,
                "CHALLENGER": 0,
                "BRONZE": 0.163,
                "SILVER": 0.117,
                "DIAMOND": 0.02,
                "NONE": 1
            },
            "leaderboardThresholds": [
                920,
                1,
                66,
                6332,
                42,
                31653
            ]
        },
        "mostNotableChallengePosition": 60
    },
    {
        "name": "EckeLucas#EUW",
        "score": 25035,
        "region": "EUW",
        "completed": 229,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 303303,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 1694,
                "CHALLENGER": 2298,
                "SILVER": 75,
                "PLATINUM": 250,
                "BRONZE": 25,
                "IRON": 5,
                "MASTER": 1200,
                "GOLD": 135,
                "DIAMOND": 600
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
                "SILVER": 0.103,
                "CHALLENGER": 0,
                "DIAMOND": 0.018,
                "MASTER": 0.003,
                "PLATINUM": 0.051,
                "GOLD": 0.077,
                "GRANDMASTER": 0.001,
                "BRONZE": 0.154,
                "IRON": 0.234,
                "NONE": 1
            },
            "leaderboardThresholds": [
                6357,
                1,
                2298,
                2731,
                1694,
                13648
            ]
        },
        "mostNotableChallengePosition": 107
    },
    {
        "name": "UpperBlackVise#みさき美咲",
        "score": 24875,
        "region": "NA",
        "completed": 223,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 9
    },
    {
        "name": "黯魔陰帝ü達守羌#三民權志龍",
        "score": 24965,
        "region": "TW",
        "completed": 227,
        "legacyCompleted": 51,
        "mostNotableChallenge": {
            "id": 301304,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 15,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 10,
                "GOLD": 1,
                "DIAMOND": 5
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
                "GRANDMASTER": 0.001,
                "SILVER": 0,
                "CHALLENGER": 0,
                "PLATINUM": 0.046,
                "IRON": 0,
                "BRONZE": 0,
                "MASTER": 0.004,
                "NONE": 1,
                "GOLD": 0.12,
                "DIAMOND": 0.022
            },
            "leaderboardThresholds": [
                929,
                1,
                20,
                3330,
                14,
                14069
            ]
        },
        "mostNotableChallengePosition": 12
    },
    {
        "name": "Easy#Bake",
        "score": 25020,
        "region": "EUW",
        "completed": 233,
        "legacyCompleted": 40,
        "mostNotableChallenge": {
            "id": 203202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 17,
                "CHALLENGER": 25,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "SILVER": 0.109,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.031,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
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
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Ninmery#BR1",
        "score": 24695,
        "region": "BR",
        "completed": 228,
        "legacyCompleted": 48,
        "mostNotableChallenge": {
            "id": 301101,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 632,
                "CHALLENGER": 962,
                "SILVER": 25,
                "PLATINUM": 150,
                "BRONZE": 10,
                "IRON": 3,
                "MASTER": 400,
                "GOLD": 50,
                "DIAMOND": 250
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "PLATINUM": 0.008,
                "IRON": 0.164,
                "SILVER": 0.064,
                "NONE": 1,
                "BRONZE": 0.105,
                "DIAMOND": 0.003,
                "MASTER": 0.001,
                "GOLD": 0.036
            },
            "leaderboardThresholds": [
                3462,
                1,
                962,
                786,
                632,
                3926
            ]
        },
        "mostNotableChallengePosition": 3
    },
    {
        "name": "불곰파 인정순#KR1",
        "score": 24820,
        "region": "KR",
        "completed": 224,
        "legacyCompleted": 43,
        "mostNotableChallenge": {
            "id": 203407,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 13,
                "CHALLENGER": 28,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "SILVER": 0,
                "CHALLENGER": 0,
                "DIAMOND": 0.003,
                "MASTER": 0.001,
                "PLATINUM": 0.007,
                "GOLD": 0.041,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                416,
                1,
                27,
                453,
                13,
                4264
            ]
        },
        "mostNotableChallengePosition": 5
    },
    {
        "name": "Don Rigoni#Doni",
        "score": 24945,
        "region": "EUW",
        "completed": 222,
        "legacyCompleted": 50,
        "mostNotableChallenge": {
            "id": 210002,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 66,
                "CHALLENGER": 145,
                "SILVER": 5,
                "PLATINUM": 15,
                "BRONZE": 3,
                "IRON": 1,
                "MASTER": 30,
                "GOLD": 10,
                "DIAMOND": 20
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
                "PLATINUM": 0,
                "IRON": 0.069,
                "GOLD": 0,
                "MASTER": 0,
                "GRANDMASTER": 0,
                "CHALLENGER": 0,
                "BRONZE": 0.013,
                "SILVER": 0.004,
                "DIAMOND": 0,
                "NONE": 1
            },
            "leaderboardThresholds": [
                166,
                1,
                145,
                3,
                66,
                10
            ]
        },
        "mostNotableChallengePosition": 1
    },
    {
        "name": "Last Remnant#EUNE",
        "score": 24960,
        "region": "EUNE",
        "completed": 228,
        "legacyCompleted": 52,
        "mostNotableChallenge": {
            "id": 203202,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 17,
                "CHALLENGER": 25,
                "SILVER": 1,
                "PLATINUM": 5,
                "MASTER": 12,
                "GOLD": 2,
                "DIAMOND": 8
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
                "SILVER": 0.109,
                "CHALLENGER": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "PLATINUM": 0,
                "GOLD": 0.031,
                "GRANDMASTER": 0,
                "BRONZE": 0,
                "IRON": 0,
                "NONE": 1
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
        "mostNotableChallengePosition": 1
    },
    {
        "name": "CrazyGurkä#EUW",
        "score": 24755,
        "region": "EUW",
        "completed": 222,
        "legacyCompleted": 46,
        "mostNotableChallenge": {
            "id": 303410,
            "state": "ENABLED",
            "leaderboard": true,
            "thresholds": {
                "GRANDMASTER": 12,
                "CHALLENGER": 20,
                "PLATINUM": 3,
                "MASTER": 8,
                "GOLD": 1,
                "DIAMOND": 5
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
                "CHALLENGER": 0,
                "GRANDMASTER": 0,
                "PLATINUM": 0,
                "IRON": 0,
                "SILVER": 0,
                "NONE": 1,
                "BRONZE": 0,
                "DIAMOND": 0,
                "MASTER": 0,
                "GOLD": 0.007
            },
            "leaderboardThresholds": [
                45,
                1,
                20,
                28,
                12,
                132
            ]
        },
        "mostNotableChallengePosition": 26
    }
];