var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    job: String,
    nickname: String,
    email: String,
    notes: [{
        postedDate: {
            type: Date,
            'default': Date.now
        },
        note: String
    }]
});

module.exports = mongoose.model('Contact', contactSchema);