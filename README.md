# request-scheduler
This is a simple api on top of agenda for scheduling http requests (get and post), smart enough to understand timezones

`git clone https://github.com/debianmaster/request-scheduler.git`  
`cd request-scheduler`  
`npm install`  
`node server.js`  


### Testing
make a post request to

`http://localhost:9000/schedule`   
```json
{
    "method": "GET",
    "uri": "http://localhost:8080/ui/outages/yo",
    "when":"2015-10-18 12:16",
    "timezone" : "Asia/Kolkata"
}
```

Note:  
> json format above support (https://github.com/request/request)  
> A Running mongodb connection is required (defaults to localhost)

