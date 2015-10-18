var express = require('express');
var Agenda = require('agenda');
var agendaUI = require('agenda-ui');
var moment        = require('moment-timezone');
var request       = require("request");
var sServerZone   = 'America/Los_Angeles';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
var mongoConnectionString = "mongodb://localhost:27017/agenda";
var agenda = new Agenda({db: {address: mongoConnectionString,collection:'jobs',options:{}}});

agenda.define('scheduleJob', function(job, done) {
  request(job.attrs.data, function(error, response, body){
    if(response.statusCode == 200)
    {
      job.remove(function(err){
        console.log("Job Removed Successfully");
        done();
      });
    }
    else
    {
      done();
    }
  });
});

agenda.start();
app.use('/agenda-ui', agendaUI(agenda, {poll: 1000}));
app.use(jsonParser);
app.post('/schedule',function(req,res){
    var objBody         = req.body; // Scheduling Parameter in Request.
    var sLocalTimeZone  = objBody.timezone || 'Atlantic/Azores';
    if(typeof(objBody.when) == 'undefined')
    {
      res.status(400).send("Invalid Request");
    }
    else
    {
      var job = agenda.create('scheduleJob', objBody);
      var dLocalTime   = moment.tz(objBody.when, sLocalTimeZone);
      var dServerTime  = dLocalTime.clone().tz(sServerZone);
      job.schedule(dServerTime.format("YYYY-MM-DD HH:mm:ss"));
      job.save(function(err) {
        res.status(200).send("Job successfully Saved.");
      });
    }
})

app.listen(9000);
