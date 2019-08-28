var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middlewear");

router.get("/", function (req,res){ 

    Campground.find({}, function(err,allCampGround){
         if(err){
             console.log(err);
         } else{
             res.render("campground/campground", {campground:allCampGround});
         }
     });
});

router.post("/",middleware.isLoggedIn, function(req,res){
  var name = req.body.pName;
  var image = req.body.image;
  var descr = req.body.descr;
  var author = {
      id : req.user._id,
      username : req.user.username
  }
  var newCampGround = {name:name,image:image,descr:descr, author : author};

  Campground.create(newCampGround,function(err, newlyCreated){
     if(err){
         console.log(err);
     } else{
         res.redirect("/campground");
     }

    }); 
});
router.get("/new", middleware.isLoggedIn,function(req,res){
     res.render("campground/new");
 });
 // Show more info Route
 router.get("/:id", function(req,res){

     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampGround){
         if(err){
             console.log(err);
         } else{
             
             res.render("campground/show",{Campground:foundCampGround});
         }
     });

});

//EDI AND UPDATE
router.get("/:id/edit", middleware.checkCampgroundOwenership ,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampGround){
        res.render("campground/edit", {campground : foundCampGround});   
    });
});

router.put("/:id",middleware.checkCampgroundOwenership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampGround){
       if(err){
            res.render("/campground");
        } else {
            res.redirect("/campground/" + req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkCampgroundOwenership, function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            req.redirect("/campground");
        } else {
            res.redirect("/campground");
        }
    });
    
});



module.exports = router;


