
var backgrounds = [
  "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-thousand-pierced-volibear.jpg",
  "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-airis.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-52.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-92.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-112.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-129.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-183.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-199.jpg",
  "https://i.imgur.com/uBE6rS8.png",
  "https://images5.alphacoders.com/131/1311515.jpeg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-131.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-132.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-204.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-205.jpg",
  "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-34.jpg",
  "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-7.jpg"
];
  
var random = backgrounds[Math.floor(Math.random() * backgrounds.length)];

var defaultItems = [
  {
    name: 'Abyssal Mask',
    checked: false,
  },
  {
    name: "Anathema's Chains",
    checked: false,
  },
  {
    name: "Archangel's Staff",
    checked: false,
  },
  {
    name: 'Ardent Censer',
    checked: false,
  },
  {
    name: 'Atma Reckoning',
    checked: false,
    hide: true
  },
  {
    name: 'Axiom Arc',
    checked: false,
  },
  {
    name: 'Banshee Veil',
    checked: false,
  },
  {
    name: 'Black Cleaver',
    checked: false,
  },
  {
    name: 'Black Mist Sythe',
    checked: false,
    hide: true
  },
  {
    name: 'Blade of the Ruined King',
    checked: false,
  },
  {
    name: "Bloodletter's Curse",
    checked: false,
    hide: true
  },
  {
    name: 'Bloodsong',
    checked: false,
    hide: true
  },
  {
    name: 'Bloodthirster',
    checked: false,
  },
  {
    name: 'Buwark',
    checked: false,
    hide: true
  },
  {
    name: 'Celestian Opposition',
    checked: false,
    hide: true
  },
  {
    name: 'Chempunk Chainsword',
    checked: false,
  },
  {
    name: 'Chemtech Putrifier',
    checked: false,
    hide: true
  },
  {
    name: 'Cosmic Drive',
    checked: false,
  },
  {
    name: 'Cryptbloom',
    checked: false,
  },
  {
    name: 'Dawncore',
    checked: false,
  },
  {
    name: 'Dead Mans Plate',
    checked: false,
  },
  {
    name: 'Deaths Dance',
    checked: false,
  },
  {
    name: 'Deathfire Grasp',
    checked: false,
    hide: true
  },
  {
    name: 'Demonic Embrace',
    checked: false,
    hide: true
  },
  {
    name: 'Dream Maker',
    checked: false,
    hide: true
  },
  {
    name: 'Echoes of Helia',
    checked: false,
  },
  {
    name: 'Eclipse',
    checked: false,
  },
  {
    name: 'Edge of Night',
    checked: false,
  },
  {
    name: 'Essence Reaver',
    checked: false,
  },
  {
    name: 'Experimental Hexplate',
    checked: false,
  },
  {
    name: 'Fimbulwinter',
    checked: false,
    hide: true
  },
  {
    name: 'Force of Nature',
    checked: false,
  },
  {
    name: 'Frozen Heart',
    checked: false,
  },
  {
    name: 'Frozen Mallet',
    checked: false,
    hide: true
  },
  {
    name: 'Gargoyle Stoneplate',
    checked: false,
    hide: true
  },
  {
    name: 'Guardian Angel',
    checked: false,
  },
  {
    name: 'Guinsoos Rageblade',
    checked: false,
  },
  {
    name: 'Heartsteel',
    checked: false,
  },
  {
    name: 'Hellfire Hatchet',
    checked: false,
    hide: true
  },
  {
    name: 'Hextech Gunblade',
    checked: false,
    hide: true
  },
  {
    name: 'Hextech Rocketbelt',
    checked: false,
  },
  {
    name: 'Hollow Radiance',
    checked: false,
  },
  {
    name: 'Horizon Focus',
    checked: false,
  },
  {
    name: 'Hubris',
    checked: false,
  },
  {
    name: 'Hullbreaker',
    checked: false,
  },
  {
    name: 'Iceborn Gaunlet',
    checked: false,
  },
  {
    name: 'Immortal Shieldbow',
    checked: false,
  },
  {
    name: 'Imperial Mandate',
    checked: false,
  },
  {
    name: 'Infinity Edge',
    checked: false,
  },
  {
    name: 'Innervating Locket',
    checked: false,
    hide: true
  },
  {
    name: 'JakSho, The Protean',
    checked: false,
  },
  {
    name: 'Kaenic Rookern',
    checked: false,
  },
  {
    name: 'Knights Vow',
    checked: false,
  },
  {
    name: 'Kraken Slayer',
    checked: false,
  },
  {
    name: "Liandry's Torment",
    checked: false,
  },
  {
    name: 'Lich Bane',
    checked: false,
  },
  {
    name: 'Lightning Braid',
    checked: false,
    hide: true
  },
  {
    name: 'Locket of the Iron Solari',
    checked: false,
  },
  {
    name: 'Lord Dominik',
    checked: false,
  },
  {
    name: 'Ludens Companion',
    checked: false,
  },
  {
    name: 'Malignance',
    checked: false,
  },
  {
    name: 'Manmune',
    checked: false,
  },
  {
    name: 'Maw of the Malmotius',
    checked: false,
  },
  {
    name: 'Mejai Soulstealer',
    checked: false,
  },
  {
    name: 'Mercurial Scimitar',
    checked: false,
  },
  {
    name: 'Mikaels Blessing',
    checked: false,
  },
  {
    name: 'Moonstone Renewer',
    checked: false,
  },
  {
    name: 'Morellonomicon',
    checked: false,
  },
  {
    name: 'Mortal Reminder',
    checked: false,
  },
  {
    name: 'Muramana',
    checked: false,
  },
  {
    name: 'Nashors Tooth',
    checked: false,
  },
  {
    name: 'Navori Quickblades',
    checked: false,
  },
  {
    name: 'Opportunity',
    checked: false,
  },
  {
    name: 'Pauldrons',
    checked: false,
    hide: true
  },
  {
    name: 'Perplexity',
    checked: false,
    hide: true
  },
  {
    name: 'Phantom Dancer',
    checked: false,
  },
  {
    name: 'Profane Hydra',
    checked: false,
  },
  {
    name: "Prowler's Claw",
    checked: false,
    hide: true
  },
  {
    name: 'Rabadons Deathcap',
    checked: false,
  },
  {
    name: 'Randuins Omen',
    checked: false,
  },
  {
    name: 'Rapid Firecannon',
    checked: false,
  },
  {
    name: 'Ravenous Hydra',
    checked: false,
  },
  {
    name: 'Redemption',
    checked: false,
  },
  {
    name: 'Riftmaker',
    checked: false,
  },
  {
    name: 'Rite of the Ruin',
    checked: false,
    hide: true
  },
  {
    name: 'Rod of Ages',
    checked: false,
  },
  {
    name: 'Runaans Hurricane',
    checked: false,
  },
  {
    name: 'Rylais Crystal Sceptor',
    checked: false,
  },
  {
    name: 'Seraphs Embrace',
    checked: false,
  },
  {
    name: 'Serpents Fang',
    checked: false,
  },
  {
    name: 'Seryldas Grudge',
    checked: false,
  },
  {
    name: 'Shadowflame',
    checked: false,
  },
  {
    name: 'Shard of True Ice',
    checked: false,
    hide: true
  },
  {
    name: 'Shield of the Rakkor',
    checked: false,
    hide: true
  },
  {
    name: 'Shurelyas Battlesong',
    checked: false,
  },
  {
    name: 'Silvermere Dawn',
    checked: false,
    hide: true
  },
  {
    name: 'Sin Eater',
    checked: false,
    hide: true
  },
  {
    name: 'Solstice Sleigh',
    checked: false,
    hide: true
  },
  {
    name: 'Spear of Shojin',
    checked: false,
  },
  {
    name: 'Spectral Cutlass',
    checked: false,
    hide: true
  },
  {
    name: 'Spirit Visage',
    checked: false,
  },
  {
    name: 'Staff of the Flowing Water',
    checked: false,
  },
  {
    name: 'Statikk Shiv',
    checked: false,
  },
  {
    name: "Sterak's Gage",
    checked: false,
  },
  {
    name: 'Stormrazor',
    checked: false,
  },
  {
    name: 'Stormsurge',
    checked: false,
  },
  {
    name: 'Stridebreaker',
    checked: false,
  },
  {
    name: 'Sundered Sky',
    checked: false,
  },
  {
    name: 'Sunfire Aegis',
    checked: false,
  },
  {
    name: 'Sword of BLossoming',
    checked: false,
    hide: true
  },
  {
    name: 'Sword of the Divine',
    checked: false,
    hide: true
  },
  {
    name: 'Terminus',
    checked: false,
  },
  {
    name: 'The Collector',
    checked: false,
  },
  {
    name: 'Golden Spatula',
    checked: false,
    hide: true
  },
  {
    name: 'Thornmail',
    checked: false,
  },
  {
    name: 'Titanic Hydra',
    checked: false,
  },
  {
    name: 'Trailblazer',
    checked: false,
  },
  {
    name: 'Trinity Force',
    checked: false,
  },
  {
    name: 'Umbral Glaive',
    checked: false,
  },
  {
    name: 'Unending Despair',
    checked: false,
  },
  {
    name: 'Vigilant Wardstone',
    checked: false,
  },
  {
    name: 'Void Staff',
    checked: false,
  },
  {
    name: 'Voltaic Cyclosword',
    checked: false,
  },
  {
    name: 'Warmogs Armor',
    checked: false,
  },
  {
    name: 'Winters Approach',
    checked: false,
  },
  {
    name: 'Wits End',
    checked: false,
  },
  {
    name: 'Wordless Promise',
    checked: false,
    hide: true
  },
  {
    name: 'Youmuus Ghostblade',
    checked: false,
  },
  {
    name: 'ZakZak Realmspike',
    checked: false,
    hide: true
  },
  {
    name: 'Zeke Convergence',
    checked: false,
  },
  {
    name: 'Zephyr',
    checked: false,
    hide: true
  },
  {
    name: 'Zhonyas Hourglass',
    checked: false,
}];

