const mongoose = require('mongoose');

var ProductsSchema = new mongoose.Schema({
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
    description:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    catgory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    price:{
        type: Number,
        require: true
    },
    delete:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Products',ProductsSchema);