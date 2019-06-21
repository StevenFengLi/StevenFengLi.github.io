
function initDemoMap(){
    var Esri_DarkGreyCanvas = L.tileLayer(
        "http://{s}.sm.mapstack.stamen.com/" +
        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
        "{z}/{x}/{y}.png",
        {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
            'and the GIS User Community'//, Esri Japan, METI, Esri China (Hong Kong)
        }
	);
    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });



    var baseLayers = {
		"Grey Canvas": Esri_DarkGreyCanvas,
        "Satellite": Esri_WorldImagery,
    };

    var map = L.map('map', {
		center:[23.127,113.260],
		zoom:8,
        layers: [  Esri_DarkGreyCanvas ]
    });

    var layerControl = L.control.layers(baseLayers);
    layerControl.addTo(map);
    map.setView([23.127,113.260],8);

    return {
        map: map,
        layerControl: layerControl
    };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;

// load data (u, v grids) from somewhere (e.g. https://github.com/danwild/wind-js-server)
$.getJSON('wind-gbr.json', function (data) {

	var velocityLayer = L.velocityLayer({
		displayValues: true,
		displayOptions: {
			velocityType: 'GBR Wind',
			displayPosition: 'bottomleft',
			displayEmptyString: 'No wind data'
		},
		data: data,
		maxVelocity: 10
	});

	layerControl.addOverlay(velocityLayer, 'Wind - Great Barrier Reef');
});

$.getJSON('water-gbr.json', function (data) {

	var velocityLayer = L.velocityLayer({
		displayValues: true,
		displayOptions: {
			velocityType: 'GBR Water',
			displayPosition: 'bottomleft',
			displayEmptyString: 'No water data'
		},
		data: data,
		maxVelocity: 0.6,
		velocityScale: 0.1 // arbitrary default 0.005
	});

	layerControl.addOverlay(velocityLayer, 'Ocean Current - Great Barrier Reef');
});

$.getJSON('wind-global.json', function (data) {

	var velocityLayer = L.velocityLayer({
		displayValues: true,
		displayOptions: {
			velocityType: 'Global Wind',
			displayPosition: 'bottomleft',
			displayEmptyString: 'No wind data'
		},
		data: data,
		maxVelocity: 15
	});

	layerControl.addOverlay(velocityLayer, 'Wind - Global');
	velocityLayer.addTo(map)
});



