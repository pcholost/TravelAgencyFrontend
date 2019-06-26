var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

var OfferSchema = new Schema({
    offerName : {type: String},
    countryName : {type: String},
    startDate : {type: Date},
    endDate: {type: Date},
    numberPeople : {type: Number},
    cost : {type: Number},
    availability: {type: String, required: true}
});


module.exports=mongoose.model('Offer', OfferSchema);