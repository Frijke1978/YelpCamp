var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comments");

var data       = [
    {
        name: "Cloud's Rest",
        image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg",
        description: "This is a huge granite hill, no bathroom, no water. Beautiful granite!"
    },
    {
        name: "Salmon Creek", 
        image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__480.jpg",
        description: "Nice Creek"
    },
    {
        name: "Granite Hill", 
        image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__480.jpg",
        description: "Very nice Hill"
    }
]

function seedDB(){
    // Remove all cmpgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        // Add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                 });
             });
        });
    };

module.exports = seedDB;