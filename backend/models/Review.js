var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

var reviewSchema = new Schema({
    nickname: {type:String},
    postedDate: {type: Date, default: Date.now},
    body: {type: String},
    rating: {type: Number}
});

module.exports = mongoose.model('Review', reviewSchema);