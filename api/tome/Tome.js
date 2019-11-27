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
    await this.model('Tome').countDocuments({url: value}).then(count => {        
        if(count > 0) {
            isUnique = false;
        }
    })
    return isUnique;

}, 'Url already exists');

mongoose.model('Tome', TomeSchema);
module.exports = mongoose.model('Tome');