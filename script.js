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
	var minutes = date.getMinutes().toString();
	
	var time = hours + ':' + minutes;
	
	// send request to server for data;
	
	console.log(latitude);
	console.log(longitude);
	console.log(time);
	
	loadDataTest();
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

function addBusStopTest() {
	var text = '{"stop_name": "UCSB Bus Loop","stop_distance": "10","directions": [{"direction_id": "0","direction_name": "North","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": [{"time":"10:00AM"},{"time":"11:00AM"},{"time":"12:00AM"}]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": [{"time":"10:00AM"},{"time":"11:00AM"},{"time":"12:00AM"}]}]},{"direction_id": "1","direction_name": "South","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": [{"time":"10:00AM"},{"time":"11:00AM"},{"time":"12:00AM"}]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": [{"time":"10:00AM"},{"time":"11:00AM"},{"time":"12:00AM"}]}]}]}';
	var stopData = JSON.parse(text);
	addBusStop(stopData);
}

function loadDataTest() {
	var text = '{"agency_name":"MTD", "stops": [{"stop_name": "UCSB Bus Loop","stop_distance": "10","directions": [{"direction_id": "0","direction_name": "North","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]},{"direction_id": "1","direction_name": "South","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]}]},{"stop_name": "Sierra Madre","stop_distance": "2000","directions": [{"direction_id": "0","direction_name": "North","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]},{"direction_id": "1","direction_name": "South","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]}]}]}';
	var jsonData = JSON.parse(text);
	loadData(jsonData);
}
