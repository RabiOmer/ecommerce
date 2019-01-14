const express = require('express');
const router = express.Router();
module.exports = router;

const CategoriesModel = require('../model/categories.model');
const ProductsModel = require('../model/products.model');
const checkAuth = require('../middlewares/jwt_middleware');


router.get('/',getCategories);
router.get('/:id',getOneCatgory);
router.post('/',checkAuth,adminlogged,create);
router.put('/',checkAuth,adminlogged,updateCategories);
router.post('/:id',checkAuth,adminlogged,deleteCatgory);



function adminlogged(req,res,next){
    if(req.userData.role != 'admin'){
        res.end();;
    }
    next();
}
async function create(req,res) {
    try{
        let NewCatgory = {
            name: req.body.name,
        }

        if(!NewCatgory.name){
            throw "missing data";
        }

        if(await CategoriesModel.name(NewCatgory.name)){
            throw 'catgory exiest';
        }

        let catgory = await CategoriesModel.create(NewCatgory);

        res.json({
            success:true,
            data: catgory
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e 
        }).end();
    }
    
}
async function getCategories(req,res){
    try{
        let categories = await CategoriesModel.all();
        if(!categories){
            throw 'no data';
        }
        res.json({
            success: true,
            data: categories
        })
    }
    catch(e){
        res.json({
            success:false
        }).end();
    }
} 
async function getOneCatgory(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw 'no data';
        }
        let catgory = await CategoriesModel.id(id);

        if(!catgory){
            throw 'inalid id';
        }
        res.json({
            success: true,
            data: catgory
        })
    }
    catch(e){
        res.json({
            success:false
        }).end();
    }
}
async function updateCategories(req,res){
    try{
        let NewCatgory = {
            _id: req.body.id,
            name: req.body.name
        }
        let oldCatgory = await CategoriesModel.id(NewCatgory._id);
        if(!oldCatgory){
            throw 'Inalid request';
        }
        if(!NewCatgory.name){
            throw "missing data";
        }

        if(await CategoriesModel.name(NewCatgory.name)){
            throw 'catgory exiest';
        }

        let catgory = await CategoriesModel.update(NewCatgory._id,NewCatgory);

        res.json({
            success:true,
            data: catgory
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e 
        }).end();
    }
} 
async function deleteCatgory(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw "Missing id";
        }
        if(! await CategoriesModel.id(id)){
            throw "Invalid id";
        }
        let products = await ProductsModel.catgory(id);
        let catgory = await CategoriesModel.subCatgory(id);
        if(products || catgory){
            throw "cant delete this catgory..";
        }
            await CategoriesModel.delete(id);
        res.json({
            success: true
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e
        })
    }
}