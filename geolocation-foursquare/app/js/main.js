/**
 * DISCLAIMER: DO NOT LOOK AT THIS CODE.
 */
/**
 * Foursquare API
 */

var CLIENT_ID = 'M5L2G1POSXVEZXOA5WIPNDS3LKOQ0LUL5XC3XY0KS4YJOVIV';
var CLIENT_SECRET = 'NSFSELB2430L2HVXFZIX5VBUBJTM10022JCX4IZ3VVJZA2WK';

var FOURSQR_ENDPOINT_SEARCH_VENUES = 'https://api.foursquare.com/v2/venues/search' +
               '?client_id=' + CLIENT_ID +
               '&client_secret=' + CLIENT_SECRET +
               '&v=20131004' +
               '&ll=';

var output = document.getElementById('out');
var loc = navigator.geolocation;

function getVenuesByLoc(latitude, longitude) {
    out.innerHTML = "<p>Fetching data from Foursquare…</p>";

    function updateOutput(venues) {
        if (!Array.isArray(venues)) {
            out.innerHTML = "<p>Something bad happened (check console)…</p>";
            return;
        }
        var fragment = document.createDocumentFragment();
        var ul = document.createElement('ul');
        venues.forEach(function(el) {
            var li = document.createElement('li');
            li.textContent = el.name;
            ul.appendChild(li);
        });
        fragment.appendChild(ul);
        out.appendChild(fragment);
    };

    var url = FOURSQR_ENDPOINT_SEARCH_VENUES + latitude + ',' + longitude;

    var xhr = new XMLHttpRequest({mozSystem: true});

    xhr.open("GET", url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
      console.log('XHR fired onload - ' + xhr.status);
      if (xhr.status === 200 || xhr.status === 0) {
        updateOutput(xhr.response.response.venues);
      } else {
        out.innerHTML = '<p>Something bad happened (status=' + xhr.status + ')…</p>';
        console.error('Status=' + xhr.status);
      }
    };

    xhr.onerror = function(e) {
        console.error('Status=' + xhr.status);
    };

    xhr.send();
}

function testGeo() {
    if (!loc) {
        console.log('Oh dear…');
        button.disabled = true;
        return;
    }
}

function getLocation() {
    function onSuccess(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        output.appendChild(img);

        setTimeout(function() {
            getVenuesByLoc(latitude, longitude)
        }, 1000);
    }

    function onError(e) {
        console.log('ouch' + e.code + '     ' + e.message);
        output.innerHTML = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    output.innerHTML = "<p>Locating…</p>";
}

var button = document.getElementById('geolocation');
button.addEventListener('click', getLocation);