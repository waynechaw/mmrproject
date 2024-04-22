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

let data = [
    {
        "name": "你如此清晰",
        "tag": "2450",
        "region": "TW",
        "puuid": "jHU7Vu0h99elk1d_EGJqmNAIk1zs84TazVlLDydJmzQZt2S5yM3bfkGpyjqUgl2GP1qAoIpoDXAphw"
    },
    {
        "name": "Аня",
        "tag": "Мякиш",
        "region": "RU",
        "puuid": "d7RFdaBlt2Uyqg27XHLabOCIW3I5s6cn3qOdTLZk_4WXCxkadC0yfKzaFzZ2FisZ6XOcS4yXcRlYDg"
    },
    {
        "name": "God",
        "tag": "ofriz",
        "region": "SG",
        "puuid": "mK4gRdDC6jCFjl4cwU7RYVPJhZdZpuBeaneh7iyqvcf1Q3vQy9N5zvIavokV47Mp926jZiJs16D-vg"
    },
    {
        "name": "香濃巧克力奶酒ü",
        "tag": "7447",
        "region": "TW",
        "puuid": "Bc3ri4m0F3WqsnH_mjXKINF35vs-_rPhktwF2baLaPzshtaR0wyYI27OTWh25PwoPgARtPj-h2OEMg"
    },
    {
        "name": "GoatsAndGlory",
        "tag": "EUNE",
        "region": "EUNE",
        "puuid": "XlN7stTfK6gYjnZgdRRQRvwRr8hm9WhTRIAYQL6hjnBR9UUtjK2YKkj1_-e-gXJF4mjlE3YY6-aYLw"
    },
    {
        "name": "God",
        "tag": "ofriz",
        "region": "EUNE",
        "puuid": "mK4gRdDC6jCFjl4cwU7RYVPJhZdZpuBeaneh7iyqvcf1Q3vQy9N5zvIavokV47Mp926jZiJs16D-vg"
    },
    {
        "name": "black一cat",
        "tag": "補雷k",
        "region": "TW",
        "puuid": "WIGWsuqrTr-dRD31pNoDs1Wxnj292cALH1owUFUnCx8TgAgBiDgOS33_OW0kK8iJr8hyJ1bnlgOM2w"
    },
    {
        "name": "vtt yêu ems",
        "tag": "2808",
        "region": "VN",
        "puuid": "9z8iSaZMZ8ikZMigc07V-M-o1Xxg-ih6h8smS-4Jg2hSii_G7YGJJZx5N0qrGc18eylfOwnM03u8bw"
    },
    {
        "name": "내가하고싶은대로할거니깐말리지마",
        "tag": "자유로운",
        "region": "KR",
        "puuid": "hLEz_mEwwvfmHZOOLBOuM9EB9fxm8YkyCIIdkHCnPiJJz1vODKCztMtgvR03ShLPvF8V5I-kqC3jRA"
    },
    {
        "name": "SubmissiveEboy",
        "tag": "2703",
        "region": "EUW",
        "puuid": "sy3AVCHHbDmUwu7Ok02cJZk6g2tdBp94rZj7-tvq_Aw9MnZ4EeRTE_9tjkADXDtJ5rlhrgMMHVhXLg"
    },
    {
        "name": "FAKE PROMISE",
        "tag": "1V9",
        "region": "EUNE",
        "puuid": "hBpWTICfiY0Z2FMqNpH8XuDmb1n9x28sdjNIRqCbiBVn5y4mOevgqBERABAw_qFPOpcnnGrkBDCsqw"
    },
    {
        "name": "ºł Ðøüx ƒÞęý łº",
        "tag": "1337",
        "region": "RU",
        "puuid": "a89jmSa7W-hk7DM-i9qtBnhQ8NolXKCaRQjbQk08xoX5gZjKAmmCN07ENuLvflQoHGnhk2sabkqNBQ"
    },
    {
        "name": "偷工減料學政",
        "tag": "0610",
        "region": "TW",
        "puuid": "O9B6bz8e5vud90Gstuj77sGx-833l-wBniTLpVmEw-x87S5vwCZU4QaWU3XJVAEgVmLj9icAdNLn9w"
    },
    {
        "name": "中和援嬌妹",
        "tag": "1NN",
        "region": "TW",
        "puuid": "PcSiHtxrKXBSzfYCgGNaKD1TJ8UKDRnK9q-LfyuoPod-th6VhQNNDnteCdAAuVKFTAiYLXliFlGOgw"
    },
    {
        "name": "L1k3 4 8055",
        "tag": "1337",
        "region": "EUW",
        "puuid": "sFDsH2187kMJPssWECsbn-K1zt_teylH9gLpCOcNYmRSu4tO0v887onZOB4nEZ_F4rdr92FWjdJ8tA"
    },
    {
        "name": "Abe no Seimei",
        "tag": "1102",
        "region": "VN",
        "puuid": "CYWHyE7tLbFQaZ7NtoeP4IOCmiYUeThP3Lokd6KTHDIhoZvKblJumaIQMDhg96Uc8u440dUIwpplQw"
    },
    {
        "name": "SeparatedPuppyy",
        "tag": "14881",
        "region": "EUW",
        "puuid": "GMDNMYG-tgtuysImus85vF72K3S2PIyJrGuKxaX2pFlwtrHaBuCZDXhBQgwlm8CKsGC1ySBIO6TCyA"
    },
    {
        "name": "Keber",
        "tag": "Keber",
        "region": "EUW",
        "puuid": "zmNnX_05dWxyDpNLyWNd-__rtT5qsEt6b0wIxA4FyO4SQk_jjjPSpS9C89IS0RmzCE3eetlML4fU0Q"
    },
    {
        "name": "336루 7469",
        "tag": "Chan",
        "region": "KR",
        "puuid": "bwGeZpkK88Md-ztM5ky9F-TbeBUqdYymiE3qs8tQr_SD91IDyr3ro9N0flysPdwlko96C69SRBBoOA"
    },
    {
        "name": "EkinoScythe",
        "tag": "RALA",
        "region": "PH",
        "puuid": "uPRUT2Ioduxd_rSa64mzQW0icDvk3BJ4e9jGIC-JR-pAu-4F-x9sc1iczGcaI2-q628wr0LJj97tsQ"
    },
    {
        "name": "Thỏ",
        "tag": "1017",
        "region": "VN",
        "puuid": "jgrMKHfFWmt5Te1_ILjR_BCbH8JZgc-1AaLQZoBJmqC3BP2RT2E3Y1j74VDQN4kVuAL97J7hp1A_aQ"
    },
    {
        "name": "TheBlueWolf",
        "tag": "WOUF",
        "region": "NA",
        "puuid": "ghaG0WtXs2Rh_mlEDASwR6jD7CdTe6QWqvhavVhatzUPJYO4lkNaaNlBVFQGaKC9ey9PUtO5bd02kA"
    },
    {
        "name": "15레벨",
        "tag": "KR1",
        "region": "KR",
        "puuid": "to6hyEyT2PLPVLcFSyBgHxwGeozkdGP8i3_uu7LtBfoLpZ3JqWlt9XAWRO5ktNxe5nKwUngl6JMG4A"
    },
    {
        "name": "Tchikachu",
        "tag": "NA1",
        "region": "NA",
        "puuid": "iSv0Dv64hMbDkL4avgoNU_2NS0iK9EH9uaygYCWVV9aP6Ml3UqWD9wjz9RzOlKBh4gPbgIMhUbHR3Q"
    },
    {
        "name": "我叫小筱幽",
        "tag": "1234",
        "region": "TW",
        "puuid": "lqeAr3uaQE3fnXEpzuZZ0iP04FiEXx05u-0CyGk352LTIejbk0XE1KMsDfCZAOgHM5iOrUZlEdQEdQ"
    },
    {
        "name": "익사체",
        "tag": "익사체",
        "region": "KR",
        "puuid": "kzKvvvzO1lmZ4luRFetjQ25aQKndjL87y3Y5YgA4SpRRNyUXf0Ge3JtPqmUTbHwSShDt9-33OqR3pQ"
    },
    {
        "name": "KAYN PSY",
        "tag": "RU1",
        "region": "RU",
        "puuid": "WxsihBY3i_5pTNw-jGNJcqqvV-CDDw6T1ceJkbMflhcZo44eOKVHFgkhYuMbQxiC4axylVNliFIt8w"
    },
    {
        "name": "Klenoff",
        "tag": "00000",
        "region": "RU",
        "puuid": "Ts2ACpcSD5JChR05rnPzPebjBrxFkv4rhirpd25ArK_Gzs9HUqwDP6waVFzytVGh4UWmY3CWa5xblw"
    },
    {
        "name": "yua mikami",
        "tag": "1103",
        "region": "VN",
        "puuid": "KFBDUAyasDWn9u6QcS1GOXwX6NOpYzF_lZcQyE62FDa7XO4KaUyluMlUoA3C-1TLBK3OiaOH2AOUVg"
    },
    {
        "name": "Innocent",
        "tag": "0517",
        "region": "TW",
        "puuid": "GBeD6Qy6xjEIwp_mJOcEI6Pm0rtsCjm1t3o7nZ4kbF008TJHGEO2QnfrW_FKvgUePcjYfoMJvO8ieg"
    },
    {
        "name": "Elisza Kitsune",
        "tag": "Ghost",
        "region": "NA",
        "puuid": "GYPqoVwkVOQuEGSab_7hBP9DNqxTYw27Xar4TZJXAGrCpEZDbWzJHpKCBr3kimYcv4M-Jt0V8z1N2Q"
    },
    {
        "name": "Turbo Αids",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "89vGUh66LxmTmLg5xqUIK1oeEz--ZscrZNv4njRyqk6jnqO5T0fZdluIo543vwBmxvWNfYTjAgcqnQ"
    },
    {
        "name": "Bладик",
        "tag": "RU1",
        "region": "RU",
        "puuid": "TdCQaGesfWslDKEXF2AwqsZHIGrWFqIs9sNtbPjncfbqJJJ1VcIeBbf_MjTzlYXTxNzFyjLNz8CgyA"
    },
    {
        "name": "TDA Deathwing",
        "tag": "1560",
        "region": "VN",
        "puuid": "Ytrsa5NpHqKWwXhEz-pq1UdIEap__x0o3Afw8rd2GtFkCnrSk-oDOQxF_97Gtw8orGhWdgTn8u0u3w"
    },
    {
        "name": "kero",
        "tag": "NA1",
        "region": "NA",
        "puuid": "DdYuXckFFnnM8baalfegLSncDnnSrLAj1eGq-53fOGmqIsR36y2xLaSj-IZNf0vPP2WKjjOIOv0MzA"
    },
    {
        "name": "Anoxiaß",
        "tag": "0528",
        "region": "TW",
        "puuid": "irwOgXqv_fgwOlPJt9eAn64GeodxYizcnqdte8KvcbnvwkRjQPXc0KCoHi_cu6ZtLyaQCGdag_4MyA"
    },
    {
        "name": "Legendary INC",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "tRRWNHVLT8RWkaAJk1wZFjZwtTTgTmJ-3dvP6Jy2Iph23dV4PB0uv_JHJ50VgewNIgAhxPMqcULSnQ"
    },
    {
        "name": "blushy",
        "tag": "0511",
        "region": "EUNE",
        "puuid": "GjLHkbPag9QPTyTT34O1x6OHUIBLGfUFuic-CgVwxJzV7XKIdXAU1_NsS9l1mGo_A4CPlo6Tg1up4g"
    },
    {
        "name": "dandan",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "t6j2j4PLc0Pr1rHmD4ZjyQf9zNzKFDR5U3HlaIZ3n8S5e0RJwwjsqQZvmIOMy6v1rgLP-MwGZD7Kzw"
    },
    {
        "name": "Loopy",
        "tag": "0004",
        "region": "EUW",
        "puuid": "FX1TX1Cw3j8XBAo1MDe1s7zMbfmJd_3ByAGyu066qOses4kO80_Vb37TUOm0wJECvCuuxbLTKvuETA"
    },
    {
        "name": "monkey30000",
        "tag": "Lyff",
        "region": "NA",
        "puuid": "PsCJZAH_3iuMX9man3DNWaP00GDdNC-KeXZCWI39JpXq9GoEpNn98bT92PfVlMrEJ-xXYyoBNuuFJA"
    },
    {
        "name": "123xyz",
        "tag": "99999",
        "region": "VN",
        "puuid": "_-Zoo83OP32JbN4BT0ZJjZxweBwk1SAns7xcUCzQkAyrVJIAHp60Anz0fFQiZqcgRFHqnjnn6K7KFw"
    },
    {
        "name": "FullHouseYoyo",
        "tag": "RUNER",
        "region": "EUW",
        "puuid": "B4xvabQzHPd0dFEgbmH8TLIwtGHQBDu6HT3B949ulI9EtWe1_HdFwzzsxd6tnIOFo-BNfwwr0c7KzQ"
    },
    {
        "name": "TheGrimMeeper",
        "tag": "Meep",
        "region": "EUW",
        "puuid": "TeV_ONH5Z6D9NdM70e_340FnL1XszGBy-L6zb0kBAxF3tCQbOfZew4uvE4RYkdDeuuO9CwLHw-D2KA"
    },
    {
        "name": "Falko",
        "tag": "Lucky",
        "region": "EUNE",
        "puuid": "XAMD4uKg_LR7ia0lLcxDuZY85O9fP4C4lbPTmFUDw0WCDJ4oNRBcZZH7gmDmapMEt2ofJHC4kEu_tw"
    },
    {
        "name": "Percepeus",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "BTXKmrBjhWiwlbJL6qMqFpMMcDwyMMQrg7oAkjUqwuWwvWjbHBM2hQrb_rKbvwazAzsakU-mbEMxOw"
    },
    {
        "name": "P6RN",
        "tag": "7777",
        "region": "JP",
        "puuid": "5zPcoR39GIj0UdcuhXm0HGXOd4D0q2jkK--hjQhYxAC5xTSP7oMrRzO7MG7gTc7a9jMHTJW4pmHYPQ"
    },
    {
        "name": "哭哭鯊",
        "tag": "0113",
        "region": "TW",
        "puuid": "oHR_4vxQB1jtU1jOPvwPCJBQXjab4qk3xxxzdMhzzQoLxKbeHg4dJdwQN_45NfEiDQPZ9weUak9b7A"
    },
    {
        "name": "FARC Teemochenco",
        "tag": "LAN",
        "region": "LAN",
        "puuid": "e72xXWvKVUIGUppEdsZmluV8-eys3M0maVbEKyQxMwiXCmtoVbTFobv84IhrLlFrkfwcnaIMoOeZ0A"
    },
    {
        "name": "dyduk",
        "tag": "2106",
        "region": "VN",
        "puuid": "hiU75PcLD1Qr2lmYCnp4oQOgEGRzN5J6X_M4-D1w3aeiHDUfmJ01QlNVaftedYRRsQUvabDPfk5v1Q"
    },
    {
        "name": "L1k3 4 8055",
        "tag": "1337",
        "region": "TR",
        "puuid": "sFDsH2187kMJPssWECsbn-K1zt_teylH9gLpCOcNYmRSu4tO0v887onZOB4nEZ_F4rdr92FWjdJ8tA"
    },
    {
        "name": "Sippy",
        "tag": "uwu",
        "region": "JP",
        "puuid": "eiZ-RmdK5hWyLB2qeRl7hhXJCzcUN4x25bRtXdKxvtwaAl64yYYMO5UChUX0QfuCIvyYAVYxTHoxRA"
    },
    {
        "name": "Roszczyn",
        "tag": "123",
        "region": "EUW",
        "puuid": "-pFtSNxu--G-H-ZPvGd3p0ZWDUM81jKdfQwZa_ZlleHHvehzldjE7Z591_zwsb8GrsDrFaJS0WuHlw"
    },
    {
        "name": "Rato Pelado",
        "tag": "Naked",
        "region": "BR",
        "puuid": "lsO6CaSqMM_ySRiyn7fVaquikCJYudrcY9KPZbv1AKPDN4DOX5UZA-Er5OYR36T9j3Sc4Ay55Rgxtw"
    },
    {
        "name": "그 누구도 시첸과 비교할 수",
        "tag": "1020",
        "region": "TW",
        "puuid": "r4IVHFR-w78n6aPkglC9CHRqWtqcklQCvg-yjsSWHVLLu03NTgwq8hP5hZG2F2ss-TuLfTs52FQ_1Q"
    },
    {
        "name": "W2uan",
        "tag": "VN00",
        "region": "VN",
        "puuid": "HM0b8z7yF-ufwGwDhGFUACy9L6nQ9zIqeHoQQG-3u7tZZ4JuhVQkdPWHTl-iFlPvueR3_7dZR5blGw"
    },
    {
        "name": "scrubnoob",
        "tag": "ragne",
        "region": "VN",
        "puuid": "DPoiBG2HfCu3ruW9W2ValR46JcKU4oFEELF3oHuFZniw4jBQxLKqkW5VKi21uUGmcw9F_2jdC4Ihdg"
    },
    {
        "name": "He11DeMoN",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "hzNVpLz-5hxDByBdHluoaceLx3EARF7Xfwlk9BRnEnRNscIdXaZwXUM30NV_bN7LXl_IvGeYPLEmmA"
    },
    {
        "name": "也许有一天",
        "tag": "我是说也许",
        "region": "NA",
        "puuid": "H7QdPWDlzG3jxTD1CqR9qgv7Yt9D4_3jFSHiwe02_h0iTsfh0tg8lw3f87ejqdYACbctvByfH_0vTw"
    },
    {
        "name": "QiàoQiào",
        "tag": "0205",
        "region": "NA",
        "puuid": "BwZu73Da-AgMWM1ysIbwrTBt4zYyxe8J4AU-K_pUKKXR0fhDcVnnJhKPPc30BQdKWUUOkOqywxmiwQ"
    },
    {
        "name": "小珍珠不見蹤穎",
        "tag": "038",
        "region": "TW",
        "puuid": "Ug-WfaAymdQSHFDaPmvjK-cQecT5y_n2ZxO6BcXd_ulgEBXrLK7377VMYYHaZ33OzlVBZV-LVeqjIg"
    },
    {
        "name": "Detonator16",
        "tag": "donk",
        "region": "EUW",
        "puuid": "gw74LQK7QvwfiZplK4tR2ykU1pPfxhqbKuxoJxKrO76mnghRkDGYlbLkhDh0YrbtLSUNScPhpxOjqA"
    },
    {
        "name": "Veit",
        "tag": "EUNE",
        "region": "EUNE",
        "puuid": "2vEnJdwLTBQVT22Kqi_H9qhH8zhTel_keV-cEFqTCpDq--zsuui0Gy-ICDItSgxAMc43Kx4ivk_-Kw"
    },
    {
        "name": "Vecna",
        "tag": "NUNU",
        "region": "BR",
        "puuid": "ZCQ6GS4uHSSvbk3E5RTQh4IjrPPB66EQ23yJz-ugo_YJDOMNDN4M43VqRoMJok8kuj2gVtz-uQQCXA"
    },
    {
        "name": "Dirkee",
        "tag": "EUNE",
        "region": "EUNE",
        "puuid": "HEstXUatgxbTfThmFX5LE7QEkDtCbe4IJk7GoWZqlTAWJocpL6X93ZUG1oFx6nGX8l40BI4HJZupqQ"
    },
    {
        "name": "TheDarkQuazar",
        "tag": "NA1",
        "region": "NA",
        "puuid": "q-T8przhGwnIsQDvBsAGDVa47KhjhJykgmuLTx12flP8zPrKoGLTRCSgxzkACnhBv2cgPBAsHi9oow"
    },
    {
        "name": "Kéo Trượt Nè",
        "tag": "5723",
        "region": "VN",
        "puuid": "ZAPakecgreK6fn0DHkBAO-SBPuzjgl46w3m8D0UW5cfCsNraTIXnYQfCQj_3B7ygkWO6ug0ihL0p0g"
    },
    {
        "name": "Shaco King",
        "tag": "SKing",
        "region": "JP",
        "puuid": "euyrzir7vCHCNMGROLazwW40MNb8H_wIBnVisH2aYih2bstVA2wGzToepJGEJ_YWAEKXkScLiGAIZA"
    },
    {
        "name": "I LOVE MY GF",
        "tag": "20 09",
        "region": "EUW",
        "puuid": "rAOHBYuIVc0HdzHXdH1BNA6F9l0LUdBwXSVoPwC2rrFfehgKKJhcI5Fj-EwRT83E3hBx_pp1PwrfuA"
    },
    {
        "name": "vim",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "WwhJ9kZXQETW7aPjpoCFZyMdHUAKkt7sj8Sdc0wWICW9N1RNafXlUeXoRaRGhEvflEuBgNdRUt60aQ"
    },
    {
        "name": "Làm Sao A Có Thể",
        "tag": "1102",
        "region": "VN",
        "puuid": "-u3iOqJ5Ohh5Kh-0ilBm3X84zSDJRJshg3tm2CNGePi9yTBkqkzSk9osWjf6x8NUBhYyqBAPS3lXtA"
    },
    {
        "name": "Furry",
        "tag": "Pyke",
        "region": "LAN",
        "puuid": "uf3lx9FzBo1hUtcX8IgbAQZvo7WnJ3NbEV1YbJc6Kwtpz7PMtt7tAQz_yPoyu4DdjTAeymLsDfE4SQ"
    },
    {
        "name": "Broseidon",
        "tag": "Icy",
        "region": "NA",
        "puuid": "IWuf_sV4srwN-c0lxuDkdptHtW4pcThT3ChbAxfsilgwCugZAqvwkT4XzO2L2pA1US4Bi9YmHrabhw"
    },
    {
        "name": "aylie",
        "tag": "EUW2",
        "region": "EUW",
        "puuid": "BsYlrVnlsYNskOCtVYfuGPXf_M6XnadFfDVI9a3DH9A_YvPrUFfiw60NCmEiKqjlyfivPJJFnpOkyw"
    },
    {
        "name": "Zé Bonitinho",
        "tag": "0610",
        "region": "BR",
        "puuid": "FZYcfD39ph5A7qDlXcFp-ucmkshny5oMZf1rA9FkLxdYv8cLnvFSpkhEwo2ZUKx_PWn95hMqxfBAiA"
    },
    {
        "name": "ATC TundraRookie",
        "tag": "ZIZON",
        "region": "EUW",
        "puuid": "zBjX5QK1nhs_H_ymWW0qaM6JUYAuGuwkC_kCQDFoGAusoLnWh0vflgtpwLfluA5KSsuiCN-IC_kGVw"
    },
    {
        "name": "Helghans templar",
        "tag": "NA1",
        "region": "NA",
        "puuid": "tK3kd8m0SCGeCs9hltPtpKoqSiLtEqWuW27vMMOZhTTHABc49NBDmwKeSnMxANZWNMZtKhf9-PAEvA"
    },
    {
        "name": "TotalKappa",
        "tag": "EUNE",
        "region": "EUNE",
        "puuid": "qUx-B0KE10QfbD2YJKpkUtuQvBG8qydDxM2qCR6m9d3R1UsqEf_2-twPyrK1-A7ISOzC2K4cSb4HzQ"
    },
    {
        "name": "Hello Im Lucifer",
        "tag": "666",
        "region": "EUNE",
        "puuid": "c7RpDORyJnA4tpkTVPMgz6s5EKIy4J5BSM9U6m4rqm_gmz9PoTLhYG_iudlCDltH0PsIubgEQqhqGg"
    },
    {
        "name": "Pure Epicness",
        "tag": "NA1",
        "region": "NA",
        "puuid": "Ek-DIdHXJRs3jSjQ5WBStdI4WcotgN4B_DqjLTllVORo-KBbQXCEJ5YN5REZigfAa7TfobFB4horIg"
    },
    {
        "name": "OneLifeOneGame",
        "tag": "TW2",
        "region": "TW",
        "puuid": "F5lI_i1kOe57ht2j0O4K7yoSUmx9e5W7DhS-WEGTma0tT0PKFu-9XQsZKxC1GrMl6fRn_g1ZedMN6Q"
    },
    {
        "name": "Ruined Karma",
        "tag": "420",
        "region": "EUW",
        "puuid": "VA_qaRaUI8ZxK1bknlUvM-58IR4hqx_YbdsYHoxR3Aet1IphQ-4tOjJuTDlBi_GXkonPK3bIkOkt0g"
    },
    {
        "name": "Mes",
        "tag": "yyds",
        "region": "TW",
        "puuid": "OA5D40uNdNeGBr0mLI69PEArDnbLRsJJZ7jXWzOm3uE_v9sLQUNoG3c3bMdvhEYuYp3-e00T6Wx_aw"
    },
    {
        "name": "Arshy",
        "tag": "2610",
        "region": "VN",
        "puuid": "s6WY8zdR17PBktDZtk44oSplAJ-MCJAoCJGBGZElzd43fgltwCTT5MQpYIuFTfLpYGgXs0vXvOB-4w"
    },
    {
        "name": "DeMeatus",
        "tag": "NA1",
        "region": "NA",
        "puuid": "tePYivF5_6WPKL2bC_xcMwEC8Pr0qAKwMImox-lPQG1ob2LCsEVLWrPAQH4OoxJuEJ_UJmjEUEw-Ew"
    },
    {
        "name": "Azula",
        "tag": "2507",
        "region": "EUW",
        "puuid": "2mZG7kmWXVSwv8d7UsUTQm7zkXbG0pE5KsYNod0CM6pjghTOOh1ou1eP25OAbyiR-J5rcs9EsDCtKA"
    },
    {
        "name": "GennaroBullo",
        "tag": "UwU",
        "region": "EUW",
        "puuid": "fj0FV_kNp7Jmffuop4q9wAkLNW-CL41Or04aoRCxx6WKL1Jzv_3lRR12STAW7bz3ccyHLWCRE8Iovg"
    },
    {
        "name": "Sứ Đồ Peter",
        "tag": "036",
        "region": "VN",
        "puuid": "_QoDwMB4LMTXGDB8J6WDlFYCt9ea37H0OeUy5y9B2e9CwfHq8fNvYFKXgg-kCm84DoT1FQ1SO9KwJA"
    },
    {
        "name": "Melfat",
        "tag": "RitoG",
        "region": "BR",
        "puuid": "8Cygqpg3cOg-v7GEEznfoDUQg08XiH7jO60gj67PXDspU9sMGcXcgsrPu8m7mAprHNhdvJRTlQVS2A"
    },
    {
        "name": "Zhaokoi",
        "tag": "NA1",
        "region": "NA",
        "puuid": "pljlCW0GEcC6eVeQ2KFo08fIfcDVfFI8TslDsO60VCRWgFo-cJ4p0BEZssJ1sXxKvP_0RikovXIgkg"
    },
    {
        "name": "RoRFonG",
        "tag": "8889",
        "region": "TH",
        "puuid": "9-LQUDWgtPNGOhoEt91t-n9mS_IWbkYcuiAh5JCbUR_sMCXGuZCHxnexkRKQY8O4ZMKnNPt0ARpWxg"
    },
    {
        "name": "PrinzKarneval",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "AZsEtHqX8QhDAqDpW92pp8peeoL-YOeAdo0ZMdetY3AK7ZZtXQ7AomNhwOnfgU3wnHANEU4iqKsbaw"
    },
    {
        "name": "Эло Полиция",
        "tag": "1998",
        "region": "RU",
        "puuid": "QILIlweDJIMlCuUMMdf3c76-mRNzv5eQVxsSMoZzcWdQQkFoZ-B2SxxwIeTjkp18gAGMOw3TGlap5g"
    },
    {
        "name": "Tyrranoid2410",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "tlOCFH5IB6DhPx20Ewy0oHQRHitWwQZdLay_z_Xn83Wu8Lxv36I7KJb5ZbVqsIUMjVMOOjg2IMWnjQ"
    },
    {
        "name": "Saku",
        "tag": "EUW",
        "region": "EUW",
        "puuid": "uz5BTZV5FtehZtxm51us47iqHqXnltaXxHSEJIkiiy6ZPYfGJjVU14EmapuOJLgtBMTrt1ESovvfPw"
    },
    {
        "name": "Rito Admins",
        "tag": "VN24",
        "region": "VN",
        "puuid": "YyjxZf0v8i_pMwRpXzYBsl107mYH05pXoyhPA7-xQ3uWSDm7fxGi66r53FdlP60uhNLW8TMUPhUZ-A"
    },
    {
        "name": "SLY Ayaka",
        "tag": "99999",
        "region": "VN",
        "puuid": "2NAH6Su6RoOnelr3qEagofeFhhCZxQEfdd8vpEqhj2s9rgtVyOkEwRGbA7Gv-lIu7UBTLUFNl3Ap2A"
    },
    {
        "name": "DamDanieI",
        "tag": "EUNE",
        "region": "EUNE",
        "puuid": "_c6gXBPzYiW5QpiEg9uHeEWcG-Y7onSzWm3d0ykiRvoTOPUBobqoFdgwRahkUt5bZ-A1L1OCIll77w"
    },
    {
        "name": "一炮四个刘某某",
        "tag": "拼到底",
        "region": "NA",
        "puuid": "7R2kU1broirtwETN91Rtuz0JgcYwgeuINddLGdnUUwF6ct9ze5a5YBdcsIDzpoBk8VdG1YFk2AP1SA"
    }
];
let challengeData = // 20240417203423
// https://challenges.darkintaqt.com/api/dynamic-data/serve?region=na1&lang=en

