/**
 * USER MODEL
 * name: user name
 * email: user email
 * password: user password
 * type: user, editor, admin
 * registerDate: register date
 * modifyDate: modify date
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: 'Incorrect email format'
        }
    },
    password: String,
    type: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user'
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    modifyDate: Date
});

UserSchema.path('email').validate(async function(value) {
    let isUnique = true;

    await this.model('User').countDocuments({ email: value }, function(err, count) {
        if (err) {
            isUnique = false;
        } 

        if(count) {
            isUnique = false;
        };
    });
    return isUnique;
}, 'Email already exists');

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');