var express  = require("express");
var router   = express.Router();

var passport = require("passport");
//var User     = require("../models/user");
//var newUsers  = require("../models/newUser"); 
    
    router.get("/", function(req,res){
        res.render("landing");
    });
    
   /* router.get("/register", function(req, res){
        res.render("register");
    });*/
     
    
//show login form
    router.get("/login", function (req,res){
        res.render("login");
    });
//handaling login form
    router.post("/login",passport.authenticate("local",{
        successRedirect : "/campground",
        failureRedirect : "/login"
        }) ,function(req,res){
        
    });

    router.get("/logout", function(req,res){
        req.logOut();
        req.flash("sucess", "Logged you Out!!")
        res.redirect("/campground");
    });

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }

    module.exports = router;