
var data = [];

data = page1.concat(page2).concat(page3).concat(page4).concat(page5).concat(page6);

data = data.sort((a, b) => b.score - a.score);



const uniqueNames = new Set();
data = data.filter(obj => {
    if (uniqueNames.has(obj.name)) {
        return false; // Remove duplicate object
    } else {
        uniqueNames.add(obj.name);
        return true; // Keep the object
    }
});


data.forEach((item, index)=> {
  item.rank = index + 1;
})

let filteredData;

let searchText;
let selectedRegion = 'Global';


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



function renderTable() {
  $('.leaderboard-data-container').empty();

  filteredData = data;

  if (searchText) {

    filteredData = filteredData.filter(item => {
      return item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })

  }


  if (selectedRegion !=  'Global') {

    filteredData = filteredData.filter(item => {
      return item.region == selectedRegion;
    })

  }

  filteredData.forEach((item, i) => {

    let name = item.name.split('#')[0];
    let tag =  item.name.split('#')[1];

    // if (name.length > 14) {
    //   name = name.slice(0, 14);
    // }

    let completedPercent = ((item.completed / 294) * 100).toFixed(2);

    let displayedRank;

    if (searchText) {
      displayedRank = item.rank;
    } else {

      if (selectedRegion == 'Global') {
        displayedRank = item.rank;
      } else {
        displayedRank = i + 1;
      }

    }

    console.log(name);


    $('.leaderboard-data-container').append(`
      <div class="d-flex leaderboard-data">
          <div  class="text-center" style="width: 5%">${displayedRank}</div>
          <div class="name-cell" style="width: 29%">${name}<span class="tag">#${tag}</span> <span class="player-region">${item.region}</span> </div>
          <div style="width: 15%">${item.score}</div>
          <div style="color: gold;width: 15%">${completedPercent}%</div>
          <div>
            ${item.mostNotableChallenge.translation.name}
            <i style="font-size: 15px; vertical-align: text-top;"  class="fa-solid fa-circle-info" data-toggle="tooltip" data-placement="right" title="${item.mostNotableChallenge.translation.shortDescription}"></i>

            <span class="notable-rank">Ranked #${item.mostNotableChallengePosition}</span>

          </div>
      </div>
    `);
  })
}

renderTable();

$("input").on("input", function() {
  searchText = $(this).val(); 
  renderTable();
});

$(".dropdown-menu" ).on( "click", ".dropdown-item", function() {
  selectedRegion = ( $( this ).text().trim()  );
  $('.dropdown-toggle').text(selectedRegion);

  renderTable();
});
