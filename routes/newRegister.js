var express  = require("express");
var router   = express.Router();
var User = require("../models/newUser");


router.get("/register", function(req, res){
    res.render("register");
});

  

   router.post("/register", function(req, res){
           var firstName = req.body.firstName;
           var lastName = req.body.lastName;
           var email = req.body.email;
           var gender = req.body.gender;
           var password = req.body.password;

           var newUser = User({
               firstName,lastName,email,gender,passport
           });
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
                req.flash("sucess", "Successfully Account Created" + user.username);
                res.redirect("/campground");
            });
        });
    }); 
    
    

   module.exports = router;