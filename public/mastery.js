let profiles = localStorage.getItem("profiles");

if (!profiles) {
    profiles = {};
    $('.checkbox-container').hide();
    $('.lookup-container').addClass('center-div');

} else {
    profiles = JSON.parse(profiles);
}

$('.role-container').hide();
$('.toggles').hide();

let selectedRegion = localStorage.getItem("selectedRegion");

if (!selectedRegion) {
    selectedRegion = 'NA';
} else {
    $('.region-toggle').text(selectedRegion);
}

let activeProfile = localStorage.getItem("activeprofile");

if (activeProfile && activeProfile != 'undefined' && profiles[activeProfile]) {
    $('.lookup-container').hide();
    let activeProfileInfo = profiles[activeProfile];
    getMasteryData(activeProfileInfo.name, activeProfileInfo.tag, activeProfileInfo.region);
}

const regionMap = {
    NA: 'NA1',
    EUW: 'EUW1',
    EUNE: 'EUN1',
    BR: 'BR1'
};

var hideM7 = false;
var hideM6 = false;
var hideM5 = false;

hideM7 = localStorage.getItem("hideM7") === 'true';
hideM6 = localStorage.getItem("hideM6") === 'true';
hideM5 = localStorage.getItem("hideM5") === 'true';

if (hideM7) {
    $('input#hidem7').prop("checked", true);
} else {
    $('input#hidem7').prop("checked", false);
}

if (hideM6) {
    $('input#hidem6').prop("checked", true);
} else {
    $('input#hidem6').prop("checked", false);
}

if (hideM5) {
    $('input#hidem5').prop("checked", true);
} else {
    $('input#hidem5').prop("checked", false);
}

$('input#hidem7').change(
    function() {
        if ($(this).is(':checked')) {
            hideM7 = true;
        } else {
            hideM7 = false;
        }
        localStorage.setItem("hideM7", hideM7);
        renderChampions();
    }
);

$('input#hidem6').change(
    function() {
        if ($(this).is(':checked')) {
            hideM6 = true;
        } else {
            hideM6 = false;
        }
        localStorage.setItem("hideM6", hideM6);
        renderChampions();
    }
);

$('input#hidem5').change(
    function() {
        if ($(this).is(':checked')) {
            hideM5 = true;
        } else {
            hideM5 = false;
        }
        localStorage.setItem("hideM5", hideM5);
        renderChampions();
    }
);


let selectedMappedRegion = '';
let loading = false;
let masteryData;
var score = 0;
var currentRank;
var nextRank;
var nextUpgrade;

$(".region-menu").on("click", ".dropdown-item", function() {
    selectedRegion = ($(this).text().trim());
    $('.region-toggle').text(selectedRegion);
    selectedMappedRegion = regionMap[selectedRegion];
    localStorage.setItem("selectedRegion", selectedRegion);
});

$("div").on("click", ".new-search", function() {
    $('.lookup-container').show();
    $('.checkbox-container').css('margin-top', '0');
    $('.lookup-container').css('margin-top', '5%');
});

var selectedRole = 'all';

$("div").on("click", ".role-option", function() {
    $('.role-option').removeClass('selected');
    $(this).addClass('selected');
    if ($(this).hasClass('bot')) {
        renderChampions('bot');
        selectedRole = 'bot';
    }
    if ($(this).hasClass('all')) {
        renderChampions('all');
        selectedRole = 'all';
    }
    if ($(this).hasClass('jg')) {
        renderChampions('jg');
        selectedRole = 'jg';
    }
    if ($(this).hasClass('mid')) {
        renderChampions('mid');
        selectedRole = 'mid';
    }
    if ($(this).hasClass('sup')) {
        renderChampions('sup');
        selectedRole = 'sup';
    }
    if ($(this).hasClass('top')) {
        renderChampions('top');
        selectedRole = 'top';
    }
});

