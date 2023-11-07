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

 

    let minDifference = Infinity;

    let bestCombination = null;

 

    for (const [group1, group2] of combinations) {

        const avg1 = group1.reduce((a, b) => a + b, 0) / half;

        const avg2 = group2.reduce((a, b) => a + b, 0) / half;

        const difference = Math.abs(avg1 - avg2);

        if (difference < minDifference) {

            minDifference = difference;

            bestCombination = [group1, group2];

        }

    }

 

    return bestCombination;

}

 function convertDataToObject(data) {
   const object = {};
 
   for (let i = 0; i < data.length; i++) {
     const [stringKey, value] = data[i].split(':');
     object[value] = stringKey;
     listOfMMR.push(parseInt(value));
   }
 
   return object;
 }

 function average(array) {
  const sum = array.reduce((acc, curr) => acc + curr, 0);
  const average = sum / array.length;
  return average;
}


var mmrNameMap;
var listOfMMR = [];

var team1Text = [];
var team2Text = [];


$('.clear').click(function() {
  $('textarea').val('');
  $('.output-area').css('display', 'none');
  $('.copybtn').css('display', 'none');
});

$('.submit').click(function() {
  listOfMMR = [];
  mmrNameMap = {};

  team1Text = [];
  team2Text = [];

  let data = $('textarea').val();
  data = data.split(',');
  data = data.map(item => $.trim(item));
  console.log(data);
  mmrNameMap = convertDataToObject(data);
  console.log(mmrNameMap);
  console.log(listOfMMR);

  console.log(divideIntoTwoGroups(listOfMMR));

  let team1 = divideIntoTwoGroups(listOfMMR)[0];

  let team2 = divideIntoTwoGroups(listOfMMR)[1];

  $('.team1mmr b').text(average(team1));
  $('.team2mmr b').text(average(team2));

  $('.team2').empty();

  $('.team1').empty();

  team1.forEach(player => {
    let playerName = mmrNameMap[player];

    $('.team1').append(`<h4>${playerName}</h4>`);

    team1Text.push(`${playerName} (${player})`);

  })

  team2.forEach(player => {
    let playerName = mmrNameMap[player];

    $('.team2').append(`<h4>${playerName}</h4>`);

    team2Text.push(`${playerName} (${player})`);

  })


  $('.output-area').css('display', 'flex');
  $('.copybtn').css('display', 'inline');

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

