const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    parentId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    url: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createDate: Date,
    modifyDate: Date,
})
mongoose.model('Chapter', ChapterSchema);

module.exports = mongoose.model('Chapter');