const jwt = require('jsonwebtoken');

module.exports = {
    sign: (data) => {
            return jwt.sign(
            data,
            process.env.JWT_KEY,
            {
                expiresIn: '3h'
            }
        )
    }

}