$("body").css("background-image", `url("${random}")`); 

let items = localStorage.getItem("items");

if (!items) {
  items = defaultItems;
} else {
  items = JSON.parse(items);
  items[33].hide = true;
  items[11].hide = true;
  items[14].hide = true;
  items[24].hide = true;
  items[97].hide = true;
  items[128].hide = true;
}


items.forEach((item, index) => {
  if (!item.hide) {
    if (item.checked) {
      $('.checklist').append(`
        <div class="item completed">
          <img src="./icons/${index}.png"/> <br>
          ${item.name}
        </div>`);
    } else {
    $('.checklist').append(`
      <div class="item">
        <img src="./icons/${index}.png"/> <br>
        ${item.name}
      </div>`);
    }
  }
})

$(".checklist" ).on( "click", ".item", function() {
  let clickedItem = ( $( this ).text().trim()  );
  $( this ).toggleClass('completed');

  let foundItem = items.find(item => item.name == clickedItem);

  foundItem.checked = !foundItem.checked;

  localStorage.setItem("items", JSON.stringify(items));
  getScore();
});

var score = 0;
var currentRank;
var nextRank;
var nextUpgrade;

getScore();


function getScore () {
  score = 0;
items.forEach(item => {
  if (item.checked && !item.hide) {
    score++;
  }
})

if (score < 3) {
  currentRank = 'Unranked';
  nextRank = 'Iron';
  nextUpgrade = '7';
} else if (score >= 3 && score < 7) {
  currentRank = 'Iron';
  nextRank = 'Bronze';
  nextUpgrade = '16';
} else if (score >= 7 && score < 16) {
  currentRank = 'Bronze';
  nextRank = 'Silver';
  nextUpgrade = '25';
} else if (score >= 16 && score < 25) {
  currentRank = 'Silver';
  nextRank = 'Gold';
  nextUpgrade = '40';
} else if (score >= 25 && score < 40) {
  currentRank = 'Gold';
  nextRank = 'Platinum';
  nextUpgrade = '60';
} else if (score >= 40 && score < 60) {
  currentRank = 'Platinum';
  nextRank = 'Diamond';
  nextUpgrade = '85';
} else if (score >= 60 && score < 85) {
  currentRank = 'Diamond';
  nextRank = 'Master';
  nextUpgrade = '85';
} else if (score >= 85) {
  currentRank = 'Master';
  nextRank = null;
  nextUpgrade = null;
}

$('.current-rank').text(currentRank);
if (nextRank) {
  $('.next-rank').text(`${score} / ${nextUpgrade} to ${nextRank}`);
} else {
  $('.next-rank').text('');
}

}