var express  = require("express");
var router   = express.Router();


router.get("/register", function(req, res){
    res.render("register");
});

  

   /*router.post("/register", function(req, res){
        var newUser = new newUsers({username : req.body.username});
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
    */
    

   module.exports = router;