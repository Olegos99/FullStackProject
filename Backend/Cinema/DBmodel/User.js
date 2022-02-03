const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    UserName : {type : String, required : true},
    Password : {type : String}
}); 

module.exports = mongoose.model('user', ItemSchema);