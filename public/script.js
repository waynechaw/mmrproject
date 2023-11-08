var backgrounds = [
  "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-nilah-eclipsel.jpg",
  "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-thousand-pierced-volibear.jpg",
  "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-airis.jpg",
  "https://www.iamag.co/wp-content/uploads/2022/04/kudos-productions-arcane-jinx-lv1.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-52.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-92.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-112.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-129.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-183.jpg",
  "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-199.jpg",
  "https://i.imgur.com/uBE6rS8.png",
  "https://images5.alphacoders.com/131/1311515.jpeg"
];

var random = backgrounds[Math.floor(Math.random() * backgrounds.length)];

$("body").css("background-image", `url("${random}")`); 

var encryptedID;
var intervalID;

  $("#userName").keypress(function(event){
    if(event.keyCode == 13){
  $(this).prop("disabled",true);

  $(".intro").css("display", "none"); 

      var SUMMONER_NAME = "";
      SUMMONER_NAME = $("#userName").val().replace(/ /g, "").toLowerCase();
      if (SUMMONER_NAME !== "") {

        $(".mmr-container").css("display", "none"); 

        $('#status').html("Getting latest matches. This may take some time <br><br> <img  class='loading' src='https://c.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'/>");
        $('#status').css("display", "block");
          $.ajax({
              url: '/renew/' + SUMMONER_NAME,
              type: 'GET',
              contentType: 'application/json',
              success: function(data) {

                if (data.encryptedID) {

                  if (data.renewedFinished) {
                    $.ajax({
                        url: '/mmr/' + data.encryptedID,
                        type: 'GET',
                        contentType: 'application/json',
                        success: function(data) {
                            console.log(data);

                            $(".mmr").text(data.recentMatchesAvgMMR);
                            $(".mmr2").text(data.recentMatchesAvgMMR2);
                            $(".mmr-container").css("display", "block"); 
                            $('#status').html("");
                            $('#status').css("display", "none");

                            $(".raw-data").attr("href", '/mmr/' + encryptedID);

                            $("input").prop("disabled", false);

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $("#sLevel").html("summoner name not found");
                            $("#sLevel").css("color", "red"); 
                        }
                    });
                  } else {
                    encryptedID = data.encryptedID;
                    intervalID = setInterval( checkRenewal, 1000);
                  }

                } else {
                  $('#status').html("error has occured");
                  $("input").prop("disabled", false);
                }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {

              }
          });
      } else {

      }
    }
  });
        

function checkRenewal(){





  $.ajax({
      url: '/renew-status/' + encryptedID,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        if (data.renewedFinished) {
          clearInterval(intervalID);
          console.log('renewed!');
          $('#status').html("Latest matched retrieved. Now performing analysis. <br><br> <img  class='loading'  src='https://c.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'/>");
 
          $('#status').css("display", "block");
          $.ajax({
              url: '/mmr/' + encryptedID,
              type: 'GET',
              contentType: 'application/json',
              success: function(data) {
                  console.log(data);

                  $(".mmr").text(data.recentMatchesAvgMMR);
                  $(".mmr2").text(data.recentMatchesAvgMMR2);
                  $(".mmr-container").css("display", "block"); 
                  $('#status').html("");
                  $('#status').css("display", "none");

                  $(".raw-data").attr("href", '/mmr/' + encryptedID);

                  $("input").prop("disabled", false);

              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                  $("#sLevel").html("summoner name not found");
                  $("#sLevel").css("color", "red"); 
              }
          });


        } else if (data.error){ 
            clearInterval(intervalID);
           $('#status').html("error has occured");
           $('#status').css("display", "block");
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {

      }
  });
}

