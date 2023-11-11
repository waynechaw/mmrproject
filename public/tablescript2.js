
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

$("body").css("background-image", `url("${random}")`); 

function divideIntoTwoGroups(arr) {

    const combinations = [];

    const n = arr.length;

    const half = n / 2;

 

    function generate(i, group1, group2) {

        if (group1.length > half || group2.length > half) return;

        if (i === n) {

            if (group1.length === half && group2.length === half) {

                combinations.push([group1, group2]);

            }

            return;

        }

        generate(i + 1, [...group1, arr[i]], group2);

        generate(i + 1, group1, [...group2, arr[i]]);

    }

 

    generate(0, [], []);

 

    const bestCombinations = [];

 

    for (const [group1, group2] of combinations) {

        const avg1 = average(group1.map(item => Number(item.mmr)));

        const avg2 = average(group2.map(item => Number(item.mmr)));

        const difference = Math.abs(avg1 - avg2);

 

       bestCombinations.push({ difference, groups: [group1, group2] });

    }


 

    bestCombinations.sort((a, b) => a.difference - b.difference);

 

    return bestCombinations.slice(0, 26).map(combination => combination.groups);

}

function convertData (data) {

  let list = [];

   for (let i = 0; i < data.length; i++) {
     const [stringKey, value] = data[i].split(':');

     listOfMMR.push(value);
     list.push({
      name: stringKey,
      mmr: value
     });
   }



   return list;
 
}


 function average(array) {
  const sum = array.reduce((acc, curr) => acc + curr, 0);
  const average = sum / array.length;
  return average;
}

var playersList = [];


var mmrNameMapArr;
var listOfMMR = [];

var team1Text = [];
var team2Text = [];


var groups = [];
var group = [];

var groupIndex = 0;


function getMMR(user) { 
  let encryptedID;
  let intervalID;

  let data = { name: user };
          $.ajax({
              url: '/renew/',
              type: 'POST',
              data:  JSON.stringify(data),
              contentType: 'application/json',
              dataType: "json",
              success: function(data) {

                if (data.encryptedID) {

                  if (data.renewedFinished) {
                    $.ajax({
                        url: '/mmr/' + data.encryptedID,
                        type: 'GET',
                        contentType: 'application/json',
                        success: function(data) {
                                      console.log(data);
                                      playersList.push({
                                        name: user,
                                        mmr: data.recentMatchesAvgMMR
                                      });

                                      console.log(playersList);

                                      
                                      $('.unsorted-list').empty();
                                      playersList.forEach(player => {


                                        $('.unsorted-list').append(`<div class="player-item">${player.name}: <b>${player.mmr}</b</div>`);

                                        if (playersList.length == 10) {
                                          sort();
                                        }



                                      })

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                  } else {
                    encryptedID = data.encryptedID;
                    intervalID = setInterval( () => {



                      $.ajax({
                          url: '/renew-status/' + encryptedID,
                          type: 'GET',
                          contentType: 'application/json',
                          success: function(data) {
                            if (data.renewedFinished) {
                              clearInterval(intervalID);
                              console.log('renewed!');
                              $.ajax({
                                  url: '/mmr/' + encryptedID,
                                  type: 'GET',
                                  contentType: 'application/json',
                                  success: function(data) {
                                      console.log(data);




                                      playersList.push({
                                        name: user,
                                        mmr: data.recentMatchesAvgMMR
                                      });


                                      console.log(playersList);
                                      

                                      $('.unsorted-list').empty();
                                      playersList.forEach(player => {


                                        $('.unsorted-list').append(`<div class="player-item">${player.name}: <b>${player.mmr}</b</div>`);



                                      })



                                        if (playersList.length == 10) {
                                          sort();
                                        }


                                  },
                                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                                      console.log('error');
                                  }
                              });


                            } else if (data.error){ 
                                clearInterval(intervalID);
                            }
                          },
                          error: function (XMLHttpRequest, textStatus, errorThrown) {

                          }
                      });

                    }, 1000);
                  }

                } else {
                  console.log(user, 'error');
                }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {

              }
          });
}



function sort () {

  $('.output-area').css('display', 'flex');
$('.loading').css('display', 'none');

  groups = divideIntoTwoGroups(playersList);

  groups = groups.filter( (item, index) => {
    return index % 2 == 0;
  })

  console.log(groups);

  group = groups[groupIndex];

  let team1 = group[0];

  let team2 = group[1];

  $('.team1mmr b').text(average(team1.map(item => Number(item.mmr))).toFixed(2));
  $('.team2mmr b').text(average(team2.map(item => Number(item.mmr))).toFixed(2));

  $('.team2').empty();

  $('.team1').empty();

  team1.forEach(player => {


    $('.team1').append(`<h4>${player.name}</h4>`);

    team1Text.push(`${player.name} (${player.mmr.toFixed(2)})`);

  })

  team2.forEach(player => {


    $('.team2').append(`<h4>${player.name}</h4>`);

    team2Text.push(`${player.name} (${player.mmr.toFixed(2)})`);

  })


  $('.output-area').css('display', 'flex');
  $('.prettybtn').css('display', 'inline');
}


$('.clear').click(function() {
  $('textarea').val('');
  $('.output-area').css('display', 'none');
  $('.prettybtn').css('display', 'none');
});


$('.submit').click(function() {

  $('.unsorted-list-container').css('display', 'block');

  $('.input-area').css('display', 'none');


  let players = $('textarea').val();
  console.log(players);

  players = players.split(',');

  players.forEach( player => {
    getMMR(player);
  })


});


$('.copybtn').click(function() {

  let team1TextJoined = team1Text.join(', ');
  let team2TextJoined = team2Text.join(', ');

  let data = `team1: ${team1TextJoined} / team2: ${team2TextJoined}`;

  navigator.clipboard.writeText(data).then(
    () => {
      $('.copybtn').text('Copied!');
      setTimeout(()=> {
        $('.copybtn').text('Copy Team');
      }, 1500)


    },
    () => {
      /* clipboard write failed */
    },
  );
});

$('.restart').click(function() {
  location.reload(true)
})

$('.try').click(function() {



         team1Text = [];
         team2Text = [];


  groupIndex = groupIndex + 1;


  if (groupIndex == 12) {

    $('.try').css('display', 'none');
  }

 group = groups[groupIndex];

  let team1 = group[0];

  let team2 = group[1];

  $('.team1mmr b').text(average(team1.map(item => Number(item.mmr).toFixed(2))));
  $('.team2mmr b').text(average(team2.map(item => Number(item.mmr).toFixed(2))));

  $('.team2').empty();

  $('.team1').empty();

  team1.forEach(player => {


    $('.team1').append(`<h4>${player.name}</h4>`);

    team1Text.push(`${player.name} (${player.mmr.toFixed(2)})`);

  })

  team2.forEach(player => {


    $('.team2').append(`<h4>${player.name}</h4>`);

    team2Text.push(`${player.name} (${player.mmr.toFixed(2)})`);

  })


});


