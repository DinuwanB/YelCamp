var mongoose = require("mongoose")

var NewUserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String, 
    email : String,
    password : String,
    gender :String
    

}); 



module.exports = mongoose.model("User", NewUserSchema); 