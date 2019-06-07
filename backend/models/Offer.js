var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    offerName : {type: String, required: true, max: 100},
    countryName : {type: String, required: true, max: 100},
    startDate : {type: String},
    endDate: {type: String},
    numberPeople : {type: Number, required: true},
    cost : {type: Number, required: true},
    availability: {type: String, required: true}
});


module.exports=mongoose.model('Offer', OfferSchema);