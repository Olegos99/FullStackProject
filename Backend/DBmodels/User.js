const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    UserName : {type : String, required : true},
    Password : {type : String, required : true}
}); 

module.exports = mongoose.model('user', ItemSchema);