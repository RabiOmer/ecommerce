const mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (p) => {
                return /^(.){3,20}$/.test(p)
            },
            message: 'first name 3-20 chars'
        }
    }
});

module.exports = mongoose.model('Categories',CategoriesSchema);