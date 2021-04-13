var CLIENT_ID = "3HOWAEZDHCEUXJXWUAM5FWOZRF1QLJUFQOLPFXGD4YJMWTG0";
var CLIENT_SECRET = "NJVMVP2OA1HFOJNDZWZBBR45CB0ZHVL2EK4ECHLLPVKBG4XN";
var FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=YYYYMMDD";

$.ajax({
    dataType: "json",
    url: "https://api.foursquare.com/v2/venues/explore?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20180323&limit=1&ll=40.7243,-74.0018&query=sushi",
    data: {},
    success: function( data ) {
      // Code for handling API response
      console.log("success login?");
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("error ajax");
      // Code for handling errors
    }
  });

  function getGoogleMapData() {

  }


function getFourSquareData() {
    $('.category-button').click(function () {
        let city = $('.search-query').val();
        let category = $(this).text();
        console.log("city: ", city);
        console.log("query", dat.query);
        console.log("section", data.category)
        $.ajax(FOURSQUARE_SEARCH_URL, {
            data: {
                near: city,
                venuePhotos: 1,
                limit: 9,
                query: 'recommended',
                section: category,
            },
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                try {
                    console.log("search success data");
                    console.log(data);
                    let results = data.response.groups[0].items.map(function (item, index) {
                        return displayResults(item);
                    });
                    $('#foursquare-results').html(results);
                    scrollPageTo('#foursquare-results', 15);
                } catch (e) {
                    $('#foursquare-results').html("<div class='result'><p>Sorry! No Results Found.</p></div>");
                }
            },
            error: function () {
                $('#foursquare-results').html("<div class='result'><p>Sorry! No Results Found.</p></div>");
            }
        });
    });
}


function displayResults(result) {
    console.result("result");
    return `
        <div class="result col-3">
            <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960${result.venue.photos.groups[0].items[0].suffix})" ;>
            </div>
            <div class="result-description">
                <h2 class="result-name"><a href="${result.venue.url}" target="_blank">${result.venue.name}</a></h2>
                <span class="icon">
                    <img src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category-icon">
                </span>
                <span class="icon-text">
                    ${result.venue.categories[0].name}
                </span>
                <p class="result-address">${result.venue.location.formattedAddress[0]}</p>
                <p class="result-address">${result.venue.location.formattedAddress[1]}</p>
                <p class="result-address">${result.venue.location.formattedAddress[2]}</p>
            </div>
        </div>
`;
}


function enterLocation() {
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });

    $('.search-form').submit(function (event) {
        event.preventDefault();
        $('.navigation').removeClass("hide");
        $('#foursquare-results').html("");
        // WTP start
        makeMap();
        //covidCases();
        // WTP end
        getFourSquareData();
        $('button').removeClass("selected");
    });
}

function makeMap() {
    $.ajax({
        // "https://maps.googleapis.com/maps/api/js?key=AIzaSyC24FpAeO5r6k8-Gras4giICU2KBBli1ZM&callback=initMap&libraries=&v=weekly"
        // url : 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + $("#origin").val() + '&destinations=' + $("#destinations").val() +'&mode=driving&key=AIzaSyASanevdiCI4t1h8LMf5FgWHMD52K3QeB0',
        url: "https://maps.googleapis.com/maps/api/js",
        type: "GET",
        data: {
          callback: initMap(),
          key: "AIzaSyC24FpAeO5r6k8-Gras4giICU2KBBli1ZM",
          libraries: ""
        },
        success: function(data) {
          console.log(data);
        }
      });
}

//autocomplete location name in form
function activatePlacesSearch() {
    let options = {
        types: ['(regions)']
    };
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    console.log("autocomplete ", autocomplete);
}

function covidCases( ) {
    // https://covid-api.mmediagroup.fr/v1/cases?country=France
    let city = $('.search-query').val();
    console.log("covidcases: ", city);
    $.ajax({
    type: 'GET',
    url: 'https://covid-api.mmediagroup.fr/v1/cases?city=Paris',
    success: function(data) {
        console.log(data);
    var cases = "Confirmed covid-19 cases France: " + data.All.confirmed + " Quelle horreur!";
    var covidEl = document.querySelector("#covid");
    covidEl.textContent = cases;
    }
    });
}

    // Initialize and add the map
    function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    }

//covidCases();

$(enterLocation);

/*
    <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC24FpAeO5r6k8-Gras4giICU2KBBli1ZM&callback=initMap&libraries=&v=weekly"
    async
  ></script>
*/
