var express = require("express");
var router  = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var Comment =require("../models/comment");
var middleware = require("../middlewear")

router.get("/new",middleware.isLoggedIn, function (req,res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err){
            console.log(err);
        } else {
            res.render("comment/new",{Campground:campground});
        }
      });
});

router.post("/", middleware.isLoggedIn ,function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campground");
        } else {
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/" + campground._id);
                }
            });
        }
    });
 });

 router.get("/:comment_id/edit", middleware.checkCommentOwenership, function(req,res){
     Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comment/edit", {campground_id : req.params.id, comment : foundComment});
        }
     });
 });

 //COMMENT EDIT
 router.put("/:comment_id",middleware.checkCommentOwenership, function(req, res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
         if(err){
             res.redirect("back");
         } else {
             res.redirect("/campground/" + req.params.id);
         }
     });
 });

 //COMENT DESTROY ROUTE
 router.delete("/:comment_id", middleware.checkCommentOwenership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campground/" + req.params.id);
        }
    });
 });


 module.exports = router;
