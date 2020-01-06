const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tome'
    },
    title: String,
    description: String,
    url: String,
    active: {
        type: Boolean,
        default: true
    },
    createDate: Date,
    modifyDate: Date,
})
mongoose.model('Chapter', ChapterSchema);

module.exports = mongoose.model('Chapter');