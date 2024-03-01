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
            "name": "Kirin0630#所遇皆温柔",
            "region": "NA",
            "puuid": "U1WcaKD7g5ih5IkwKYoWtX-8t8rJEhz2ojSENgAOUUbonKXBnh1lWGVd8ZheQRS5evkL-YnK6G2a-w"
        },
        {
            "name": "Nguyễn Tuấn Hải#NTH",
            "region": "VN",
            "puuid": "ofAB9B7PEsWduTgJcI_SZQtW1hwCciZzVJkKJ6EIcQsv_MfORQkG_kmDTlFhpUiG4fIHOVpZYjcfKA"
        },
        {
            "name": "SeedRoxas#EUW",
            "region": "EUW",
            "puuid": "KIDl5jkHADI0WdZRvyfIAb5MM7ig18viA7Vzi9q3g1UmJ1cqXkM47N1_a6i0wPQ0qFo4fCGBr2X1hA"
        },
        {
            "name": "da xi gua#NA0",
            "region": "NA",
            "puuid": "5qZ4rvqRYvR-wuBOeKDITluxcZWGpn4ewfCPukf40sD3B-JLflVnGQeIFGeLxN4FF-mriK1P9D9KWA"
        },
        {
            "name": "Don Rigoni#Doni",
            "region": "PH",
            "puuid": "z0uJ-MyScmnhGK1TO0KUoYBPveOT85riojWh8IbXIxmX32BA1beblFQFADAJSoCT4ULJbiVex1bBvQ"
        },
        {
            "name": "Tantrum Desire#LAS",
            "region": "LAS",
            "puuid": "ewW9i1pUKSl6WouWulOXe6KluZU_xZbGVYq8J-ICTQPTqcgZ6DKuIX_g76ZrcA2MpbsxbOaZ4YLszg"
        },
        {
            "name": "UpperBlackVise#みさき美咲",
            "region": "NA",
            "puuid": "TE95jhGJGpCy7TuoZs9WHLVUdLJIsLpdRQcC4mvOZ6TLUlJcnRBkcfgshLoMK4wHK8JwsvsUee_gsQ"
        },
        {
            "name": "ptyyyy#NA1",
            "region": "NA",
            "puuid": "MyAHbx8u0kFLV4-96fhlYYIpWANroK745kvx177QfoqJUs4ixziEzUZeLGREU5EJvX_ViZaF1CAzhQ"
        },
        {
            "name": "항상 꿈에선 그대#KR1",
            "region": "KR",
            "puuid": "ZnWz06U2Yk0S9Diago09WoPJOgVsV3YzT7oStCK-hOxSDNTIrFYr6dgcDrlxThDgHzN4AKSrOZmgEw"
        },
        {
            "name": "ƒenril#LAN",
            "region": "LAN",
            "puuid": "vFMAjclLBmIa4fmB4XMv3DSwnV5caCqOE3S9kiAI_nudykQ2_pfwm43RxZItJwj1oyKvtgsDkIU58g"
        },
        {
            "name": "Sínister Bláde#EUW",
            "region": "EUW",
            "puuid": "_uNKOW4DN-zGBBxG0D6AOlVzG1jV7oc3FMP1_0ngT_SgBry1gfP4Qf2H8SyasfUMrh6F1r-uSn38LA"
        },
        {
            "name": "DrunkenBuster#EUW",
            "region": "EUW",
            "puuid": "Ge8PqxaWTXL1482vzYrqasr1AH9jF25-7-sNMNdRxhOb4K3Azbmgi_Gmmn1lk5A8cclsQnUzazy0gg"
        },
        {
            "name": "Michiru Kaioh#LAN",
            "region": "LAN",
            "puuid": "beZT0s_EjbZft4j62Crywbu8duRS2_9_jNF2CuGz6KEPcTIG3MvrqiDrRBZGRtuWQmzqBhh9tNmspA"
        },
        {
            "name": "이시니#1987",
            "region": "NA",
            "puuid": "-Eg6dFxyhxQJpm8bo4_t9nl-KeXPd3w8JoaB06hJDyjXbk6rmJSpo9e0r2SOsnKReOavikrarp5qSw"
        },
        {
            "name": "Smileyyyyy#EUW",
            "region": "EUW",
            "puuid": "gGOVY-YNCJgPYAWcoiLmnldsgNWIRrBlNmFLmpPSL6E3G6xNBUT6pkhO7tjRqZGSQpuP9olcL7-uAA"
        },
        {
            "name": "Shynce#EUW",
            "region": "EUW",
            "puuid": "W1lbdRrpE18YPybqnUUsIyHHQlB2v8GHuo-uqpagbiT2VjDuaCAnpK5qEDUez5gMq-6bCuUKk-CMNA"
        },
        {
            "name": "Dead Account#Perma",
            "region": "EUW",
            "puuid": "-gLzyM3dxVoYYxG6WdiHsdABDGOQUo4etT33jTsuSQVw42hfa7x0m1olxDoLrhvk52Otnr-QLbbidA"
        },
        {
            "name": "Алёночка#Kha",
            "region": "RU",
            "puuid": "0S5Ebacicz4NshMBbIDMkT16Jx1yX5jA7Vmdqnn-gGBeuKdYSBjeAp3xZCAYQENfH65A4gOnANmT5g"
        },
        {
            "name": "삼재는내친구#KR1",
            "region": "KR",
            "puuid": "a0lYFAxCphrzLcMf0biP_OicFHaLseqeTltRpCskdpdJ05Rh4YaAKx_KJ_O_V5ssLP2xgPiUuJb9Mg"
        },
        {
            "name": "이상혁#KR1",
            "region": "KR",
            "puuid": "f1T6LGE6hRGbZLPowpm_9gwvOd9SL3r2hwZOHlvJtjhfLO9EO4D_s3Pjir79vGu9ydesBtUkOKmfCg"
        },
        {
            "name": "Ewokcore#NA1",
            "region": "NA",
            "puuid": "bGB3IuS_zJbW4X9JdPRPV7YClZq3uluGx6K5AWxZRj-hHOdY3yOgHE65ZeLAzGu5IcH6nxwjdmuC2A"
        },
        {
            "name": "Amor#1027",
            "region": "BR",
            "puuid": "exlS9-ODSpuiPilPin6FG9QYibLoWS1lUW5u26trrK6uO8qi2exMDPL0MA49lvQHi6WY9Vil9romHQ"
        },
        {
            "name": "미 별#KR1",
            "region": "KR",
            "puuid": "35yppXO5Q2W2IDZdXMae1CkDantDHecVCacw3DYAoPESWpji1XArUFlGK_rgg4TAJS4kXJzFS5YkMw"
        },
        {
            "name": "Sixteendays#NA1",
            "region": "NA",
            "puuid": "4lDSAjrGlwMpMKha56w6Cndl5FsX0FidEioFQ4nq0dCK4lnng5d7hGS0lbbLksVy6PZEeMG4dHb_nQ"
        },
        {
            "name": "男童杀手#OωO",
            "region": "EUW",
            "puuid": "qYR_LNJAwJgpm_3mxXPHQ3BfyyQI6VA7Z5jX0HLAFd2sv6FePKad5vEa_2pEd90WE6NU0zIG_yYIOA"
        },
        {
            "name": "Beginning#NA1",
            "region": "NA",
            "puuid": "L5mCOZeDfWNRbzX7Q_1RzWFJZGVvD6pvZ-lKmVZKwDAj6tNwv3M9bS9mvnzLsChXiiNZRVVwNseXmg"
        },
        {
            "name": "Snowdrift#NA1",
            "region": "NA",
            "puuid": "pvTnh-Qb-FWSp0UMIGIvpnaOtmoRsMm4mJLShWI15stqoPChtv2LU0qt1A_euze39S4Q4lYApMH9Zw"
        },
        {
            "name": "Freyja#2024",
            "region": "BR",
            "puuid": "d_N6FXaT05z270aFvjTzw3Ir9Go6S-MqcJFh4b2cIBILAHiv8CBPddZIQsg7_kyZtoEFp4RmH8cadA"
        },
        {
            "name": "YOUR KARMA#NA1",
            "region": "NA",
            "puuid": "W1tkUrTvhPI4f02CcQ8hyx3PSGPS5Jj-IBIxFdytbEvJEyuPZWvXdmVXKm-w9Ajq67OlkqNN4epSZw"
        },
        {
            "name": "silverfire#NA1",
            "region": "NA",
            "puuid": "qRjdY5FeE2q167-Sc30TfQ74iz_gKLG8yOiaNx69BLNJ4zp8aLBiUS54cKHvR4YSSFSU9vk-bfOtkg"
        },
        {
            "name": "aszx#NA1",
            "region": "NA",
            "puuid": "BsDql2T3F9fIgilQts4mcahHGa3Hyey75S_HA7e6nRYU7C8mZO4VUeuFUQs-ag2wbiCKID-4mbg6OQ"
        },
        {
            "name": "Muuri#Muuri",
            "region": "BR",
            "puuid": "lPN5UWgt2ouXhaWog_XZxsgaAuN0fN9BR5LYQm51hoBkmdkirOnMMNwcSb5yV8SIGbDZfD4j4hUS7g"
        },
        {
            "name": "MeanDean#DEANO",
            "region": "NA",
            "puuid": "K5C-jkaoAXhalQf1P8P3mvaypC5qmAoqWqy1u_FYrh7hoHejboXo95s5uFk641IttDwdK8a1Hk-PbQ"
        },
        {
            "name": "吉光片羽#StarG",
            "region": "NA",
            "puuid": "n4lpzfuf7twH3ZaFIGw6SI8W1ahijJOyjhb_xrQJmpYKZUb1TMI4BTpfUZnPal9-f-LumI_wwC0Lfw"
        },
        {
            "name": "TheDarkQuazar#NA1",
            "region": "NA",
            "puuid": "d8LV3m_Uy_FY42EnZCPAmhgY_27kPjt3MuNLOholZ75RYORQ469sbO5AdH75q7L3GMaPJcr4wm6hdg"
        },
        {
            "name": "유니엔마#KR1",
            "region": "KR",
            "puuid": "aojDGyKgEmdqXUMyLYbpWw86kF313iSIaqGTfp8DZ_m_y9LGICuXcJjJj1tEHGvX2668VDZWgi-xYw"
        },
        {
            "name": "jae#awam",
            "region": "NA",
            "puuid": "vJuOyzKJT4OkOceMV87d5mboUyaIju8AQQ8BWc-tJnJ00j5uuEn0sCtZIL6zLziuzaqAC4eDOdKsKw"
        },
        {
            "name": "Nudelholz Ninja#666",
            "region": "EUW",
            "puuid": "lGetNdM749wHKQY1ABjFIEF4IXtieIP5iyIwJaMEAb68RttvZZrctSYXHJU1RG6-HYJE2cX_ce0R5w"
        },
        {
            "name": "Sïnister#NA1",
            "region": "NA",
            "puuid": "Bi-YyzNJ3rxHeO1IvitEpTCPw9WS_4vTMhnuxfVNADFVrdYhYT-6VFKOQKEkIrPo1tbSY9yrDkjrdg"
        },
        {
            "name": "GameBoyDenis98#EUW",
            "region": "EUW",
            "puuid": "3SFH4JPGpl6lPypbFjyPEgcmJkA6OV_v8pIS5C3Cill1QjkhPApmJbP4gPx2WTQNUhELhCkNbmdv3g"
        },
        {
            "name": "Stan1ey#NA1",
            "region": "NA",
            "puuid": "w8OrcfGhNUZOcKFZN1Pi0joRx8GFXin29up83fuv3qbMFvS0h8uPEUEjmow0DisrvsErXEnUqJ7DYQ"
        },
        {
            "name": "무좀균#KR1",
            "region": "KR",
            "puuid": "NHl_iC5qgUdbMNcY0GAsNN0eZ7h8wRl5ybdIsA6nJ4k6dKPJ4bgbDSDJYWgG7gzsmAihfOA929hA0A"
        },
        {
            "name": "Emperor of Light#UWU",
            "region": "EUW",
            "puuid": "KO7vJRTSTyDDETFf7XOoTanFiJiqVcI9SKxp_iVZFZlsN1t-ckFbvETr0JvaHfuJPR7uhlPWegS9NQ"
        },
        {
            "name": "성기사이즈리얼킹#0001",
            "region": "KR",
            "puuid": "l3BePTHGwsQUeqmN1c0YCcYMIbrSGvYfaoci-4dHyFywpEVa3394SMcB_5D1Tgkm1jWUFmT-9IzyJw"
        },
        {
            "name": "五个白桃#美少女战士",
            "region": "NA",
            "puuid": "TuTtLGM_7zrdDpETRM4lc_A5l-Pbph1LtkYXzdXhOxd_q9dRrAP9wQbNuAsIMReVLj4Ffy13obBKWA"
        },
        {
            "name": "Thornight#Noob",
            "region": "EUW",
            "puuid": "LXERAgX5l6SWI1ss5auUTZb8hdos5lgCvBLFpyTv6hREoHlyirQI_Tn1B7x0hJ4cJjMum30jxgvZvA"
        },
        {
            "name": "指図するな#JP1",
            "region": "JP",
            "puuid": "bLWjt1FMb_Mfv4NEcTcHEtGHCsBzED0ZEuia2yOED5hJHrB1bCF15OJeW2P3XEaq8oIPZ27T9w0MOg"
        },
        {
            "name": "Nlightened#EUNE",
            "region": "EUNE",
            "puuid": "AjfkxQt1tHgpmNVeT6ghJJuhMqRzYXxL4LHqnBuD2RQLXOJA3h2mjrUrxOCnUVYvIB0cI0fJDdBYqQ"
        },
        {
            "name": "berry#ベリー",
            "region": "NA",
            "puuid": "9ZOw14w8YUr5yguo8HAeSf6lSmrN2X3WNFNuBGDH4vi7ogRSAEGG0ylGmQKgE29y5yRaZ9D0oKL1QQ"
        },
        {
            "name": "ThatShiro#1337",
            "region": "EUW",
            "puuid": "PjOQPoopi-IFkHNvxSoEhldKsalL61hQWOlWW8McfRhXmtA3icwEEzvKlwcm_v9soD8x7G0WSfTNzQ"
        },
        {
            "name": "frog#Lilly",
            "region": "EUW",
            "puuid": "PHKNRTFGitkfsXnuGvpFAeyK-HFDFbtkt5l-ec7ufVmOug374r8SEqd6LPafVB9vAaCRESGMR1b06A"
        },
        {
            "name": "Fajerk#EUW",
            "region": "EUW",
            "puuid": "PBtW-bYU1e0lBbQsA0vg394iEGdVR8SQRifL0eYNNO1wGCI_ztNecyoaOjzas1tVSR-ygaNJtD2UCg"
        },
        {
            "name": "Omar Ali#NASUS",
            "region": "NA",
            "puuid": "oPECsli02nk8J0opp4yI1U3e2GWVYZ5qyN8HEeEIqDrLiEHw_U8S9z4dwuN1QMlztlMw0DnadEm2zg"
        },
        {
            "name": "양지킹#1111",
            "region": "KR",
            "puuid": "GgyEiKhjYNK5YIclLFBhv7gCiOhSxa2QOHjpxhrAYf8EzarmQrqzYr1I1io1HWB9S_Z8EZIa9SAPbQ"
        },
        {
            "name": "Syneth LightWing#EUW",
            "region": "EUW",
            "puuid": "ZthzLF_ldoOISNwVZKo3Ed32sjiT45-hagxHj4lfg2XPqJ83e_AE8VvNxpoCXquTI0dzcG1qxkMQ8g"
        },
        {
            "name": "Noelia GodAngel#Girl",
            "region": "LAS",
            "puuid": "WOFnANDKoMmpp9cAXIIprLjs0fU6r75irnIKoCWWlEt9JrchWLLmlKf4ZyZ9ny4EnrWQiwCy20ldBQ"
        },
        {
            "name": "Kelepetesonte#2137",
            "region": "EUW",
            "puuid": "bGon4vsDjr4ixODkMvqmT-LXfxOwjMcMPOCEuN5gWXxmQfz5XHTLL0-a052qtI-zh_y5JTICCnDPFw"
        },
        {
            "name": "apenas peitos#vogue",
            "region": "BR",
            "puuid": "4vlA_uAATCNYfLKmd13ijqGCeI5lMX3ENgaQwF8gu2ghhgIosOtAKMhKoBgbSI6IGEkgS0dIme7BqQ"
        },
        {
            "name": "ポピー#JP1",
            "region": "JP",
            "puuid": "9hM4uaq_MW88JOmr94jl4QJk475oL0OTYZODKlokE1YcNpCyDqd2zTaEC1sOxFzUV5nV9x0-VK2mzQ"
        },
        {
            "name": "冰鎮酸梅茶#Sky",
            "region": "NA",
            "puuid": "G8ToR9Lp8ZHY0OSZOUwbcz7A-Laf86Otld4PbOTWKdCn4YXafVARSJevROmnIFOxciJqVQtPHgD1sw"
        },
        {
            "name": "Beer#6666",
            "region": "VN",
            "puuid": "imdZP878fl57d9Yv47tNw7qEV_JXYn4RKQPZG27Kp13qv3Wwr3kKkkHqDshfAwPX-iOFq4FP6HJyFw"
        },
        {
            "name": "GarotoDePrograma#TIBR",
            "region": "BR",
            "puuid": "8MyOVT2ohdLMjKfDLYbKpYCiQBC3Qzp1nDAyJO4WdYkgCFlRU_A2i5jtPqnNGOSxdhHBvECOwlJSUA"
        },
        {
            "name": "Akai Zetsumei#Zetsu",
            "region": "NA",
            "puuid": "8sXOAR7BLnSpT_P2YrEKMlYaDpWRpDQtqgnPQNJcZErejwnvF_Ub5PTacyAFnZCdyHwZidPyKRObTw"
        },
        {
            "name": "ZcoBii#EUW",
            "region": "EUW",
            "puuid": "FXe3gS-mZYAMh1FBejHyOqezRcY_rcow7-9zQwcEv34tC0Er184f5Ce6BYAQzOu7xExPt2TnA_tUZw"
        },
        {
            "name": "thug#litty",
            "region": "RU",
            "puuid": "zjD28-eDYhmZRr6uO6-9xWgc0O2EUDTEad_oAz_DM2krwX4OBSJ8A_73t9MtHM3N78FggL6OJstQDw"
        },
        {
            "name": "Snøwie#UwU",
            "region": "NA",
            "puuid": "PZXE788xi19c7W7AHho0Gpf4bxnnP62D0o0tIEdGmttgzhwK_ogKifTprFOvMqeW5UyQia9h6A21xA"
        },
        {
            "name": "Noxian Assault#0001",
            "region": "NA",
            "puuid": "N_eoNM0nKg5EovPtorb77eEheGzWRK41TfG5g0Nc9vk56oVWLzGQyNJvVvXAveF4iqRt9lXnSqNFQQ"
        },
        {
            "name": "D4R1UZZZ#11111",
            "region": "LAN",
            "puuid": "TtaI-SN6iShluvB5iGshTAIy05SBcG-kEY1zswYWt_9gJFvp45fTeemgRlywzyLqHUdFfLUppEi6ew"
        },
        {
            "name": "海老臭い#JP1",
            "region": "JP",
            "puuid": "RbgjAybjsLajVqft9OPu0gITAwa9Coru4YNMc204zvTW6MVHSLvjJDLQhworyY_63KCPry4PplRr0Q"
        },
        {
            "name": "BaronMuchi#NA1",
            "region": "NA",
            "puuid": "UV6QWijvPSiAFnQeOfz1mt5VSkpNxTfLJBkrpgCLUDj6JodSSjyVB2BzXswG8Yeijt0nCynIE_N1lQ"
        },
        {
            "name": "Nint#Bat",
            "region": "BR",
            "puuid": "W6-FFOqTSx6TsG6ByZGf6A12rng2oQHGEa4CSCFVnDOaDHMDePNE2vs_0KsvcVZ2adaxSWjiHP2VFA"
        },
        {
            "name": "징크스#PENTA",
            "region": "KR",
            "puuid": "COSc1xDjQrIvegvkghlUfa35inhyX7v0k2_p6qDdaeCyZZOQ6cNbCaDuoj81Q9NK2I2HH734B8wS-w"
        },
        {
            "name": "zajączek#kekw",
            "region": "EUNE",
            "puuid": "-ZkpynXV4O7lPkQOJ_NbK_5YL1ZDBAPSt_wR3tTVNjvuQTzbXL9ZZCh0ppnUMmUjGGmSUSNILo0g8A"
        },
        {
            "name": "Lulú#BR1",
            "region": "BR",
            "puuid": "i_judNWDZNfwVQjOpZopoJaaKRXIXwKT4j2IvCgra4BLsCK4A4vjljMNdcd0ispgJpJozPqA3tRimw"
        },
        {
            "name": "Norgonomicon#EUW",
            "region": "EUW",
            "puuid": "LvM6xyRYX1ejdH-Mpxvi60UwTZ5nZmVSMSW_nmTk_M47EhHZxazzlsOK95tb0Netg8GfpF7EBuGbMA"
        },
        {
            "name": "小手冰凉#yyds",
            "region": "NA",
            "puuid": "rtiuA_t5cHeF3jlhPqfOn_WPMBEXqmaEEY2-P_riSlo2h59yts8CNL2ZyLahNuJOjrD4TdfnmIjDWA"
        },
        {
            "name": "Cole Palmer#CFC",
            "region": "EUNE",
            "puuid": "KsTzZOYkwKtuFixxX9gWywVmWmNq5gkjlLUKgE09QMgdQk8MqaQakUT-QkrBPGbLQeRl8o0aJfS3mg"
        },
        {
            "name": "妳不說真心話妳讓我怎麼為妳大冒險#閣愛妳一擺",
            "region": "TW",
            "puuid": "OVWP-OuEBTFp0B5nw15utj3aGGyUTGDbXfbxuP4seJvxiOajX-WekTZ9CcfPcDkMZe1OuLhz4F1bJA"
        },
        {
            "name": "간호학과 1학년#KR1",
            "region": "KR",
            "puuid": "oqpc2ZLzS4m1sxSm2ld_j9IObODutZGinwc9wNT0QV_zTuMYemolOItH-KeSMyYkLngCDQTViMM7fA"
        },
        {
            "name": "Elisza Kitsune#ilmbf",
            "region": "NA",
            "puuid": "JVv0sgBjwMQtVGdOQUSnQU7KSPeY7g0JvaDUUPIdjXKXWPgRY8E_ua4GtQgojfaxIzdv3gNBplij8w"
        },
        {
            "name": "迪士尼在逃猪猪#oink",
            "region": "NA",
            "puuid": "YCjx677rdl4t8UHCS4a33cpuFuN9GmXy8uNznvkPICZjaez5QQ2sWHxc7-DtyGvcL4myLiX1sIVbyg"
        },
        {
            "name": "Myth#0101",
            "region": "EUW",
            "puuid": "rjhiAD83FIFl2-Xnv8mUIdtvO3vggl_VtKZLN5EeXXX3Jw42VvYk5PC7qXuK5uqg4K1yuKICgHDGIA"
        },
        {
            "name": "Ali#12988",
            "region": "NA",
            "puuid": "4RcD_7Kv9qQo7jEStTgGObPLS_jKkwTPSty2H-loRHXmsqHDUStIJoeWQWSnxcRmXWVfrnEG2sdmQA"
        },
        {
            "name": "FallenSte#Kayn",
            "region": "EUW",
            "puuid": "4M7X9s4kOLcz37XgFqhZKLLZxNmP_9BtARCZqNjr7yfn-yZ3Eqh-cq63qjDOxcXmEp45XrHKAqeY_Q"
        },
        {
            "name": "Alecc#EUW",
            "region": "EUW",
            "puuid": "KqQxa0I3hz9jQHCoM98koPyfj6T-5ql8D9D_R-WBRFWSa5koREj8Oy3hzzF-fiY4Q3yQ6ryc0peZtQ"
        },
        {
            "name": "Mark Forster#Ultra",
            "region": "EUW",
            "puuid": "ZYS7XzIEtwaWbib1E6Q54emEDZcryi1aw5YH3JPZ9rID4CZk7ZggiJS93qsy6OiBz4HaQxtRLaLr3Q"
        },
        {
            "name": "sunshine4u#EUW",
            "region": "EUW",
            "puuid": "9iQD6De39BQMRzuo9-myzLlir--m-_i_kgzJi_FgQRCUR-Z-5HcsAKMj_vTmaOX4eP2ogUVD07Sy1A"
        },
        {
            "name": "DreamMaiden#DREAM",
            "region": "EUW",
            "puuid": "rPCSmi3fJQGISYghsvu1FEylGqGR3iKfs4h3h7ohdga1ZlRZVo77LMaTx-w3UWi4r17_c3DaO4Ci9Q"
        },
        {
            "name": "MVP#RU1",
            "region": "RU",
            "puuid": "sHwNIKwc4pHsMWiYMhV7ZRtCnvf7sLsGtMXgCqInyZJ7c7u4fSK6sWzvhpnHX1NqK7uQehG-AFxROA"
        },
        {
            "name": "syaruru#0323",
            "region": "JP",
            "puuid": "F5VflIFatL7zgntstDOjuqYLf_g2nWyktdAtCdsZgHgKEvHLTd0TLw_qc3Y14RbpTffxF5C8aZ_0Ig"
        },
        {
            "name": "13th day dream#terra",
            "region": "JP",
            "puuid": "ffusWPY7VbZxvPVVevdtc4Y8IdpjRLeBK_TnF2Gh1TZTsERsCxZormOnHwHnUjNKPVP7VKJBuMLleA"
        },
        {
            "name": "Das Biest#EUW",
            "region": "EUW",
            "puuid": "p1WEeFnowtGkDQDlUHxjQcdIctJESKBrOSZPLpPoV4t10Ck0nNDvykZvbSbA-1LZ90Lidx7ycgP5gQ"
        },
        {
            "name": "BoKaRnAgE#BR1",
            "region": "BR",
            "puuid": "K91Vis_chMNFSA5wkcXoTJsl1rlfTgOft6w9dgsq-PLM8fTqdeqqFohDjj7vUzGdxn2-yvT5L4Lf8w"
        },
        {
            "name": "まさゆき#JP1",
            "region": "JP",
            "puuid": "IfM_5lC16YVlh-fScq1TV7E12kXaAAg7wMdAclByFRZBXLnleuJi1ssWAKiL44xNoFdvcHMFlQoDrw"
        },
        {
            "name": "Xhyyyyy#2531",
            "region": "NA",
            "puuid": "r10JoPjovUu_yGuLyKNwOZE0zkEuGXCWMEzdsNvTU6oGhnZKDxVFnBKSvguxZBYX-LY04pyC_L3ydg"
        },
        {
            "name": "QiàoQiào#0205",
            "region": "NA",
            "puuid": "zvD1Yox51iOwAeKC7wmLUWecAaX13JR-_P-tuYrZo5pVOyDUEd5p_1z4FVMy3fP-FPYkWI5J4FM_-w"
        },
        {
            "name": "VTRST Spoofer#νтяsт",
            "region": "JP",
            "puuid": "k9ah0RuEhtbe0lintPyqWJom9V7w4vRID4ukhMIaR5Li356y1X0h2kPbi-DxtwH072C_R4ZVrnIzjA"
        },
        {
            "name": "Mimikyu#Oreo",
            "region": "NA",
            "puuid": "Cn-8F6b2aOLl-NtsDXcphy8Z8pZdrgDs8BXg00Aum__KB-mRs0iXsrr_a_TEJVFRVk1fpLFwNhh2SA"
        },
        {
            "name": "THOTTIE HUNTER#EUW",
            "region": "EUW",
            "puuid": "_DZY7A4Vec5FkQCGscXO6Turwi27mHPuXD19OcPqCnrDFBh0a_0SAmyDlX_gVgkTELyuBCXr-vuY4w"
        },
        {
            "name": "CNMniHonjin#JP1",
            "region": "JP",
            "puuid": "4BKITjMniCuH0r4deMXeNDdFEQIDV9za72EUOvnW5mYwk283XoikRpW-8xXBXLpOt9udOQ1GxwgCQg"
        },
        {
            "name": "Averwynn#NA1",
            "region": "NA",
            "puuid": "O4TCHKoiGcd-21Bm5dlT107RWeneHJW74AU8kaYbxmk9c4y4UrQl4cqR571rdu4LmkoCae_jaVauJQ"
        },
        {
            "name": "Shadowheart#zBG3z",
            "region": "BR",
            "puuid": "zAtbhunB7G7V88gsBTPBIRn0JsD2oqnsM0xa4YDwney0J2lZwthHTRbsPENxX6K2CbyqtJGfMqtYtQ"
        },
        {
            "name": "Fel#Fire",
            "region": "NA",
            "puuid": "gczWoc8YdxwsRTSChqdCLt69G5iOS4Pfv_XnGdfq1dSQYOhqWoLdE_Iv_K6RZzZC2DsM40mb8zoR1w"
        },
        {
            "name": "호 야#3223",
            "region": "KR",
            "puuid": "0of1y7QQ0NMChSTAd0UqzvQC1ScZXXu3faXTjPtS8DSafIY8Uy3FuoyX94NVSU3-xooDYZrXOEVxuA"
        },
        {
            "name": "Chiko#001",
            "region": "EUW",
            "puuid": "wqm0KlpHXrlV1UNe19IV-eml0c3b_w-lhdbqSpueA_glHCINjbp6v54VGl6dDZkzc96XcM4ULme1Tg"
        },
        {
            "name": "王袋先輩#JP1",
            "region": "JP",
            "puuid": "C_cnfowZyFo9Ma7pbvjDusZfPxRAulxazsuGh9c2bZaBQnQVpQ0faE_wZ7TGmZmWRq9MNtSos6poTQ"
        },
        {
            "name": "본 색#6982",
            "region": "KR",
            "puuid": "NGE1UjfhftdADXWOTNB2MquZqERj5FqXgMcD10KziDmQvktqkN47VEhrPh0gI0bM4Jt2bliHcfnItg"
        },
        {
            "name": "Rayceus#XTRAS",
            "region": "EUW",
            "puuid": "Bov5TyZ5SHIgmAIq9cU2rS33dIPKyta8Yk8t-KhVE9DLQLZHFWTD56bOFapgT6awVJznwhEve7lTOQ"
        },
        {
            "name": "T1 Rekkles#1337",
            "region": "EUW",
            "puuid": "T8eeSjnQv2ddsAT7hgS3K2-k6_qnl27BnTNUaacrth41sqz4NECv90Ggo79Q4qW9uLYF5mMupiOg7w"
        },
        {
            "name": "Todos Los Diass#KR1",
            "region": "KR",
            "puuid": "t1rnKsJxC3LIvLS3cwHgEnMwoFMZH2i50VR28OErkN7P7cc7Q5d4blSP8AjGJxO-PA2ZeDBFutluYw"
        },
        {
            "name": "Scrounge#000",
            "region": "NA",
            "puuid": "o3ile6sMk6MJDJVy8_f-0CMX_W_OOItuZJpZodJzvwRUFUJiov2t5RMZCRUz71fyKNX7m31stPlAZQ"
        },
        {
            "name": "Lalakas#JP1",
            "region": "JP",
            "puuid": "ZNSwjqeDc6I0X9l-GVNZV071_fjGxQqZGz1kWmIwbULQg4HbtNkFhtqTSSQYKBuGYJiqg_qL6xMtOw"
        },
        {
            "name": "古月方源#8338",
            "region": "VN",
            "puuid": "60b-DUZnpGDzhHiaUnrTXKhpVcHGUAuNLpjamAC2qTNmhexLpcewSBfTl_OR1XN0TKuTgvC_GO97kA"
        },
        {
            "name": "Lukwer#Kat",
            "region": "LAN",
            "puuid": "dUTfbxqEnBfU1LY4mmrpFlT8OibESyP-bpL_lkVyvfG_2nPbrhzY3jjjFQOm5C_fVxm9Gv1rdUG1Hw"
        },
        {
            "name": "きつねちゃん#JP1",
            "region": "JP",
            "puuid": "hFD40xsl7NP3U44PjLQxMJAcpa4KtCP0dqmJ0EwCCU6mULUDIMhxul7WjUvxvb0Ifnf_nr24c9pjVQ"
        },
        {
            "name": "Gullwing#EUW",
            "region": "EUW",
            "puuid": "nsPBaX2ECu2ogaS4ztUQftMqWujxozxiSq8Oa_-D1ANC2wYqIt_BJje9eAbEZbvlhr8XpBNKVez6SA"
        },
        {
            "name": "Pierce#BSP",
            "region": "NA",
            "puuid": "aY5moH8KO-SqgZ3QxMZWV1tRoOOkme2ciIh-isnCdDJ6fxwUyl-gyplS5PW1yH-qDfgvnJrFMjRDCA"
        },
        {
            "name": "BEE Gundrex#EUW",
            "region": "EUW",
            "puuid": "LU9t-_n5Mn-ztTXc7boP8QHMtF5yocVNLcwJ9kY88zg9reuuNN9mBo6khpJ-AwzgQLldXzOgBJVrEg"
        },
        {
            "name": "オイラはナナチだ#JP1",
            "region": "JP",
            "puuid": "39LQQSj8tUpS-yL73Fin6_Zaber69gY5ClDyAjZsw3_FbUKA_k4aNfJ986Td-nvNPFOl-krX7LnzEw"
        },
        {
            "name": "뽀얗고하얀복숭아#KR1",
            "region": "KR",
            "puuid": "s61PBLa52qp9FbvUSXolc0EUc_N2KMWNyJEX6Hu1Nm3jdKT6Ftr82qGFq5ujq1oXKkn7xHEZfQ2VMA"
        },
        {
            "name": "Z0BA#EUW",
            "region": "RU",
            "puuid": "7eEcUUfBWBxCpJTDr80-Qyt2ByjamW1hatA78cYW5s4S4p4J8uyg8HYOgsApWFnIDCvvyH7UHQITdw"
        },
        {
            "name": "Yeyasu#EUW",
            "region": "EUW",
            "puuid": "xGw3Tc3nPnBau1IA1RNo9v6Nd-xbXdx_Z3_FaWRRqZ_xFGhAYbSVCWyCLgPNIkhX5s23_pk8aJMioQ"
        },
        {
            "name": "Waty#Waty",
            "region": "EUW",
            "puuid": "vVl_0TUbN1haTpqXZ9h--4Hx1OMRD6DYBZcrp2F8y_jY2cVBKsd4H6z25gM8yRuakPTj6HnylJWt0Q"
        },
        {
            "name": "mOerwi#EUW",
            "region": "EUW",
            "puuid": "miGpfke_HLv3mjCMVCeS3Mz6e3HuETi-F8FDoIvpNk9H0d8KbQi7hjVP6IFRuj00cn4iBt0PYbaCTg"
        },
        {
            "name": "HeroRex#NA1",
            "region": "NA",
            "puuid": "SlKXlDGs7PwZ1WMGrVzkba-e4jlt4uf0zBj_IZsCk_2scqB9K7B8fmZXJOZr0NGgtuLQjiFZ-GFiVQ"
        },
        {
            "name": "StepBro#WYD",
            "region": "NA",
            "puuid": "5x7opDRuGG1D7ueY3_klnR7GhrV5V-t6Xm7h4bUUz5UqccBI828u70uESaHTZfUKNiESLZmm8LM_jQ"
        },
        {
            "name": "치맹타#KR1",
            "region": "KR",
            "puuid": "tYDz9hRG5jD09cSC2k3vecdgLOlXdoP_3sNenL37Fv2JL3XVqmo1_pQHPIoM0Xv2GlwQTH40pSt-MQ"
        },
        {
            "name": "111#EUNE",
            "region": "EUNE",
            "puuid": "IMHxWmy7M_cPskSSf3VqB0WqhOZ2RsJVNpC19WYLvk-3g-_rIwtNXB9XR0GSfieFcYvBRvwgs3cc-w"
        },
        {
            "name": "솬 띵#KR1",
            "region": "KR",
            "puuid": "U9B0XN26iuw_PHBAt8No74DUMrcFZbfNzAH8tzWBkqwOjhbkqiPMpWn88JARrFk3DLAzicTKVh9SQg"
        },
        {
            "name": "Countless Skies#EUW",
            "region": "EUW",
            "puuid": "vT7jPcMNYUT0zirNRyguJy5Wu7KveV16ea5AIv__q2B76IB3ZdGH_Mtg8ToB0k1CJb-DVoE6OYsPlw"
        },
        {
            "name": "こどもちゃん#JP1",
            "region": "JP",
            "puuid": "pFIkUWHLN3Dm-2sUBMPPIPpkbTS1Da5fNfXUt5gpmnBKi4x5gOqx1r8DgW2Cur4m7EjnJC7vT9QJPw"
        },
        {
            "name": "zvltzb#sci",
            "region": "LAN",
            "puuid": "-YUYfWmLvgMkYt5lJc8DR5TMN5tK9YUTuSesk_YqHk6dsuoyowY8vKLavPhBRQTYB2rkcjw3jgm_Iw"
        },
        {
            "name": "GIRLIRL#Yuumi",
            "region": "EUNE",
            "puuid": "f0cItHruNBXF3VILPUBMUDMygI-VF8z2W4nahhgCyFdjfLxv1nJUpyfjYfpjOqdBSJCsuuKFz3NU8g"
        },
        {
            "name": "튼튼짱짱만욱#튼튼짱짱",
            "region": "KR",
            "puuid": "OTkJXuBhqFe6meQzOwmXKBMgTf5VtcADUjJlbFUVsm32Oi5ViNGbKlPHQsshe5tWkEKXQHBm87YWBQ"
        },
        {
            "name": "小当当#B0226",
            "region": "EUW",
            "puuid": "rJYPsvbRbpF1vzSf8pOH38yrs8_JVRv9h4DiLeit4HkKkP4z6G3VWNc5NjVI3xqm4jvq4bkArw4JwQ"
        },
        {
            "name": "chrisny#1337",
            "region": "EUW",
            "puuid": "S805f4ga9lho8bRedyQ_J8oRKYAS1WVPDhczM2DKSyYyuMyDDnB6uv11oPND4VvyIXEoylTHbnK0Rw"
        },
        {
            "name": "Infinite Regress#KEKW",
            "region": "EUW",
            "puuid": "2fDjk5rjrzLml7pxhoVUOrvB83Fee53HeZiwkqmRdaYwOaR-yloRj5DUKm3R6RBOyh1Dnsh9Hj4Vbg"
        },
        {
            "name": "스낵이#1836",
            "region": "KR",
            "puuid": "u6tufghTG2R9InNzQymh_fEvOlQs5QsVTUgqAD-ThIjxroRNdqLPRJB9YKQ4SpAChzv2GLPqR0TPRw"
        },
        {
            "name": "BALENCIAGA#KR2",
            "region": "KR",
            "puuid": "cibCGWuA5unQtYs6ezuMAYe3hr5vYWtWva9hUFlQ82IquadMpIpjRTRjEJDdL-Y7iZ-NyONLeWyq3g"
        },
        {
            "name": "KVVT#EUW",
            "region": "EUW",
            "puuid": "iNXWhqEKNi2xkkTq9PvA4MvjxtOxIz6nGR8jbL_UTSJMCjSXccWMlUTNMsG1n2rYJpR4dL6N9JCU3g"
        },
        {
            "name": "Timeless#I944",
            "region": "BR",
            "puuid": "v-Uaat0kB0Y6QV6fQ6r8wZXkbYZorzlHZ2uWOKcdpAbHhS0iu6tj3pNGi5p-OMAm5pUDCZyyak8www"
        },
        {
            "name": "GLK#2710",
            "region": "BR",
            "puuid": "y8hfAK1Kp-2rtB4hbgS_cjkKmezwqd1GubsuF4uIIz1m-Y_8vln2oH8lLYhKrNREHnaxkS04eEa4ZQ"
        },
        {
            "name": "FizzedInVayne#NA1",
            "region": "NA",
            "puuid": "vgZR1meReSSqIlLxQklpefJ_YPTFrhHlN6mMgmNp6WPtopJaXogsJ5GeZZDxHzwmW3nqFwbNuDlScQ"
        },
        {
            "name": "DarkNinja411#Ninja",
            "region": "NA",
            "puuid": "LsDwQ3yZEXOIIEdxrLyjT7_Y2YOCQi-BQywZ06TemdvIdEGpjF-uP0-_XcLwP5HhyaH1uRbl-DMtjA"
        },
        {
            "name": "Dad Of CC#DOCC",
            "region": "NA",
            "puuid": "_tR7QDIbG2bhZUeP3HUnw13rbyYViAa9kq3dbq16chZPAcrRX_trb1UaGkQsn2m-mXk_o00aCKNN6A"
        },
        {
            "name": "Ducky Bucky#NA1",
            "region": "NA",
            "puuid": "q_v7zp_feI5aYBzEZwvEgqtUyr-amKTgNGRzTAxV-AMMFNXAfqvgjCN11v0BOu10AekX6YfYYqhAqA"
        },
        {
            "name": "특등사수물총새#KR1",
            "region": "KR",
            "puuid": "jzGJ7i0qeaPCc7L6Z8e0tvlPprULQHLEf1Ctq4-pu7-P0H3JDfihcRQilD2RV1jmh96FPTPa2CGW1A"
        },
        {
            "name": "두 부#doobu",
            "region": "KR",
            "puuid": "dU3ULb_Z30za3_EksBryTmVKXTyU7ld4tqd4uQ4RemegtC7kzYO6GcMiJ_39SKwK9XAhM6cfbbAPBw"
        },
        {
            "name": "Godzilla#965",
            "region": "EUW",
            "puuid": "P58hWSkXOfSJcWlnvNQ5oLBv7CUuuAVdapOHD8vYw98JVjeP4l21QETXEZT58Lq69R1UXzaJA8HF6w"
        },
        {
            "name": "탱글수현#탱글수현",
            "region": "KR",
            "puuid": "0Gmnk9V3vp8UPAciFyy0jFHFG_K6Ph1tA9gNGKlG98V16KrlVrrzbZxY9bFl4TR5y1Cp2LLZn-7-qQ"
        },
        {
            "name": "Reaper5599#Reaps",
            "region": "NA",
            "puuid": "oOrJiMG8s_-5Od43qJPJoc6GHLr5wgy6ib89gm6ugGvDy5woooraI1NUtVM7oCJS7F2_YSIiXrBOmg"
        },
        {
            "name": "FirstVictim#JP1",
            "region": "JP",
            "puuid": "Qxm9hNPFAHvSOFeHYig8bx7fkzY-8naps7dFAwqww4x_JPBFp0PAetOQJQKRX9xShxvgup4d8duv4w"
        },
        {
            "name": "Tyrranoid2410#EUW",
            "region": "EUW",
            "puuid": "HhR4J692YBjlE7GTITYNuk56Dff-GNP5sYG40gJmoKpWHyliQ-P5fOyQpEgwY7tSgMRAAkzJ7RS6GA"
        },
        {
            "name": "승 용#KR1",
            "region": "KR",
            "puuid": "m5_Sod9nDaPkNoxeCLkr2lHNmuIZNNuEi8PUJmvWMK0OwdJw57I6G-ebIyOWU-J9yfuWAaWc92CU_A"
        },
        {
            "name": "Zan#6523",
            "region": "NA",
            "puuid": "L5fHJO1HGC1qQMO2of8pG4OPS6rXK6PvrVwr9zHR37mol7kJPqzw0IYfJX-2LYRyIJ_mBVdePY-7Vg"
        },
        {
            "name": "BlackDizzle#NA1",
            "region": "NA",
            "puuid": "5wAy7wehjkYnrEyx7lLc9I0ChP00Kj1bQnfi4Z5Xu4GHO_Bsm9zPby46OVD6wXPW7J_sewGv5qj5ag"
        },
        {
            "name": "Zyrka#owo",
            "region": "EUNE",
            "puuid": "pBw_iRSr49XCZWbm0kdd4NMQSc9QWgHFdRdoRmA9jlVf1S5ChnrZHPe45LHjaS5Jx_ch3VX63-rUNQ"
        },
        {
            "name": "RedRex#KING",
            "region": "EUNE",
            "puuid": "YCMBaLvOySfyyUBfAHSJ1Sl84tzfXImnZvmJ7Bf5KPX-0iLhKTKIhQud3MQ6twt7LYtwIBcWxdbReg"
        },
        {
            "name": "Reality#EUNE",
            "region": "EUNE",
            "puuid": "nSNomTepwu27k52y48wFzBC76a99ACIGj98DDMOqO__1nU4ymPVJTMAepVmOzkMjCgCk29wspD44xg"
        },
        {
            "name": "Roserub#EUW",
            "region": "EUW",
            "puuid": "_vU3LDHNtaagDR2DLMczFl_6h8PTUkU1w_hxlBJPLyOlae3KFP-Uy1O-Jm35VfdpDZwoua6oDQ5Hpw"
        },
        {
            "name": "Panda#0309",
            "region": "NA",
            "puuid": "7xoFYLOk7hq5W2S9VXPbQmUM-1ka8UxXygKLN-E6EJflFI1gDxTT8RgrTXU86XGUhND9Hs6LcPz26A"
        },
        {
            "name": "Archtarius#00000",
            "region": "TR",
            "puuid": "aY7ypAJERhXqTOE3Mbk1Lw-kfBLSb11VYCljtqiiMMdeQnnVf3gG3rp4wzRNjwmHrwU_RyH3-57rOA"
        },
        {
            "name": "퍼플색돼지#PIG",
            "region": "KR",
            "puuid": "Kaj5qtseZikg5PGKtZdzjCcrYyWXfRcnVHi0ASJSHDkW0aeH3hMUzLa1ebhbRvj-VgLLCKdV_upclA"
        },
        {
            "name": "Vendo Bolo#bolo",
            "region": "BR",
            "puuid": "GoVh_gtOZvof4vDjFHgrGwSLYMWMBbQfrHF42h0qAzMpO7UiKS6GkFQhL6vxpOz6gqwhe3uaSNmdOQ"
        },
        {
            "name": "Zoe#Tommy",
            "region": "BR",
            "puuid": "EBcEZQ-x5RA2YYOcihBL8zbQ0settpPeOgZM9iROxTgiE6lSXbgG19NpD-X0q3CegnNzcPo9gWLduA"
        },
        {
            "name": "Reasum#Xia",
            "region": "NA",
            "puuid": "7PDqVf4D6Ns-zxoHNYdmKbZ3hd0FPICTmoB9BVtOPQlBXTPNZb6RsCq8q6K6dN0WYewC2KdEv1RmJA"
        },
        {
            "name": "最好的老婆#1603",
            "region": "EUW",
            "puuid": "gvdcRgsv-t7_TP-X6CJzOKUG5pAFvsGFCDwmtlWtg6HCOKWCle3Gq6zLpGwdgksIoDnBcNsBEG7bAg"
        },
        {
            "name": "Robo#RXTN",
            "region": "NA",
            "puuid": "BywJ48j2wKSFukfIDBI42mL6ORAJvSEJ5_72qM5nmBbySY-yrxkZEEtjhYwkbzvO7GsAbSLIOHqHHQ"
        },
        {
            "name": "Smolder#Oreo",
            "region": "NA",
            "puuid": "zaiQDaU2A0AnNTyB1D9T1Mg6F23DtRN3Y0tN76zVqqZd5COc5waczejByQlu_909G9Ew-so4X94ncw"
        },
        {
            "name": "Gowtherμ#EUW",
            "region": "EUW",
            "puuid": "lk_CQ39Qjk6vluB_v7Bh6heALssOVLYuAAxviwmI6pWdVyykDKG5lcwkziOdoXyXjU37o8nIVIovxw"
        },
        {
            "name": "Ðªmøń#EUW",
            "region": "EUW",
            "puuid": "_Fzst1J1f2z284S2lZRxvMsix0uP4UeQlEOiunJSttzayJtkrc2PkXYNmievEN9l5ZvPsxZL7EyiXA"
        },
        {
            "name": "3BM#EUW",
            "region": "TR",
            "puuid": "rWsZoYzoumjhHaHZBzWR1wZBeWJQM_JX-vVwj1BdsGyFVyAX58Jqf19M5NVmBn3irk2NdK0gFoYJSg"
        },
        {
            "name": "Archonit#EUNE",
            "region": "EUNE",
            "puuid": "yR21KdAMWl3RLQnTNVW_yULVxrRScSYEJcAmgzhkuNCcCzltDx4D61Py5cPSC21ZB-NbHi7DTzm9QA"
        },
        {
            "name": "RATouille#COOK",
            "region": "EUW",
            "puuid": "7JanlZZUYqiDkqVOe3OQ9C66yahvviVbjJmKHSE3nfO3Dcz90Ci_AodUzeXowqPtdCe1eDeNXHxCEA"
        },
        {
            "name": "Shayden#1337",
            "region": "NA",
            "puuid": "8Kj6-fc5wiF4NMwE9ri5u3ueDnVx9mpNG0yGv8iDfBF02Pb3rpIJ0kOsWe2W98RiwKAUfoxOyrPQCg"
        },
        {
            "name": "えまたそ#飲酒LoL",
            "region": "JP",
            "puuid": "vnKGRSYmhqJ4txeF87Tg2peKEy06rN4XGU2G4BhCrUcrp2vAdNv7zdXL1yYcR07gX2TqX3vzcgHrCA"
        },
        {
            "name": "群馬県産Teemo#JP1",
            "region": "JP",
            "puuid": "-6P2mRoxzAxJqCrdzFAU1YQQjfoZQRqaCtWiTj8pxYHl-2DJRU1GfdvAOwyKUTA4w9Wv90nTBKJSUQ"
        },
        {
            "name": "Keltril#EUW",
            "region": "EUW",
            "puuid": "KGr1LQIufimfC1tL7rFFoKwXfR3iOsY_xEXQuFT0tHfQIbDpw2b1TCAcUXme4zKVip3MXo3Xw4JlOg"
        },
        {
            "name": "15레벨#KR1",
            "region": "KR",
            "puuid": "flko4nN67QYshC7xjop7uAu440yjpTeG42hv_oXRsgJfAy7tLjzhkRYvl5GlrpI-7yESqSzCZLQg6A"
        },
        {
            "name": "탐 나 는 남 자#KR74",
            "region": "KR",
            "puuid": "jDOiVQXkaUCHzuYv-DzbEbHhJbkQ8hrqSEk4c7y5ic_hN_LXXBXPlg-iJOH3A6n57x5m6WuS6huRxA"
        },
        {
            "name": "Rhädámanthys#Nocti",
            "region": "BR",
            "puuid": "Btd3Rrnxe5XNoTdj6J0uSNPLZpgikID9Aae_S2aix3ek54u2UReezOmwjJT2jQ10mdu1-4YOqJ39dA"
        },
        {
            "name": "Alicante#BR1",
            "region": "BR",
            "puuid": "EZzUeBFAbsewjq-iqdL94ZKDl15E3A3Yh3ZA5JTTDEJFFVWMEERPPlQPYhQv-2H7Nuo6aPNFwjgaoA"
        },
        {
            "name": "Zepshun#Shaco",
            "region": "NA",
            "puuid": "fTaSljv_4_SC8TgGljlQcw_sZwO4jzb_6xJEH6pN27CPdmaBVmzC8C9pzmN4a4qRRDvmI0CNKQd4NQ"
        },
        {
            "name": "Helghans templar#NA1",
            "region": "NA",
            "puuid": "U97Nc5NgEjYVnWIB2w054adxVn68Lb0b9vVLHzhqsD2fEAlbrBoyxc-6Q2eFuRwchnf0xgLXV5KdBA"
        },
        {
            "name": "Hugh Jasol#Orbit",
            "region": "EUW",
            "puuid": "r8_8i7hzWMM81SOYm1MpkVh6NFR0d0ZuvoHaLkwHnevSJVcWkQbpUWKSXtLme2Sj2V8ve7gPtXNVtw"
        },
        {
            "name": "Sweet#EUW",
            "region": "EUW",
            "puuid": "DhZi57qgd31OHoSfgku_kWC5lxACq9-kNAZ4nP_wcTohOxbsWO5BAZGk8Gxnn8lYhQ_Pz2YKHbHCdw"
        },
        {
            "name": "XIII Garri XII#EUW",
            "region": "EUW",
            "puuid": "87LJEh-i0LDol-0LWitrcP5KsVCdXI2bGflHgXzO0vthhbF_ILlIDfWvbtNISLlN6ZAl56aMuH3H9w"
        },
        {
            "name": "민등민등#KR1",
            "region": "KR",
            "puuid": "C1X8whlC19ZcDYZNymZAbpdgYDPR3xHTtgW4gCWVW6Z94fYJYl1ojzf9spgd4rrOxWSxv0cKI9xc1w"
        },
        {
            "name": "Tío#Kofi",
            "region": "VN",
            "puuid": "Zg6_7QKy-uYV_M-_xHZYMCorBVQ_mAomoSYZcpCFmaYXh1H8RCxE68lOR0RUBT3Yod-LimSfw6q4lg"
        },
        {
            "name": "FG Nyah#EUW",
            "region": "EUW",
            "puuid": "WqoLmtxB4KAwXDlU7MzvswFnIqe8gS2obhIY2U9Bb0qZKvXA7d8gqPKN5W0gmhYCQA9orZ7ZjVpWsA"
        },
        {
            "name": "Lotus#ADC",
            "region": "EUW",
            "puuid": "aWRxADbNdVGROThzgwBkPKHO0lih23QjYetDHTcs6qdhe3qgvZjRj0oWZEYKnLbPvJNeTv37b0wx2Q"
        },
        {
            "name": "Myzery#55555",
            "region": "EUNE",
            "puuid": "amfPK6JrUbgZLT0h22qFFDdIH-hpIoxkaQQ-3ULMFD1F20mIl7h616u6OHpACXKUI_iS6S10eO2xmw"
        },
        {
            "name": "鬼畜先輩#JP1",
            "region": "JP",
            "puuid": "OxP34zgzw8Kp58Fwe9t22QrkzF4yg7H9Y00l1hjAxXxeXDZLin7RyPLr1q47fIZeRDODl1L1FSeSNA"
        },
        {
            "name": "FLX Trazx#TRAZX",
            "region": "LAN",
            "puuid": "RQTQVf-OCwPqNe3qmlzcprxh76mK90heeA4U80o7ntl54mUMcCKs3CZByrY5nkEhMv6xbs_EF0356g"
        },
        {
            "name": "zibi#smile",
            "region": "NA",
            "puuid": "o0XMSSfpN2ovoAL2TI9DX1xA-gMyT1m1FU_4zYMQ_AszEINe-VwhJrqr3FCa0Nvs44MIH_x7wVd9pA"
        },
        {
            "name": "acedia#5020",
            "region": "EUW",
            "puuid": "-g211SKiOUo1mdbEq8i1_bClGgXKtdvZk19bpKAqjXvJQUHFlQ-1AKQ268xmsn8KanlGjlwJHs26Nw"
        },
        {
            "name": "Demon#Lust",
            "region": "NA",
            "puuid": "plXLbys-8fU52KPRgqCheudRJn7VFbXUHUklMU_6rA2MF_cBt3Xxw09QncngWKm8g2EAtR4QbuPiIg"
        },
        {
            "name": "1989#luna",
            "region": "BR",
            "puuid": "RMqzpSbo5HG2l9i7bkPUHlxVQVX7icZZMlzYIWZottmAn9o2CwkFv-uWRLg5t-fBADtBkno6k9dM6A"
        },
        {
            "name": "Kalthrak#EUW",
            "region": "EUW",
            "puuid": "LeAlMkuRS7fta7oohVmcYN-d_Z4xYs_91UdHadO3fKPpAICf8I-E_0g9SzGhICnjNuX7SbvNhkN-Tw"
        },
        {
            "name": "Minerva#BR1",
            "region": "BR",
            "puuid": "BIjCIJfXbU4PvVQBqkBUqLFMlxTCGS6teqhfc0utfSnQ7PEnsbCTUdx2PPRDKTkwXZ0Y0xIsb3wqwg"
        },
        {
            "name": "코 코#7771",
            "region": "KR",
            "puuid": "uDRJHRugR88LUosxt3vDlp8-3Jy4_0dgyJ54NAEwzBaYTmwladc6Snwaqb4U2mhQ2m72hU5RrQ1e_w"
        },
        {
            "name": "Vanquisher#95328",
            "region": "EUW",
            "puuid": "lmrGXhc8oGkcT2xwU_jxwrsMzt-Vu6DSVFGuE7JL_DOc5_fLYygElaTO6lXFRzOPbWUav1PbkRMgiA"
        },
        {
            "name": "응원꾼#KR1",
            "region": "KR",
            "puuid": "n8zXgBB-rNLzoMTr_YAZ-EJp0pA_mfPde6shtiwzKTHsPjowd9sv5COCkui6b5K47JIFi-vsEkf41A"
        },
        {
            "name": "Mizuki#Sou12",
            "region": "JP",
            "puuid": "PwYpKmT6U4540pm-ElhLjHWnlxffoWRGQC7ehj4-Mlts5eYJ2LA4VDVElgPO5PyHJ58XHWTKtwtVFw"
        },
        {
            "name": "Wasanave#Miaw",
            "region": "LAS",
            "puuid": "U-XAcTR4CVKw5ofphw-88L_rHs2iwCPsYI9K5q5W61k0vnxW22l7DLbpj5pvNNCtHz7j81wRiN8KtA"
        },
        {
            "name": "Yuumi#Ahri",
            "region": "VN",
            "puuid": "rwfxMH7eKb5o9nrfdfsD06BMzoBd1wpV3Jh0Mrfsqrva3gDpOcqbbrD_OxbAClTB8CCo1Y5J946C4Q"
        },
        {
            "name": "Soren#ZED",
            "region": "BR",
            "puuid": "5iz-35qB2AW9x2EARjtx7UwhcoRyy65fFap159wAoRmQY7K8tA33y98aqDEe3Yl1RZ-Kr2aIBxxC7g"
        },
        {
            "name": "cas#EUW",
            "region": "EUW",
            "puuid": "OGWNuqJXnf1KyPKEzVuMopvpeftue9G1GkRSP8_xdydxgyTWNv9kISVmjIp_g-5J4grI9wbHomqWNg"
        },
        {
            "name": "HSR Jingliu#EUW",
            "region": "EUW",
            "puuid": "7WZv9Mdy1ooVQP3OnWC5wDPbJbm0Yjqc7rQY_6ujiUD2eYy4Cy7lSHzN3FYASckx_yO9KrIvOKm_OQ"
        },
        {
            "name": "rakayah#meow",
            "region": "EUNE",
            "puuid": "sIayQWOhUWSVZ8L892H9CNh2ubl6Xdk_P4RPbCi9_1CnYpAVdpDxByi23zZrmn0Mo0Om01mHK0gycg"
        },
        {
            "name": "Rhio#69420",
            "region": "EUW",
            "puuid": "I8knLjVR8WU2WSZFqGap0rr3o4w4PYGmcPmMYHgBYzc6CL1AAFfFpqKp_h9acNhFIy9SDNGL6GdcNw"
        },
        {
            "name": "Staticks#0109",
            "region": "EUW",
            "puuid": "Q_y1UJNn2UdAFohF93TD3_QN9uHj5doIvVjkSxmvY2xOxk7zkaV3_BA10Wl9dCnA7bjqBTfj0Aex0Q"
        },
        {
            "name": "OG Virtuoso#RJ21",
            "region": "BR",
            "puuid": "lfuuWr2GJ-Bko0mJ6LXfk2WnEO0ggS33d62xKi_sueLJb2L_hlbtY8Cyuxd73IF-rJhNJikRM2gquQ"
        },
        {
            "name": "Notlin#not",
            "region": "BR",
            "puuid": "OOq76Jy-9jtDOWRDY7DSldL-2Rb0siGypeqtLfnzHzXUCrR1GK1oM9WqCRbW8Y3nDf7y8yIbpMYnQw"
        },
        {
            "name": "聖德太子#SDTZ",
            "region": "JP",
            "puuid": "y8vt9PckNmodaKKfEqBzQ2wqTZki2n-5Yw9PHaJaNjL3e8GVTvTaIMReqBcfZCzeyc7uez5ByzFttg"
        },
        {
            "name": "TへT#4594",
            "region": "KR",
            "puuid": "tRA7g1j1Kz68ETpkyuPR9yisL1ucweeIqe2HJ3TsI-OvjImyW-3tRmnP9tV9xX4FEMUbaP4VANXB6A"
        },
        {
            "name": "Rökal#Rökal",
            "region": "EUNE",
            "puuid": "ZnGHJtVPSaErl6mGqjh4fOtvo7B8UiO3AWNRJiX_oTqm0YyKp45MdVU5NOkHFrvMPRRQ43w-LWynqA"
        },
        {
            "name": "VangMadeMeQuit#cring",
            "region": "EUNE",
            "puuid": "Ssn0ZqIh7UjoKi0BtptZHeMJSFqf4wlNjj0-XQxsykBDcgh0PZvTeBfxCgqLvavPDHOq2p8n6jVuZQ"
        },
        {
            "name": "Luhan#BR1",
            "region": "BR",
            "puuid": "vBTPRAejHcTY1tsHeDLvR4rRal6wY4JVIcvFiAr0lxT6Vwd-JR0GJBUCT7jjjGmrci_WhLdIxz1Iuw"
        },
        {
            "name": "Cicavirág#0518",
            "region": "EUNE",
            "puuid": "ogQlp5dMuWiwWPswHF5ZOhNfYQBHwpRpJQGXN3XzI5ZeARhptUB0tIqIXw_6HcxHPeO45E7PxAK_nA"
        },
        {
            "name": "Fròst#εïз",
            "region": "NA",
            "puuid": "a0EFwK6ZOAri9Z2r_tZsa2gkPMfkhRH6_kwzEg9yqBUNH9i3eLT7MNL9Vp_73Jz7rdJ2IXyScioSfQ"
        },
        {
            "name": "Yinq#6868",
            "region": "VN",
            "puuid": "a9bahMtuL069j1yXlAjEWMTfoyqKDH7JmQZi3XF9Kv-jk6Ze8b6FHnGv9bmfemqwoLMBF07lKs3xrA"
        },
        {
            "name": "zhajihepijiu#炸鸡和啤酒",
            "region": "NA",
            "puuid": "Psm1TDaPkgnHgqq0lsvJzkWFsBSj-89AJB6MhfJFXMb-T7qnbmJsleH9srHXnSbVg6DXLHBP-0oXXA"
        },
        {
            "name": "土家寨第一骚情#3344",
            "region": "EUW",
            "puuid": "9dz93AgFGQCuOWcJLiqXOulv2EzuOdkRPXaXNk8nHfKMNXQqn9cJapQ0WJGrm3AAZH4QauIXZBK3zQ"
        },
        {
            "name": "Pimere#EUW",
            "region": "EUW",
            "puuid": "0BYVyKkzB9jQKpLFDZCfMGIgllaNidSw-7ls8lUWWeAofrehLYrsH__Ef1r18pIg6AvxfkcL6dIeFQ"
        },
        {
            "name": "RaijinRaknarok#2011",
            "region": "EUW",
            "puuid": "InEPUvfT-duIxR_ki1_00qO_PVWDfgBjnm99tRR32y4_g2Vqan1KnaztWd2ADefcTmkKtgpO3sNdEw"
        },
        {
            "name": "CaballeroTiznado#Chan",
            "region": "LAN",
            "puuid": "2h4Ohu7Jabiwkzprl0hK2PetZhsIuYXGf0t9zlOQTE4aSX2bi4Mp3sbl8bN3oYECbb_LN0DHoKhokQ"
        },
        {
            "name": "今日のプリウス#JP1",
            "region": "JP",
            "puuid": "wU02bYUBbuqrkkriMaZDFaVPogO0lvVmOtd4omIN8Zp0ukbvGvJXJZGonTu2lBL7z_-7CnIBezvM5A"
        },
        {
            "name": "李清我一下我会起辉#matia",
            "region": "LAS",
            "puuid": "FohILEZfns38yUCVFBa6311zbJbmVgpdEjNNj-9t1bft5w2mVPlPJftYKYTN11BwNIA7fTAdt9YwLA"
        },
        {
            "name": "Cenci#777",
            "region": "EUW",
            "puuid": "tlAF_4zsnty2rpUiJrYOtow3_GaykiRfMQzGxL1VrG945V-GpUMD9QA0niRIsNtx-Knw5MyCrIHE5w"
        },
        {
            "name": "TheWaschbär#Meow",
            "region": "EUW",
            "puuid": "4veU8m0trkm72ZB0VO9noZMq3Wd3r_2-JF_lfUoitdWjDLO15_fQxkwxh2o53aZvoE2MrV8C9oBlHg"
        },
        {
            "name": "슈 붕#PSY",
            "region": "KR",
            "puuid": "RkSNpNB6wuW8FSJZm02boDwERwS1puF1FfCzlqUhUKK9RRspEMPR-hRYidrE52fWuRUf6omEsjtOlQ"
        },
        {
            "name": "Maxi#FNK",
            "region": "BR",
            "puuid": "7cABkQ0o2H5cFWsbCD_A6PDqcqerXqGSAHdfGr9av_UKZnPTegudXbYQveSYfdzq1FkGHfWvqmRVmQ"
        },
        {
            "name": "1 0#001",
            "region": "BR",
            "puuid": "ORnuyY8XdHBywXMWMbkQmGvRZu5qUYKm8I9D78r3jWoLDQtt451oHmbHij5Sr4B96jWfWI-XeL9XtQ"
        },
        {
            "name": "Aandiane#TH0T",
            "region": "NA",
            "puuid": "VnSo4DYCUSj3LjYS41VhMF8PjuXYeXUprlvTjDV46UElBmsoja10gsdMUHKkVqPAgcvUF6c8wb2V0Q"
        },
        {
            "name": "流れる季節#の真ん中で",
            "region": "KR",
            "puuid": "sLs50C5x4r6uhYnUL6oHeX3oTe48aghGkZXqKmSmv6hlS1TaRN93N2Pjlmsrgn7I3ufjK1IcyEJYEw"
        },
        {
            "name": "Stardust#Top",
            "region": "EUW",
            "puuid": "iFb8-BzUEH_uC0hC9bPMCFQ16zq5pBK2n3AvKYSk0iPHZsKiTqoTZkJs2o-GnMy4rvR3jznjI9Zgiw"
        },
        {
            "name": "KrisWald#KWald",
            "region": "NA",
            "puuid": "yuAVfqiGokxLjnbJI1rso7S95fplxC5mQtesw7_o4sURB_7hraNAWawYN3--2bHjhQQnpPWASG8eow"
        },
        {
            "name": "lννx#JP1",
            "region": "JP",
            "puuid": "X1quAv_5jnaS8bo9q9AImSCYMmpVPhuNHfXkYULoKHiJVpNGaM2YI4xIQscgRZhJ1m3oWyD27OOB3Q"
        },
        {
            "name": "OnlyVibes#Meow",
            "region": "EUNE",
            "puuid": "E40Zu6Oo0j5OXzOW4Wx9viFRoElVhlY89GW0fFuyjiNVzNzKvwy-rg8_6PbqGpVcSPG5IduIRDF1AA"
        },
        {
            "name": "Hide on bush#Yoooo",
            "region": "NA",
            "puuid": "mfeoZ2XaadUSX3fUKBhbaiLpqv1pDuC-YyGHV-2pSUmj9r-3qRVmJZaIu81KA_jLN-x8Xkttwtwtag"
        },
        {
            "name": "Get Jinxed#Meeku",
            "region": "EUW",
            "puuid": "v82DXz2uZrUM7_dmtyKXHr41GFOmLi2nVsXHJ8z71iHtZ4eDEDaVmFrwrnQRNA6btzrrduBmc_00pA"
        },
        {
            "name": "YouCantStopMe7#EUW",
            "region": "EUW",
            "puuid": "xt_IMd4axKcMj1wjR09A4Z90Guv_kX2XA-ClwJ0hBQI-WmM-aDHRbkHY8f4p--DeUILKBKXleY2m8A"
        },
        {
            "name": "앙우힝#KR1",
            "region": "KR",
            "puuid": "bAW1LIRvKwb3_RGrvhZiSLs1O_NZIIzR8p8tu463M1YAdDs9W1-EZjaD7Hupbb0C7PQ-1LhoyfP19g"
        },
        {
            "name": "ΘζίΓίΠΔ#ΘΞΘ",
            "region": "EUW",
            "puuid": "Z0A1a-GW5JMMg4xjmqkgKoS84D_ePDQIaPhdm15Av3nNuOudYFw7RR7Mg-yrL4Bz7yvapTMdlvKR9g"
        },
        {
            "name": "바다 해 넓을 활#KR1",
            "region": "KR",
            "puuid": "9QLWxCC69_PYQZPQvssWe6ennBjJiHuh-Jz_jZfpG7c0VWkrpdjkTHTlzCFpIHxLfcbbsOwE6xWSxQ"
        },
        {
            "name": "Big Romes#777",
            "region": "NA",
            "puuid": "aFrpq0xxunPNScw9MBiVkPHshEUzsfKrS0xTs42_f5tRiDO-Ynpkf2t3EanyNkkOoMQ6X94OTow6vw"
        },
        {
            "name": "Toki#Kat",
            "region": "NA",
            "puuid": "GdR4XrVSFvs-e0QB1uHVMtWLsWAltXVyTVKK0Ab-1WvsA9NyWPcdrgVSGMMlPo_5VvzTY7ukm_3eKA"
        },
        {
            "name": "Broseidon#Icy",
            "region": "NA",
            "puuid": "NRIN7Sa96n9HAHER1dsvSZ-DHPZX_UtZZQz-1mLngOvHFkzflg4BI6UHQ89Qj49xIY-esJEeM-893w"
        }
    ]


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


