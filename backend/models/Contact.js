var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)

var ContactSchema = new Schema({
    nickname: {type:String},
    postedDate: {type: Date, default: Date.now},
    email: {type: String},
    body: {type: String},
});

ContactSchema.index({nickname: 'text'});
module.exports = mongoose.model('Contact', ContactSchema);