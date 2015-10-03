function loadData() {
	
}

function addAgencyName(agencyNameString) {
	
}

function addBusStop(busStopString) {
	
	var busStopName = 'The Moon';
	var busDirectionName1 = 'Direction A';
	var busDirectionName2 = 'Direction B';
	
	var busLineString;
	
	// parse busLineString here
	
	var busLineArray1 = ["", "", ""];	// Direction 1
	var busLineArray2 = ["", "", ""];	// Direction 2
	
	var busStopList = document.getElementById("bus-stop-list");
	var busStop = document.createElement("DIV");
	busStop.className = "bus-stop";
	busStop.innerHTML = '<span class="bus-stop-name">'+busStopName+'</span><div class="bus-direction"><span class="bus-direction-name">'+busDirectionName1+'</span></div><div class="bus-direction"><span class="bus-direction-name">'+busDirectionName2+'</span></div>';
	
	for(var i=0; i<busLineArray1.length; i++) {
		var busLineColor = "red";
		var busLineName = "1000";
		var busLineTimes = ["10:00AM", "10:15AM", "10:30AM"];
		
		var busDirection1 = busStop.childNodes[1];
		var busLine = document.createElement("DIV");
		busLine.className = "bus-line";
		busLine.innerHTML = '<span class="bus-line-name" style="background-color:'+busLineColor+'">'+busLineName+'</span><span class="bus-line-time">'+busLineTimes[0]+'</span><span class="bus-line-time">'+busLineTimes[1]+'</span><span class="bus-line-time">'+busLineTimes[2]+'</span>';
		
		busDirection1.appendChild(busLine);
	}
	for(var i=0; i<busLineArray2.length; i++) {
		var busLineColor = "blue";
		var busLineName = "2000";
		var busLineTimes = ["10:00AM", "10:15AM", "10:30AM"];
		
		var busDirection2 = busStop.childNodes[2];
		var busLine = document.createElement("DIV");
		busLine.className = "bus-line";
		busLine.innerHTML = '<span class="bus-line-name" style="background-color:'+busLineColor+'">'+busLineName+'</span><span class="bus-line-time">'+busLineTimes[0]+'</span><span class="bus-line-time">'+busLineTimes[1]+'</span><span class="bus-line-time">'+busLineTimes[2]+'</span>';
		
		busDirection2.appendChild(busLine);
	}
	
	busStopList.appendChild(busStop);
}