// let apikey = 'RGAPI-5d58b8f9-028a-4058-9785-307ee97ffd94';

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
      score: (ultimateCount * 3250) + (legendaryCount * 1820) + (legendaryCount * 1820) + (epicCount * 1350) + (mythicCount * 1350) + (regularSkinCount * 750) + 
             (emoteCount * 350) + (iconCount * 250) + (wardSkinCount * 640)

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
      name: `${name}#${tag}`,
      region: region,
      puuid: resByRiotId.puuid
    });





}


app.get('/table', function (req, res) {

  data.forEach((item, index) => {
    let name = item.name.split('#')[0];
    let tag =  item.name.split('#')[1];



    setTimeout(()=> {
        console.log(item.region, name, tag, item.puuid);
        getScore(item.region, name, tag, item.puuid);
    }, 1000 * (index + 1))

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


    setTimeout(()=> {
        getPuuid(item.region, item.name, item.tag);
    }, 250 * (index + 1))


  })


})

app.get('/puuid2', function (req, res) {

  res.json({
    data: puuidData,
  });

})


app.get('/whale', function (req, res) {

  data.forEach((item, index) => {
    let name = item.name.split('#')[0];
    let tag =  item.name.split('#')[1];



    setTimeout(()=> {
        console.log(item.region, name, tag, item.puuid);
        getWhaleScore(item.region, name, tag, item.puuid);
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