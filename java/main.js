// --- datum weergeven ---- 

function date(){
		var today = new Date();
		var maanden = new Array('januari', 'febuari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
		var dagenWeek = new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag');

		document.getElementById('date').innerHTML = dagenWeek[today.getDay()] + ' ' + today.getDate() + " " + maanden[today.getMonth()];
}

date();


// -------- google maps ingezoomd op amerika, een paar staten ------


mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YXNoYXZhbmJlcmtlbCIsImEiOiJja21rbDgxbDkxMjBtMm9xb2czY2k2N3NiIn0.VgIbRp4Rwqe_McbWS59Ufg';
 
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-94.3133822598451, 43.754724751545865],
  zoom: 2
});

// Voeg de zoekbalk toe
/*
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'top-right'
);*/


// ---------- map coordinaten voor landingsplaatsen -------- 

map.on('load', function () {
	map.addSource('places', {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': [
				{

					'type': 'Feature',
					'properties': {
						'description': ' ',
						'icon': 'rocket',
						'city' : 'Lake Placid',
						'state' : 'Florida'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': 
							[-81.50413498398395, 27.282916704051974]
							
					}
				},
				{
					'type': 'Feature',
					'properties': {
						'description': ' ',
						'icon': 'rocket',
						'city' : 'Clanton',
						'state' : 'Georgia'

					},
					'geometry': {
						'type': 'Point',
						'coordinates': 
							[-86.72128273225256, 32.86161011241627]
							
					}
				},
				{
					'type': 'Feature',
					'properties': {
						'description': '',
						'icon': 'rocket',
						'city' : 'Fresno',
						'state' : 'Los Angeles'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': 
							[-119.89239653401583, 36.65330216537845]
			
					}
				},
				{
					'type': 'Feature',
					'properties': {
						'description': '',
						'icon': 'rocket',
						'city' : 'Roslyn',
						'state' : 'Washington'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': 
							[-120.73058821898628, 47.281048731057886]
							
					}
				},
				{
					'type': 'Feature',
					'properties': {
						'description': '',
						'icon': 'rocket',
						'city' : 'Manlius',
						'state' : 'New York'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': 
							[-75.92244864716291, 43.0230514151249]
							
					}
				},
				{
					'type': 'Feature',
					'properties': {
						'description': '',
						'icon': 'rocket',
						'city' : 'Lincoln',
						'state' : 'Illinois'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [-89.51534855666665, 40.39194344472404]
						, 
					}
				},
				{
					'type': 'Feature',
					'properties': {
						'description': '',
						'icon': 'rocket',
						'city' : 'Payson',
						'state' : 'Arizona'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': 
							[-111.88860949902987, 34.433672645287075]
		
					}
				}
			]
		}
});

map.addLayer({
	'id': 'places',
	'type': 'symbol',
	'source': 'places',
	'layout': {
		'icon-image': '{icon}-15',
		'icon-allow-overlap': true
	}
});

map.on('click', 'places', function (e) {
	var coordinates = e.features[0].geometry.coordinates.slice();
	var description = e.features[0].properties.description;
	var city = e.features[0].properties.city;
	var state = e.features[0].properties.state;
	var key = 'a972d79cae78f2049b95a98b0d55603b';
    var weatherLink = 'https://api.openweathermap.org/data/2.5/weather?appid=' + key + '&q=' + city;

	fetch(weatherLink)

    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
        var weatherBox = document.getElementById('weather');
        var degC = Math.floor(response.main.temp -  273.15);
		var corona = document.getElementById('corona');
        new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(
				city + ' ' + state + ' ' + degC + '&#176;C' + 
				'<p>' + description + '</p>')
			.addTo(map);
		});
 
    });


// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
	map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
	map.getCanvas().style.cursor = '';
});

});



/* --- poging om corona cijfers te tonen --- 

// ---- corona cases per land  

var request = 'https://corona.lmao.ninja/v2/countries/Italy,Netherlands?yesterday';
	fetch(request)

	.then(function(responseCorona) {
		//if(!response.ok) throw Error(response.statusText);
		return responseCorona.json();
	})

	.then(function(responseCorona) {
		console.log(responseCorona);
		var corona = document.getElementById('corona');
		//corona.innerHTML = response;
		corona.innerHTML = responseCorona[0].cases;
	})*/


// --- poging 2

/*function coronaData (){

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://corona.lmao.ninja/v2/countries/Italy,Netherlands,America?yesterday", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

 }

coronaData();*/

//----------- poging 3, deze functie werkt, toegevoegd aan maps, maar niet gelukt helaas 

/*function coronaData() {

	var request = 'https://corona.lmao.ninja/v2/countries/Italy,Netherlands?yesterday';
	fetch(request)

	.then(function(responseCorona) {
		//if(!response.ok) throw Error(response.statusText);
		return responseCorona.json();
	})

	.then(function(responseCorona) {
		console.log(responseCorona);
		var corona = document.getElementById('corona');
		//corona.innerHTML = response;
		corona.innerHTML = responseCorona[0].cases;
	})
}

coronaData();*/

// poging 4 hier maar bij gelaten 
/* 
function coronaData() {

	var request = 'https://corona.lmao.ninja/v2/countries/Italy,Netherlands?yesterday';
	fetch(request)

	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

	.then(function(response) {
		onAPISucces(response);
	})

	.catch(function(error){
		onAPIError(error)
	});

}

function onAPISucces(response) {
	var type = response[0].cases;
	var waarde = response[0].deaths;

	var corona = document.getElementById('corona');
	corona.innerHTML = type + waarde;
}

function onAPIError(error) {
	console.error('request failed', error);
	var corona = document.getElementById('corona');
	corona.className = 'hidden';
}

coronaData();


console.log(response);
	var corona = document.getElementById('corona');
	corona.innerHTML = response[0].cases;

*/









