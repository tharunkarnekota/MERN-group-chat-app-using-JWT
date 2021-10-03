const mongoose = require('mongoose');

let DBschema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    confirmpassword : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('DBschema',DBschema)  //name assigning to schema to export ,original name of schema