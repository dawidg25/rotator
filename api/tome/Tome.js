const mongoose = require('mongoose');

const TomeSchema = new mongoose.Schema({
    title: String,
    url: String,
    active: {
        type: Boolean,
        default: true
    },
    createDate: Date,
    modifyDate: Date
})

TomeSchema.path('url').validate(async function(value) {
    let isUnique = true;

    await this.model('Tome').countDocuments({ url: value }, function(err, count) {
        if (err || count) {
            isUnique = false;
        } 
    });

    console.log(isUnique);
    return isUnique;
}, 'Url already exists');

mongoose.model('Tome', TomeSchema);
module.exports = mongoose.model('Tome');