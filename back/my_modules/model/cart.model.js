const Carts = require('../schema/cart.schema');

module.exports = {

    all: () => {
        return Carts.find({paid: false})
                .populate('user_id','name')
                .populate('products.pro_id');
    },
    id: (id) => {
        return Carts.findOne({_id: id,paid: false})
            .populate('products.pro_id');
    },
    userId: (id) => {
        return Carts.findOne({user: id,paid: false})
            .populate('products.pro_id');
    },
    Paid: () => {
        return Carts.find({paid: true})
        .populate('products.pro_id');     
    },
    PaidUser: () => {
        return Carts.find({_id: id,paid: true})
        .populate('products.pro_id');     
    },
    shipment: (date) => {
        return Carts.find({shipment:date})  
    },
    userPaid: (id) => {
        return Carts.find({user: id, paid: true})
        .populate('products.pro_id');
    },
    create: (CartObj) => {
        let cart = new Carts(CartObj);
        return cart.save();
    },
    update: async (id,CartObj) => {
        let cart = new Carts(CartObj);
        cart._id = id;
        return Carts.updateOne({_id: id}, cart);
    }

}