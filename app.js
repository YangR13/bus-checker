var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('place and time', function(msg){
		console.log('place and time: '+ msg);
		sendTestData(socket);
	});
});

http.listen(80, function() {
	console.log('listening on *:80');
});

function sendTestData(socket) {
	var text = '{"agency_name":"MTD", "stops": [{"stop_name": "UCSB Bus Loop","stop_distance": "10","directions": [{"direction_id": "0","direction_name": "North","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]},{"direction_id": "1","direction_name": "South","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]}]},{"stop_name": "Sierra Madre","stop_distance": "2000","directions": [{"direction_id": "0","direction_name": "North","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]},{"direction_id": "1","direction_name": "South","routes": [{"route_short_name": "24x","route_id": "1","route_color": "blue","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]},{"route_short_name": "11","route_id": "2","route_color": "red","trip_headsign": "Marketplace","arrival_times": ["10:00AM", "11:00AM", "12:00AM"]}]}]}]}';
	socket.emit('place and time', text);
}