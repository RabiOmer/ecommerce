const Products = require('../schema/product.schema');

module.exports = {

    all: () => {
        return Products.find({delete: false})
                .populate('catgory','name')
    },
    name: (name) => {
        return Products.findOne({name: name, delete: 'false'})
    },
    id: (id) => {
        return Products.findOne({_id: id,delete: false})
                .populate('catgory','name')
    },
    create: (ProductsObj) => {
        let products = new Products(ProductsObj);
        return products.save();
    },
    update: async (id,ProductObj) => {
        let product = new Products(ProductObj);
        product._id = id;
        return Products.updateOne({_id: id}, product);
    },
    catgory: (id) => {
        return Products.find({catgory: id, delete: 'false'})
        .populate('catgory','name')
    },
    newest:()=>{
        return Products.find().limit(1).sort({$natural:-1})
    }

}