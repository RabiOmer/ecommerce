const mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (p) => {
                return /^(.){3,20}$/.test(p)
            },
            message: 'first name 3-20 chars'
        }
    },
    last_name: {
        type: String,
        required: true,
        validate: {
            validator: (p) => {
                return /^(.){3,20}$/.test(p)
            },
            message: 'first name 3-20 chars'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (p) => {
                return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(p)
            },
            message: 'Email isnt valid'
        }
    },
    phone:{
        type: String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default: 'customer',
    },
    hash: {
        type: String,
        required: [true,"Must got"] // default error message
    },
    billing: {
        type: Object
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    date:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Users',UsersSchema);
