"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true, includePath: true});

var app = express();

app.use(bodyParser.json());
app.use(metricsMiddleware);

app.get("/",(req,res)=>{
    res.send("Request Logger is UP");
});

app.post("/api/v1/alerts",(req,res)=>{   
    console.log("Prom post request",req.body);
    fs.appendFile("./promreqobject.json",JSON.stringify(req.body)+"\n\n",(err) => {
        if (err) 
            res.status("500").send();
        console.log('promreqobject has been saved!');
        res.end("promreqobject has been saved");
      });    
});

app.post("/",(req,res)=>{
    console.log("Alertmanager post request",req.body);
    fs.appendFile("./alertmanagerreqobject.json",JSON.stringify(req.body)+"\n\n",(err) => {
        if (err) 
            res.status("500").send();
        console.log('alertmanagerreqobject has been saved!');
        res.end("alertmanagerreqobject has been saved");
      });
});

var server = app.listen(9094, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.info("app listening at http://%s:%s", host, port)
 });