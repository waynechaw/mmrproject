
var data = [];

data = page1;

data = data.sort((a, b) => b.score - a.score);


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


    $('.leaderboard-data-container').append(`
      <div class="d-flex leaderboard-data">
          <div  class="text-center" style="width: 5%">${displayedRank}</div>
          <div class="name-cell" style="width: 38%">${name}<span class="tag">#${tag}</span> <span class="player-region">${item.region}</span> </div>
          <div style="width: 15%">${item.score.toLocaleString()}</div>
          <div style="width: 10%">
            ${item.skinCount}
          </div>
          <div style="width: 10%">
            ${item.emoteCount}
          </div>
          <div style="width: 10%">
            ${item.iconCount}
          </div>
          <div>
            ${item.wardSkinCount}
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