function getMasteryData(name, tag, selectedMappedRegion) {

    $('.champ-loading').show();

    $.ajax({
        url: '/mastery/' + name + '/' + tag + '/' + selectedMappedRegion,
        type: 'GET',
        contentType: 'application/json',
        success: function(resp) {

            if (resp.error) {

                $("#userName").prop("disabled", false);
                $("#userName").attr("placeholder", resp.errorDetail);
                $("#userName").val('');
                $('.fa-magnifying-glass').show();
                $('.fa-spinner').hide();

                return;

            }

            getMasteryChallengeData(name, tag, selectedMappedRegion);
            getMasteryDataForCatch(name, tag, selectedMappedRegion);

            let objKey = resp.id;


            masteryData = resp.data.sort((a, b) => {
                return b.championLevel - a.championLevel;
            });

            if (masteryData.length == 0) {

                $("#userName").prop("disabled", false);
                $("#userName").attr("placeholder", 'No data found');
                $("#userName").val('');
                $('.fa-magnifying-glass').show();
                $('.fa-spinner').hide();

                return;
            }

            $('.checkbox-container').show();
            $('.toggles').show();
            $('.lookup-container').removeClass('center-div');
            $('.lookup-container').hide();
            $('.checkbox-container').css('margin-top', '6%');

            localStorage.setItem("activeprofile", objKey);



            masteryData.forEach(item => {
                let id = item.championId;
                ChampDataLanes.forEach(champ => {
                    if (id == champ.id) {
                        item.lanes = champ.roles;
                    }
                })
            })

            renderChampions();


            $("input").prop("disabled", false);
            $('.fa-magnifying-glass').show();
            $('.fa-spinner').hide();

            $('.lookup-container').show();
            $('.checkbox-container').css('margin-top', '0');
            $('.lookup-container').css('margin-top', '5%');
            $('.role-container').show();


        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            $("#userName").prop("disabled", false);
            $("#userName").attr("placeholder", textStatus);
            $("#userName").val('');
            $('.fa-magnifying-glass').show();
            $('.fa-spinner').hide();


        }
    });

}

var nextUpgrade;


