const bcrypt = require("bcrypt");

const salt = 10;

module.exports = {
    hash: (pass) => {
        return bcrypt.hash(pass,salt);
    },
    verify: (pass,hash) => {

        return bcrypt.compare(pass,hash);
    }
}