[
  {
    "id": 0,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 26500,
      "CHALLENGER": 27245,
      "SILVER": 1650,
      "PLATINUM": 8600,
      "BRONZE": 750,
      "IRON": 0,
      "MASTER": 24500,
      "GOLD": 4300,
      "DIAMOND": 13800
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
      "SILVER": 0.211,
      "CHALLENGER": 0,
      "DIAMOND": 0.006,
      "MASTER": 0,
      "PLATINUM": 0.038,
      "GOLD": 0.108,
      "GRANDMASTER": 0,
      "BRONZE": 0.294,
      "IRON": 0.988,
      "NONE": 1
    },
    "leaderboardThresholds": [
      27965,
      1,
      27245,
      3,
      26500,
      8
    ]
  },
  {
    "id": 1,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 300,
      "PLATINUM": 1200,
      "BRONZE": 175,
      "IRON": 75,
      "MASTER": 3500,
      "GOLD": 700,
      "DIAMOND": 2000
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
      "PLATINUM": 0.051,
      "IRON": 0.377,
      "GOLD": 0.105,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.281,
      "SILVER": 0.193,
      "DIAMOND": 0.012,
      "NONE": 1
    }
  },
  {
    "id": 2,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 500,
      "PLATINUM": 1800,
      "BRONZE": 275,
      "IRON": 125,
      "MASTER": 5500,
      "GOLD": 1100,
      "DIAMOND": 3200
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
      "PLATINUM": 0.053,
      "IRON": 0.276,
      "GOLD": 0.1,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.223,
      "SILVER": 0.173,
      "DIAMOND": 0.013,
      "NONE": 1
    }
  },
  {
    "id": 3,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 400,
      "PLATINUM": 1500,
      "BRONZE": 275,
      "IRON": 150,
      "MASTER": 4500,
      "GOLD": 1000,
      "DIAMOND": 2700
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.014,
      "BRONZE": 0.213,
      "GOLD": 0.088,
      "IRON": 0.267,
      "SILVER": 0.177,
      "MASTER": 0,
      "PLATINUM": 0.053
    }
  },
  {
    "id": 4,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 350,
      "PLATINUM": 2100,
      "BRONZE": 200,
      "IRON": 100,
      "MASTER": 6500,
      "GOLD": 1300,
      "DIAMOND": 3800
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.036,
      "IRON": 0.292,
      "SILVER": 0.201,
      "NONE": 1,
      "BRONZE": 0.246,
      "DIAMOND": 0.002,
      "MASTER": 0,
      "GOLD": 0.083
    }
  },
  {
    "id": 5,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 300,
      "PLATINUM": 1100,
      "BRONZE": 175,
      "IRON": 75,
      "MASTER": 3500,
      "GOLD": 700,
      "DIAMOND": 2000
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
      "PLATINUM": 0.084,
      "IRON": 0.433,
      "GOLD": 0.13,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.291,
      "SILVER": 0.215,
      "DIAMOND": 0.021,
      "NONE": 1
    }
  },
  {
    "id": 302100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 160,
      "BRONZE": 20,
      "IRON": 10,
      "MASTER": 475,
      "GOLD": 100,
      "DIAMOND": 290
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
      "SILVER": 0.212,
      "CHALLENGER": 0,
      "DIAMOND": 0.033,
      "MASTER": 0.002,
      "PLATINUM": 0.097,
      "GOLD": 0.134,
      "GRANDMASTER": 0,
      "BRONZE": 0.268,
      "IRON": 0.313,
      "NONE": 1
    }
  },
  {
    "id": 302101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 231,
      "CHALLENGER": 380,
      "SILVER": 7,
      "PLATINUM": 35,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 130,
      "GOLD": 15,
      "DIAMOND": 75
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
      "GRANDMASTER": 0.003,
      "IRON": 0.246,
      "NONE": 1,
      "MASTER": 0.011,
      "SILVER": 0.135,
      "DIAMOND": 0.026,
      "PLATINUM": 0.058,
      "BRONZE": 0.18,
      "GOLD": 0.098,
      "CHALLENGER": 0.001
    },
    "leaderboardThresholds": [
      2773,
      1,
      380,
      8523,
      231,
      42607
    ]
  },
  {
    "id": 302102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 415,
      "CHALLENGER": 704,
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 225,
      "GOLD": 25,
      "DIAMOND": 125
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
      "GRANDMASTER": 0.001,
      "SILVER": 0.07,
      "CHALLENGER": 0,
      "PLATINUM": 0.016,
      "IRON": 0.225,
      "BRONZE": 0.106,
      "MASTER": 0.003,
      "NONE": 1,
      "GOLD": 0.041,
      "DIAMOND": 0.008
    },
    "leaderboardThresholds": [
      3076,
      1,
      704,
      2455,
      415,
      12269
    ]
  },
  {
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
  {
    "id": 302104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 21,
      "CHALLENGER": 50,
      "PLATINUM": 3,
      "MASTER": 12,
      "GOLD": 1,
      "DIAMOND": 7
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.018,
      "IRON": 0,
      "SILVER": 0,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0.005,
      "MASTER": 0.002,
      "GOLD": 0.064
    },
    "leaderboardThresholds": [
      251,
      1,
      49,
      479,
      21,
      6107
    ]
  },
  {
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
  {
    "id": 302106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 504,
      "CHALLENGER": 757,
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 25,
      "DIAMOND": 150
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
      "PLATINUM": 0.075,
      "IRON": 0.31,
      "GOLD": 0.13,
      "MASTER": 0.014,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "BRONZE": 0.213,
      "SILVER": 0.176,
      "DIAMOND": 0.041,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3163,
      1,
      757,
      11389,
      504,
      56938
    ]
  },
  {
    "id": 203303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3026,
      "CHALLENGER": 4600,
      "SILVER": 90,
      "PLATINUM": 540,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 180,
      "DIAMOND": 1080
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.003,
      "PLATINUM": 0.058,
      "IRON": 0.27,
      "SILVER": 0.152,
      "NONE": 1,
      "BRONZE": 0.211,
      "DIAMOND": 0.028,
      "MASTER": 0.011,
      "GOLD": 0.115
    },
    "leaderboardThresholds": [
      21231,
      1,
      4600,
      9110,
      3026,
      45546
    ]
  },
  {
    "id": 203302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 2947,
      "CHALLENGER": 4448,
      "SILVER": 90,
      "PLATINUM": 540,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 180,
      "DIAMOND": 1080
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
      "GRANDMASTER": 0.002,
      "SILVER": 0.142,
      "CHALLENGER": 0,
      "PLATINUM": 0.051,
      "IRON": 0.26,
      "BRONZE": 0.201,
      "MASTER": 0.009,
      "NONE": 1,
      "GOLD": 0.106,
      "DIAMOND": 0.023
    },
    "leaderboardThresholds": [
      20375,
      1,
      4448,
      7060,
      2947,
      35295
    ]
  },
  {
    "id": 203301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 4782,
      "CHALLENGER": 7123,
      "SILVER": 150,
      "PLATINUM": 1000,
      "BRONZE": 50,
      "IRON": 15,
      "MASTER": 3000,
      "GOLD": 300,
      "DIAMOND": 2000
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
      "SILVER": 0.129,
      "CHALLENGER": 0,
      "DIAMOND": 0.013,
      "MASTER": 0.006,
      "PLATINUM": 0.035,
      "GOLD": 0.092,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.191,
      "IRON": 0.259,
      "NONE": 1
    },
    "leaderboardThresholds": [
      32824,
      1,
      7123,
      4469,
      4782,
      22338
    ]
  },
  {
    "id": 203300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 135,
      "BRONZE": 25,
      "IRON": 15,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 240
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
      "SILVER": 0.178,
      "CHALLENGER": 0,
      "DIAMOND": 0.018,
      "MASTER": 0.005,
      "PLATINUM": 0.053,
      "GOLD": 0.104,
      "GRANDMASTER": 0,
      "BRONZE": 0.218,
      "IRON": 0.254,
      "NONE": 1
    }
  },
  {
    "id": 301100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 30,
      "PLATINUM": 135,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 500,
      "GOLD": 65,
      "DIAMOND": 370
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
      "GRANDMASTER": 0,
      "SILVER": 0.198,
      "CHALLENGER": 0,
      "PLATINUM": 0.112,
      "IRON": 0.268,
      "BRONZE": 0.241,
      "MASTER": 0.001,
      "NONE": 1,
      "GOLD": 0.163,
      "DIAMOND": 0.019
    }
  },
  {
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
  {
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
  {
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
  {
    "id": 203304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1033,
      "CHALLENGER": 1600,
      "SILVER": 27,
      "PLATINUM": 180,
      "BRONZE": 9,
      "IRON": 3,
      "MASTER": 650,
      "GOLD": 60,
      "DIAMOND": 350
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
      "PLATINUM": 0.026,
      "IRON": 0.211,
      "GOLD": 0.067,
      "MASTER": 0.002,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.154,
      "SILVER": 0.102,
      "DIAMOND": 0.01,
      "NONE": 1
    },
    "leaderboardThresholds": [
      7046,
      1,
      1600,
      1998,
      1033,
      9986
    ]
  },
  {
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
  {
    "id": 510007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 3,
      "PLATINUM": 5,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 7,
      "GOLD": 4,
      "DIAMOND": 6
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
      "PLATINUM": 0.019,
      "IRON": 0.133,
      "GOLD": 0.031,
      "MASTER": 0.007,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.076,
      "SILVER": 0.048,
      "DIAMOND": 0.011,
      "NONE": 1
    }
  },
  {
    "id": 510006,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 5,
      "GOLD": 2,
      "DIAMOND": 4
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
      "GRANDMASTER": 0,
      "SILVER": 0.114,
      "CHALLENGER": 0,
      "PLATINUM": 0.059,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0.034,
      "NONE": 1,
      "GOLD": 0.079,
      "DIAMOND": 0.045
    }
  },
  {
    "id": 510005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 20,
      "PLATINUM": 60,
      "BRONZE": 10,
      "IRON": 1,
      "MASTER": 200,
      "GOLD": 40,
      "DIAMOND": 100
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
      "PLATINUM": 0.036,
      "IRON": 0.284,
      "GOLD": 0.059,
      "MASTER": 0.003,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.145,
      "SILVER": 0.105,
      "DIAMOND": 0.015,
      "NONE": 1
    }
  },
  {
    "id": 510004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 25,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 75,
      "GOLD": 10,
      "DIAMOND": 50
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.014,
      "IRON": 0.11,
      "SILVER": 0.05,
      "NONE": 1,
      "BRONZE": 0.066,
      "DIAMOND": 0.006,
      "MASTER": 0.003,
      "GOLD": 0.031
    }
  },
  {
    "id": 301104,
    "state": "ARCHIVED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 382,
      "CHALLENGER": 628,
      "SILVER": 9,
      "PLATINUM": 50,
      "BRONZE": 4,
      "IRON": 1,
      "MASTER": 180,
      "GOLD": 19,
      "DIAMOND": 100
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
      "PLATINUM": 0.089,
      "IRON": 0.302,
      "GOLD": 0.136,
      "MASTER": 0.031,
      "GRANDMASTER": 0.008,
      "CHALLENGER": 0.002,
      "BRONZE": 0.216,
      "SILVER": 0.173,
      "DIAMOND": 0.057,
      "NONE": 1
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
      "SILVER": 3,
      "PLATINUM": 7,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 15,
      "GOLD": 4,
      "DIAMOND": 12
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
      "GRANDMASTER": 0,
      "SILVER": 0.18,
      "CHALLENGER": 0,
      "PLATINUM": 0.069,
      "IRON": 0.372,
      "BRONZE": 0.239,
      "MASTER": 0.008,
      "NONE": 1,
      "GOLD": 0.14,
      "DIAMOND": 0.02
    }
  },
  {
    "id": 301105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 147,
      "CHALLENGER": 250,
      "SILVER": 5,
      "PLATINUM": 30,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 90,
      "GOLD": 10,
      "DIAMOND": 50
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
      "GRANDMASTER": 0.004,
      "SILVER": 0.155,
      "CHALLENGER": 0,
      "PLATINUM": 0.062,
      "IRON": 0.26,
      "BRONZE": 0.21,
      "MASTER": 0.014,
      "NONE": 1,
      "GOLD": 0.118,
      "DIAMOND": 0.038
    },
    "leaderboardThresholds": [
      1066,
      1,
      249,
      5693,
      147,
      56930
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.134,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 510001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 500,
      "GOLD": 30,
      "DIAMOND": 200
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
      "PLATINUM": 0.112,
      "IRON": 0.372,
      "GOLD": 0.164,
      "MASTER": 0.008,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.261,
      "SILVER": 0.221,
      "DIAMOND": 0.046,
      "NONE": 1
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.101,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 510000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 70,
      "PLATINUM": 240,
      "BRONZE": 40,
      "IRON": 20,
      "MASTER": 725,
      "GOLD": 150,
      "DIAMOND": 430
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
      "SILVER": 0.173,
      "CHALLENGER": 0,
      "DIAMOND": 0.02,
      "MASTER": 0.005,
      "PLATINUM": 0.059,
      "GOLD": 0.102,
      "GRANDMASTER": 0,
      "BRONZE": 0.227,
      "IRON": 0.296,
      "NONE": 1
    }
  },
  {
    "id": 202303,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 30,
      "BRONZE": 5,
      "IRON": 2,
      "MASTER": 75,
      "GOLD": 15,
      "DIAMOND": 50
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
      "SILVER": 0.039,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.003,
      "GOLD": 0.02,
      "GRANDMASTER": 0,
      "BRONZE": 0.085,
      "IRON": 0.159,
      "NONE": 1
    }
  },
  {
    "id": 510011,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 30,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 100,
      "GOLD": 15,
      "DIAMOND": 60
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
      "PLATINUM": 0.045,
      "IRON": 0.188,
      "GOLD": 0.068,
      "MASTER": 0.016,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.115,
      "SILVER": 0.084,
      "DIAMOND": 0.027,
      "NONE": 1
    }
  },
  {
    "id": 202302,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 2,
      "MASTER": 7,
      "GOLD": 1,
      "DIAMOND": 4
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
      "GRANDMASTER": 0,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0.031,
      "SILVER": 0,
      "DIAMOND": 0.055,
      "PLATINUM": 0.094,
      "BRONZE": 0,
      "GOLD": 0.145,
      "CHALLENGER": 0
    }
  },
  {
    "id": 510010,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 100,
      "BRONZE": 10,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 175
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
      "PLATINUM": 0.035,
      "IRON": 0.302,
      "GOLD": 0.077,
      "MASTER": 0.006,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.166,
      "SILVER": 0.118,
      "DIAMOND": 0.013,
      "NONE": 1
    }
  },
  {
    "id": 202301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.061,
      "IRON": 0,
      "SILVER": 0.136,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0.036,
      "MASTER": 0.013,
      "GOLD": 0.085
    }
  },
  {
    "id": 510009,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 7,
      "PLATINUM": 20,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 45,
      "GOLD": 12,
      "DIAMOND": 30
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.018,
      "BRONZE": 0.157,
      "GOLD": 0.068,
      "IRON": 0.233,
      "SILVER": 0.104,
      "MASTER": 0.007,
      "PLATINUM": 0.037
    }
  },
  {
    "id": 202300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 105,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 400,
      "GOLD": 65,
      "DIAMOND": 190
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
      "SILVER": 0.176,
      "CHALLENGER": 0,
      "DIAMOND": 0.03,
      "MASTER": 0.001,
      "PLATINUM": 0.069,
      "GOLD": 0.108,
      "GRANDMASTER": 0,
      "BRONZE": 0.217,
      "IRON": 0.284,
      "NONE": 1
    }
  },
  {
    "id": 510008,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 6,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 25,
      "GOLD": 10,
      "DIAMOND": 20
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
      "GRANDMASTER": 0,
      "IRON": 0.153,
      "NONE": 1,
      "MASTER": 0.004,
      "SILVER": 0.027,
      "DIAMOND": 0.005,
      "PLATINUM": 0.009,
      "BRONZE": 0.052,
      "GOLD": 0.015,
      "CHALLENGER": 0
    }
  },
  {
    "id": 402502,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 42760,
      "CHALLENGER": 66334,
      "SILVER": 1200,
      "PLATINUM": 6000,
      "BRONZE": 500,
      "IRON": 100,
      "MASTER": 25000,
      "GOLD": 2000,
      "DIAMOND": 15000
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.003,
      "DIAMOND": 0.031,
      "BRONZE": 0.194,
      "GOLD": 0.126,
      "IRON": 0.275,
      "SILVER": 0.151,
      "MASTER": 0.014,
      "PLATINUM": 0.073
    },
    "leaderboardThresholds": [
      521953,
      1,
      66334,
      11009,
      42760,
      55040
    ]
  },
  {
    "id": 2023006,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1894,
      "CHALLENGER": 4953,
      "SILVER": 50,
      "PLATINUM": 144,
      "BRONZE": 25,
      "IRON": 5,
      "MASTER": 250,
      "GOLD": 100,
      "DIAMOND": 200
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
      "PLATINUM": 0.083,
      "IRON": 0.161,
      "GOLD": 0.092,
      "MASTER": 0.069,
      "GRANDMASTER": 0.017,
      "CHALLENGER": 0.003,
      "BRONZE": 0.125,
      "SILVER": 0.109,
      "DIAMOND": 0.075,
      "NONE": 1
    },
    "leaderboardThresholds": [
      69671,
      1,
      4953,
      55020,
      1894,
      275093
    ]
  },
  {
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
  {
    "id": 2023007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 2,
      "CHALLENGER": 3,
      "MASTER": 1
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0.019,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 202305,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 14,
      "PLATINUM": 90,
      "BRONZE": 6,
      "IRON": 1,
      "MASTER": 350,
      "GOLD": 30,
      "DIAMOND": 180
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
      "PLATINUM": 0.05,
      "IRON": 0.274,
      "GOLD": 0.098,
      "MASTER": 0.009,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.176,
      "SILVER": 0.134,
      "DIAMOND": 0.025,
      "NONE": 1
    }
  },
  {
    "id": 402500,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "PLATINUM": 0.082,
      "IRON": 0.276,
      "GOLD": 0.131,
      "MASTER": 0.006,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.239,
      "SILVER": 0.192,
      "DIAMOND": 0.036,
      "NONE": 1
    }
  },
  {
    "id": 2023004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 2,
      "CHALLENGER": 3,
      "MASTER": 1
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0.026,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0.003,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 402501,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3501553,
      "CHALLENGER": 7689107,
      "SILVER": 72000,
      "PLATINUM": 450000,
      "BRONZE": 24000,
      "IRON": 6000,
      "MASTER": 1400000,
      "GOLD": 150000,
      "DIAMOND": 800000
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
      "PLATINUM": 0.035,
      "IRON": 0.221,
      "GOLD": 0.077,
      "MASTER": 0.01,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.159,
      "SILVER": 0.109,
      "DIAMOND": 0.02,
      "NONE": 1
    },
    "leaderboardThresholds": [
      84654526,
      1,
      7689107,
      8100,
      3501553,
      40494
    ]
  },
  {
    "id": 2023005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 250,
      "CHALLENGER": 300,
      "SILVER": 30,
      "PLATINUM": 90,
      "BRONZE": 15,
      "IRON": 3,
      "MASTER": 200,
      "GOLD": 60,
      "DIAMOND": 140
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
      "PLATINUM": 0.094,
      "IRON": 0.182,
      "GOLD": 0.104,
      "MASTER": 0.073,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.141,
      "SILVER": 0.122,
      "DIAMOND": 0.082,
      "NONE": 1
    }
  },
  {
    "id": 2023002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 4,
      "CHALLENGER": 12,
      "MASTER": 1
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
      "CHALLENGER": 0.003,
      "GRANDMASTER": 0.014,
      "PLATINUM": 0,
      "IRON": 0,
      "SILVER": 0,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0,
      "MASTER": 0.055,
      "GOLD": 0
    },
    "leaderboardThresholds": [
      1158,
      1,
      12,
      43684,
      4,
      218415
    ]
  },
  {
    "id": 2023003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 735,
      "CHALLENGER": 1494,
      "SILVER": 25,
      "PLATINUM": 100,
      "BRONZE": 10,
      "IRON": 3,
      "MASTER": 200,
      "GOLD": 50,
      "DIAMOND": 150
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
      "CHALLENGER": 0.003,
      "GRANDMASTER": 0.017,
      "PLATINUM": 0.096,
      "IRON": 0.238,
      "SILVER": 0.155,
      "NONE": 1,
      "BRONZE": 0.193,
      "DIAMOND": 0.079,
      "MASTER": 0.066,
      "GOLD": 0.126
    },
    "leaderboardThresholds": [
      11032,
      1,
      1494,
      52891,
      735,
      264450
    ]
  },
  {
    "id": 2023000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 105,
      "PLATINUM": 375,
      "BRONZE": 70,
      "IRON": 35,
      "MASTER": 1600,
      "GOLD": 235,
      "DIAMOND": 670
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
      "GRANDMASTER": 0,
      "IRON": 0.244,
      "NONE": 1,
      "MASTER": 0.005,
      "SILVER": 0.214,
      "DIAMOND": 0.101,
      "PLATINUM": 0.134,
      "BRONZE": 0.224,
      "GOLD": 0.166,
      "CHALLENGER": 0
    }
  },
  {
    "id": 2023001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 8,
      "CHALLENGER": 23,
      "MASTER": 1
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
      "SILVER": 0,
      "CHALLENGER": 0.008,
      "DIAMOND": 0,
      "MASTER": 0.15,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0.038,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      888,
      1,
      23,
      119619,
      8,
      598089
    ]
  },
  {
    "id": 210003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 473,
      "CHALLENGER": 764,
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 25,
      "DIAMOND": 150
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
      "PLATINUM": 0.066,
      "IRON": 0.285,
      "GOLD": 0.119,
      "MASTER": 0.018,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "BRONZE": 0.199,
      "SILVER": 0.164,
      "DIAMOND": 0.035,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3658,
      1,
      764,
      14171,
      473,
      70847
    ]
  },
  {
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
  {
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
  {
    "id": 210000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 160,
      "BRONZE": 25,
      "IRON": 15,
      "MASTER": 500,
      "GOLD": 100,
      "DIAMOND": 300
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
      "PLATINUM": 0.028,
      "IRON": 0.223,
      "GOLD": 0.064,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.183,
      "SILVER": 0.139,
      "DIAMOND": 0.003,
      "NONE": 1
    }
  },
  {
    "id": 210006,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 2,
      "PLATINUM": 6,
      "MASTER": 10,
      "GOLD": 4,
      "DIAMOND": 8
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
      "GRANDMASTER": 0,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.051,
      "DIAMOND": 0,
      "PLATINUM": 0.007,
      "BRONZE": 0,
      "GOLD": 0.014,
      "CHALLENGER": 0
    }
  },
  {
    "id": 210005,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 673,
      "CHALLENGER": 1036,
      "SILVER": 20,
      "PLATINUM": 125,
      "BRONZE": 10,
      "IRON": 1,
      "MASTER": 400,
      "GOLD": 50,
      "DIAMOND": 250
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "PLATINUM": 0.035,
      "IRON": 0.196,
      "SILVER": 0.104,
      "NONE": 1,
      "BRONZE": 0.129,
      "DIAMOND": 0.015,
      "MASTER": 0.006,
      "GOLD": 0.069
    },
    "leaderboardThresholds": [
      4075,
      1,
      1036,
      5144,
      673,
      25712
    ]
  },
  {
    "id": 402000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 250,
      "PLATINUM": 910,
      "BRONZE": 165,
      "IRON": 80,
      "MASTER": 2700,
      "GOLD": 570,
      "DIAMOND": 1625
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
      "PLATINUM": 0.074,
      "IRON": 0.276,
      "GOLD": 0.119,
      "MASTER": 0.004,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.228,
      "SILVER": 0.197,
      "DIAMOND": 0.028,
      "NONE": 1
    }
  },
  {
    "id": 210004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 7,
      "PLATINUM": 5,
      "BRONZE": 8,
      "IRON": 9,
      "MASTER": 2,
      "GOLD": 6,
      "DIAMOND": 3
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.01,
      "BRONZE": 0.17,
      "GOLD": 0.086,
      "IRON": 0.543,
      "SILVER": 0.132,
      "MASTER": 0.003,
      "PLATINUM": 0.048
    }
  },
  {
    "id": 103000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 100,
      "PLATINUM": 400,
      "BRONZE": 50,
      "IRON": 20,
      "MASTER": 1150,
      "GOLD": 230,
      "DIAMOND": 675
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
      "SILVER": 0.231,
      "CHALLENGER": 0,
      "DIAMOND": 0.019,
      "MASTER": 0.001,
      "PLATINUM": 0.061,
      "GOLD": 0.125,
      "GRANDMASTER": 0,
      "BRONZE": 0.33,
      "IRON": 0.351,
      "NONE": 1
    }
  },
  {
    "id": 303204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 2,
      "MASTER": 30,
      "GOLD": 9,
      "DIAMOND": 21
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "BRONZE": 0.002,
      "GOLD": 0,
      "IRON": 0.006,
      "SILVER": 0.001,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 2022014,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 48,
      "CHALLENGER": 75,
      "SILVER": 5,
      "PLATINUM": 12,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 8,
      "DIAMOND": 20
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
      "PLATINUM": 0.012,
      "IRON": 0.104,
      "GOLD": 0.022,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.072,
      "SILVER": 0.036,
      "DIAMOND": 0.005,
      "NONE": 1
    },
    "leaderboardThresholds": [
      561,
      1,
      75,
      1576,
      48,
      7873
    ]
  },
  {
    "id": 303205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 12,
      "PLATINUM": 30,
      "BRONZE": 6,
      "IRON": 2,
      "MASTER": 60,
      "GOLD": 18,
      "DIAMOND": 45
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
      "GRANDMASTER": 0,
      "SILVER": 0.001,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "IRON": 0.019,
      "BRONZE": 0.004,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0,
      "DIAMOND": 0
    }
  },
  {
    "id": 2022015,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 364,
      "CHALLENGER": 590,
      "SILVER": 25,
      "PLATINUM": 75,
      "BRONZE": 15,
      "IRON": 5,
      "MASTER": 180,
      "GOLD": 45,
      "DIAMOND": 120
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
      "SILVER": 0.094,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.035,
      "MASTER": 0.022,
      "PLATINUM": 0.053,
      "GOLD": 0.072,
      "GRANDMASTER": 0.005,
      "BRONZE": 0.113,
      "IRON": 0.151,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2307,
      1,
      590,
      17409,
      364,
      87037
    ]
  },
  {
    "id": 303200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 135,
      "BRONZE": 25,
      "IRON": 15,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 240
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
      "PLATINUM": 0.001,
      "IRON": 0.024,
      "GOLD": 0.004,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.017,
      "SILVER": 0.011,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 2022010,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 104,
      "CHALLENGER": 168,
      "SILVER": 8,
      "PLATINUM": 25,
      "BRONZE": 4,
      "IRON": 1,
      "MASTER": 60,
      "GOLD": 15,
      "DIAMOND": 40
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
      "GRANDMASTER": 0.001,
      "IRON": 0.095,
      "NONE": 1,
      "MASTER": 0.002,
      "SILVER": 0.03,
      "DIAMOND": 0.005,
      "PLATINUM": 0.009,
      "BRONZE": 0.048,
      "GOLD": 0.017,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      1638,
      1,
      168,
      1687,
      104,
      8428
    ]
  },
  {
    "id": 303201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 225,
      "CHALLENGER": 300,
      "SILVER": 10,
      "PLATINUM": 35,
      "BRONZE": 4,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 20,
      "DIAMOND": 75
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
      "GRANDMASTER": 0,
      "IRON": 0.04,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.008,
      "DIAMOND": 0,
      "PLATINUM": 0.001,
      "BRONZE": 0.02,
      "GOLD": 0.002,
      "CHALLENGER": 0
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
      "GRANDMASTER": 187,
      "CHALLENGER": 329,
      "SILVER": 12,
      "PLATINUM": 35,
      "BRONZE": 8,
      "IRON": 3,
      "MASTER": 90,
      "GOLD": 22,
      "DIAMOND": 60
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.003,
      "BRONZE": 0.021,
      "GOLD": 0.01,
      "IRON": 0.036,
      "SILVER": 0.016,
      "MASTER": 0.002,
      "PLATINUM": 0.006
    },
    "leaderboardThresholds": [
      1198,
      1,
      329,
      1550,
      187,
      7746
    ]
  },
  {
    "id": 303202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 55,
      "CHALLENGER": 70,
      "SILVER": 4,
      "PLATINUM": 12,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 40,
      "GOLD": 8,
      "DIAMOND": 25
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
      "SILVER": 0.001,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0.005,
      "IRON": 0.015,
      "NONE": 1
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
      "GRANDMASTER": 39,
      "CHALLENGER": 77,
      "SILVER": 3,
      "PLATINUM": 8,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 18,
      "GOLD": 5,
      "DIAMOND": 12
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
      "PLATINUM": 0.031,
      "IRON": 0.111,
      "GOLD": 0.046,
      "MASTER": 0.012,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.08,
      "SILVER": 0.064,
      "DIAMOND": 0.021,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2356,
      1,
      77,
      9865,
      39,
      49317
    ]
  },
  {
    "id": 303203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 3,
      "PLATINUM": 12,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 6,
      "DIAMOND": 21
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
      "SILVER": 0.014,
      "CHALLENGER": 0,
      "DIAMOND": 0.004,
      "MASTER": 0.002,
      "PLATINUM": 0.006,
      "GOLD": 0.01,
      "GRANDMASTER": 0,
      "BRONZE": 0.017,
      "IRON": 0.023,
      "NONE": 1
    }
  },
  {
    "id": 2022009,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1513,
      "CHALLENGER": 2342,
      "SILVER": 100,
      "PLATINUM": 375,
      "BRONZE": 50,
      "IRON": 10,
      "MASTER": 900,
      "GOLD": 225,
      "DIAMOND": 600
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "DIAMOND": 0.014,
      "BRONZE": 0.103,
      "GOLD": 0.044,
      "IRON": 0.162,
      "SILVER": 0.075,
      "MASTER": 0.007,
      "PLATINUM": 0.027
    },
    "leaderboardThresholds": [
      10676,
      1,
      2342,
      5259,
      1513,
      26289
    ]
  },
  {
    "id": 2022006,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 109,
      "CHALLENGER": 174,
      "SILVER": 10,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 60,
      "GOLD": 15,
      "DIAMOND": 40
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
      "GRANDMASTER": 0.002,
      "IRON": 0.147,
      "NONE": 1,
      "MASTER": 0.009,
      "SILVER": 0.059,
      "DIAMOND": 0.017,
      "PLATINUM": 0.029,
      "BRONZE": 0.084,
      "GOLD": 0.045,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      1088,
      1,
      174,
      7009,
      109,
      35041
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.062,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 2022004,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 15,
      "CHALLENGER": 30,
      "PLATINUM": 2,
      "MASTER": 6,
      "GOLD": 1,
      "DIAMOND": 4
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
      "GRANDMASTER": 0.009,
      "SILVER": 0,
      "CHALLENGER": 0.002,
      "PLATINUM": 0.085,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0.036,
      "NONE": 1,
      "GOLD": 0.122,
      "DIAMOND": 0.053
    },
    "leaderboardThresholds": [
      683,
      1,
      30,
      29033,
      15,
      145161
    ]
  },
  {
    "id": 2022005,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 63,
      "CHALLENGER": 109,
      "SILVER": 3,
      "PLATINUM": 12,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 7,
      "DIAMOND": 20
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.006,
      "DIAMOND": 0.04,
      "BRONZE": 0.139,
      "GOLD": 0.084,
      "IRON": 0.171,
      "SILVER": 0.121,
      "MASTER": 0.025,
      "PLATINUM": 0.061
    },
    "leaderboardThresholds": [
      1183,
      1,
      109,
      20413,
      63,
      102059
    ]
  },
  {
    "id": 2022002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 36,
      "CHALLENGER": 57,
      "SILVER": 3,
      "PLATINUM": 10,
      "BRONZE": 1,
      "MASTER": 20,
      "GOLD": 5,
      "DIAMOND": 15
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "PLATINUM": 0.021,
      "IRON": 0,
      "SILVER": 0.054,
      "NONE": 1,
      "BRONZE": 0.092,
      "DIAMOND": 0.012,
      "MASTER": 0.008,
      "GOLD": 0.039
    },
    "leaderboardThresholds": [
      351,
      1,
      57,
      6070,
      36,
      30343
    ]
  },
  {
    "id": 2022003,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 136,
      "CHALLENGER": 237,
      "SILVER": 10,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 60,
      "GOLD": 15,
      "DIAMOND": 40
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
      "PLATINUM": 0.056,
      "IRON": 0.173,
      "GOLD": 0.074,
      "MASTER": 0.026,
      "GRANDMASTER": 0.006,
      "CHALLENGER": 0.001,
      "BRONZE": 0.114,
      "SILVER": 0.089,
      "DIAMOND": 0.039,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1421,
      1,
      237,
      20680,
      136,
      103396
    ]
  },
  {
    "id": 401000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 160,
      "PLATINUM": 560,
      "BRONZE": 105,
      "IRON": 55,
      "MASTER": 1700,
      "GOLD": 350,
      "DIAMOND": 1000
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.009,
      "IRON": 0.22,
      "SILVER": 0.108,
      "NONE": 1,
      "BRONZE": 0.15,
      "DIAMOND": 0,
      "MASTER": 0,
      "GOLD": 0.037
    }
  },
  {
    "id": 2022000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 115,
      "PLATINUM": 455,
      "BRONZE": 75,
      "IRON": 35,
      "MASTER": 1400,
      "GOLD": 265,
      "DIAMOND": 860
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
      "GRANDMASTER": 0,
      "SILVER": 0.119,
      "CHALLENGER": 0,
      "PLATINUM": 0.047,
      "IRON": 0.174,
      "BRONZE": 0.141,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0.077,
      "DIAMOND": 0.012
    }
  },
  {
    "id": 2022001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 32,
      "CHALLENGER": 47,
      "SILVER": 3,
      "PLATINUM": 10,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 20,
      "GOLD": 5,
      "DIAMOND": 15
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "DIAMOND": 0.016,
      "BRONZE": 0.073,
      "GOLD": 0.047,
      "IRON": 0.095,
      "SILVER": 0.062,
      "MASTER": 0.01,
      "PLATINUM": 0.027
    },
    "leaderboardThresholds": [
      162,
      1,
      47,
      7904,
      32,
      39514
    ]
  },
  {
    "id": 2023020,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 56,
      "CHALLENGER": 132,
      "SILVER": 5,
      "PLATINUM": 9,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 15,
      "GOLD": 7,
      "DIAMOND": 12
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
      "PLATINUM": 0.024,
      "IRON": 0.069,
      "GOLD": 0.028,
      "MASTER": 0.017,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "BRONZE": 0.044,
      "SILVER": 0.034,
      "DIAMOND": 0.02,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1170,
      1,
      132,
      13536,
      56,
      67672
    ]
  },
  {
    "id": 2023018,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 754,
      "CHALLENGER": 1875,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "SILVER": 0.093,
      "CHALLENGER": 0.003,
      "DIAMOND": 0.064,
      "MASTER": 0.059,
      "PLATINUM": 0.071,
      "GOLD": 0.081,
      "GRANDMASTER": 0.015,
      "BRONZE": 0.115,
      "IRON": 0.144,
      "NONE": 1
    },
    "leaderboardThresholds": [
      19696,
      1,
      1875,
      46936,
      754,
      234673
    ]
  },
  {
    "id": 2023019,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 888,
      "CHALLENGER": 1883,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "PLATINUM": 0.119,
      "IRON": 0.216,
      "GOLD": 0.131,
      "MASTER": 0.102,
      "GRANDMASTER": 0.026,
      "CHALLENGER": 0.005,
      "BRONZE": 0.178,
      "SILVER": 0.148,
      "DIAMOND": 0.11,
      "NONE": 1
    },
    "leaderboardThresholds": [
      14099,
      1,
      1883,
      81651,
      888,
      408250
    ]
  },
  {
    "id": 2023016,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 10645,
      "CHALLENGER": 22776,
      "SILVER": 600,
      "PLATINUM": 1200,
      "BRONZE": 300,
      "IRON": 100,
      "MASTER": 2000,
      "GOLD": 900,
      "DIAMOND": 1500
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
      "PLATINUM": 0.11,
      "IRON": 0.207,
      "GOLD": 0.121,
      "MASTER": 0.089,
      "GRANDMASTER": 0.022,
      "CHALLENGER": 0.004,
      "BRONZE": 0.165,
      "SILVER": 0.137,
      "DIAMOND": 0.101,
      "NONE": 1
    },
    "leaderboardThresholds": [
      289350,
      1,
      22776,
      71533,
      10645,
      357658
    ]
  },
  {
    "id": 2023017,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1817,
      "CHALLENGER": 4131,
      "SILVER": 50,
      "PLATINUM": 200,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 500,
      "GOLD": 100,
      "DIAMOND": 300
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
      "SILVER": 0.139,
      "CHALLENGER": 0.003,
      "DIAMOND": 0.069,
      "MASTER": 0.05,
      "PLATINUM": 0.085,
      "GOLD": 0.112,
      "GRANDMASTER": 0.013,
      "BRONZE": 0.158,
      "IRON": 0.195,
      "NONE": 1
    },
    "leaderboardThresholds": [
      66814,
      1,
      4131,
      40242,
      1817,
      201203
    ]
  },
  {
    "id": 2023014,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 22,
      "CHALLENGER": 48,
      "SILVER": 3,
      "PLATINUM": 5,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 10,
      "GOLD": 4,
      "DIAMOND": 7
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
      "PLATINUM": 0.019,
      "IRON": 0.107,
      "GOLD": 0.028,
      "MASTER": 0.006,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.075,
      "SILVER": 0.047,
      "DIAMOND": 0.01,
      "NONE": 1
    },
    "leaderboardThresholds": [
      274,
      1,
      48,
      4555,
      22,
      22768
    ]
  },
  {
    "id": 2023015,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 13,
      "CHALLENGER": 18,
      "SILVER": 3,
      "PLATINUM": 5,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 10,
      "GOLD": 4,
      "DIAMOND": 7
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
      "SILVER": 0.151,
      "CHALLENGER": 0,
      "DIAMOND": 0.111,
      "MASTER": 0.095,
      "PLATINUM": 0.127,
      "GOLD": 0.137,
      "GRANDMASTER": 0,
      "BRONZE": 0.171,
      "IRON": 0.21,
      "NONE": 1
    }
  },
  {
    "id": 2023012,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 229,
      "CHALLENGER": 716,
      "SILVER": 10,
      "PLATINUM": 20,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 50,
      "GOLD": 15,
      "DIAMOND": 35
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
      "SILVER": 0.103,
      "CHALLENGER": 0.002,
      "DIAMOND": 0.061,
      "MASTER": 0.049,
      "PLATINUM": 0.08,
      "GOLD": 0.09,
      "GRANDMASTER": 0.012,
      "BRONZE": 0.124,
      "IRON": 0.177,
      "NONE": 1
    },
    "leaderboardThresholds": [
      17877,
      1,
      716,
      39490,
      229,
      197443
    ]
  },
  {
    "id": 2023013,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 3,
      "PLATINUM": 5,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 10,
      "GOLD": 4,
      "DIAMOND": 7
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
      "SILVER": 0.001,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.001,
      "GRANDMASTER": 0,
      "BRONZE": 0.004,
      "IRON": 0.032,
      "NONE": 1
    }
  },
  {
    "id": 302200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "SILVER": 0.129,
      "CHALLENGER": 0,
      "DIAMOND": 0.006,
      "MASTER": 0,
      "PLATINUM": 0.025,
      "GOLD": 0.056,
      "GRANDMASTER": 0,
      "BRONZE": 0.198,
      "IRON": 0.24,
      "NONE": 1
    }
  },
  {
    "id": 2023010,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 65,
      "CHALLENGER": 162,
      "SILVER": 6,
      "PLATINUM": 12,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 20,
      "GOLD": 9,
      "DIAMOND": 15
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
      "GRANDMASTER": 0.007,
      "IRON": 0.148,
      "NONE": 1,
      "MASTER": 0.027,
      "SILVER": 0.067,
      "DIAMOND": 0.035,
      "PLATINUM": 0.042,
      "BRONZE": 0.095,
      "GOLD": 0.052,
      "CHALLENGER": 0.001
    },
    "leaderboardThresholds": [
      1415,
      1,
      162,
      21893,
      65,
      109461
    ]
  },
  {
    "id": 302201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 600,
      "SILVER": 20,
      "PLATINUM": 105,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 400,
      "GOLD": 35,
      "DIAMOND": 225
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
      "SILVER": 0.039,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.001,
      "GOLD": 0.017,
      "GRANDMASTER": 0,
      "BRONZE": 0.11,
      "IRON": 0.215,
      "NONE": 1
    },
    "leaderboardThresholds": [
      722,
      1,
      587,
      2,
      489,
      4
    ]
  },
  {
    "id": 2023011,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 2,
      "CHALLENGER": 6,
      "MASTER": 1
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
      "SILVER": 0,
      "CHALLENGER": 0.004,
      "DIAMOND": 0,
      "MASTER": 0.07,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0.018,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      248,
      1,
      6,
      55785,
      2,
      278920
    ]
  },
  {
    "id": 302202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 267,
      "CHALLENGER": 450,
      "SILVER": 7,
      "PLATINUM": 45,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 20,
      "DIAMOND": 90
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
      "SILVER": 0.159,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.026,
      "MASTER": 0.011,
      "PLATINUM": 0.055,
      "GOLD": 0.098,
      "GRANDMASTER": 0.003,
      "BRONZE": 0.215,
      "IRON": 0.289,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3758,
      1,
      449,
      8169,
      267,
      44688
    ]
  },
  {
    "id": 2023008,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 81,
      "CHALLENGER": 182,
      "SILVER": 3,
      "PLATINUM": 9,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 15,
      "GOLD": 6,
      "DIAMOND": 12
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
      "GRANDMASTER": 0.025,
      "SILVER": 0.174,
      "CHALLENGER": 0.005,
      "PLATINUM": 0.122,
      "IRON": 0.23,
      "BRONZE": 0.194,
      "MASTER": 0.098,
      "NONE": 1,
      "GOLD": 0.141,
      "DIAMOND": 0.109
    },
    "leaderboardThresholds": [
      1391,
      1,
      182,
      78720,
      81,
      393593
    ]
  },
  {
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0,
      "IRON": 0,
      "SILVER": 0,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0,
      "MASTER": 0.123,
      "GOLD": 0
    }
  },
  {
    "id": 203403,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 62,
      "CHALLENGER": 140,
      "SILVER": 1,
      "PLATINUM": 9,
      "MASTER": 25,
      "GOLD": 4,
      "DIAMOND": 15
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
      "SILVER": 0.061,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "MASTER": 0.004,
      "PLATINUM": 0.012,
      "GOLD": 0.024,
      "GRANDMASTER": 0.001,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1494,
      1,
      140,
      3136,
      62,
      15673
    ]
  },
  {
    "id": 101000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 140,
      "PLATINUM": 590,
      "BRONZE": 85,
      "IRON": 40,
      "MASTER": 1850,
      "GOLD": 360,
      "DIAMOND": 1075
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
      "PLATINUM": 0.067,
      "IRON": 0.199,
      "GOLD": 0.101,
      "MASTER": 0.004,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.171,
      "SILVER": 0.147,
      "DIAMOND": 0.027,
      "NONE": 1
    }
  },
  {
    "id": 203402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1874,
      "CHALLENGER": 2909,
      "SILVER": 40,
      "PLATINUM": 360,
      "BRONZE": 16,
      "IRON": 4,
      "MASTER": 1200,
      "GOLD": 120,
      "DIAMOND": 600
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
      "SILVER": 0.099,
      "CHALLENGER": 0,
      "DIAMOND": 0.005,
      "MASTER": 0.001,
      "PLATINUM": 0.013,
      "GOLD": 0.049,
      "GRANDMASTER": 0,
      "BRONZE": 0.144,
      "IRON": 0.214,
      "NONE": 1
    },
    "leaderboardThresholds": [
      15170,
      1,
      2909,
      733,
      1874,
      3657
    ]
  },
  {
    "id": 203401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 453,
      "CHALLENGER": 709,
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 25,
      "DIAMOND": 150
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
      "DIAMOND": 0.007,
      "MASTER": 0.001,
      "PLATINUM": 0.024,
      "GOLD": 0.072,
      "GRANDMASTER": 0,
      "BRONZE": 0.152,
      "IRON": 0.247,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3348,
      1,
      709,
      794,
      453,
      3963
    ]
  },
  {
    "id": 203400,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 55,
      "PLATINUM": 240,
      "BRONZE": 30,
      "IRON": 15,
      "MASTER": 725,
      "GOLD": 150,
      "DIAMOND": 430
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.018,
      "IRON": 0.208,
      "SILVER": 0.12,
      "NONE": 1,
      "BRONZE": 0.166,
      "DIAMOND": 0.004,
      "MASTER": 0,
      "GOLD": 0.042
    }
  },
  {
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
  {
    "id": 203406,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 551,
      "CHALLENGER": 869,
      "SILVER": 18,
      "PLATINUM": 98,
      "BRONZE": 8,
      "IRON": 3,
      "MASTER": 328,
      "GOLD": 38,
      "DIAMOND": 208
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "PLATINUM": 0.025,
      "IRON": 0.184,
      "SILVER": 0.096,
      "NONE": 1,
      "BRONZE": 0.134,
      "DIAMOND": 0.008,
      "MASTER": 0.003,
      "GOLD": 0.061
    },
    "leaderboardThresholds": [
      4679,
      1,
      869,
      2574,
      551,
      12864
    ]
  },
  {
    "id": 203405,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 383,
      "CHALLENGER": 588,
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 4,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 25,
      "DIAMOND": 150
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
      "PLATINUM": 0.01,
      "IRON": 0.17,
      "GOLD": 0.034,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.1,
      "SILVER": 0.064,
      "DIAMOND": 0.003,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2375,
      1,
      588,
      650,
      383,
      3243
    ]
  },
  {
    "id": 203404,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 192,
      "CHALLENGER": 357,
      "SILVER": 5,
      "PLATINUM": 25,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 100,
      "GOLD": 10,
      "DIAMOND": 60
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
      "PLATINUM": 0.012,
      "GOLD": 0.031,
      "GRANDMASTER": 0,
      "BRONZE": 0.095,
      "IRON": 0.136,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2006,
      1,
      357,
      1083,
      192,
      5409
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
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0.193,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0,
      "DIAMOND": 0
    }
  },
  {
    "id": 301205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 5,
      "MASTER": 18,
      "GOLD": 3,
      "DIAMOND": 12
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
      "SILVER": 0.17,
      "CHALLENGER": 0,
      "DIAMOND": 0.029,
      "MASTER": 0.014,
      "PLATINUM": 0.073,
      "GOLD": 0.102,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 203409,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 2,
      "MASTER": 6,
      "GOLD": 1,
      "DIAMOND": 3
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
      "PLATINUM": 0.018,
      "IRON": 0,
      "GOLD": 0.043,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0.009,
      "NONE": 1
    }
  },
  {
    "id": 203408,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 205,
      "CHALLENGER": 342,
      "SILVER": 5,
      "PLATINUM": 35,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 120,
      "GOLD": 15,
      "DIAMOND": 70
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
      "PLATINUM": 0.01,
      "IRON": 0.137,
      "GOLD": 0.027,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.102,
      "SILVER": 0.063,
      "DIAMOND": 0.003,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2518,
      1,
      342,
      788,
      205,
      3936
    ]
  },
  {
    "id": 301200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 135,
      "BRONZE": 5,
      "MASTER": 350,
      "GOLD": 65,
      "DIAMOND": 220
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
      "SILVER": 0.256,
      "CHALLENGER": 0,
      "DIAMOND": 0.064,
      "MASTER": 0.019,
      "PLATINUM": 0.111,
      "GOLD": 0.182,
      "GRANDMASTER": 0,
      "BRONZE": 0.296,
      "IRON": 0.001,
      "NONE": 1
    }
  },
  {
    "id": 301201,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 2,
      "MASTER": 7,
      "GOLD": 1,
      "DIAMOND": 4
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
      "PLATINUM": 0.128,
      "IRON": 0,
      "GOLD": 0.182,
      "MASTER": 0.055,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0.086,
      "NONE": 1
    }
  },
  {
    "id": 301202,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 3,
      "PLATINUM": 15,
      "BRONZE": 1,
      "MASTER": 75,
      "GOLD": 7,
      "DIAMOND": 45
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
      "GRANDMASTER": 0,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0.015,
      "SILVER": 0.185,
      "DIAMOND": 0.036,
      "PLATINUM": 0.093,
      "BRONZE": 0.267,
      "GOLD": 0.134,
      "CHALLENGER": 0
    }
  },
  {
    "id": 301203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 4,
      "MASTER": 12,
      "GOLD": 2,
      "DIAMOND": 8
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
      "SILVER": 0.172,
      "CHALLENGER": 0,
      "DIAMOND": 0.036,
      "MASTER": 0.02,
      "PLATINUM": 0.072,
      "GOLD": 0.116,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 2022020,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 60,
      "CHALLENGER": 70,
      "SILVER": 8,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 3,
      "MASTER": 50,
      "GOLD": 15,
      "DIAMOND": 40
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
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
      "GRANDMASTER": 27,
      "CHALLENGER": 53,
      "SILVER": 3,
      "PLATINUM": 5,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 7,
      "GOLD": 4,
      "DIAMOND": 6
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
      "SILVER": 0.105,
      "CHALLENGER": 0.004,
      "DIAMOND": 0.077,
      "MASTER": 0.071,
      "PLATINUM": 0.084,
      "GOLD": 0.094,
      "GRANDMASTER": 0.018,
      "BRONZE": 0.123,
      "IRON": 0.155,
      "NONE": 1
    },
    "leaderboardThresholds": [
      600,
      1,
      53,
      56902,
      27,
      284503
    ]
  },
  {
    "id": 2022019,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 159,
      "CHALLENGER": 237,
      "SILVER": 20,
      "PLATINUM": 60,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 100,
      "GOLD": 40,
      "DIAMOND": 80
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
      "PLATINUM": 0.006,
      "IRON": 0.056,
      "GOLD": 0.012,
      "MASTER": 0.002,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.04,
      "SILVER": 0.024,
      "DIAMOND": 0.004,
      "NONE": 1
    },
    "leaderboardThresholds": [
      896,
      1,
      237,
      1778,
      159,
      8885
    ]
  },
  {
    "id": 2022016,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 5,
      "CHALLENGER": 9,
      "PLATINUM": 1,
      "MASTER": 3,
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
      "GRANDMASTER": 0.001,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0.005,
      "SILVER": 0,
      "DIAMOND": 0.011,
      "PLATINUM": 0.031,
      "BRONZE": 0,
      "GOLD": 0,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      2939,
      1,
      9,
      3990,
      5,
      19945
    ]
  },
  {
    "id": 2022017,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 149,
      "CHALLENGER": 234,
      "SILVER": 15,
      "PLATINUM": 40,
      "BRONZE": 8,
      "IRON": 3,
      "MASTER": 90,
      "GOLD": 25,
      "DIAMOND": 60
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
      "PLATINUM": 0.005,
      "IRON": 0.062,
      "GOLD": 0.009,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.031,
      "SILVER": 0.017,
      "DIAMOND": 0.002,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1351,
      1,
      234,
      781,
      149,
      3898
    ]
  },
  {
    "id": 121001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 80,
      "CHALLENGER": 125,
      "SILVER": 6,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 50,
      "GOLD": 10,
      "DIAMOND": 30
    },
    "translation": {
      "description": "Win Co-Op vs. AI (Intermediate) games without dying",
      "name": "Get Bo(t)died",
      "shortDescription": "Win games without dying"
    },
    "reversed": false,
    "queueIds": [
      890
    ],
    "tags": {
      "parent": "121000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "121000",
    "parentCategory": "1",
    "percentiles": {
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 505007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 20,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 40,
      "GOLD": 10,
      "DIAMOND": 30
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
      "PLATINUM": 0.163,
      "IRON": 0.518,
      "GOLD": 0.256,
      "MASTER": 0.084,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.394,
      "SILVER": 0.349,
      "DIAMOND": 0.121,
      "NONE": 1
    }
  },
  {
    "id": 121000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 120,
      "BRONZE": 30,
      "IRON": 15,
      "MASTER": 300,
      "GOLD": 75,
      "DIAMOND": 180
    },
    "translation": {
      "description": "Earn points from challenges in the Glorious Evolution group",
      "name": "Glorious Evolution",
      "shortDescription": "Earn points from challenges in the Glorious Evolution group"
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
    "title": "Turing Tested",
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
      "GOLD": 0
    }
  },
  {
    "id": 505006,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 10,
      "DIAMOND": 20
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
      "SILVER": 0.315,
      "CHALLENGER": 0,
      "DIAMOND": 0.137,
      "MASTER": 0.09,
      "PLATINUM": 0.166,
      "GOLD": 0.21,
      "GRANDMASTER": 0,
      "BRONZE": 0.389,
      "IRON": 0.523,
      "NONE": 1
    }
  },
  {
    "id": 121003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 35,
      "CHALLENGER": 60,
      "SILVER": 3,
      "PLATINUM": 8,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 20,
      "GOLD": 5,
      "DIAMOND": 12
    },
    "translation": {
      "description": "Destroy all three inhibitors in under 25 minutes in Co-Op vs. AI (Intermediate) games",
      "name": "That'll Machine Learn You",
      "shortDescription": "Destroy all 3 inhibitors in under 25 minutes"
    },
    "reversed": false,
    "queueIds": [
      890
    ],
    "tags": {
      "parent": "121000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "121000",
    "parentCategory": "1",
    "percentiles": {
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 505005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 10,
      "DIAMOND": 20
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.126,
      "BRONZE": 0.405,
      "GOLD": 0.209,
      "IRON": 0.563,
      "SILVER": 0.322,
      "MASTER": 0.064,
      "PLATINUM": 0.16
    }
  },
  {
    "id": 121002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 150,
      "CHALLENGER": 250,
      "SILVER": 5,
      "PLATINUM": 25,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 90,
      "GOLD": 12,
      "DIAMOND": 50
    },
    "translation": {
      "description": "Kill the enemy jungler in their jungle before 10 min in Co-Op vs. AI (Intermediate) Games",
      "name": "Error 410: Jungler Gone",
      "shortDescription": "Kill the enemy jungler in their jungle before 10 min"
    },
    "reversed": false,
    "queueIds": [
      890
    ],
    "tags": {
      "parent": "121000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "121000",
    "parentCategory": "1",
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
      "GOLD": 0
    }
  },
  {
    "id": 505004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 12,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 65,
      "GOLD": 18,
      "DIAMOND": 45
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
      "SILVER": 0.245,
      "CHALLENGER": 0,
      "DIAMOND": 0.106,
      "MASTER": 0,
      "PLATINUM": 0.164,
      "GOLD": 0.195,
      "GRANDMASTER": 0,
      "BRONZE": 0.379,
      "IRON": 0.561,
      "NONE": 1
    }
  },
  {
    "id": 505003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 12,
      "PLATINUM": 30,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 70,
      "GOLD": 20,
      "DIAMOND": 50
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
      "SILVER": 0.297,
      "CHALLENGER": 0,
      "DIAMOND": 0.112,
      "MASTER": 0.06,
      "PLATINUM": 0.166,
      "GOLD": 0.213,
      "GRANDMASTER": 0,
      "BRONZE": 0.401,
      "IRON": 0.585,
      "NONE": 1
    }
  },
  {
    "id": 505002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 45,
      "GOLD": 15,
      "DIAMOND": 35
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
      "SILVER": 0.236,
      "CHALLENGER": 0,
      "DIAMOND": 0.093,
      "MASTER": 0,
      "PLATINUM": 0.135,
      "GOLD": 0.188,
      "GRANDMASTER": 0,
      "BRONZE": 0.339,
      "IRON": 0.542,
      "NONE": 1
    }
  },
  {
    "id": 505001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 25,
      "IRON": 5,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.099,
      "BRONZE": 0.301,
      "GOLD": 0.155,
      "IRON": 0.481,
      "SILVER": 0.196,
      "MASTER": 0.073,
      "PLATINUM": 0.125
    }
  },
  {
    "id": 505000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 55,
      "PLATINUM": 185,
      "BRONZE": 35,
      "IRON": 20,
      "MASTER": 550,
      "GOLD": 115,
      "DIAMOND": 340
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
      "GRANDMASTER": 0,
      "IRON": 0.515,
      "NONE": 1,
      "MASTER": 0.064,
      "SILVER": 0.387,
      "DIAMOND": 0.116,
      "PLATINUM": 0.173,
      "BRONZE": 0.456,
      "GOLD": 0.227,
      "CHALLENGER": 0
    }
  },
  {
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
  {
    "id": 402103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 200,
      "CHALLENGER": 302,
      "SILVER": 5,
      "PLATINUM": 25,
      "BRONZE": 1,
      "MASTER": 125,
      "GOLD": 10,
      "DIAMOND": 65
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.017,
      "BRONZE": 0.232,
      "GOLD": 0.097,
      "IRON": 0,
      "SILVER": 0.134,
      "MASTER": 0.005,
      "PLATINUM": 0.052
    },
    "leaderboardThresholds": [
      1494,
      1,
      302,
      3783,
      200,
      18909
    ]
  },
  {
    "id": 402100,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 840,
      "CHALLENGER": 900,
      "SILVER": 60,
      "PLATINUM": 240,
      "BRONZE": 40,
      "IRON": 20,
      "MASTER": 725,
      "GOLD": 150,
      "DIAMOND": 430
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
      "SILVER": 0.203,
      "CHALLENGER": 0,
      "DIAMOND": 0.029,
      "MASTER": 0.007,
      "PLATINUM": 0.073,
      "GOLD": 0.118,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.237,
      "IRON": 0.284,
      "NONE": 1
    },
    "leaderboardThresholds": [
      900,
      1,
      900,
      5403,
      840,
      27008
    ]
  },
  {
    "id": 2024108,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 30,
      "CHALLENGER": 40,
      "SILVER": 4,
      "PLATINUM": 11,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 22,
      "GOLD": 7,
      "DIAMOND": 16
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.016,
      "IRON": 0.082,
      "SILVER": 0.04,
      "NONE": 1,
      "BRONZE": 0.06,
      "DIAMOND": 0.01,
      "MASTER": 0.007,
      "GOLD": 0.025
    }
  },
  {
    "id": 402101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1000,
      "CHALLENGER": 1500,
      "SILVER": 30,
      "PLATINUM": 150,
      "BRONZE": 15,
      "IRON": 3,
      "MASTER": 500,
      "GOLD": 75,
      "DIAMOND": 300
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
      "SILVER": 0.107,
      "CHALLENGER": 0,
      "DIAMOND": 0.021,
      "MASTER": 0.009,
      "PLATINUM": 0.044,
      "GOLD": 0.071,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.133,
      "IRON": 0.185,
      "NONE": 1
    },
    "leaderboardThresholds": [
      5544,
      1,
      1499,
      3376,
      999,
      19909
    ]
  },
  {
    "id": 2024106,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 65,
      "CHALLENGER": 90,
      "SILVER": 9,
      "PLATINUM": 20,
      "BRONZE": 5,
      "IRON": 2,
      "MASTER": 45,
      "GOLD": 14,
      "DIAMOND": 30
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
      "SILVER": 0.069,
      "CHALLENGER": 0,
      "DIAMOND": 0.032,
      "MASTER": 0.02,
      "PLATINUM": 0.045,
      "GOLD": 0.056,
      "GRANDMASTER": 0,
      "BRONZE": 0.086,
      "IRON": 0.111,
      "NONE": 1
    }
  },
  {
    "id": 2024107,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 1,
      "MASTER": 3,
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.02,
      "MASTER": 0.01,
      "PLATINUM": 0.045,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 2024104,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 75,
      "CHALLENGER": 100,
      "SILVER": 9,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 2,
      "MASTER": 55,
      "GOLD": 15,
      "DIAMOND": 40
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
      "GRANDMASTER": 0,
      "IRON": 0.116,
      "NONE": 1,
      "MASTER": 0.017,
      "SILVER": 0.072,
      "DIAMOND": 0.026,
      "PLATINUM": 0.04,
      "BRONZE": 0.09,
      "GOLD": 0.057,
      "CHALLENGER": 0
    }
  },
  {
    "id": 2024105,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 35,
      "CHALLENGER": 50,
      "SILVER": 4,
      "PLATINUM": 12,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 25,
      "GOLD": 7,
      "DIAMOND": 18
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
      "PLATINUM": 0.017,
      "IRON": 0.079,
      "GOLD": 0.03,
      "MASTER": 0.004,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.061,
      "SILVER": 0.044,
      "DIAMOND": 0.009,
      "NONE": 1
    }
  },
  {
    "id": 2024102,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 75,
      "CHALLENGER": 100,
      "SILVER": 9,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 2,
      "MASTER": 55,
      "GOLD": 15,
      "DIAMOND": 40
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
      "SILVER": 0.027,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "MASTER": 0.005,
      "PLATINUM": 0.012,
      "GOLD": 0.019,
      "GRANDMASTER": 0,
      "BRONZE": 0.039,
      "IRON": 0.059,
      "NONE": 1
    }
  },
  {
    "id": 2024103,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 60,
      "CHALLENGER": 90,
      "SILVER": 6,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 40,
      "GOLD": 10,
      "DIAMOND": 25
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.006,
      "IRON": 0.056,
      "SILVER": 0.017,
      "NONE": 1,
      "BRONZE": 0.029,
      "DIAMOND": 0.003,
      "MASTER": 0.001,
      "GOLD": 0.01
    }
  },
  {
    "id": 402108,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 21458,
      "CHALLENGER": 35000,
      "SILVER": 500,
      "PLATINUM": 3500,
      "BRONZE": 200,
      "IRON": 50,
      "MASTER": 15000,
      "GOLD": 1250,
      "DIAMOND": 6750
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.026,
      "BRONZE": 0.202,
      "GOLD": 0.109,
      "IRON": 0.277,
      "SILVER": 0.155,
      "MASTER": 0.004,
      "PLATINUM": 0.057
    },
    "leaderboardThresholds": [
      124165,
      1,
      34999,
      1296,
      21458,
      15475
    ]
  },
  {
    "id": 2024100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 60,
      "PLATINUM": 215,
      "BRONZE": 40,
      "IRON": 20,
      "MASTER": 650,
      "GOLD": 135,
      "DIAMOND": 380
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
      "PLATINUM": 0.032,
      "IRON": 0.125,
      "GOLD": 0.05,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.1,
      "SILVER": 0.084,
      "DIAMOND": 0.011,
      "NONE": 1
    }
  },
  {
    "id": 402109,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 7,
      "PLATINUM": 40,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 15,
      "DIAMOND": 75
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.061,
      "IRON": 0.282,
      "SILVER": 0.155,
      "NONE": 1,
      "BRONZE": 0.205,
      "DIAMOND": 0.032,
      "MASTER": 0.01,
      "GOLD": 0.113
    }
  },
  {
    "id": 2024101,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 16,
      "PLATINUM": 40,
      "BRONZE": 7,
      "IRON": 3,
      "MASTER": 85,
      "GOLD": 25,
      "DIAMOND": 60
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
      "SILVER": 0.076,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "MASTER": 0,
      "PLATINUM": 0.027,
      "GOLD": 0.053,
      "GRANDMASTER": 0,
      "BRONZE": 0.108,
      "IRON": 0.134,
      "NONE": 1
    }
  },
  {
    "id": 103101,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 2,
      "PLATINUM": 5,
      "BRONZE": 1,
      "MASTER": 20,
      "GOLD": 3,
      "DIAMOND": 10
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.048,
      "IRON": 0,
      "SILVER": 0.101,
      "NONE": 1,
      "BRONZE": 0.152,
      "DIAMOND": 0.02,
      "MASTER": 0.005,
      "GOLD": 0.076
    }
  },
  {
    "id": 402106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 9,
      "CHALLENGER": 17,
      "PLATINUM": 2,
      "MASTER": 5,
      "GOLD": 1,
      "DIAMOND": 3
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
      "GRANDMASTER": 0.002,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0.008,
      "SILVER": 0,
      "DIAMOND": 0.019,
      "PLATINUM": 0.033,
      "BRONZE": 0,
      "GOLD": 0.069,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      2939,
      1,
      17,
      6387,
      9,
      31930
    ]
  },
  {
    "id": 103100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 65,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 175,
      "GOLD": 45,
      "DIAMOND": 110
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
      "SILVER": 0.154,
      "CHALLENGER": 0,
      "DIAMOND": 0.021,
      "MASTER": 0.006,
      "PLATINUM": 0.067,
      "GOLD": 0.095,
      "GRANDMASTER": 0,
      "BRONZE": 0.22,
      "IRON": 0.246,
      "NONE": 1
    }
  },
  {
    "id": 402107,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 15248,
      "CHALLENGER": 25000,
      "SILVER": 350,
      "PLATINUM": 2000,
      "BRONZE": 150,
      "IRON": 35,
      "MASTER": 10000,
      "GOLD": 750,
      "DIAMOND": 5000
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
      "PLATINUM": 0.071,
      "IRON": 0.284,
      "GOLD": 0.122,
      "MASTER": 0.007,
      "GRANDMASTER": 0.002,
      "CHALLENGER": 0,
      "BRONZE": 0.206,
      "SILVER": 0.161,
      "DIAMOND": 0.029,
      "NONE": 1
    },
    "leaderboardThresholds": [
      80529,
      1,
      24999,
      2752,
      15248,
      29248
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
      "GRANDMASTER": 0,
      "SILVER": 0.157,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0,
      "DIAMOND": 0
    }
  },
  {
    "id": 402104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1333,
      "CHALLENGER": 2076,
      "SILVER": 30,
      "PLATINUM": 200,
      "BRONZE": 12,
      "IRON": 3,
      "MASTER": 720,
      "GOLD": 80,
      "DIAMOND": 400
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
      "GRANDMASTER": 0.005,
      "IRON": 0.293,
      "NONE": 1,
      "MASTER": 0.02,
      "SILVER": 0.172,
      "DIAMOND": 0.043,
      "PLATINUM": 0.075,
      "BRONZE": 0.22,
      "GOLD": 0.122,
      "CHALLENGER": 0.001
    },
    "leaderboardThresholds": [
      8454,
      1,
      2076,
      15830,
      1333,
      79146
    ]
  },
  {
    "id": 103102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 158,
      "CHALLENGER": 234,
      "SILVER": 5,
      "PLATINUM": 30,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 100,
      "GOLD": 10,
      "DIAMOND": 60
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
      "SILVER": 0.123,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "MASTER": 0.006,
      "PLATINUM": 0.041,
      "GOLD": 0.088,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.174,
      "IRON": 0.217,
      "NONE": 1
    },
    "leaderboardThresholds": [
      991,
      1,
      234,
      4909,
      158,
      24538
    ]
  },
  {
    "id": 402105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1685,
      "CHALLENGER": 2641,
      "SILVER": 40,
      "PLATINUM": 300,
      "BRONZE": 16,
      "IRON": 4,
      "MASTER": 960,
      "GOLD": 120,
      "DIAMOND": 540
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
      "SILVER": 0.156,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.03,
      "MASTER": 0.012,
      "PLATINUM": 0.055,
      "GOLD": 0.099,
      "GRANDMASTER": 0.003,
      "BRONZE": 0.204,
      "IRON": 0.275,
      "NONE": 1
    },
    "leaderboardThresholds": [
      21365,
      1,
      2641,
      9731,
      1685,
      48650
    ]
  },
  {
    "id": 120001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 100,
      "CHALLENGER": 150,
      "SILVER": 10,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 50,
      "GOLD": 15,
      "DIAMOND": 30
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
      850,
      870,
      880,
      890
    ],
    "tags": {
      "parent": "120000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "120000",
    "parentCategory": "1",
    "percentiles": {
      "SILVER": 0.112,
      "CHALLENGER": 0,
      "DIAMOND": 0.069,
      "MASTER": 0.06,
      "PLATINUM": 0.072,
      "GOLD": 0.089,
      "GRANDMASTER": 0,
      "BRONZE": 0.159,
      "IRON": 0.301,
      "NONE": 1
    }
  },
  {
    "id": 303300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "SILVER": 0.095,
      "CHALLENGER": 0,
      "DIAMOND": 0.002,
      "MASTER": 0,
      "PLATINUM": 0.017,
      "GOLD": 0.048,
      "GRANDMASTER": 0,
      "BRONZE": 0.146,
      "IRON": 0.189,
      "NONE": 1
    }
  },
  {
    "id": 120000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 120,
      "BRONZE": 30,
      "IRON": 15,
      "MASTER": 300,
      "GOLD": 75,
      "DIAMOND": 180
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.06,
      "IRON": 0.163,
      "SILVER": 0.081,
      "NONE": 1,
      "BRONZE": 0.103,
      "DIAMOND": 0.006,
      "MASTER": 0,
      "GOLD": 0.07
    }
  },
  {
    "id": 303301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 750,
      "CHALLENGER": 1500,
      "SILVER": 60,
      "PLATINUM": 150,
      "BRONZE": 25,
      "IRON": 5,
      "MASTER": 500,
      "GOLD": 100,
      "DIAMOND": 300
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.009,
      "IRON": 0.112,
      "SILVER": 0.03,
      "NONE": 1,
      "BRONZE": 0.058,
      "DIAMOND": 0.002,
      "MASTER": 0,
      "GOLD": 0.016
    },
    "leaderboardThresholds": [
      2465,
      1,
      1486,
      27,
      749,
      866
    ]
  },
  {
    "id": 120003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 300,
      "PLATINUM": 2500,
      "BRONZE": 150,
      "IRON": 50,
      "MASTER": 7500,
      "GOLD": 750,
      "DIAMOND": 5000
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
      850,
      870,
      880,
      890
    ],
    "tags": {
      "parent": "120000",
      "source": "EOGD",
      "leaderboardManuallyEnabled": true
    },
    "parent": "120000",
    "parentCategory": "1",
    "percentiles": {
      "GRANDMASTER": 0,
      "SILVER": 0.07,
      "CHALLENGER": 0,
      "PLATINUM": 0.01,
      "IRON": 0.155,
      "BRONZE": 0.091,
      "MASTER": 0.001,
      "NONE": 1,
      "GOLD": 0.047,
      "DIAMOND": 0.002
    }
  },
  {
    "id": 303302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 350,
      "CHALLENGER": 500,
      "SILVER": 12,
      "PLATINUM": 65,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 25,
      "DIAMOND": 125
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0,
      "IRON": 0.147,
      "SILVER": 0.007,
      "NONE": 1,
      "BRONZE": 0.028,
      "DIAMOND": 0,
      "MASTER": 0,
      "GOLD": 0.002
    },
    "leaderboardThresholds": [
      0,
      0,
      387,
      1,
      339,
      8
    ]
  },
  {
    "id": 120002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 30,
      "BRONZE": 5,
      "IRON": 3,
      "MASTER": 100,
      "GOLD": 15,
      "DIAMOND": 75
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
      850,
      870,
      880,
      890
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
      "PLATINUM": 0.015,
      "IRON": 0.171,
      "GOLD": 0.04,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.11,
      "SILVER": 0.058,
      "DIAMOND": 0.002,
      "NONE": 1
    }
  },
  {
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
  {
    "id": 504004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 80,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 275,
      "GOLD": 40,
      "DIAMOND": 150
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.053,
      "BRONZE": 0.361,
      "GOLD": 0.164,
      "IRON": 0.632,
      "SILVER": 0.282,
      "MASTER": 0.011,
      "PLATINUM": 0.108
    }
  },
  {
    "id": 504003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 20,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 60,
      "GOLD": 10,
      "DIAMOND": 30
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.06,
      "BRONZE": 0.392,
      "GOLD": 0.163,
      "IRON": 0.49,
      "SILVER": 0.221,
      "MASTER": 0.008,
      "PLATINUM": 0.102
    }
  },
  {
    "id": 504002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 20,
      "PLATINUM": 100,
      "BRONZE": 10,
      "IRON": 3,
      "MASTER": 400,
      "GOLD": 50,
      "DIAMOND": 200
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
      "GRANDMASTER": 0,
      "IRON": 0.459,
      "NONE": 1,
      "MASTER": 0.006,
      "SILVER": 0.243,
      "DIAMOND": 0.041,
      "PLATINUM": 0.105,
      "BRONZE": 0.318,
      "GOLD": 0.166,
      "CHALLENGER": 0
    }
  },
  {
    "id": 504001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 3,
      "PLATINUM": 10,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 40,
      "GOLD": 5,
      "DIAMOND": 20
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.032,
      "IRON": 0.115,
      "SILVER": 0.066,
      "NONE": 1,
      "BRONZE": 0.075,
      "DIAMOND": 0.017,
      "MASTER": 0.006,
      "GOLD": 0.051
    }
  },
  {
    "id": 504000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 35,
      "PLATINUM": 110,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 325,
      "GOLD": 70,
      "DIAMOND": 200
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
      "SILVER": 0.267,
      "CHALLENGER": 0,
      "DIAMOND": 0.032,
      "MASTER": 0.003,
      "PLATINUM": 0.1,
      "GOLD": 0.153,
      "GRANDMASTER": 0,
      "BRONZE": 0.343,
      "IRON": 0.534,
      "NONE": 1
    }
  },
  {
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
  {
    "id": 401103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1438137,
      "CHALLENGER": 2392784,
      "SILVER": 9000,
      "PLATINUM": 110000,
      "BRONZE": 1500,
      "IRON": 850,
      "MASTER": 840000,
      "GOLD": 38000,
      "DIAMOND": 280000
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "PLATINUM": 0.119,
      "IRON": 0.404,
      "SILVER": 0.283,
      "NONE": 1,
      "BRONZE": 0.375,
      "DIAMOND": 0.046,
      "MASTER": 0.006,
      "GOLD": 0.198
    },
    "leaderboardThresholds": [
      14895850,
      1,
      2392784,
      4960,
      1438137,
      24795
    ]
  },
  {
    "id": 401100,
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.001,
      "BRONZE": 0.273,
      "GOLD": 0.088,
      "IRON": 0.383,
      "SILVER": 0.194,
      "MASTER": 0,
      "PLATINUM": 0.024
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
      "GRANDMASTER": 107500,
      "CHALLENGER": 115000,
      "SILVER": 1000,
      "PLATINUM": 10000,
      "BRONZE": 500,
      "IRON": 100,
      "MASTER": 100000,
      "GOLD": 5000,
      "DIAMOND": 50000
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
      "GRANDMASTER": 0,
      "IRON": 0.045,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.016,
      "DIAMOND": 0,
      "PLATINUM": 0,
      "BRONZE": 0.025,
      "GOLD": 0.001,
      "CHALLENGER": 0
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
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "SILVER": 0.036,
      "CHALLENGER": 0,
      "DIAMOND": 0.001,
      "MASTER": 0,
      "PLATINUM": 0.006,
      "GOLD": 0.015,
      "GRANDMASTER": 0,
      "BRONZE": 0.083,
      "IRON": 0.159,
      "NONE": 1
    }
  },
  {
    "id": 401104,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 30,
      "PLATINUM": 75,
      "BRONZE": 15,
      "IRON": 5,
      "MASTER": 150,
      "GOLD": 50,
      "DIAMOND": 100
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
      "SILVER": 0.042,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.003,
      "GOLD": 0.014,
      "GRANDMASTER": 0,
      "BRONZE": 0.088,
      "IRON": 0.151,
      "NONE": 1
    }
  },
  {
    "id": 401105,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 15,
      "PLATINUM": 40,
      "BRONZE": 7,
      "IRON": 3,
      "MASTER": 100,
      "GOLD": 25,
      "DIAMOND": 60
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
      "GRANDMASTER": 0,
      "SILVER": 0.016,
      "CHALLENGER": 0,
      "PLATINUM": 0.001,
      "IRON": 0.087,
      "BRONZE": 0.045,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0.005,
      "DIAMOND": 0
    }
  },
  {
    "id": 302300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 135,
      "BRONZE": 25,
      "IRON": 15,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 240
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
      "GRANDMASTER": 0,
      "IRON": 0.265,
      "NONE": 1,
      "MASTER": 0.006,
      "SILVER": 0.188,
      "DIAMOND": 0.025,
      "PLATINUM": 0.07,
      "BRONZE": 0.227,
      "GOLD": 0.119,
      "CHALLENGER": 0
    }
  },
  {
    "id": 302301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3075,
      "CHALLENGER": 4557,
      "SILVER": 64,
      "PLATINUM": 400,
      "BRONZE": 32,
      "IRON": 8,
      "MASTER": 1920,
      "GOLD": 160,
      "DIAMOND": 1080
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
      "PLATINUM": 0.081,
      "IRON": 0.283,
      "GOLD": 0.127,
      "MASTER": 0.011,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.209,
      "SILVER": 0.173,
      "DIAMOND": 0.032,
      "NONE": 1
    },
    "leaderboardThresholds": [
      20518,
      1,
      4557,
      9126,
      3075,
      45624
    ]
  },
  {
    "id": 302302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 20709,
      "CHALLENGER": 29929,
      "SILVER": 660,
      "PLATINUM": 4125,
      "BRONZE": 220,
      "IRON": 55,
      "MASTER": 13000,
      "GOLD": 1320,
      "DIAMOND": 7500
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
      "PLATINUM": 0.063,
      "IRON": 0.288,
      "GOLD": 0.121,
      "MASTER": 0.013,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.213,
      "SILVER": 0.156,
      "DIAMOND": 0.034,
      "NONE": 1
    },
    "leaderboardThresholds": [
      127108,
      1,
      29929,
      10233,
      20709,
      51159
    ]
  },
  {
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
  {
    "id": 204000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 60,
      "PLATINUM": 210,
      "BRONZE": 40,
      "IRON": 15,
      "MASTER": 650,
      "GOLD": 130,
      "DIAMOND": 375
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
      "SILVER": 0.141,
      "CHALLENGER": 0,
      "DIAMOND": 0.015,
      "MASTER": 0.001,
      "PLATINUM": 0.046,
      "GOLD": 0.083,
      "GRANDMASTER": 0,
      "BRONZE": 0.179,
      "IRON": 0.252,
      "NONE": 1
    }
  },
  {
    "id": 302304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 10722,
      "CHALLENGER": 15308,
      "SILVER": 300,
      "PLATINUM": 2250,
      "BRONZE": 120,
      "IRON": 30,
      "MASTER": 7200,
      "GOLD": 750,
      "DIAMOND": 4000
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
      "GRANDMASTER": 0.001,
      "IRON": 0.256,
      "NONE": 1,
      "MASTER": 0.006,
      "SILVER": 0.142,
      "DIAMOND": 0.021,
      "PLATINUM": 0.045,
      "BRONZE": 0.186,
      "GOLD": 0.098,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      61712,
      1,
      15308,
      4457,
      10722,
      22280
    ]
  },
  {
    "id": 302305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3439,
      "CHALLENGER": 5963,
      "SILVER": 60,
      "PLATINUM": 500,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 150,
      "DIAMOND": 1000
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
      "PLATINUM": 0.058,
      "IRON": 0.237,
      "GOLD": 0.111,
      "MASTER": 0.014,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.185,
      "SILVER": 0.153,
      "DIAMOND": 0.031,
      "NONE": 1
    },
    "leaderboardThresholds": [
      42686,
      1,
      5963,
      10880,
      3439,
      54394
    ]
  },
  {
    "id": 101101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 127,
      "CHALLENGER": 358,
      "SILVER": 1,
      "PLATINUM": 4,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 7
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
      "PLATINUM": 0.134,
      "IRON": 0,
      "GOLD": 0.158,
      "MASTER": 0.105,
      "GRANDMASTER": 0.026,
      "CHALLENGER": 0.005,
      "BRONZE": 0,
      "SILVER": 0.186,
      "DIAMOND": 0.116,
      "NONE": 1
    },
    "leaderboardThresholds": [
      8675,
      1,
      358,
      83870,
      127,
      419346
    ]
  },
  {
    "id": 101100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 185,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 650,
      "GOLD": 115,
      "DIAMOND": 340
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
      "PLATINUM": 0.092,
      "IRON": 0.207,
      "GOLD": 0.114,
      "MASTER": 0.009,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.199,
      "SILVER": 0.161,
      "DIAMOND": 0.04,
      "NONE": 1
    }
  },
  {
    "id": 101103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 32,
      "CHALLENGER": 63,
      "SILVER": 1,
      "PLATINUM": 5,
      "MASTER": 15,
      "GOLD": 2,
      "DIAMOND": 10
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
      "SILVER": 0.102,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.02,
      "MASTER": 0.012,
      "PLATINUM": 0.039,
      "GOLD": 0.072,
      "GRANDMASTER": 0.003,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1990,
      1,
      63,
      9253,
      32,
      46258
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0.016,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 101105,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 125,
      "PLATINUM": 650,
      "BRONZE": 50,
      "IRON": 10,
      "MASTER": 2500,
      "GOLD": 250,
      "DIAMOND": 1500
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
      "GRANDMASTER": 0,
      "IRON": 0.194,
      "NONE": 1,
      "MASTER": 0.013,
      "SILVER": 0.111,
      "DIAMOND": 0.028,
      "PLATINUM": 0.056,
      "BRONZE": 0.14,
      "GOLD": 0.089,
      "CHALLENGER": 0
    }
  },
  {
    "id": 301300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 75,
      "PLATINUM": 105,
      "BRONZE": 50,
      "IRON": 25,
      "MASTER": 300,
      "GOLD": 100,
      "DIAMOND": 160
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
      "PLATINUM": 0.095,
      "IRON": 0.238,
      "GOLD": 0.1,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.171,
      "SILVER": 0.131,
      "DIAMOND": 0.051,
      "NONE": 1
    }
  },
  {
    "id": 101104,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 7,
      "PLATINUM": 45,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 15,
      "DIAMOND": 90
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.029,
      "BRONZE": 0.145,
      "GOLD": 0.09,
      "IRON": 0.193,
      "SILVER": 0.115,
      "MASTER": 0.015,
      "PLATINUM": 0.052
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0.053,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 101107,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 57465,
      "CHALLENGER": 91967,
      "SILVER": 2000,
      "PLATINUM": 12500,
      "BRONZE": 800,
      "IRON": 200,
      "MASTER": 30000,
      "GOLD": 5000,
      "DIAMOND": 20000
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
      "PLATINUM": 0.044,
      "IRON": 0.185,
      "GOLD": 0.076,
      "MASTER": 0.016,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "BRONZE": 0.136,
      "SILVER": 0.107,
      "DIAMOND": 0.028,
      "NONE": 1
    },
    "leaderboardThresholds": [
      468191,
      1,
      91967,
      13083,
      57465,
      65409
    ]
  },
  {
    "id": 301302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 488,
      "CHALLENGER": 760,
      "SILVER": 15,
      "PLATINUM": 90,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 30,
      "DIAMOND": 180
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
      "SILVER": 0.053,
      "CHALLENGER": 0,
      "DIAMOND": 0.003,
      "MASTER": 0.001,
      "PLATINUM": 0.008,
      "GOLD": 0.03,
      "GRANDMASTER": 0,
      "BRONZE": 0.1,
      "IRON": 0.188,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2622,
      1,
      760,
      700,
      488,
      3494
    ]
  },
  {
    "id": 502005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 30,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 50,
      "GOLD": 20,
      "DIAMOND": 40
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
      "SILVER": 0.155,
      "CHALLENGER": 0,
      "DIAMOND": 0.069,
      "MASTER": 0.028,
      "PLATINUM": 0.095,
      "GOLD": 0.117,
      "GRANDMASTER": 0,
      "BRONZE": 0.198,
      "IRON": 0.357,
      "NONE": 1
    }
  },
  {
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.176,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 502004,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 15,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 30,
      "DIAMOND": 150
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
      "SILVER": 0.084,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.009,
      "GOLD": 0.04,
      "GRANDMASTER": 0,
      "BRONZE": 0.152,
      "IRON": 0.296,
      "NONE": 1
    }
  },
  {
    "id": 502003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 15,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 30,
      "DIAMOND": 150
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.002,
      "BRONZE": 0.193,
      "GOLD": 0.077,
      "IRON": 0.339,
      "SILVER": 0.122,
      "MASTER": 0,
      "PLATINUM": 0.031
    }
  },
  {
    "id": 101108,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 18,
      "CHALLENGER": 43,
      "PLATINUM": 3,
      "MASTER": 7,
      "GOLD": 1,
      "DIAMOND": 5
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.003,
      "PLATINUM": 0.035,
      "IRON": 0,
      "SILVER": 0,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0.02,
      "MASTER": 0.013,
      "GOLD": 0.082
    },
    "leaderboardThresholds": [
      1166,
      1,
      43,
      10534,
      18,
      52666
    ]
  },
  {
    "id": 502002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 20,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 15,
      "DIAMOND": 25
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
      "PLATINUM": 0.003,
      "IRON": 0.113,
      "GOLD": 0.007,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.067,
      "SILVER": 0.017,
      "DIAMOND": 0.001,
      "NONE": 1
    }
  },
  {
    "id": 502001,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 20,
      "PLATINUM": 45,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 100,
      "GOLD": 30,
      "DIAMOND": 70
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
      "PLATINUM": 0.029,
      "IRON": 0.208,
      "GOLD": 0.059,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.151,
      "SILVER": 0.094,
      "DIAMOND": 0.005,
      "NONE": 1
    }
  },
  {
    "id": 502000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 135,
      "BRONZE": 25,
      "IRON": 15,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 240
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.006,
      "BRONZE": 0.202,
      "GOLD": 0.085,
      "IRON": 0.295,
      "SILVER": 0.16,
      "MASTER": 0,
      "PLATINUM": 0.048
    }
  },
  {
    "id": 203000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 190,
      "PLATINUM": 700,
      "BRONZE": 105,
      "IRON": 50,
      "MASTER": 2100,
      "GOLD": 440,
      "DIAMOND": 1250
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.049,
      "IRON": 0.267,
      "SILVER": 0.168,
      "NONE": 1,
      "BRONZE": 0.217,
      "DIAMOND": 0.01,
      "MASTER": 0,
      "GOLD": 0.095
    }
  },
  {
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0,
      "IRON": 0,
      "SILVER": 0,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "GOLD": 0.14
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.169,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 501007,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "GRANDMASTER": 0,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0.002,
      "SILVER": 0.045,
      "DIAMOND": 0.007,
      "PLATINUM": 0.014,
      "BRONZE": 0,
      "GOLD": 0.022,
      "CHALLENGER": 0
    }
  },
  {
    "id": 501005,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 2,
      "PLATINUM": 6,
      "BRONZE": 1,
      "MASTER": 30,
      "GOLD": 3,
      "DIAMOND": 15
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
      "PLATINUM": 0.024,
      "IRON": 0,
      "GOLD": 0.041,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.08,
      "SILVER": 0.055,
      "DIAMOND": 0.009,
      "NONE": 1
    }
  },
  {
    "id": 501004,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 426,
      "CHALLENGER": 1060,
      "SILVER": 15,
      "PLATINUM": 60,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 125,
      "GOLD": 30,
      "DIAMOND": 90
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
      "SILVER": 0.091,
      "CHALLENGER": 0.002,
      "DIAMOND": 0.041,
      "MASTER": 0.032,
      "PLATINUM": 0.053,
      "GOLD": 0.072,
      "GRANDMASTER": 0.008,
      "BRONZE": 0.105,
      "IRON": 0.13,
      "NONE": 1
    },
    "leaderboardThresholds": [
      194723,
      1,
      1060,
      25771,
      426,
      128847
    ]
  },
  {
    "id": 501003,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 35,
      "CHALLENGER": 45,
      "SILVER": 3,
      "PLATINUM": 8,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 25,
      "GOLD": 5,
      "DIAMOND": 12
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
      "PLATINUM": 0.013,
      "IRON": 0.069,
      "GOLD": 0.02,
      "MASTER": 0.003,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.041,
      "SILVER": 0.03,
      "DIAMOND": 0.008,
      "NONE": 1
    }
  },
  {
    "id": 501002,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 6,
      "PLATINUM": 20,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 80,
      "GOLD": 10,
      "DIAMOND": 40
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
      "PLATINUM": 0.03,
      "IRON": 0.096,
      "GOLD": 0.044,
      "MASTER": 0.008,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.083,
      "SILVER": 0.06,
      "DIAMOND": 0.018,
      "NONE": 1
    }
  },
  {
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
    "queueIds": [
      
    ],
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
  {
    "id": 501000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 85,
      "PLATINUM": 295,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 875,
      "GOLD": 185,
      "DIAMOND": 530
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
      "PLATINUM": 0.028,
      "IRON": 0.132,
      "GOLD": 0.049,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.104,
      "SILVER": 0.074,
      "DIAMOND": 0.012,
      "NONE": 1
    }
  },
  {
    "id": 202000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 120,
      "PLATINUM": 450,
      "BRONZE": 75,
      "IRON": 35,
      "MASTER": 1450,
      "GOLD": 280,
      "DIAMOND": 825
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
      "SILVER": 0.196,
      "CHALLENGER": 0,
      "DIAMOND": 0.023,
      "MASTER": 0.001,
      "PLATINUM": 0.068,
      "GOLD": 0.115,
      "GRANDMASTER": 0,
      "BRONZE": 0.235,
      "IRON": 0.284,
      "NONE": 1
    }
  },
  {
    "id": 501012,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "GRANDMASTER": 0,
      "SILVER": 0.035,
      "CHALLENGER": 0,
      "PLATINUM": 0.011,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0.001,
      "NONE": 1,
      "GOLD": 0.017,
      "DIAMOND": 0.005
    }
  },
  {
    "id": 501011,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "SILVER": 0.039,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "MASTER": 0.002,
      "PLATINUM": 0.014,
      "GOLD": 0.021,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 501010,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "SILVER": 0.04,
      "CHALLENGER": 0,
      "DIAMOND": 0.009,
      "MASTER": 0.003,
      "PLATINUM": 0.015,
      "GOLD": 0.022,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 501009,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "PLATINUM": 0.019,
      "IRON": 0,
      "GOLD": 0.028,
      "MASTER": 0.004,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0.05,
      "DIAMOND": 0.011,
      "NONE": 1
    }
  },
  {
    "id": 501008,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 2,
      "DIAMOND": 5
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
      "SILVER": 0.05,
      "CHALLENGER": 0,
      "DIAMOND": 0.01,
      "MASTER": 0.003,
      "PLATINUM": 0.018,
      "GOLD": 0.027,
      "GRANDMASTER": 0,
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
      "GRANDMASTER": 2688,
      "CHALLENGER": 3842,
      "SILVER": 75,
      "PLATINUM": 550,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 200,
      "DIAMOND": 1000
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
      "GRANDMASTER": 0.001,
      "IRON": 0.245,
      "NONE": 1,
      "MASTER": 0.006,
      "SILVER": 0.145,
      "DIAMOND": 0.021,
      "PLATINUM": 0.047,
      "BRONZE": 0.189,
      "GOLD": 0.097,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      16517,
      1,
      3842,
      4410,
      2688,
      22046
    ]
  },
  {
    "id": 402207,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 623,
      "CHALLENGER": 1000,
      "SILVER": 20,
      "PLATINUM": 100,
      "BRONZE": 8,
      "IRON": 2,
      "MASTER": 350,
      "GOLD": 50,
      "DIAMOND": 200
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
      "SILVER": 0.154,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.041,
      "MASTER": 0.018,
      "PLATINUM": 0.074,
      "GOLD": 0.109,
      "GRANDMASTER": 0.005,
      "BRONZE": 0.2,
      "IRON": 0.275,
      "NONE": 1
    },
    "leaderboardThresholds": [
      4467,
      1,
      999,
      13005,
      623,
      73321
    ]
  },
  {
    "id": 402204,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 140713,
      "CHALLENGER": 204383,
      "SILVER": 4000,
      "PLATINUM": 30000,
      "BRONZE": 1600,
      "IRON": 400,
      "MASTER": 96000,
      "GOLD": 12000,
      "DIAMOND": 55000
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
      "GRANDMASTER": 0,
      "IRON": 0.171,
      "NONE": 1,
      "MASTER": 0.001,
      "SILVER": 0.07,
      "DIAMOND": 0.003,
      "PLATINUM": 0.009,
      "BRONZE": 0.109,
      "GOLD": 0.03,
      "CHALLENGER": 0
    },
    "leaderboardThresholds": [
      540670,
      1,
      204383,
      469,
      140713,
      2339
    ]
  },
  {
    "id": 402205,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 20906,
      "CHALLENGER": 31036,
      "SILVER": 600,
      "PLATINUM": 4000,
      "BRONZE": 240,
      "IRON": 60,
      "MASTER": 14000,
      "GOLD": 1500,
      "DIAMOND": 8000
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
      "PLATINUM": 0.012,
      "IRON": 0.188,
      "GOLD": 0.041,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.122,
      "SILVER": 0.079,
      "DIAMOND": 0.003,
      "NONE": 1
    },
    "leaderboardThresholds": [
      166370,
      1,
      31036,
      440,
      20906,
      2196
    ]
  },
  {
    "id": 402202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 4020,
      "CHALLENGER": 5920,
      "SILVER": 150,
      "PLATINUM": 750,
      "BRONZE": 50,
      "IRON": 10,
      "MASTER": 2500,
      "GOLD": 300,
      "DIAMOND": 1400
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
      "GRANDMASTER": 0.003,
      "SILVER": 0.142,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.061,
      "IRON": 0.296,
      "BRONZE": 0.201,
      "MASTER": 0.011,
      "NONE": 1,
      "GOLD": 0.107,
      "DIAMOND": 0.032
    },
    "leaderboardThresholds": [
      27475,
      1,
      5920,
      8949,
      4020,
      44737
    ]
  },
  {
    "id": 402203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 4063,
      "CHALLENGER": 6356,
      "SILVER": 150,
      "PLATINUM": 750,
      "BRONZE": 50,
      "IRON": 10,
      "MASTER": 2500,
      "GOLD": 300,
      "DIAMOND": 1400
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
      "PLATINUM": 0.022,
      "IRON": 0.213,
      "GOLD": 0.055,
      "MASTER": 0.002,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.137,
      "SILVER": 0.086,
      "DIAMOND": 0.008,
      "NONE": 1
    },
    "leaderboardThresholds": [
      25099,
      1,
      6356,
      1867,
      4063,
      9327
    ]
  },
  {
    "id": 402200,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 960,
      "CHALLENGER": 1160,
      "SILVER": 75,
      "PLATINUM": 265,
      "BRONZE": 50,
      "IRON": 25,
      "MASTER": 800,
      "GOLD": 165,
      "DIAMOND": 480
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
      "SILVER": 0.174,
      "CHALLENGER": 0,
      "DIAMOND": 0.021,
      "MASTER": 0.002,
      "PLATINUM": 0.058,
      "GOLD": 0.102,
      "GRANDMASTER": 0,
      "BRONZE": 0.208,
      "IRON": 0.255,
      "NONE": 1
    },
    "leaderboardThresholds": [
      0,
      0,
      1000,
      1,
      940,
      6571
    ]
  },
  {
    "id": 402201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 154,
      "CHALLENGER": 235,
      "SILVER": 5,
      "PLATINUM": 25,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 100,
      "GOLD": 10,
      "DIAMOND": 50
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
      "PLATINUM": 0.022,
      "IRON": 0.183,
      "GOLD": 0.057,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.139,
      "SILVER": 0.09,
      "DIAMOND": 0.007,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1205,
      1,
      235,
      1077,
      154,
      5377
    ]
  },
  {
    "id": 103201,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 30,
      "DIAMOND": 150
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
      "GRANDMASTER": 0,
      "IRON": 0.283,
      "NONE": 1,
      "MASTER": 0.005,
      "SILVER": 0.146,
      "DIAMOND": 0.017,
      "PLATINUM": 0.044,
      "BRONZE": 0.214,
      "GOLD": 0.088,
      "CHALLENGER": 0
    }
  },
  {
    "id": 103200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 30,
      "PLATINUM": 175,
      "BRONZE": 20,
      "IRON": 10,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 280
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
      "SILVER": 0.329,
      "CHALLENGER": 0,
      "DIAMOND": 0.02,
      "MASTER": 0.005,
      "PLATINUM": 0.066,
      "GOLD": 0.187,
      "GRANDMASTER": 0,
      "BRONZE": 0.34,
      "IRON": 0.349,
      "NONE": 1
    }
  },
  {
    "id": 103203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 35,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 125,
      "GOLD": 15,
      "DIAMOND": 70
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
      "GRANDMASTER": 0,
      "IRON": 0.224,
      "NONE": 1,
      "MASTER": 0.007,
      "SILVER": 0.138,
      "DIAMOND": 0.02,
      "PLATINUM": 0.045,
      "BRONZE": 0.186,
      "GOLD": 0.083,
      "CHALLENGER": 0
    }
  },
  {
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0.263,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 402210,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3269,
      "CHALLENGER": 5077,
      "SILVER": 100,
      "PLATINUM": 600,
      "BRONZE": 35,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 200,
      "DIAMOND": 1350
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
      "PLATINUM": 0.072,
      "IRON": 0.292,
      "GOLD": 0.129,
      "MASTER": 0.022,
      "GRANDMASTER": 0.005,
      "CHALLENGER": 0.001,
      "BRONZE": 0.222,
      "SILVER": 0.165,
      "DIAMOND": 0.033,
      "NONE": 1
    },
    "leaderboardThresholds": [
      26053,
      1,
      5077,
      17305,
      3269,
      86520
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
      "PLATINUM": 0.286,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
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
      "PLATINUM": 0.05,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 402208,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1036,
      "CHALLENGER": 1713,
      "SILVER": 25,
      "PLATINUM": 180,
      "BRONZE": 10,
      "IRON": 3,
      "MASTER": 600,
      "GOLD": 65,
      "DIAMOND": 300
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.017,
      "BRONZE": 0.165,
      "GOLD": 0.076,
      "IRON": 0.226,
      "SILVER": 0.121,
      "MASTER": 0.005,
      "PLATINUM": 0.033
    },
    "leaderboardThresholds": [
      9463,
      1,
      1713,
      3936,
      1036,
      19675
    ]
  },
  {
    "id": 103206,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 18,
      "PLATINUM": 120,
      "BRONZE": 6,
      "IRON": 2,
      "MASTER": 420,
      "GOLD": 40,
      "DIAMOND": 225
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.013,
      "BRONZE": 0.185,
      "GOLD": 0.089,
      "IRON": 0.248,
      "SILVER": 0.129,
      "MASTER": 0.003,
      "PLATINUM": 0.036
    }
  },
  {
    "id": 402209,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3047,
      "CHALLENGER": 4648,
      "SILVER": 100,
      "PLATINUM": 600,
      "BRONZE": 35,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 200,
      "DIAMOND": 1350
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
      "PLATINUM": 0.058,
      "IRON": 0.285,
      "GOLD": 0.115,
      "MASTER": 0.013,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.211,
      "SILVER": 0.152,
      "DIAMOND": 0.022,
      "NONE": 1
    },
    "leaderboardThresholds": [
      26850,
      1,
      4648,
      10594,
      3047,
      52965
    ]
  },
  {
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
  {
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
  {
    "id": 201002,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 120,
      "CHALLENGER": 248,
      "SILVER": 3,
      "PLATINUM": 15,
      "BRONZE": 1,
      "MASTER": 50,
      "GOLD": 5,
      "DIAMOND": 30
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
      "PLATINUM": 0.03,
      "IRON": 0,
      "GOLD": 0.061,
      "MASTER": 0.009,
      "GRANDMASTER": 0.002,
      "CHALLENGER": 0,
      "BRONZE": 0.127,
      "SILVER": 0.079,
      "DIAMOND": 0.016,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2578,
      1,
      248,
      7156,
      120,
      35775
    ]
  },
  {
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
  {
    "id": 201001,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 271,
      "CHALLENGER": 427,
      "SILVER": 10,
      "PLATINUM": 60,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 15,
      "DIAMOND": 100
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
      "PLATINUM": 0.058,
      "IRON": 0.302,
      "GOLD": 0.131,
      "MASTER": 0.019,
      "GRANDMASTER": 0.005,
      "CHALLENGER": 0.001,
      "BRONZE": 0.192,
      "SILVER": 0.153,
      "DIAMOND": 0.034,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2720,
      1,
      427,
      14965,
      271,
      74818
    ]
  },
  {
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
  {
    "id": 201000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 30,
      "PLATINUM": 110,
      "BRONZE": 15,
      "IRON": 5,
      "MASTER": 300,
      "GOLD": 70,
      "DIAMOND": 200
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.066,
      "IRON": 0.316,
      "SILVER": 0.193,
      "NONE": 1,
      "BRONZE": 0.25,
      "DIAMOND": 0.027,
      "MASTER": 0.008,
      "GOLD": 0.112
    }
  },
  {
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
  {
    "id": 303400,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 150,
      "PLATINUM": 320,
      "BRONZE": 100,
      "IRON": 50,
      "MASTER": 950,
      "GOLD": 200,
      "DIAMOND": 580
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
      "SILVER": 0.058,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "MASTER": 0,
      "PLATINUM": 0.028,
      "GOLD": 0.048,
      "GRANDMASTER": 0,
      "BRONZE": 0.075,
      "IRON": 0.109,
      "NONE": 1
    }
  },
  {
    "id": 303401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 17,
      "CHALLENGER": 32,
      "PLATINUM": 3,
      "MASTER": 8,
      "GOLD": 1,
      "DIAMOND": 5
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
      "GRANDMASTER": 0.003,
      "SILVER": 0,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.031,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0.011,
      "NONE": 1,
      "GOLD": 0.068,
      "DIAMOND": 0.019
    },
    "leaderboardThresholds": [
      241,
      1,
      32,
      8568,
      17,
      42835
    ]
  },
  {
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
  {
    "id": 201004,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 80,
      "CHALLENGER": 129,
      "SILVER": 2,
      "PLATINUM": 12,
      "BRONZE": 1,
      "MASTER": 48,
      "GOLD": 5,
      "DIAMOND": 28
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
      "PLATINUM": 0.039,
      "IRON": 0,
      "GOLD": 0.081,
      "MASTER": 0.004,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.193,
      "SILVER": 0.139,
      "DIAMOND": 0.012,
      "NONE": 1
    },
    "leaderboardThresholds": [
      720,
      1,
      129,
      3259,
      80,
      16291
    ]
  },
  {
    "id": 303403,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 14,
      "CHALLENGER": 26,
      "PLATINUM": 3,
      "MASTER": 8,
      "GOLD": 1,
      "DIAMOND": 5
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
      "PLATINUM": 0.015,
      "IRON": 0,
      "GOLD": 0.045,
      "MASTER": 0.003,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0.008,
      "NONE": 1
    },
    "leaderboardThresholds": [
      209,
      1,
      26,
      2726,
      14,
      13622
    ]
  },
  {
    "id": 303412,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 22,
      "CHALLENGER": 45,
      "PLATINUM": 3,
      "MASTER": 8,
      "GOLD": 1,
      "DIAMOND": 5
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.005,
      "PLATINUM": 0.046,
      "IRON": 0,
      "SILVER": 0,
      "NONE": 1,
      "BRONZE": 0,
      "DIAMOND": 0.032,
      "MASTER": 0.021,
      "GOLD": 0.084
    },
    "leaderboardThresholds": [
      413,
      1,
      45,
      16684,
      22,
      83412
    ]
  },
  {
    "id": 401206,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 20,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 40,
      "GOLD": 10,
      "DIAMOND": 30
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
      "PLATINUM": 0,
      "IRON": 0.076,
      "GOLD": 0.002,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.025,
      "SILVER": 0.011,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 401204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 10,
      "DIAMOND": 20
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
      "PLATINUM": 0.001,
      "IRON": 0.072,
      "GOLD": 0.005,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.029,
      "SILVER": 0.016,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 401205,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 5,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 30,
      "GOLD": 10,
      "DIAMOND": 20
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
      "SILVER": 0.015,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0.001,
      "GOLD": 0.003,
      "GRANDMASTER": 0,
      "BRONZE": 0.03,
      "IRON": 0.084,
      "NONE": 1
    }
  },
  {
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
  {
    "id": 401202,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 12,
      "PLATINUM": 30,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 70,
      "GOLD": 20,
      "DIAMOND": 50
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
      "GRANDMASTER": 0,
      "IRON": 0.1,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.004,
      "DIAMOND": 0,
      "PLATINUM": 0,
      "BRONZE": 0.023,
      "GOLD": 0.001,
      "CHALLENGER": 0
    }
  },
  {
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
  {
    "id": 401203,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 12,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 65,
      "GOLD": 18,
      "DIAMOND": 45
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
      "GRANDMASTER": 0,
      "IRON": 0.098,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.003,
      "DIAMOND": 0,
      "PLATINUM": 0,
      "BRONZE": 0.022,
      "GOLD": 0.001,
      "CHALLENGER": 0
    }
  },
  {
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
  {
    "id": 401200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 160,
      "BRONZE": 30,
      "IRON": 15,
      "MASTER": 475,
      "GOLD": 100,
      "DIAMOND": 290
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
      "SILVER": 0.024,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.002,
      "GRANDMASTER": 0,
      "BRONZE": 0.05,
      "IRON": 0.098,
      "NONE": 1
    }
  },
  {
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
  {
    "id": 401201,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 10,
      "PLATINUM": 25,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 45,
      "GOLD": 15,
      "DIAMOND": 35
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
      "SILVER": 0.004,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.001,
      "GRANDMASTER": 0,
      "BRONZE": 0.016,
      "IRON": 0.089,
      "NONE": 1
    }
  },
  {
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
  {
    "id": 204103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 519,
      "CHALLENGER": 913,
      "SILVER": 12,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 25,
      "DIAMOND": 150
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
      "SILVER": 0.083,
      "CHALLENGER": 0,
      "DIAMOND": 0.012,
      "MASTER": 0.006,
      "PLATINUM": 0.025,
      "GOLD": 0.057,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.119,
      "IRON": 0.203,
      "NONE": 1
    },
    "leaderboardThresholds": [
      4442,
      1,
      913,
      4853,
      519,
      24257
    ]
  },
  {
    "id": 302400,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.023,
      "BRONZE": 0.224,
      "GOLD": 0.103,
      "IRON": 0.269,
      "SILVER": 0.173,
      "MASTER": 0,
      "PLATINUM": 0.056
    }
  },
  {
    "id": 204102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 604,
      "CHALLENGER": 1039,
      "SILVER": 15,
      "PLATINUM": 75,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 300,
      "GOLD": 25,
      "DIAMOND": 150
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
      "SILVER": 0.037,
      "CHALLENGER": 0,
      "DIAMOND": 0.006,
      "MASTER": 0.002,
      "PLATINUM": 0.012,
      "GOLD": 0.027,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.046,
      "IRON": 0.063,
      "NONE": 1
    },
    "leaderboardThresholds": [
      4069,
      1,
      1039,
      1760,
      604,
      8793
    ]
  },
  {
    "id": 302401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 750,
      "SILVER": 15,
      "PLATINUM": 90,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 35,
      "DIAMOND": 170
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
      "SILVER": 0.147,
      "CHALLENGER": 0,
      "DIAMOND": 0.024,
      "MASTER": 0.006,
      "PLATINUM": 0.054,
      "GOLD": 0.102,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.209,
      "IRON": 0.309,
      "NONE": 1
    },
    "leaderboardThresholds": [
      4581,
      1,
      749,
      1327,
      499,
      13479
    ]
  },
  {
    "id": 204101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 900,
      "CHALLENGER": 1500,
      "SILVER": 25,
      "PLATINUM": 150,
      "BRONZE": 10,
      "IRON": 3,
      "MASTER": 600,
      "GOLD": 50,
      "DIAMOND": 300
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
      "PLATINUM": 0.01,
      "IRON": 0.14,
      "GOLD": 0.031,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.086,
      "SILVER": 0.052,
      "DIAMOND": 0.003,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3574,
      1,
      1499,
      236,
      899,
      2483
    ]
  },
  {
    "id": 302402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1186,
      "CHALLENGER": 1841,
      "SILVER": 30,
      "PLATINUM": 200,
      "BRONZE": 12,
      "IRON": 3,
      "MASTER": 650,
      "GOLD": 75,
      "DIAMOND": 400
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
      "PLATINUM": 0.078,
      "IRON": 0.282,
      "GOLD": 0.126,
      "MASTER": 0.023,
      "GRANDMASTER": 0.006,
      "CHALLENGER": 0.001,
      "BRONZE": 0.213,
      "SILVER": 0.169,
      "DIAMOND": 0.044,
      "NONE": 1
    },
    "leaderboardThresholds": [
      7755,
      1,
      1841,
      18352,
      1186,
      91752
    ]
  },
  {
    "id": 204100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "PLATINUM": 0.022,
      "IRON": 0.142,
      "GOLD": 0.045,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.119,
      "SILVER": 0.084,
      "DIAMOND": 0.008,
      "NONE": 1
    }
  },
  {
    "id": 101201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 83252,
      "CHALLENGER": 133544,
      "SILVER": 2500,
      "PLATINUM": 15000,
      "BRONZE": 1000,
      "IRON": 200,
      "MASTER": 45000,
      "GOLD": 5000,
      "DIAMOND": 30000
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
      "SILVER": 0.105,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.022,
      "MASTER": 0.012,
      "PLATINUM": 0.044,
      "GOLD": 0.082,
      "GRANDMASTER": 0.003,
      "BRONZE": 0.134,
      "IRON": 0.189,
      "NONE": 1
    },
    "leaderboardThresholds": [
      545862,
      1,
      133544,
      9644,
      83252,
      48215
    ]
  },
  {
    "id": 101200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 140,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 400,
      "GOLD": 90,
      "DIAMOND": 250
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
      "PLATINUM": 0.061,
      "IRON": 0.201,
      "GOLD": 0.091,
      "MASTER": 0.008,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.153,
      "SILVER": 0.131,
      "DIAMOND": 0.025,
      "NONE": 1
    }
  },
  {
    "id": 101203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 7158,
      "CHALLENGER": 13433,
      "SILVER": 150,
      "PLATINUM": 600,
      "BRONZE": 50,
      "IRON": 15,
      "MASTER": 3000,
      "GOLD": 300,
      "DIAMOND": 1200
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
      "SILVER": 0.105,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.043,
      "MASTER": 0.019,
      "PLATINUM": 0.064,
      "GOLD": 0.084,
      "GRANDMASTER": 0.005,
      "BRONZE": 0.136,
      "IRON": 0.172,
      "NONE": 1
    },
    "leaderboardThresholds": [
      133044,
      1,
      13433,
      14812,
      7158,
      74056
    ]
  },
  {
    "id": 101202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 126700,
      "CHALLENGER": 189484,
      "SILVER": 3600,
      "PLATINUM": 21600,
      "BRONZE": 1200,
      "IRON": 300,
      "MASTER": 78000,
      "GOLD": 7200,
      "DIAMOND": 44000
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
      "SILVER": 0.107,
      "CHALLENGER": 0,
      "DIAMOND": 0.021,
      "MASTER": 0.007,
      "PLATINUM": 0.045,
      "GOLD": 0.084,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.143,
      "IRON": 0.194,
      "NONE": 1
    },
    "leaderboardThresholds": [
      902552,
      1,
      189484,
      5912,
      126700,
      29553
    ]
  },
  {
    "id": 101205,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 53,
      "CHALLENGER": 98,
      "SILVER": 2,
      "PLATINUM": 9,
      "BRONZE": 1,
      "MASTER": 30,
      "GOLD": 4,
      "DIAMOND": 18
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
      "PLATINUM": 0.021,
      "IRON": 0,
      "GOLD": 0.047,
      "MASTER": 0.003,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.109,
      "SILVER": 0.075,
      "DIAMOND": 0.008,
      "NONE": 1
    },
    "leaderboardThresholds": [
      8625,
      1,
      98,
      2454,
      53,
      12265
    ]
  },
  {
    "id": 101204,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 2250,
      "PLATINUM": 17000,
      "BRONZE": 900,
      "IRON": 225,
      "MASTER": 54000,
      "GOLD": 5000,
      "DIAMOND": 30000
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
      "PLATINUM": 0.042,
      "IRON": 0.19,
      "GOLD": 0.085,
      "MASTER": 0.01,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.141,
      "SILVER": 0.111,
      "DIAMOND": 0.024,
      "NONE": 1
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.14,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
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
      "SILVER": 0.064,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
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
  {
    "id": 203101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 106,
      "CHALLENGER": 208,
      "SILVER": 2,
      "PLATINUM": 12,
      "BRONZE": 1,
      "MASTER": 50,
      "GOLD": 5,
      "DIAMOND": 25
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
      "PLATINUM": 0.048,
      "IRON": 0,
      "GOLD": 0.083,
      "MASTER": 0.01,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.171,
      "SILVER": 0.128,
      "DIAMOND": 0.025,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3159,
      1,
      208,
      8236,
      106,
      41174
    ]
  },
  {
    "id": 203100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 145,
      "BRONZE": 20,
      "IRON": 5,
      "MASTER": 400,
      "GOLD": 95,
      "DIAMOND": 250
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
      "PLATINUM": 0.086,
      "IRON": 0.35,
      "GOLD": 0.117,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.248,
      "SILVER": 0.177,
      "DIAMOND": 0.024,
      "NONE": 1
    }
  },
  {
    "id": 203106,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 140,
      "CHALLENGER": 263,
      "SILVER": 3,
      "PLATINUM": 23,
      "BRONZE": 1,
      "MASTER": 73,
      "GOLD": 8,
      "DIAMOND": 43
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
      "PLATINUM": 0.04,
      "IRON": 0,
      "GOLD": 0.084,
      "MASTER": 0.009,
      "GRANDMASTER": 0.002,
      "CHALLENGER": 0,
      "BRONZE": 0.201,
      "SILVER": 0.132,
      "DIAMOND": 0.02,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2862,
      1,
      263,
      7185,
      140,
      35919
    ]
  },
  {
    "id": 203105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 48,
      "CHALLENGER": 90,
      "SILVER": 1,
      "PLATINUM": 8,
      "MASTER": 25,
      "GOLD": 3,
      "DIAMOND": 13
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
      "SILVER": 0.051,
      "CHALLENGER": 0,
      "DIAMOND": 0.003,
      "MASTER": 0.001,
      "PLATINUM": 0.006,
      "GOLD": 0.019,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    },
    "leaderboardThresholds": [
      528,
      1,
      90,
      845,
      48,
      4218
    ]
  },
  {
    "id": 203104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 150,
      "CHALLENGER": 300,
      "SILVER": 3,
      "PLATINUM": 20,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 75,
      "GOLD": 8,
      "DIAMOND": 40
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
      "GRANDMASTER": 0,
      "SILVER": 0.112,
      "CHALLENGER": 0,
      "PLATINUM": 0.026,
      "IRON": 0.179,
      "BRONZE": 0.134,
      "MASTER": 0.002,
      "NONE": 1,
      "GOLD": 0.062,
      "DIAMOND": 0.009
    },
    "leaderboardThresholds": [
      1152,
      1,
      299,
      235,
      149,
      3869
    ]
  },
  {
    "id": 202103,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 216,
      "CHALLENGER": 335,
      "SILVER": 5,
      "PLATINUM": 30,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 125,
      "GOLD": 10,
      "DIAMOND": 70
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
      "SILVER": 0.18,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.034,
      "MASTER": 0.014,
      "PLATINUM": 0.075,
      "GOLD": 0.137,
      "GRANDMASTER": 0.003,
      "BRONZE": 0.241,
      "IRON": 0.292,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1926,
      1,
      335,
      10865,
      216,
      54317
    ]
  },
  {
    "id": 202102,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 307,
      "CHALLENGER": 472,
      "SILVER": 8,
      "PLATINUM": 50,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 180,
      "GOLD": 20,
      "DIAMOND": 100
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
      "SILVER": 0.166,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.032,
      "MASTER": 0.012,
      "PLATINUM": 0.064,
      "GOLD": 0.114,
      "GRANDMASTER": 0.003,
      "BRONZE": 0.228,
      "IRON": 0.303,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2435,
      1,
      472,
      9630,
      307,
      48142
    ]
  },
  {
    "id": 202101,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 104,
      "CHALLENGER": 250,
      "SILVER": 4,
      "PLATINUM": 20,
      "BRONZE": 1,
      "MASTER": 60,
      "GOLD": 8,
      "DIAMOND": 35
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.012,
      "BRONZE": 0.188,
      "GOLD": 0.06,
      "IRON": 0,
      "SILVER": 0.096,
      "MASTER": 0.004,
      "PLATINUM": 0.025
    },
    "leaderboardThresholds": [
      1416,
      1,
      249,
      846,
      104,
      17201
    ]
  },
  {
    "id": 202100,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 135,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 240
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
      "PLATINUM": 0.073,
      "IRON": 0.314,
      "GOLD": 0.126,
      "MASTER": 0.009,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.253,
      "SILVER": 0.211,
      "DIAMOND": 0.029,
      "NONE": 1
    }
  },
  {
    "id": 202105,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 393,
      "CHALLENGER": 590,
      "SILVER": 10,
      "PLATINUM": 75,
      "BRONZE": 4,
      "IRON": 1,
      "MASTER": 240,
      "GOLD": 25,
      "DIAMOND": 135
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
      "SILVER": 0.163,
      "CHALLENGER": 0,
      "DIAMOND": 0.028,
      "MASTER": 0.01,
      "PLATINUM": 0.054,
      "GOLD": 0.112,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.219,
      "IRON": 0.313,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2538,
      1,
      590,
      7871,
      393,
      39348
    ]
  },
  {
    "id": 202104,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 830,
      "CHALLENGER": 1248,
      "SILVER": 20,
      "PLATINUM": 125,
      "BRONZE": 10,
      "IRON": 3,
      "MASTER": 500,
      "GOLD": 45,
      "DIAMOND": 300
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.003,
      "PLATINUM": 0.07,
      "IRON": 0.275,
      "SILVER": 0.165,
      "NONE": 1,
      "BRONZE": 0.204,
      "DIAMOND": 0.029,
      "MASTER": 0.012,
      "GOLD": 0.122
    },
    "leaderboardThresholds": [
      5510,
      1,
      1248,
      9532,
      830,
      47655
    ]
  },
  {
    "id": 103301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 3,
      "MASTER": 8,
      "GOLD": 2,
      "DIAMOND": 5
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
      "GRANDMASTER": 0,
      "IRON": 0,
      "NONE": 1,
      "MASTER": 0.009,
      "SILVER": 0.109,
      "DIAMOND": 0.022,
      "PLATINUM": 0.044,
      "BRONZE": 0,
      "GOLD": 0.065,
      "CHALLENGER": 0
    }
  },
  {
    "id": 103300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 325,
      "GOLD": 50,
      "DIAMOND": 140
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
      "PLATINUM": 0.049,
      "IRON": 0.273,
      "GOLD": 0.079,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.211,
      "SILVER": 0.14,
      "DIAMOND": 0.019,
      "NONE": 1
    }
  },
  {
    "id": 103303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 253,
      "CHALLENGER": 400,
      "SILVER": 7,
      "PLATINUM": 45,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 15,
      "DIAMOND": 80
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
      "SILVER": 0.16,
      "CHALLENGER": 0.001,
      "DIAMOND": 0.038,
      "MASTER": 0.014,
      "PLATINUM": 0.065,
      "GOLD": 0.121,
      "GRANDMASTER": 0.004,
      "BRONZE": 0.206,
      "IRON": 0.271,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1583,
      1,
      399,
      8949,
      253,
      56860
    ]
  },
  {
    "id": 103302,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 1,
      "PLATINUM": 6,
      "MASTER": 15,
      "GOLD": 3,
      "DIAMOND": 12
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
      "GOLD": 0.008,
      "GRANDMASTER": 0,
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
      "SILVER": 150,
      "PLATINUM": 385,
      "BRONZE": 100,
      "IRON": 50,
      "MASTER": 1050,
      "GOLD": 215,
      "DIAMOND": 620
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
      "GRANDMASTER": 0,
      "IRON": 0.003,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.001,
      "DIAMOND": 0,
      "PLATINUM": 0,
      "BRONZE": 0.001,
      "GOLD": 0,
      "CHALLENGER": 0
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0.005,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 303501,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.002,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 303502,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.001,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 303503,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0.002,
      "IRON": 0,
      "SILVER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
    "id": 303508,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.001,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 401302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 1000,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "SILVER": 0.04,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "MASTER": 0.013,
      "PLATINUM": 0.021,
      "GOLD": 0.028,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.057,
      "IRON": 0.101,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3986,
      1,
      999,
      2347,
      499,
      24843
    ]
  },
  {
    "id": 303509,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 401303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 1000,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "PLATINUM": 0.022,
      "IRON": 0.106,
      "SILVER": 0.042,
      "NONE": 1,
      "BRONZE": 0.06,
      "DIAMOND": 0.017,
      "MASTER": 0.013,
      "GOLD": 0.029
    },
    "leaderboardThresholds": [
      2926,
      1,
      999,
      1770,
      499,
      19661
    ]
  },
  {
    "id": 303510,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "BRONZE": 0,
      "GOLD": 0.001,
      "IRON": 0,
      "SILVER": 0,
      "MASTER": 0,
      "PLATINUM": 0
    }
  },
  {
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
  {
    "id": 303511,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.001,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 401301,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 1000,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "SILVER": 0.042,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "MASTER": 0.013,
      "PLATINUM": 0.022,
      "GOLD": 0.03,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.06,
      "IRON": 0.103,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3931,
      1,
      999,
      1810,
      499,
      19713
    ]
  },
  {
    "id": 303504,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0.002,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 303505,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0.002,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 303506,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0.001,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 303507,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
    "id": 303000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 90,
      "PLATINUM": 1030,
      "BRONZE": 60,
      "IRON": 30,
      "MASTER": 2950,
      "GOLD": 620,
      "DIAMOND": 1775
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0,
      "BRONZE": 0.121,
      "GOLD": 0.015,
      "IRON": 0.154,
      "SILVER": 0.102,
      "MASTER": 0,
      "PLATINUM": 0.002
    }
  },
  {
    "id": 303512,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "GRANDMASTER": 0,
      "SILVER": 0,
      "CHALLENGER": 0,
      "PLATINUM": 0,
      "IRON": 0,
      "BRONZE": 0,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0.001,
      "DIAMOND": 0
    }
  },
  {
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
  {
    "id": 303513,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 3,
      "MASTER": 10,
      "GOLD": 1,
      "DIAMOND": 6
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0.001,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 401304,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 1000,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "SILVER": 0.042,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "MASTER": 0.013,
      "PLATINUM": 0.022,
      "GOLD": 0.03,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.06,
      "IRON": 0.106,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3896,
      1,
      999,
      1256,
      499,
      17624
    ]
  },
  {
    "id": 401305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 500,
      "CHALLENGER": 1000,
      "SILVER": 50,
      "PLATINUM": 100,
      "BRONZE": 30,
      "IRON": 10,
      "MASTER": 150,
      "GOLD": 75,
      "DIAMOND": 125
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
      "SILVER": 0.041,
      "CHALLENGER": 0,
      "DIAMOND": 0.017,
      "MASTER": 0.013,
      "PLATINUM": 0.022,
      "GOLD": 0.029,
      "GRANDMASTER": 0.001,
      "BRONZE": 0.059,
      "IRON": 0.105,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3252,
      1,
      999,
      1670,
      499,
      19860
    ]
  },
  {
    "id": 601001,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 60,
      "CHALLENGER": 90,
      "SILVER": 6,
      "PLATINUM": 15,
      "BRONZE": 3,
      "IRON": 1,
      "MASTER": 40,
      "GOLD": 10,
      "DIAMOND": 25
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
      "SILVER": 0.012,
      "CHALLENGER": 0,
      "DIAMOND": 0.001,
      "MASTER": 0,
      "PLATINUM": 0.004,
      "GOLD": 0.007,
      "GRANDMASTER": 0,
      "BRONZE": 0.021,
      "IRON": 0.039,
      "NONE": 1
    }
  },
  {
    "id": 601000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 45,
      "PLATINUM": 145,
      "BRONZE": 20,
      "IRON": 5,
      "MASTER": 400,
      "GOLD": 95,
      "DIAMOND": 250
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.025,
      "IRON": 0.066,
      "SILVER": 0.044,
      "NONE": 1,
      "BRONZE": 0.055,
      "DIAMOND": 0.016,
      "MASTER": 0.009,
      "GOLD": 0.032
    }
  },
  {
    "id": 601003,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 65,
      "CHALLENGER": 100,
      "SILVER": 9,
      "PLATINUM": 20,
      "BRONZE": 5,
      "IRON": 2,
      "MASTER": 40,
      "GOLD": 14,
      "DIAMOND": 28
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "DIAMOND": 0.016,
      "BRONZE": 0.04,
      "GOLD": 0.025,
      "IRON": 0.053,
      "SILVER": 0.031,
      "MASTER": 0.012,
      "PLATINUM": 0.02
    }
  },
  {
    "id": 601002,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 200,
      "CHALLENGER": 300,
      "SILVER": 18,
      "PLATINUM": 60,
      "BRONZE": 10,
      "IRON": 4,
      "MASTER": 140,
      "GOLD": 32,
      "DIAMOND": 90
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
      "PLATINUM": 0.032,
      "IRON": 0.059,
      "GOLD": 0.04,
      "MASTER": 0.02,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.053,
      "SILVER": 0.047,
      "DIAMOND": 0.026,
      "NONE": 1
    }
  },
  {
    "id": 601005,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 50,
      "CHALLENGER": 70,
      "SILVER": 4,
      "PLATINUM": 14,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 35,
      "GOLD": 8,
      "DIAMOND": 22
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.015,
      "IRON": 0.052,
      "SILVER": 0.033,
      "NONE": 1,
      "BRONZE": 0.043,
      "DIAMOND": 0.01,
      "MASTER": 0.006,
      "GOLD": 0.023
    }
  },
  {
    "id": 601004,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 50,
      "CHALLENGER": 70,
      "SILVER": 5,
      "PLATINUM": 15,
      "BRONZE": 2,
      "MASTER": 36,
      "GOLD": 9,
      "DIAMOND": 24
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
      "PLATINUM": 0.02,
      "IRON": 0,
      "GOLD": 0.027,
      "MASTER": 0.01,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.047,
      "SILVER": 0.035,
      "DIAMOND": 0.014,
      "NONE": 1
    }
  },
  {
    "id": 601006,
    "state": "ENABLED",
    "endTimestamp": 1704992400000,
    "leaderboard": false,
    "thresholds": {
      "GRANDMASTER": 90,
      "CHALLENGER": 120,
      "SILVER": 12,
      "PLATINUM": 30,
      "BRONZE": 6,
      "IRON": 2,
      "MASTER": 65,
      "GOLD": 20,
      "DIAMOND": 45
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
      "GRANDMASTER": 0,
      "IRON": 0.046,
      "NONE": 1,
      "MASTER": 0.009,
      "SILVER": 0.025,
      "DIAMOND": 0.012,
      "PLATINUM": 0.016,
      "BRONZE": 0.033,
      "GOLD": 0.02,
      "CHALLENGER": 0
    }
  },
  {
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
  {
    "id": 204202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 504,
      "CHALLENGER": 759,
      "SILVER": 12,
      "PLATINUM": 75,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 300,
      "GOLD": 25,
      "DIAMOND": 150
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
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.003,
      "PLATINUM": 0.072,
      "IRON": 0.298,
      "SILVER": 0.162,
      "NONE": 1,
      "BRONZE": 0.206,
      "DIAMOND": 0.04,
      "MASTER": 0.014,
      "GOLD": 0.126
    },
    "leaderboardThresholds": [
      3086,
      1,
      759,
      10985,
      504,
      54918
    ]
  },
  {
    "id": 204201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 41,
      "CHALLENGER": 75,
      "SILVER": 2,
      "PLATINUM": 8,
      "BRONZE": 1,
      "MASTER": 25,
      "GOLD": 3,
      "DIAMOND": 15
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
      "GRANDMASTER": 0.001,
      "SILVER": 0.089,
      "CHALLENGER": 0,
      "PLATINUM": 0.025,
      "IRON": 0,
      "BRONZE": 0.138,
      "MASTER": 0.003,
      "NONE": 1,
      "GOLD": 0.067,
      "DIAMOND": 0.01
    },
    "leaderboardThresholds": [
      1764,
      1,
      74,
      2388,
      41,
      13423
    ]
  },
  {
    "id": 204200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 15,
      "IRON": 5,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0,
      "PLATINUM": 0.068,
      "IRON": 0.303,
      "SILVER": 0.164,
      "NONE": 1,
      "BRONZE": 0.201,
      "DIAMOND": 0.031,
      "MASTER": 0.004,
      "GOLD": 0.109
    }
  },
  {
    "id": 101301,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 15,
      "PLATINUM": 50,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 30,
      "DIAMOND": 100
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
      "GRANDMASTER": 0,
      "IRON": 0.172,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.066,
      "DIAMOND": 0,
      "PLATINUM": 0.013,
      "BRONZE": 0.108,
      "GOLD": 0.035,
      "CHALLENGER": 0
    }
  },
  {
    "id": 302000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 150,
      "PLATINUM": 560,
      "BRONZE": 95,
      "IRON": 45,
      "MASTER": 1700,
      "GOLD": 350,
      "DIAMOND": 1000
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
      "GRANDMASTER": 0,
      "SILVER": 0.2,
      "CHALLENGER": 0,
      "PLATINUM": 0.069,
      "IRON": 0.287,
      "BRONZE": 0.238,
      "MASTER": 0,
      "NONE": 1,
      "GOLD": 0.118,
      "DIAMOND": 0.021
    }
  },
  {
    "id": 101300,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 185,
      "BRONZE": 25,
      "IRON": 15,
      "MASTER": 550,
      "GOLD": 100,
      "DIAMOND": 340
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
      "PLATINUM": 0.045,
      "IRON": 0.169,
      "GOLD": 0.081,
      "MASTER": 0.001,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.149,
      "SILVER": 0.129,
      "DIAMOND": 0.017,
      "NONE": 1
    }
  },
  {
    "id": 101303,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 100,
      "CHALLENGER": 250,
      "SILVER": 3,
      "PLATINUM": 15,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 60,
      "GOLD": 5,
      "DIAMOND": 30
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
      "PLATINUM": 0.032,
      "IRON": 0.146,
      "GOLD": 0.072,
      "MASTER": 0.003,
      "GRANDMASTER": 0.001,
      "CHALLENGER": 0,
      "BRONZE": 0.11,
      "SILVER": 0.093,
      "DIAMOND": 0.013,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1061,
      1,
      249,
      119,
      99,
      9177
    ]
  },
  {
    "id": 101302,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 150,
      "CHALLENGER": 300,
      "SILVER": 4,
      "PLATINUM": 20,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 75,
      "GOLD": 8,
      "DIAMOND": 35
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.003,
      "PLATINUM": 0.051,
      "IRON": 0.16,
      "SILVER": 0.106,
      "NONE": 1,
      "BRONZE": 0.131,
      "DIAMOND": 0.033,
      "MASTER": 0.013,
      "GOLD": 0.082
    },
    "leaderboardThresholds": [
      2303,
      1,
      299,
      6169,
      150,
      51611
    ]
  },
  {
    "id": 101305,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 354,
      "CHALLENGER": 513,
      "SILVER": 10,
      "PLATINUM": 50,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 25,
      "DIAMOND": 125
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
      "PLATINUM": 0.007,
      "IRON": 0.137,
      "GOLD": 0.02,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.07,
      "SILVER": 0.046,
      "DIAMOND": 0.001,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1238,
      1,
      513,
      75,
      354,
      369
    ]
  },
  {
    "id": 101304,
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
      "NONE": 1,
      "CHALLENGER": 0.001,
      "GRANDMASTER": 0.005,
      "DIAMOND": 0.035,
      "BRONZE": 0,
      "GOLD": 0.11,
      "IRON": 0,
      "SILVER": 0,
      "MASTER": 0.019,
      "PLATINUM": 0.055
    },
    "leaderboardThresholds": [
      414,
      1,
      26,
      15038,
      15,
      75183
    ]
  },
  {
    "id": 101307,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 916,
      "CHALLENGER": 1442,
      "SILVER": 35,
      "PLATINUM": 150,
      "BRONZE": 15,
      "IRON": 5,
      "MASTER": 500,
      "GOLD": 70,
      "DIAMOND": 300
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
      "GRANDMASTER": 0.004,
      "IRON": 0.171,
      "NONE": 1,
      "MASTER": 0.014,
      "SILVER": 0.104,
      "DIAMOND": 0.029,
      "PLATINUM": 0.053,
      "BRONZE": 0.131,
      "GOLD": 0.08,
      "CHALLENGER": 0.001
    },
    "leaderboardThresholds": [
      7819,
      1,
      1442,
      11317,
      916,
      56578
    ]
  },
  {
    "id": 101306,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "PLATINUM": 1,
      "MASTER": 3,
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0.011,
      "MASTER": 0.005,
      "PLATINUM": 0.031,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
    }
  },
  {
    "id": 203203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 4643,
      "CHALLENGER": 6694,
      "SILVER": 100,
      "PLATINUM": 750,
      "BRONZE": 40,
      "IRON": 10,
      "MASTER": 3000,
      "GOLD": 250,
      "DIAMOND": 1500
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "DIAMOND": 0.032,
      "BRONZE": 0.209,
      "GOLD": 0.119,
      "IRON": 0.281,
      "SILVER": 0.164,
      "MASTER": 0.009,
      "PLATINUM": 0.064
    },
    "leaderboardThresholds": [
      23685,
      1,
      6694,
      6950,
      4643,
      34744
    ]
  },
  {
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
  {
    "id": 203201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 144,
      "CHALLENGER": 270,
      "SILVER": 3,
      "PLATINUM": 15,
      "BRONZE": 2,
      "IRON": 1,
      "MASTER": 65,
      "GOLD": 5,
      "DIAMOND": 30
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
      "PLATINUM": 0.06,
      "IRON": 0.18,
      "GOLD": 0.105,
      "MASTER": 0.015,
      "GRANDMASTER": 0.004,
      "CHALLENGER": 0.001,
      "BRONZE": 0.147,
      "SILVER": 0.128,
      "DIAMOND": 0.036,
      "NONE": 1
    },
    "leaderboardThresholds": [
      4765,
      1,
      270,
      12204,
      144,
      61016
    ]
  },
  {
    "id": 600011,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 2,
      "CHALLENGER": 3,
      "MASTER": 1
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
      "SILVER": 0,
      "CHALLENGER": 0,
      "DIAMOND": 0,
      "MASTER": 0,
      "PLATINUM": 0,
      "GOLD": 0,
      "GRANDMASTER": 0,
      "BRONZE": 0,
      "IRON": 0,
      "NONE": 1
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
      "SILVER": 25,
      "PLATINUM": 80,
      "BRONZE": 10,
      "IRON": 5,
      "MASTER": 250,
      "GOLD": 50,
      "DIAMOND": 140
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
      "GRANDMASTER": 0,
      "IRON": 0.285,
      "NONE": 1,
      "MASTER": 0,
      "SILVER": 0.159,
      "DIAMOND": 0.021,
      "PLATINUM": 0.067,
      "BRONZE": 0.226,
      "GOLD": 0.107,
      "CHALLENGER": 0
    }
  },
  {
    "id": 600010,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1,
      "CHALLENGER": 1,
      "MASTER": 1
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0,
      "SILVER": 0,
      "DIAMOND": 0,
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
      "PLATINUM": 0,
      "IRON": 0,
      "GOLD": 0,
      "MASTER": 0,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.212,
      "SILVER": 0,
      "DIAMOND": 0,
      "NONE": 1
    }
  },
  {
    "id": 301000,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 85,
      "PLATINUM": 450,
      "BRONZE": 40,
      "IRON": 20,
      "MASTER": 1400,
      "GOLD": 270,
      "DIAMOND": 900
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
      "PLATINUM": 0.107,
      "IRON": 0.321,
      "GOLD": 0.151,
      "MASTER": 0.002,
      "GRANDMASTER": 0,
      "CHALLENGER": 0,
      "BRONZE": 0.29,
      "SILVER": 0.244,
      "DIAMOND": 0.035,
      "NONE": 1
    }
  },
  {
    "id": 600006,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 561,
      "CHALLENGER": 775,
      "SILVER": 30,
      "PLATINUM": 125,
      "BRONZE": 15,
      "IRON": 10,
      "MASTER": 350,
      "GOLD": 65,
      "DIAMOND": 250
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
      "GRANDMASTER": 0.01,
      "SILVER": 0.347,
      "CHALLENGER": 0.002,
      "PLATINUM": 0.13,
      "IRON": 0.518,
      "BRONZE": 0.429,
      "MASTER": 0.039,
      "NONE": 1,
      "GOLD": 0.189,
      "DIAMOND": 0.068
    },
    "leaderboardThresholds": [
      3005,
      1,
      775,
      31326,
      561,
      156624
    ]
  },
  {
    "id": 202203,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 280,
      "CHALLENGER": 455,
      "SILVER": 10,
      "PLATINUM": 50,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 150,
      "GOLD": 15,
      "DIAMOND": 100
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
      "PLATINUM": 0.047,
      "IRON": 0.252,
      "GOLD": 0.103,
      "MASTER": 0.012,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.159,
      "SILVER": 0.123,
      "DIAMOND": 0.022,
      "NONE": 1
    },
    "leaderboardThresholds": [
      2729,
      1,
      455,
      9663,
      280,
      48308
    ]
  },
  {
    "id": 202202,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 635,
      "CHALLENGER": 962,
      "SILVER": 18,
      "PLATINUM": 120,
      "BRONZE": 6,
      "IRON": 3,
      "MASTER": 400,
      "GOLD": 36,
      "DIAMOND": 240
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
      "NONE": 1,
      "CHALLENGER": 0,
      "GRANDMASTER": 0.001,
      "DIAMOND": 0.008,
      "BRONZE": 0.165,
      "GOLD": 0.073,
      "IRON": 0.205,
      "SILVER": 0.107,
      "MASTER": 0.002,
      "PLATINUM": 0.024
    },
    "leaderboardThresholds": [
      4211,
      1,
      962,
      1982,
      635,
      9904
    ]
  },
  {
    "id": 202201,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 400,
      "CHALLENGER": 595,
      "SILVER": 10,
      "PLATINUM": 80,
      "BRONZE": 5,
      "IRON": 1,
      "MASTER": 250,
      "GOLD": 25,
      "DIAMOND": 160
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
      "SILVER": 0.116,
      "CHALLENGER": 0,
      "DIAMOND": 0.007,
      "MASTER": 0.002,
      "PLATINUM": 0.024,
      "GOLD": 0.072,
      "GRANDMASTER": 0,
      "BRONZE": 0.152,
      "IRON": 0.249,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3348,
      1,
      595,
      1742,
      399,
      7508
    ]
  },
  {
    "id": 202200,
    "state": "ENABLED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 40,
      "PLATINUM": 135,
      "BRONZE": 25,
      "IRON": 10,
      "MASTER": 400,
      "GOLD": 85,
      "DIAMOND": 240
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
      "GRANDMASTER": 0,
      "IRON": 0.266,
      "NONE": 1,
      "MASTER": 0.002,
      "SILVER": 0.163,
      "DIAMOND": 0.017,
      "PLATINUM": 0.052,
      "BRONZE": 0.199,
      "GOLD": 0.098,
      "CHALLENGER": 0
    }
  },
  {
    "id": 202205,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 59,
      "CHALLENGER": 107,
      "SILVER": 2,
      "PLATINUM": 10,
      "BRONZE": 1,
      "MASTER": 30,
      "GOLD": 5,
      "DIAMOND": 20
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
      "CHALLENGER": 0,
      "GRANDMASTER": 0.002,
      "DIAMOND": 0.012,
      "BRONZE": 0.128,
      "GOLD": 0.05,
      "IRON": 0,
      "SILVER": 0.089,
      "MASTER": 0.006,
      "PLATINUM": 0.027
    },
    "leaderboardThresholds": [
      892,
      1,
      107,
      5108,
      59,
      25535
    ]
  },
  {
    "id": 202204,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 828,
      "CHALLENGER": 1257,
      "SILVER": 20,
      "PLATINUM": 125,
      "BRONZE": 10,
      "IRON": 3,
      "MASTER": 480,
      "GOLD": 40,
      "DIAMOND": 275
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
      "GRANDMASTER": 0.003,
      "SILVER": 0.152,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.064,
      "IRON": 0.25,
      "BRONZE": 0.187,
      "MASTER": 0.013,
      "NONE": 1,
      "GOLD": 0.118,
      "DIAMOND": 0.031
    },
    "leaderboardThresholds": [
      6144,
      1,
      1257,
      10291,
      828,
      51447
    ]
  },
  {
    "id": 402406,
    "state": "ARCHIVED",
    "leaderboard": false,
    "thresholds": {
      "SILVER": 8,
      "PLATINUM": 16,
      "BRONZE": 4,
      "IRON": 2,
      "MASTER": 23,
      "GOLD": 12,
      "DIAMOND": 20
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
      "GRANDMASTER": 0,
      "SILVER": 0.153,
      "CHALLENGER": 0,
      "PLATINUM": 0.085,
      "IRON": 0.276,
      "BRONZE": 0.217,
      "MASTER": 0.045,
      "NONE": 1,
      "GOLD": 0.114,
      "DIAMOND": 0.061
    }
  },
  {
    "id": 402407,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 222468,
      "CHALLENGER": 350168,
      "SILVER": 7500,
      "PLATINUM": 37500,
      "BRONZE": 3000,
      "IRON": 750,
      "MASTER": 120000,
      "GOLD": 15000,
      "DIAMOND": 67500
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
      "PLATINUM": 0.067,
      "IRON": 0.271,
      "GOLD": 0.113,
      "MASTER": 0.019,
      "GRANDMASTER": 0.005,
      "CHALLENGER": 0.001,
      "BRONZE": 0.196,
      "SILVER": 0.148,
      "DIAMOND": 0.041,
      "NONE": 1
    },
    "leaderboardThresholds": [
      1414174,
      1,
      350168,
      15085,
      222468,
      75420
    ]
  },
  {
    "id": 402404,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 1473,
      "CHALLENGER": 2099,
      "SILVER": 40,
      "PLATINUM": 240,
      "BRONZE": 16,
      "IRON": 4,
      "MASTER": 960,
      "GOLD": 80,
      "DIAMOND": 520
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
      "SILVER": 0.16,
      "CHALLENGER": 0,
      "DIAMOND": 0.029,
      "MASTER": 0.009,
      "PLATINUM": 0.066,
      "GOLD": 0.123,
      "GRANDMASTER": 0.002,
      "BRONZE": 0.213,
      "IRON": 0.298,
      "NONE": 1
    },
    "leaderboardThresholds": [
      8108,
      1,
      2099,
      6900,
      1473,
      34492
    ]
  },
  {
    "id": 402402,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 24074,
      "CHALLENGER": 37554,
      "SILVER": 750,
      "PLATINUM": 3750,
      "BRONZE": 300,
      "IRON": 75,
      "MASTER": 15000,
      "GOLD": 1500,
      "DIAMOND": 9000
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
      "GRANDMASTER": 0.001,
      "SILVER": 0.132,
      "CHALLENGER": 0,
      "PLATINUM": 0.054,
      "IRON": 0.247,
      "BRONZE": 0.177,
      "MASTER": 0.006,
      "NONE": 1,
      "GOLD": 0.099,
      "DIAMOND": 0.017
    },
    "leaderboardThresholds": [
      155336,
      1,
      37554,
      4516,
      24074,
      22572
    ]
  },
  {
    "id": 402403,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 3575,
      "CHALLENGER": 6283,
      "SILVER": 100,
      "PLATINUM": 500,
      "BRONZE": 40,
      "IRON": 10,
      "MASTER": 1800,
      "GOLD": 200,
      "DIAMOND": 900
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
      "GRANDMASTER": 0.003,
      "SILVER": 0.105,
      "CHALLENGER": 0.001,
      "PLATINUM": 0.045,
      "IRON": 0.194,
      "BRONZE": 0.14,
      "MASTER": 0.011,
      "NONE": 1,
      "GOLD": 0.079,
      "DIAMOND": 0.027
    },
    "leaderboardThresholds": [
      40009,
      1,
      6283,
      8488,
      3575,
      42432
    ]
  },
  {
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
  {
    "id": 402401,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 4775,
      "CHALLENGER": 8099,
      "SILVER": 100,
      "PLATINUM": 600,
      "BRONZE": 50,
      "IRON": 10,
      "MASTER": 2400,
      "GOLD": 200,
      "DIAMOND": 1200
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
      "PLATINUM": 0.081,
      "IRON": 0.267,
      "GOLD": 0.132,
      "MASTER": 0.022,
      "GRANDMASTER": 0.005,
      "CHALLENGER": 0.001,
      "BRONZE": 0.195,
      "SILVER": 0.163,
      "DIAMOND": 0.049,
      "NONE": 1
    },
    "leaderboardThresholds": [
      72616,
      1,
      8099,
      17360,
      4775,
      86793
    ]
  },
  {
    "id": 402408,
    "state": "ENABLED",
    "leaderboard": true,
    "thresholds": {
      "GRANDMASTER": 504050,
      "CHALLENGER": 752150,
      "SILVER": 15000,
      "PLATINUM": 90000,
      "BRONZE": 5000,
      "IRON": 1250,
      "MASTER": 300000,
      "GOLD": 30000,
      "DIAMOND": 160000
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
      "PLATINUM": 0.064,
      "IRON": 0.29,
      "GOLD": 0.12,
      "MASTER": 0.014,
      "GRANDMASTER": 0.003,
      "CHALLENGER": 0.001,
      "BRONZE": 0.215,
      "SILVER": 0.156,
      "DIAMOND": 0.037,
      "NONE": 1
    },
    "leaderboardThresholds": [
      3894150,
      1,
      752150,
      11065,
      504050,
      55321
    ]
  },
  {
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

let puuidData = [];

let challengeCount = 0;

export async function getScore(region, name, tag, puuid) {

    console.log(region, name, tag, puuid);

  let mappedRegion = regionMap[region];

  let regionGroup = Constants.regionToRegionGroup(mappedRegion);

  regionGroup = regionGroup == 'SEA' ? 'ASIA' : regionGroup



    let resByRiotId;
    let response;


    try {
      response = await fetch(encodeURI(`https://${mappedRegion}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${apikey}`))
    } catch (error) {
      console.log(name, tag, regionGroup);
      console.log(error);
      return;
    }

    // const resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
    // const response = await fetch(encodeURI(`https://${mappedRegion}.api.riotgames.com/lol/challenges/v1/player-data/${resByRiotId.puuid}?api_key=${apikey}`))

    const data = await response.json();

    console.log(data);

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

              if ((challengeId > 5) && ((challenge.level == "CHALLENGER") || (challenge.level == "GRANDMASTER")) && (!isLegacy(challengeInfo)) && (challenge.position < mostNotableChallengePosition)) {
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

export async function getWhaleScore(region, name, tag, puuid) {

  let mappedRegion = regionMap[region];

    let response;

    try {
      response = await fetch(encodeURI(`https://${mappedRegion}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${apikey}`))
    } catch (error) {
      console.log(name);
      console.log(error);
      return;
    }


    const data = await response.json();


    let challenges = data.challenges;

    let emoteCount;
    let iconCount;
    let wardSkinCount;

    let skinCount;
    let ultimateCount; //510007
    let legendaryCount; //510009
    let epicCount; //510010
    let mythicCount; //510008
    let chromaCount; //510011

    let regularSkinCount;


    let score;


    try {
            challenges.forEach(challenge => {

              let challengeId = challenge.challengeId;

              let challengeInfo;

              challengeInfo = challengeData.find(challenge => {
                return challenge.id == challengeId;
              })


              if (challengeId == '510001') {
                skinCount = challenge.value;
              }


              if (challengeId == '510007') {
                ultimateCount = challenge.value;
              }

              if (challengeId == '510009') {
                legendaryCount = challenge.value;
              }

              if (challengeId == '510010') {
                epicCount = challenge.value;
              }

              if (challengeId == '510008') {
                mythicCount = challenge.value;
              }


              regularSkinCount = skinCount - ultimateCount - legendaryCount - epicCount - mythicCount;


              if (challengeId == '504004') {
                emoteCount = challenge.value;
              }

              if (challengeId == '504002') {
                iconCount = challenge.value;
              }

              if (challengeId == '504003') {
                wardSkinCount = challenge.value;
              }

              if (challengeId == '510011') {
                chromaCount = challenge.value;
              }



            })
          }catch(error) {
            console.log(data);
            console.log(error);
          }



    scoreArray.push({
      name: `${name}#${tag}`,
      region: region,
      skinCount: skinCount,
      ultimateCount: ultimateCount,
      legendaryCount: legendaryCount,
      epicCount: epicCount,
      mythicCount: mythicCount,
      regularSkinCount: regularSkinCount,
      emoteCount: emoteCount,
      iconCount: iconCount,
      wardSkinCount: wardSkinCount,
      chromaCount: chromaCount,
      score: (ultimateCount * 3250) + (legendaryCount * 1820) + (epicCount * 1350) + (mythicCount * 1350) + (regularSkinCount * 750) + 
             (emoteCount * 350) + (iconCount * 250) + (wardSkinCount * 640) + (chromaCount * 290)

    });



}


export async function getPuuid(region, name, tag) {

  let mappedRegion = regionMap[region];

  let regionGroup = Constants.regionToRegionGroup(mappedRegion);

  regionGroup = regionGroup == 'SEA' ? 'ASIA' : regionGroup



    let resByRiotId;
    let response;
    try {
      resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
      console.log(resByRiotId);
    } catch (error) {
      console.log(name, tag, regionGroup);
      console.log(error);
      return;
    }



    puuidData.push({
      name: name,
      tag: tag,
      region: region,
      puuid: resByRiotId.puuid
    });

}

export async function getAccountbyPuuid(puuid, region) {

    let mappedRegion = regionMap[region];


    let regionGroup = Constants.regionToRegionGroup(mappedRegion);

    let resByRiotId;
    let response;
    try {
        response = await fetch(encodeURI(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${apikey}`))

    } catch (error) {

      return;
    }

    const data = await response.json();

    console.log(data);


    puuidData.push({
      name: data.gameName,
      tag: data.tagLine,
      region: region
    });

}

app.get('/table', function (req, res) {

  data.forEach((item, index) => {

    setTimeout(()=> {
        console.log(item.region, item.name, item.tag, item.puuid);
        getScore(item.region, item.name, item.tag, item.puuid);
    }, 100 * (index + 1))

  })

  res.json({
    data: scoreArray,
    challengeCount: challengeCount
  });

})

app.get('/table2', function (req, res) {

  res.json({
    data: scoreArray,
    challengeCount: challengeCount
  });

})

app.get('/puuid', function (req, res) {

  data.forEach((item, index) => {


    let name = item.name;
    let tag =  item.tag;


    setTimeout(()=> {
        getPuuid(item.region, name, tag);
    }, 100 * (index + 1))


  })


})

app.get('/puuid2', function (req, res) {

  res.json({
    data: puuidData,
  });

})

app.get('/account', function (req, res) {

  data3.forEach((item, index) => {


    setTimeout(()=> {
        getAccountbyPuuid(item.puuid, item.region);
    }, 1000 * (index + 1))


  })


})

app.get('/account2', function (req, res) {

  res.json({
    data: puuidData,
  });

})



app.get('/whale', function (req, res) {

  data.forEach((item, index) => {
    console.log(item);



    setTimeout(()=> {
        getWhaleScore(item.region, item.name, item.tag, item.puuid);
    }, 100 * (index + 1))

  })

  res.json({
    data: scoreArray,
  });

})

app.get('/whale2', function (req, res) {


  res.json({
    data: scoreArray,
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

export async function getMasteryFull(name, tag, region, regionGroup, req, res) {



  try {

   const resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
   const response = await fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${resByRiotId.puuid}?api_key=${apikey}`)
   const data = await response.json();

    return res.json({
      error: false,
      data: data,
      id: resByRiotId.puuid
    });

  } catch (error) {

    if (error && error.body && error.status) {

      return res.json({
        error: true,
        errorDetail: error
      });

    } else {
      return res.json({
        error: true,
        errorDetail: error.message
      });
    }
  }

}

export async function getMasteryChallenges(name, tag, region, regionGroup, req, res) {


    try {

       const resByRiotId = (await api.Account.getByRiotId(name, tag, regionGroup)).response;
       const response = await fetch(`https://${region}.api.riotgames.com/lol/challenges/v1/player-data/${resByRiotId.puuid}?api_key=${apikey}`);
       const data = await response.json();

       let masterYourself = data.challenges.find(item => item.challengeId == 401104);
       let masterEnemy = data.challenges.find(item => item.challengeId == 401105);

       let masterTank = data.challenges.find(item => item.challengeId == 401206);
       let masterMarksman = data.challenges.find(item => item.challengeId == 401204);
       let masterSupport = data.challenges.find(item => item.challengeId == 401205);
       let masterFighter = data.challenges.find(item => item.challengeId == 401202);
       let masterMage = data.challenges.find(item => item.challengeId == 401203);
       let masterAssassin = data.challenges.find(item => item.challengeId == 401201);


        return res.json({
          error: false,
          data: {
            masterYourself: masterYourself,
            masterEnemy:masterEnemy, 
            masterMarksman : masterMarksman,
            masterSupport: masterSupport,
            masterFighter: masterFighter,
            masterMage: masterMage,
            masterAssassin: masterAssassin,
            masterTank: masterTank



          },
          id: resByRiotId.puuid
        });


    } catch (error) {

        console.log(error);

      return;
    }

}




app.get('/catch/:name/:tag/:region', function (req, res) {

  let name = req.params.name;
  let tag = req.params.tag;
  let region = req.params.region;

  let regionGroup = Constants.regionToRegionGroup(region);

  getMastery(name, tag, region, regionGroup, req, res);

})

app.get('/mastery/:name/:tag/:region', function (req, res) {

  let name = req.params.name;
  let tag = req.params.tag;
  let region = req.params.region;

  let regionGroup = Constants.regionToRegionGroup(region);

  getMasteryFull(name, tag, region, regionGroup, req, res);

})

app.get('/masterychallenges/:name/:tag/:region', function (req, res) {

  let name = req.params.name;
  let tag = req.params.tag;
  let region = req.params.region;

  let regionGroup = Constants.regionToRegionGroup(region);

  console.log(name, tag, region, regionGroup);

  getMasteryChallenges(name, tag, region, regionGroup, req, res);

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