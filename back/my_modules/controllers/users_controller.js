const express = require('express');
const router = express.Router();
module.exports = router;

const UsersModel = require('../model/users.model');
const CartModel = require('../model/cart.model');

const checkAuth = require('../middlewares/jwt_middleware');
const TokenMaker = require('../mangers/token_manger');
const pwd = require('../mangers/password_manger');


router.post('/login',loginUSer);
router.post('/',createNewUser);
router.put('/',checkAuth,updateUser);
router.post('/logged',checkAuth,logged);
router.post('/byemail',byemail)
router.get('/info/:id',checkAuth,getUserInfo);


async function getUserInfo(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw "Missing id";
        }
        let user = await UsersModel.id(id);

        if(!user){
            throw "some error";
        }

        let bill={
            phone: user.phone,
            city: user.city,
            street: user.street
        }

        res.json({
            success:true,
            data: bill
        })
    }
    catch(e){
        res.json({
            success:false
        })
    }
}

async function byemail(req,res){
    try{
        let email = req.body.email;
        if(!email){
            throw "missing data";
        }
        let user = await UsersModel.email(email);
        if(!user){
            throw "missinf data"
        }
        res.json({
            success: true,
            data: user 
        });
    }
    catch (e) {
        res.json({
            success: false,
            message: e 
        }).end();
    }
}
async function createNewUser (req,res) {
    let date = new Date();
    try {
        let createUser = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            street: req.body.street,
            date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            role: 'customer',
        }
        if(!createUser.name || !createUser.last_name || !createUser.email || !createUser.phone || !createUser.city || !createUser.street ||  !req.body.password ) {
            throw ' Missing User Details';
        }

        if(await UsersModel.email(createUser.email) != null){
            throw "User Name Exists";
        }

        createUser.hash = await pwd.hash(req.body.password);
        let newUser = await UsersModel.create(createUser);


        res.json({ 
            success: true,
            data: {id: newUser._id}
        });
    }
    catch (e) {
        res.json({
            success: false,
            message: e 
        }).end();
    }
    
}
async function loginUSer (req,res) {

    let result = {
            user: null,
            token: null
    } ,
    cart;
    try{
        if(!req.body.password  || !req.body.email){
            throw 'Mising login info';
        }
        const user = await await UsersModel.email(req.body.email);
        if(!user){
            throw "Invalid Login";
        }
        let verifypass = await pwd.verify(req.body.password,user.hash);
        if(!verifypass) {
            throw "Invalid Login";
        }
        if(user.role != 'admin'){
            cart = await CartModel.userId(user._id);
            if(!cart){
                let date = new Date(),
                newCart = {
                    user: user._id,
                    date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                    paid: 'false',
                    products: []
                };
                cart = await CartModel.create(newCart);
            }
        }
        result.user = {
                id: user._id,
                name: user.name,
                last_name: user.last_name,
                role: user.role,
                cart: cart
        }
        result.token = await TokenMaker.sign(result);
        res.json({
            success: true,
            data: result });
    }
    catch (e) {
        res.json({
            success: false,
            message: e
        })
    }

}
async function updateUser (req,res) {
    let result ={
        user: null
    }
    try{

        let updateUser = {
            id: req.userData.id,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            street: req.body.street,
            role: 'customer'

        }
        if(req.userData.role === 'admin'){
                throw "Cant Update Admin";
        }
        console.log(req.userData)
        if(req.userData.email != updateUser.email){
            if(await UsersModel.email(updateUser.email) !=null){
                throw "email is Taken";
            }
        }

        if(req.body.password) {
            updateUser.hash = await pwd.hash(req.body.password);
        }

        await UsersModel.update(updateUser.id,updateUser);

        if(req.userData.role!= 'admin'){
                let cart = await CartModel.userId(user._id);
                if(!cart){
                    let date = new Date(),
                    newCart = {
                        user_id: user._id,
                        date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                        paid: 'false',
                        products: []
                    };
                    cart = await CartModel.create(newCart);
                }
            result.user = {
                id: updateUser.id,
                name: updateUser.name,
                last_name: updateUser.last_name,
                role: updateUser.role,
                cart: cart
            }
            result.token = await TokenMaker.sign(result.user);
        }
        res.json({
            success: true,
            data: result
        });
    }
    catch (e) { 
        res.json({
            success: false,
            message: e 
        }).end();
    }
}
async function logged(req,res){
try{
    let result = {
        id: null,
        user:null,
        cart:null
} 
    if(!req.body.id){
        throw 'Mising login info';
    } 
    const user = await await UsersModel.id(req.body.id);
    if(!user){
        throw "Invalid Login";
    }
    if(user.role != 'admin'){
        result.cart = await CartModel.userId(user._id);
        if(!result.cart){
            let date = new Date(),
            newCart = {
                user: user._id,
                date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                paid: 'false',
                products: []
            };
;
            result.cart = await CartModel.create(newCart);
        }
    }
    result.user = {
            id: user._id,
            name: user.name,
            last_name: user.last_name,
            role: user.role
    }

    res.json({
        success: true,
        data: result });
}
catch (e) {
    res.json({
        success: false,
        message: e
    })
}

}
 
