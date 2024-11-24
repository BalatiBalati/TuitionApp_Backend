var express = require("express");
var http = require("http");

var app = express();

app.use(function(req, res){
    console("Hello to the Secret INfo app");
});

app.listen(3007, function(){
    comsole.log("App started on Port 3007");
});