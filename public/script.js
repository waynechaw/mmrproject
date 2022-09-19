

var encryptedID;
var intervalID;

$('#btn').click(function() {

  $(this).prop("disabled",true);

      var SUMMONER_NAME = "";
      SUMMONER_NAME = $("#userName").val().replace(/ /g, "").toLowerCase();
      if (SUMMONER_NAME !== "") {

        $(".mmr-container").css("display", "none"); 

        $('#status').html("Getting latest matches. This may take some time <br><br> <img  class='loading' src='https://c.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'/>");

          $.ajax({
              url: '/renew/' + SUMMONER_NAME,
              type: 'GET',
              contentType: 'application/json',
              success: function(data) {

                if (data.encryptedID) {
                  encryptedID = data.encryptedID;
                  intervalID = setInterval( checkRenewal, 1000);
                } else {
                  $('#status').html("error has occured");
                }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {

              }
          });
      } else {

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
 

          $.ajax({
              url: '/mmr/' + encryptedID,
              type: 'GET',
              contentType: 'application/json',
              success: function(data) {
                  console.log(data);

                  $(".mmr").text(data.recentMatchesAvgMMR);
                  $(".mmr-container").css("display", "block"); 
                  $('#status').html("");

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
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {

      }
  });
}

