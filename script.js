let MAP_WIDTH = 1035;
let MAP_HEIGHT = 827;

var yx = L.latLng;
var xy = function(x, y)
{
	//converts coords with (reference = top-left) to (reference = bottom-left)
	return yx(MAP_HEIGHT - y, x);
};



// icons
var my_icon_template = L.Icon.extend({
    options: {
        shadowUrl: './icons/ico_SHADOW.png',
        iconSize:     [23, 39],
        shadowSize:   [26, 23],
        iconAnchor:   [11, 38],
        shadowAnchor: [0, 22],
        popupAnchor:  [11, -25]
    }
});



//Now we can create all three of our leaf icons from this class and use them:

var greenIcon = new my_icon_template({iconUrl: 'leaf-green.png'}),
    redIcon = new my_icon_template({iconUrl: 'leaf-red.png'}),
    orangeIcon = new my_icon_template({iconUrl: 'leaf-orange.png'});



var my_layers = [];
var my_icons = [];
var my_overlays = {};

var my_data = map_data.data

for(category in my_data)
{
	console.log(category);
	let group = L.layerGroup();
	my_overlays[category] = group;

	let my_icon = new my_icon_template({iconUrl: map_data.icons[category].icon});

	console.log(map_data.icons[category].icon)
	console.log(my_icon)

	for(item in my_data[category])
	{
		let cursor = my_data[category][item]
		for (var i = 0; i < cursor.pos.length; i++)
		{
			let label = cursor.name;
			if(cursor.pos[i].label != undefined)
				label = cursor.pos[i].label;
			L.marker(xy(cursor.pos[i].x,cursor.pos[i].y), {icon: my_icon}).bindPopup(label).addTo(group);
		}
	}
}
//map_data.data.NPC[1].pos[0].x
//map_data.data.NPC[1].pos[0][1]


/*var list_of_teleporters = L.layerGroup();

var chi = L.marker(xy(315,654)).bindPopup('Mount Chibi').addTo(list_of_teleporters);
var mis = L.marker(xy(649, 320)).bindPopup('Misty Hills').addTo(list_of_teleporters);
var fis = L.marker(xy(505, 537)).bindPopup('Fishers Refuge').addTo(list_of_teleporters);
var mag = L.marker(xy(894, 335)).bindPopup('Mount Magma').addTo(list_of_teleporters);
var sno = L.marker(xy(690, 771)).bindPopup('Snowy Peak').addTo(list_of_teleporters);

var list_of_wololo = L.layerGroup();*/


//define the map system
var map = L.map('map', {crs: L.CRS.Simple,layers: my_layers});
//todo : read the doc to figure what this is
var bounds = [[0,0], [MAP_HEIGHT,MAP_WIDTH]];
//load the bg map
var image = L.imageOverlay('map.png', bounds).addTo(map);
//apply all we set up
map.fitBounds(bounds);



var layerControl = L.control.layers(null, my_overlays).addTo(map);

//set the height of the map to be (whole screen - title)
let themap = document.getElementById("map")
let thetitle = document.getElementsByTagName("H1")[0]
themap.style.height = window.innerHeight - thetitle.offsetHeight +"px"
//cleaning leaflet
/*let flag = document.getElementsByTagName("A")[3];
flag.removeChild(flag.firstChild);*/