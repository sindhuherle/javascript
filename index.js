var express = require('express');
var mongo = require('mongodb').MongoClient;
var url=require('url');
var qs=require('querystring');
var uri = "mongodb://amit:desh@ds031691.mongolab.com:31691/mydatabase";
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/', function(request, response) {
				var body='';
				request.on('data', function (data) {
                body +=data;
				console.log(body);
            });
            request.on('end',function(){                
                var doctor=JSON.parse(body);                
				console.log(doctor.firstName);
				console.log(doctor.lastName);
				console.log(doctor.contactNumber);				
				console.log(doctor.emailId);				
				
				mongo.connect(uri,function(err,db){
					if(err) {
						console.log("Error: unable to connect to database");
						response.send('Unable to connect to mongo db');
						return;
					}
				  
					db.collection('doctor_Info').insert({firstName:doctor.firstName, lastName:doctor.lastName,contactNumber:doctor.contactNumber,emailId:doctor.emailId},function(err, result) {
					console.log("inserted");
					});
						
				});
				
				response.send('Doctor Details'+doctor.firstName+doctor.lastName+doctor.contactNumber+doctor.emailId);
				
				
            });
			console.log('inside post method');
	
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