function getMasteryDataForCatch(name, tag, selectedMappedRegion) {

    $.ajax({
        url: '/catch/' + name + '/' + tag + '/' + selectedMappedRegion,
        type: 'GET',
        contentType: 'application/json',
        success: function(resp) {

            if (resp.error) {



                return;

            }




            let objKey = resp.id;


            masteryData = resp.data;

            if (masteryData.length == 0) {



                return;
            }



            localStorage.setItem("activeprofile", objKey);

            activeProfile = objKey;


            masteryData.forEach(item => {
                let id = item.championId;
                ChampDataLanes.forEach(champ => {
                    if (id == champ.id) {
                        item.lanes = champ.roles;
                    }
                })
            })


            score = masteryData[resp.data.length - 1].championPoints;


            parseData();



            let currentTotal = 0;

            masteryData.forEach(item => {
                let pointsEarned = 0;

                if (item.championPoints >= nextUpgrade) {
                    pointsEarned = nextUpgrade;

                } else {
                    pointsEarned = item.championPoints;
                }
                currentTotal = currentTotal + parseInt(pointsEarned);
            })


            let startingEXP;
            let updatedEXP;
            let expEarned;

            let currentDate = new Date();


            if (!profiles[objKey]) {

                startingEXP = currentTotal;

                profiles[objKey] = {
                    name: name,
                    tag: tag,
                    region: selectedMappedRegion,
                    data: masteryData,
                    dateStarted: currentDate,
                    startingEXP: startingEXP,
                }

                localStorage.setItem("profiles", JSON.stringify(profiles));


            } else {
                updatedEXP = currentTotal;
                expEarned = currentTotal - profiles[objKey].startingEXP;
            }

            console.log('startingEXP', profiles[objKey].startingEXP);
            console.log('updatedEXP', updatedEXP);
            console.log('expEarned', expEarned);

            let timeElapsed;

            if ((currentDate - new Date(profiles[objKey].dateStarted)) < (24 * 60 * 60 * 1000)) {
                timeElapsed = 24 * 60 * 60 * 1000;
            } else {
                timeElapsed = currentDate - new Date(profiles[objKey].dateStarted);
            }

            if (!expEarned) {
                $('.points-earned').text('0');
                $('.appd').text('0');
                $('.ppd').text('0');
                $('.estimated-time').text('NA');
            } else {
                $('.points-earned').text(expEarned.toLocaleString());
                let avgPointsPerDay = expEarned / (timeElapsed / (24 * 60 * 60 * 1000));
                $('.appd').text(Math.round(avgPointsPerDay * 100) / 100);
                let percentProgressPerDay = ((avgPointsPerDay / (nextUpgrade * 150)) * 100).toFixed(3);
                $('.ppd').text(percentProgressPerDay + '%');
                $('.estimated-time').text((((nextUpgrade * 150) - currentTotal) / avgPointsPerDay).toFixed(0) + ' days');
            }




        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {



        }
    });
}



function getMasteryChallengeData(name, tag, selectedMappedRegion) {

    $.ajax({
        url: '/masterychallenges/' + name + '/' + tag + '/' + selectedMappedRegion,
        type: 'GET',
        contentType: 'application/json',
        success: function(resp) {

            if (resp.error) {
                return;
            }

            if (resp.data.masterYourself) {
                score = resp.data.masterYourself.value;

                if (score < 5) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', '#2e2e2e');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 5);
                } else if (score >= 5 && score < 15) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', '#646464');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 15);
                } else if (score >= 15 && score < 30) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', '#CD7F32');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 30);
                } else if (score >= 30 && score < 50) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', 'silver');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 50);
                } else if (score >= 50 && score < 75) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', 'gold');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 75);
                } else if (score >= 75 && score < 100) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', '#00b389');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 100);
                } else if (score >= 100 && score < 150) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', '#CCFFFF');
                    $('.yourself .value').text(resp.data.masterYourself.value + '/' + 150);
                } else if (score >= 150) {
                    $('.yourself .rank').text(resp.data.masterYourself.level)
                    $('.yourself .rank').css('color', 'purple');
                    $('.yourself .value').text(resp.data.masterYourself.value);
                }
            } else {
                $('.yourself .rank').text('Unranked')
            }

            if (resp.data.masterEnemy) {
                score = resp.data.masterEnemy.value;

                if (score < 3) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', '#2e2e2e');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 5);
                } else if (score >= 3 && score < 7) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', '#646464');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 7);
                } else if (score >= 7 && score < 15) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', '#CD7F32');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 15);
                } else if (score >= 15 && score < 25) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', 'silver');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 25);
                } else if (score >= 25 && score < 40) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', 'gold');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 40);
                } else if (score >= 40 && score < 60) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', '#00b389');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 60);
                } else if (score >= 60 && score < 100) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', '#CCFFFF');
                    $('.enemy .value').text(resp.data.masterEnemy.value + '/' + 100);
                } else if (score >= 100) {
                    $('.enemy .rank').text(resp.data.masterEnemy.level)
                    $('.enemy .rank').css('color', 'purple');
                    $('.enemy .value').text(resp.data.masterEnemy.value);
                }

            } else {
                $('.enemy .rank').text('Unranked')
            }




            let level;

            if (resp.data.masterTank) {
                level = resp.data.masterTank.level;
                score = resp.data.masterTank.value;

                if (score < 1) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', '#2e2e2e');
                    $('.tank .value').text(score + '/' + 1);
                } else if (score >= 1 && score < 3) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', '#646464');
                    $('.tank .value').text(score + '/' + 3);
                } else if (score >= 3 && score < 5) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', '#CD7F32');
                    $('.tank .value').text(score + '/' + 5);
                } else if (score >= 5 && score < 10) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', 'silver');
                    $('.tank .value').text(score + '/' + 10);
                } else if (score >= 10 && score < 20) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', 'gold');
                    $('.tank .value').text(score + '/' + 20);
                } else if (score >= 20 && score < 30) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', '#00b389');
                    $('.tank .value').text(score + '/' + 30);
                } else if (score >= 30 && score < 40) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', '#CCFFFF');
                    $('.tank .value').text(score + '/' + 40);
                } else if (score >= 40) {
                    $('.tank .rank').text(level)
                    $('.tank .rank').css('color', 'purple');
                    $('.tank .value').text(score);
                }

            } else {
                $('.tank .rank').text('Unranked')
            }

            if (resp.data.masterMarksman) {
                level = resp.data.masterMarksman.level;
                score = resp.data.masterMarksman.value;

                if (score < 1) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', '#2e2e2e');
                    $('.marksman .value').text(score + '/' + 1);
                } else if (score >= 1 && score < 3) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', '#646464');
                    $('.marksman .value').text(score + '/' + 3);
                } else if (score >= 3 && score < 5) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', '#CD7F32');
                    $('.marksman .value').text(score + '/' + 5);
                } else if (score >= 5 && score < 10) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', 'silver');
                    $('.marksman .value').text(score + '/' + 10);
                } else if (score >= 10 && score < 15) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', 'gold');
                    $('.marksman .value').text(score + '/' + 20);
                } else if (score >= 15 && score < 20) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', '#00b389');
                    $('.marksman .value').text(score + '/' + 30);
                } else if (score >= 20 && score < 30) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', '#CCFFFF');
                    $('.marksman .value').text(score + '/' + 30);
                } else if (score >= 30) {
                    $('.marksman .rank').text(level)
                    $('.marksman .rank').css('color', 'purple');
                    $('.marksman .value').text(score);
                }
            } else {
                $('.marksman .rank').text('Unranked')
            }

            if (resp.data.masterSupport) {
                level = resp.data.masterSupport.level;
                score = resp.data.masterSupport.value;

                if (score < 1) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', '#2e2e2e');
                    $('.support .value').text(score + '/' + 1);
                } else if (score >= 1 && score < 3) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', '#646464');
                    $('.support .value').text(score + '/' + 3);
                } else if (score >= 3 && score < 5) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', '#CD7F32');
                    $('.support .value').text(score + '/' + 5);
                } else if (score >= 5 && score < 10) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', 'silver');
                    $('.support .value').text(score + '/' + 10);
                } else if (score >= 10 && score < 15) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', 'gold');
                    $('.support .value').text(score + '/' + 20);
                } else if (score >= 15 && score < 20) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', '#00b389');
                    $('.support .value').text(score + '/' + 30);
                } else if (score >= 20 && score < 30) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', '#CCFFFF');
                    $('.support .value').text(score + '/' + 30);
                } else if (score >= 30) {
                    $('.support .rank').text(level)
                    $('.support .rank').css('color', 'purple');
                    $('.support .value').text(score);
                }
            } else {
                $('.support .rank').text('Unranked')
            }

            if (resp.data.masterFighter) {
                level = resp.data.masterFighter.level;
                score = resp.data.masterFighter.value;

                if (score < 1) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', '#2e2e2e');
                    $('.fighter .value').text(score + '/' + 1);
                } else if (score >= 1 && score < 5) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', '#646464');
                    $('.fighter .value').text(score + '/' + 5);
                } else if (score >= 5 && score < 12) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', '#CD7F32');
                    $('.fighter .value').text(score + '/' + 12);
                } else if (score >= 12 && score < 20) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', 'silver');
                    $('.fighter .value').text(score + '/' + 20);
                } else if (score >= 20 && score < 30) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', 'gold');
                    $('.fighter .value').text(score + '/' + 30);
                } else if (score >= 30 && score < 50) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', '#00b389');
                    $('.fighter .value').text(score + '/' + 50);
                } else if (score >= 50 && score < 70) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', '#CCFFFF');
                    $('.fighter .value').text(score + '/' + 70);
                } else if (score >= 70) {
                    $('.fighter .rank').text(level)
                    $('.fighter .rank').css('color', 'purple');
                    $('.fighter .value').text(score);
                }

            } else {
                $('.fighter .rank').text('Unranked')
            }


            if (resp.data.masterMage) {

                level = resp.data.masterMage.level;
                score = resp.data.masterMage.value;

                if (score < 1) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', '#2e2e2e');
                    $('.mage .value').text(score + '/' + 1);
                } else if (score >= 1 && score < 5) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', '#646464');
                    $('.mage .value').text(score + '/' + 5);
                } else if (score >= 5 && score < 12) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', '#CD7F32');
                    $('.mage .value').text(score + '/' + 12);
                } else if (score >= 12 && score < 18) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', 'silver');
                    $('.mage .value').text(score + '/' + 18);
                } else if (score >= 18 && score < 25) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', 'gold');
                    $('.mage .value').text(score + '/' + 25);
                } else if (score >= 25 && score < 45) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', '#00b389');
                    $('.mage .value').text(score + '/' + 45);
                } else if (score >= 45 && score < 65) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', '#CCFFFF');
                    $('.mage .value').text(score + '/' + 65);
                } else if (score >= 65) {
                    $('.mage .rank').text(level)
                    $('.mage .rank').css('color', 'purple');
                    $('.mage .value').text(score);
                }
            } else {
                $('.mage .rank').text('Unranked')
            }

            if (resp.data.masterAssassin) {
                level = resp.data.masterAssassin.level;
                score = resp.data.masterAssassin.value;

                if (score < 1) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', '#2e2e2e');
                    $('.assasin .value').text(score + '/' + 1);
                } else if (score >= 1 && score < 5) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', '#646464');
                    $('.assasin .value').text(score + '/' + 5);
                } else if (score >= 5 && score < 10) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', '#CD7F32');
                    $('.assasin .value').text(score + '/' + 10);
                } else if (score >= 10 && score < 15) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', 'silver');
                    $('.assasin .value').text(score + '/' + 15);
                } else if (score >= 15 && score < 25) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', 'gold');
                    $('.assasin .value').text(score + '/' + 25);
                } else if (score >= 25 && score < 35) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', '#00b389');
                    $('.assasin .value').text(score + '/' + 35);
                } else if (score >= 35 && score < 45) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', '#CCFFFF');
                    $('.assasin .value').text(score + '/' + 45);
                } else if (score >= 45) {
                    $('.assasin .rank').text(level)
                    $('.assasin .rank').css('color', 'purple');
                    $('.assasin .value').text(score);
                }
            } else {
                $('.assasin .rank').text('Unranked')
            }




        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {



        }
    });

}

