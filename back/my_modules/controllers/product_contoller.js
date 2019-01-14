const express = require('express');
const router = express.Router();
module.exports = router;

const ProductsModel = require('../model/products.model');
const CategoriesModel = require('../model/categories.model');

const checkAuth = require('../middlewares/jwt_middleware');

const fs = require("fs");
const Image = require('../middlewares/image_middleware.js');

router.get('/',getProducts);
router.get('/new',getLatest);
router.get('/:id',getOneProduct);
router.get('/catgory/:id',getProductsByCatgory);
router.post('/',checkAuth,adminlogged,Image.upload.single('image'),create);
router.put('/',checkAuth,adminlogged,Image.upload.single('image'),updateProducts);
router.post('/:id',checkAuth,adminlogged,deleteProduct);

function adminlogged(req,res,next){
    if(req.userData.role != 'admin'){
        res.end();;
    }
    next();
}

async function getProductsByCatgory(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw "missing id";
        }
        let products = await ProductsModel.catgory(id);
        if(!products){
            throw "some error";
        }
        res.json({
            success: true,
            data: products
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e
        })
    }
}

async function getLatest(req,res){
    try{
        let NewProduct = await ProductsModel.newest();
        if(!NewProduct){
            throw "error";
        }
        res.json({
            success:true,
            data: NewProduct
        })

    }
    catch(e){
        res.json({
            success:false
        })
    }
}

async function create(req,res){
    try{
        let date = new Date();
        let NewProduct = {
            name: req.body.name,
            description: req.body.description,
            date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            image: req.file.filename,
            catgory: req.body.catgory,
            price: req.body.price,
            company: req.body.company,
            delete: false
        }
        if(!NewProduct.company ||!NewProduct.name || !NewProduct.description || !NewProduct.catgory || !NewProduct.image || !NewProduct.price ){
            throw "missing data";
        }
        if(await fs.exists(`./upload/${req.file.filename}`) === null){
            throw "missing img";
        }
        if(await ProductsModel.name(NewProduct.name)){
            throw "this product name exiest";
        }
        if(await !CategoriesModel.id(NewProduct.catgory)){
            throw "catgory doent exiest";
        }
        let product = await ProductsModel.create(NewProduct); 
        res.json({
            success: true,
            data: product
        })
    }
    catch(e){
        await fs.unlinkSync(`./upload/${req.file.filename}`)
        res.json({
            success: false,
            message: e 
        }).end();
    }
}
async function getProducts(req,res){
    try{
        let products = await ProductsModel.all();
        if(!products){
            throw " no Product in db";
        }
        res.json({
            success: true,
            data: products
        })

    }
    catch(e){
        res.json({
            success: false,
            massge: e
        })
    }
}
async function getOneProduct(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw " missing id";
        }
        let product = await ProductsModel.id(id);

        if(!product){
            throw "invalid id";
        }

        res.json({
            success: true,
            data: product
        })

    }
    catch(e){
        res.json({
            success: false,
            massge: e
        })
    }
}
async function updateProducts(req,res){
    try{
        let editProduct = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            date: null,
            image: null,
            catgory: req.body.catgory,
            price: req.body.price,
            delete: false
        }
        if(!editProduct.id){
            throw "missing id";
        }
        let oldProduct = await ProductsModel.id(editProduct.id);
        editProduct.date = oldProduct.date;
        if(!oldProduct){
            throw "Invalid id";
        }
        if(!req.file){
            editProduct.image = oldProduct.image;
        }else{
            editProduct.image = req.file.filename;
            await fs.unlinkSync(`./upload/${oldProduct.image}`)
        }
        if(!editProduct.name || !editProduct.description || !editProduct.catgory || !editProduct.price ||editProduct.limit ==''){
            throw "missing data";
        }
        if(editProduct.limit ==='true'){
            if(!editProduct.inventory){
                throw "missing inventory";
            }
        }
        if(await fs.exists(`./upload/${editProduct.image}`) === null){
            throw "missing img";
        }
        if(await !CategoriesModel.id(editProduct.catgory)){
            throw "catgory doent exiest";
        }
        let product = await ProductsModel.update(editProduct.id,editProduct); 
            if(!product){
                throw "opsss";
            }
            editProduct._id= editProduct.id;
        res.json({
            success: true,
            data: editProduct
        })
    }
    catch(e){
        if(req.file){
            await fs.unlinkSync(`./upload/${editProduct.image}`);
        }
        res.json({
            success: false,
            message: e 
        }).end();
    }
}
async function deleteProduct(req,res){
    try{
        let id = req.params.id;
        if(!id){
            throw "missing id";
        }
        let product = await ProductsModel.id(id);
        if(!product){
            throw "Invalid Id";
        }
        product.delete = true;
        if(await ProductsModel.update(id,product)){
            res.json({
                success: true
            })
        }
        
    }
    catch(e){
        res.json({
            success: false,
            message: e
        })
    }
}