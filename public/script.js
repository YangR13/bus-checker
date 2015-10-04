var socket = io();
var room = 'asdf';

socket.on('data package', function(msg){
	console.log("incoming data!");
	loadData(JSON.parse(msg));
});

window.onload = function() {
	getLocation();
}

function getLocation() {
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(requestData);
    } else {
        // show error message?
    }
}

function requestData(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	var date = new Date();
	var hours = date.getHours().toString();
	var minutes = date.getMinutes();
	minutes = (minutes < 10 ? '0': '')+minutes.toString();
	
	var time = hours + ':' + minutes;

	socket.emit('data request', latitude+','+longitude+','+time);
}

function loadData(jsonData) {
	addAgencyName(jsonData.agency_name);
	for(var i=0; i<jsonData.stops.length; i++) {
		addBusStop(jsonData.stops[i]);
	}
}

function addAgencyName(agencyName) {
	document.getElementById("agency-name").innerHTML = agencyName;
}

function addBusStop(stopData) {
	
	var busStopList = document.getElementById("bus-stop-list");
	var busStop = document.createElement("DIV");
	busStop.className = "bus-stop";
	busStop.innerHTML = '<span class="bus-stop-name">'+stopData.stop_name+'</span><span class="bus-stop-distance"> ('+stopData.stop_distance+' mi)</span><div class="bus-direction"><span class="bus-direction-name">'+stopData.directions[0].direction_name+'</span></div><div class="bus-direction"><span class="bus-direction-name">'+stopData.directions[1].direction_name+'</span></div>';
	
	for(var dir=0; dir<2; dir++) {
			
		for(var i=0; i<stopData.directions[dir].routes.length; i++) {
			var route = stopData.directions[dir].routes[i];
		
			var busDirection = busStop.childNodes[dir+2];
			var busLine = document.createElement("DIV");
			busLine.className = "bus-line";
			busLine.innerHTML = '<span class="bus-line-name" style="background-color:'+route.route_color+'">'+route.route_short_name+'</span><span class="bus-line-time">'+route.arrival_times[0]+'</span><span class="bus-line-time">'+route.arrival_times[1]+'</span><span class="bus-line-time">'+route.arrival_times[2]+'</span>';
		
			busDirection.appendChild(busLine);
		}
	}
	busStopList.appendChild(busStop);
}
