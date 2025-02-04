var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),

    // requiring routes
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect('mongodb+srv://YelpCamper:dYnC3IarcIHXihGH@cluster0-hqui8.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log.log('Connected to DB!');
// }).catch(err => {
//     console.log('ERROR', err.message);
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Chico is de leukste hond!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/", function(req, res) {
    res.render("landing");
});

// ===========================================================================
//  REFACTORING THE CAMPGROUND ROUTES INTO SEPERATE FILES IN THE ROUTES FOLDER
// ===========================================================================

// //INDEX - show all campgrounds
// app.get("/campgrounds", function(req, res) {
//     // Get all campgrounds from DB
//     Campground.find({}, function(err, allCampgrounds) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("campgrounds/index", { campgrounds: allCampgrounds });
//         }
//     });
// });

// //CREATE - add new campground to DB
// app.post("/campgrounds", function(req, res) {
//     // get data from form and add to campgrounds array
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var newCampground = { name: name, image: image, description: desc }
//         // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated) {
//         if (err) {
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             res.redirect("/campgrounds");
//         }
//     });
// });

// //NEW - show form to create new campground
// app.get("/campgrounds/new", function(req, res) {
//     res.render("campgrounds/new");
// });

// // SHOW - shows more info about one campground
// app.get("/campgrounds/:id", function(req, res) {
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(foundCampground)
//                 //render show template with that campground
//             res.render("campgrounds/show", { campground: foundCampground });
//         }
//     });
// });



// ===================================================================
//  REFACTORING THE ROUTES INTO SEPERATE FILES IN THE ROUTES FOLDER
// ===================================================================

// ====================
// COMMENTS ROUTES
// ====================

// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
//     // find campground by id
//     Campground.findById(req.params.id, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/new", { campground: campground });
//         }
//     })
// });

// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
//     //lookup campground using ID
//     Campground.findById(req.params.id, function(err, campground) {
//         if (err) {
//             console.log(err);
//             res.redirect("/campgrounds");
//         } else {
//             Comment.create(req.body.comment, function(err, comment) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect('/campgrounds/' + campground._id);
//                 }
//             });
//         }
//     });
//     //create new comment
//     //connect new comment to campground
//     //redirect campground show page
// });



// ===================================================================
//  REFACTORING THE INDEX ROUTES INTO SEPERATE FILES IN THE ROUTES FOLDER
// ===================================================================

// //  ==================
// // AUTH / INDEX ROUTES
// //  ==================

// // show register form
// app.get("/register", function(req, res) {
//     res.render("register");
// });
// //handle sign up logic
// app.post("/register", function(req, res) {
//     var newUser = new User({ username: req.body.username });
//     User.register(newUser, req.body.password, function(err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function() {
//             res.redirect("/campgrounds");
//         });
//     });
// });

// // show login form
// app.get("/login", function(req, res) {
//     res.render("login");
// });
// // handling login logic
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login"
// }), function(req, res) {});

// // logic route
// app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/campgrounds");
// });

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3001, function() {
    console.log("The YelpCamp Server has started!!");
});