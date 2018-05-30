const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = mongoose.Schema({
    account: {
        type:String, 
        required:true
    },
    recordTime: {
        type: Date,
        required: true
    },
    amount: {
        type:Number, 
        required:true
    },
    type: {
        type: String,
        required: true,
        default: 'expense'
    },
    category: {
        category: {
            type: String,
            required: true
        },
        notification: {
            type: Boolean,
            required: true,
            default: false
        },
        subCategory: {
            type: String,
            required: true 
        }
    },
    detail: {
        payee: {
            type: String,
            required: true
        },
        memo: {
            type: String
        }
    }
});

RecordSchema.pre('save', function (next) {
    let user = this;

    if (user.amount < 0) {
        user.type = 'expense';
        next();
    } else {
        user.type = 'income';
        next();
    }
});

const Record = mongoose.model('Account Record', RecordSchema);

module.exports = Record;