function renderChampions(type) {

    $('.champions-list').empty();

    let filteredList = masteryData;

    if (selectedRole == 'all') {
        filteredList = masteryData;
    } else if (selectedRole == 'bot') {
        filteredList = masteryData.filter(item => item.lanes.indexOf("ADC") > -1);
    } else if (selectedRole == 'jg') {
        filteredList = masteryData.filter(item => item.lanes.indexOf("JUNGLE") > -1);
    } else if (selectedRole == 'mid') {
        filteredList = masteryData.filter(item => item.lanes.indexOf("MID") > -1);
    } else if (selectedRole == 'sup') {
        filteredList = masteryData.filter(item => item.lanes.indexOf("SUPPORT") > -1);
    } else if (selectedRole == 'top') {
        filteredList = masteryData.filter(item => item.lanes.indexOf("TOP") > -1);
    }

    filteredList = filteredList.filter(item => {
        if (hideM7) {
            return item.championLevel != 7
        } else {
            return true;
        }
    }).filter(item => {
        if (hideM6) {
            return item.championLevel != 6
        } else {
            return true;
        }
    }).filter(item => {
        if (hideM5) {
            return item.championLevel != 5
        } else {
            return true;
        }
    })

    filteredList.forEach(item => {

        let championName = champData[item.championId].id;

        let totalPointsForNextLevel = item.championPointsUntilNextLevel + item.championPointsSinceLastLevel;

        let donePercent = ((item.championPointsSinceLastLevel / totalPointsForNextLevel) * 100) * 0.9;

        let tokenColor = 'white';

        if (item.championLevel == 5) {
            tokenColor = '#ba68c8';
        } else if (item.championLevel == 6) {
            tokenColor = 'cyan';
        }

        let token = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${tokenColor}" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
          </svg>
        `
        let tokensHtml = `<div class="tokens-container"></div>`;

        if (item.tokensEarned == 1) {
            tokensHtml =
                `
                  <div class="tokens-container">
                    ${token}
                  </div>
          `
        } else if (item.tokensEarned == 2) {
            tokensHtml =
                `
                  <div class="tokens-container">
                    ${token}
                    ${token}
                  </div>
          `
        } else if (item.tokensEarned == 3) {
            tokensHtml =
                `
                  <div class="tokens-container">
                    ${token}
                    ${token}
                    ${token}
                  </div>
          `
        }

        let htmlItem = item.championPointsUntilNextLevel != 0 ? `

                <div class="champion-item">
                  <h2>${championName}</h2>
                  <div class="img-wrapper">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${championName}.png"/>
                  </div>
                  <h4 class="level${item.championLevel}">Mastery ${item.championLevel}</h4>
                  <h4 class="progress-bar-text">${item.championPointsSinceLastLevel.toLocaleString()} / ${totalPointsForNextLevel.toLocaleString()}</h4>
                  <div class="progress-box">
                    <div style="width: ${donePercent}%" class="progress-bar"></div>
                  </div>
                </div>

        ` : `

                <div class="champion-item">
                  <h2>${championName} </h2>
                  <div class="img-wrapper">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${championName}.png"/>
                  </div>` + tokensHtml + `
                  <h4 class="level${item.championLevel}">Mastery ${item.championLevel}</h4>
                  <h4 class="maxed">${item.championPoints.toLocaleString()}</h4>
                </div>`;

        $('.champions-list').append(htmlItem);


    })



}


$("#userName").keypress(function(event) {

    if (event.keyCode == 13) {
        $(this).prop("disabled", true);



        let inputText = $("#userName").val();

        let parsed = inputText.split('#');

        if (!parsed[0] || !parsed[1]) {
            let errorText = 'Invalid input';
            $(this).prop("disabled", false);
            $(this).attr("placeholder", errorText);
            $("#userName").val('');
            return;
        }

        let name = parsed[0];
        let tag = parsed[1]

        loading = true;
        $('.fa-magnifying-glass').hide();
        $('.fa-spinner').show();

        selectedMappedRegion = regionMap[selectedRegion];


        getMasteryData(name, tag, selectedMappedRegion);


    } else {
        $(this).attr("placeholder", 'name#tag');
    }

})


function parseData() {

    if (score < 100) {

        nextUpgrade = '100';

    } else if (score >= 100 && score < 500) {

        nextUpgrade = '500';

    } else if (score >= 500 && score < 1000) {

        nextUpgrade = '1000';

    } else if (score >= 1000 && score < 5000) {

        nextUpgrade = '5000';

    } else if (score >= 5000 && score < 10000) {

        nextUpgrade = '10000';

    } else if (score >= 10000 && score < 50000) {

        nextUpgrade = '50000';

    } else if (score >= 50000 && score < 100000) {

        nextUpgrade = '100000';

    } else if (score >= 100000) {

        nextUpgrade = null;

    }


}