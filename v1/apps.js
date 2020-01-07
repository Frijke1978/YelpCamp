var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp"); // will be created once we add stuff to the DB.
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Mountain Goat's Rest",
//         image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg",
//         description: "This is a huge granite hill, no bathroom, no water. Beautiful granite!"

//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY ADDED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__480.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg"}
// ]

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX ROUTRE - Show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all the campgrounds from the DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});


// CREATE ROUTE - Add new campground to DB
app.post("/campgrounds", function(req, res){
    // res.send("You hit the the POST route") testing purposes
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
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

//  NEW ROUTE - Show form to creaate a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW ROUTE - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // Render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3001, function(){
    console.log( "The YelpCamp Server has started!!");
});