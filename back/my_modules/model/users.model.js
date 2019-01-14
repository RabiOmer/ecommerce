const Users = require('../schema/users.schema');

module.exports = {

    all: () => {
        return Users.find()
    },
    email: (email) => {
        return Users.findOne({email: email})
    },
    id: (id) => {
        return Users.findOne({_id: id})
    },
    create: (userObj) => {
        let user = new Users(userObj);
        return user.save();
    },
    update: (id,userObj) => {
        let user = new Users(userObj);
        user._id = id;
        return Users.updateOne({_id: id}, user); 
    },

}