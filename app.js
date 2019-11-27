var express           =   require("express"),
    app               =   express(),
    bodyParser        =   require("body-parser"),
    mongoose          =   require("mongoose"),
    flash             =   require("connect-flash");
    

var passport          =   require("passport"),
    LocalStrategy     =   require("passport-local"),
    methodOverride    =   require("method-override"),
    User              =   require("./models/user"),
    Campground        =   require("./models/campground"),
    seedDB            =   require("./seeds"),
    Comment           =   require("./models/comment");

var commentRoute      =   require("./routes/comment"),
    campgroundRoute   =   require("./routes/campground"),
    authRoutes        =   require("./routes/auth")

    //seedDB();
    mongoose.connect("mongodb://localhost:27017/YelCamp_V4", {useNewUrlParser: true});
    app.use(bodyParser.urlencoded({extended: true})); 
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
    app.use(flash());

    //Passport Configuration
    app.use(require("express-session")({
        secret : "Yel Camp project is here",
        resave : false,
        saveUninitialized : false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.sucess = req.flash("sucess");
        next();
    });

    app.use(authRoutes);
    app.use("/campground",campgroundRoute);
    app.use("/campground/:id/comment",commentRoute);
    
    const userRegister = require('./routes/newRegister');
    app.use("/register", userRegister);
 

    app.listen(3000, () => console.log("The Project Server Started"));
    
