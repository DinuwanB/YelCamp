var mongoose = require("mongoose")

var NewUserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String, 
    email : String,
    gender :String,
    password : String
    
    

}); 
 


module.exports = mongoose.model("UserR", NewUserSchema); 