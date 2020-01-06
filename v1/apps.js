var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Mountain Goat's Rest",
        image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg"

    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEWLY ADDED CAMPGROUND: ");
            console.log(campground);
        }
    });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__480.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg"}
// ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all the campgrounds from the DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    // res.send("You hit the the POST route") testing purposes
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3001, function(){
    console.log( "The YelpCamp Server has started!!");
});