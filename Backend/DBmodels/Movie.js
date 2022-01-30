const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    Name : {type : String, required : true},
    Genres :  [
        {        
        Gener: {type : String, required : true},
        }
    ],
    img : {type : String, required : true},
    premiered : {type : Date, required : true},
    Raiting : {type: Number}
}); 

module.exports = mongoose.model('Movie', ItemSchema);