var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

var server=app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io=require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
	socket.on('new_name',function(data){
		console.log(data);
		socket.broadcast.emit('got_new_name',data);
	});

	socket.on('new_message',function(data){
		console.log(data);
		io.emit('message_sent',data);
	})

});