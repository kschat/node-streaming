var http = require('http'),
	fs = require('fs');

var pageContent = fs.readFileSync('index.html', {'encoding': 'utf8'}).split(''),
	intervalTime = 5,
	timeoutTime = pageContent.length * intervalTime;

http.createServer(function(req, res) {
	var index = 0;

	res.writeHead(200, { 
		'content-type' : 'text/html',
		'transfer-encoding': 'chunked',
		'connection': 'keep-alive',
		'cache-control': 'no-cache, must-revalidate',
		'pragma': 'no-cache',
		'expires': 'Expires: Sat, 26 Jul 1997 05:00:00 GMT'
	});

	var intervalId = setInterval(function() {
		res.write(pageContent[index]);
		index++;
	}, intervalTime);

	setTimeout(function() {
		clearInterval(intervalId);
		res.end();
	}, timeoutTime);
}).listen(process.env.PORT || 3000);