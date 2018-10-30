const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Account email required.'],
        minlength: 1,
        trim: true,
        unique: [true, 'Same email already exists'],
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: [true, 'Account email required.'],
        minlength: [6, 'At least 6 characters required.'],
    },
    firstName: {
        type: String,
        required: [true, 'First name required.']
    },
    lastName: {
        type: String
    }
});

UserSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.verifyPassword = function (password) {
    let user = this;

    return new Promise ((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                resolve(user);
            } else {
                reject();
            }
        });
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };

