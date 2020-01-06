var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__480.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg"}
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    // res.send("You hit the the POST route") testing purposes
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3001, function(){
    console.log( "The YelpCamp Server has started!!");
});