const mongoose = require('mongoose');

var CartsSchema = new mongoose.Schema({
    user: {
        type :mongoose.Schema.Types.ObjectId,
        ref: "Users"
        },
    date: {
        type: String,
        required: true
    },
    paid:{
        type: Boolean,
        default: false
    },
    products:{
        type:[
            {
            pro_id:{type: mongoose.Schema.Types.ObjectId,ref: "Products", required: true},
            amount:{type: Number}
            }]
    },
    shipment:{
        type:String
    }
});

module.exports = mongoose.model('Carts',CartsSchema);
