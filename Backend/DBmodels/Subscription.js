const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    MemberID : {type : String, required : true},
    Movies : [{
        movieId : {type : String, required : true},
        date : {type : Date, required : true}
    }]
}); 

module.exports = mongoose.model('Subscription', ItemSchema);