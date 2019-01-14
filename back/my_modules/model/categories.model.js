const Categories = require('../schema/categories.schema');

module.exports = {

    all: () => {
        return Categories.find()
                .populate('sub_catgory','name')
    },
    name: (name) => {
        return Categories.findOne({name: name})
        .populate('sub_catgory','name')
    },
    id: (id) => {
        return Categories.findOne({_id: id})
        .populate('sub_catgory','name')
    },
    create: (categoriesObj) => {
        let categories = new Categories(categoriesObj);
        return categories.save();
    },
    update: (id,categoriesObj) => {
        let categories = new Categories(categoriesObj);
        categories._id = id;
        return Categories.updateOne({_id: id}, categories); 
    },
    subCatgory: (id) => {
        return Categories.find({sub_catgory: id})
    },
    delete: (id) =>{
        return Categories.deleteOne({_id:id})
    }

}