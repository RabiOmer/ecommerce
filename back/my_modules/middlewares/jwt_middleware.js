const jwt = require('jsonwebtoken');
const UsersModel = require('../model/users.model');

module.exports = async (req,res,next) => {
    try {
        let token = null;
        if(!req.headers.authorization) {
            throw 'Missin Authorization';
        }
        else {
            let broke = req.headers.authorization.split(" ");
            if(broke.length!=2 || broke[0] !== 'Bearer' || broke[0]==''){
                throw 'Invalid Authorization header';
            }
            else {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token,process.env.JWT_KEY);
                let user = await UsersModel.id(decoded.user.id);
                if(!user){
                    throw "ID isnt in DB"
                }
                if(user.name != decoded.user.name || user.last_name != decoded.user.last_name){
                    throw "inavlid token"
                }
                req.userData = {
                    id: decoded.user.id,
                    name: decoded.user.name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    street: user.street,
                    spam: user.spam,
                    role: decoded.user.role
                }
                next();
            }
        }

    }
    catch (e) {
        return res.json({
                success: false,
                message: e
        }).end();
    }
}
