var mongoose = require("mongoose");

var campgroundSchema =new mongoose.Schema({
    name: String,
    image: String,
    descr: String,
    author : {
        id :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username :  String
    },

    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }
    ]
});
 //option 1
var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;

//option 2
//module.exports =  mongoose.model("Campground", campgroundSchema); 

