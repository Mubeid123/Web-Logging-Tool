
//Requiring all the express libraries
const express = require('express');
//Requiring all the datastore libraries
const Datastore = require('nedb');
//Storing express in app
const app = express();


//listing to port 3000
app.listen(3000, () => console.log("listening at port 3000"));
//using express
app.use(express.static('public'));
//using express again
app.use(express.json({limit: '1mb'}));


//initializing database
const database = new Datastore('database.db');
//loading database
database.loadDatabase();


//initializing the secind database
const database2 = new Datastore('database2.db');
//loading database
database2.loadDatabase();



//for api get call from index.html
app.get('/api', (request, response) => {
	database.find({}, function (err,docs){
	response.json(docs);
});
});



//for api2 get call from index.html
app.get('/api2', (request, response) => {
	//finding datbase
	database2.find({}, function (err,docs2){
	response.json(docs2);
});
});



//for api post call from index.html
app.post('/api', (request, response) => {

//storing in database
    const data = request.body;
		//getiing timestamp
    const timestamp = Date.now();
		//storing timestamp
    data.timestamp = timestamp;
		//inserting data
    database.insert(data);
		//giving response
    response.json(data);
});

//for api2 post call from index.html
app.post('/api2', (request, response) => {
//storing in database
    const data = request.body;
			//getiing timestamp
    const timestamp = Date.now();
		//inserting data
    data.timestamp = timestamp;
		//giving response
    database2.insert(data);
    response.json(data);
});
