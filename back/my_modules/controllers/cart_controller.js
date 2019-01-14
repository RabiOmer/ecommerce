const express = require('express');
const router = express.Router();
module.exports = router;

const CartModel = require('../model/cart.model');
const ProductsModel = require('../model/products.model');
const checkAuth = require('../middlewares/jwt_middleware');


router.get('/user/:id',checkAuth,getAllUserPaidCarts);
router.get('/:id',checkAuth,getOneCart);
router.put('/:id',checkAuth,updateCart);
router.put('/pay/:id',checkAuth,PayCart);
router.get('/paid',allPaidCarts);
router.post('/shipment',checkAuth,getShipment);
router.get('/new',checkAuth,userNewCart);


async function userNewCart(req,res){
    try{
        let newCart = await CartModel.create(req.userData.id);
        res.json(
            {
                success: true,
                data: newCart
            }
        )
    }
    catch(e){
    res.json({
        success: false
    }
    )
    }
}
async function getShipment(req,res){
    try{
        let date = req.body.date;
        if(!date){
            throw "no date";
        }
        let data = await CartModel.shipment(date)

        res.json({
            success: true,
            data: data
        })
    }
    catch(e){
        res.json({
            success: false
        })
    }
}
async function allPaidCarts(req,res) {
    try{
        let paid = await CartModel.paid();

        res.json({
            success: true,
            data: paid
        })
    }
    catch(e){
        res.json({
            success: false
        })
    }
}
async function getOneCart(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw "missing id";
        }
        let cart = await CartModel.id(id);
        if(!cart){
            throw "invalid id";
        }
        if(req.userData.id != cart.user){
            throw "not your cart";
        }

        res.json({
            success: true,
            data: cart
        })

    }
    catch(e){
        res.json({
            success: false,
            massage: e
        })
    }
}
async function getAllUserPaidCarts(req,res){
    try{
        let id = req.params.id;
        let date = req.body.date;
        if(!id || !date){
            throw "missing data";
        }

        let carts = await CartModel.userPaid(id);
        res.json({
            success: true,
            data: carts
        })

    }
    catch(e){
        res.json({
            success: false,
            massage: e
        })
    }
}
async function updateCart(req,res){
    try{
        let cartId = req.params.id;
        if(!cartId){
            throw "Missing id";
        }
        let cart = await CartModel.id(cartId);
        if(!cart){
            throw "Cart Invalid id";
        }
        if(cart.user != req.userData.id){
            throw "not your cart";
        }
        let products = req.body.products;
        let UpdateCart = {
            user: req.userData.id,
            products: products,
            paid: false
        }
        await CartModel.update(cartId,UpdateCart);
        res.json({
            success: true,
        })
    }
    catch(e){
        res.json({
            success: false,
            massage: e
        })
    }
}
async function PayCart(req,res){
    try{
        let cartId = req.params.id;
        if(!cartId){
            throw "Missing id";
        }
        let cart = await CartModel.id(cartId);
        if(!cart){
            throw "Cart Invalid id";
        }
        if(cart.user != req.userData.id){
            throw "not your cart";
        }
        let UpdateCart = {
            user: req.userData.id,
            products: cart.products,
            paid: true
        }
        await CartModel.update(cartId,UpdateCart);
        
        res.json({
            success: true,
            data: data
        })
    }
    catch(e){
        res.json({
            success: false,
            massage: e
        })
    }
}