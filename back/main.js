console.clear();

const express = require('express');
const app = express();
const PORT = 4000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');      

    if ('OPTIONS' == req.method) {
      res.status(200).end();
    }
    else {
      next();
    }
});

const mongoose = require('mongoose');
mongoose.connection.on('error', (err) => console.log("DB Connect Error:", err));
mongoose.connection.on('connected', () => {
    console.log("DB Connected:", mongoose.connection.name);
    // start server
    app.listen(PORT, () => {
        console.log(`Node listening on localhost:${PORT}`);
    });
});
mongoose.connect('mongodb://localhost:27017/store', {
    useNewUrlParser: true
});


app.use('/upload/',express.static('upload/'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use( (req,res,next)=> {
    if(req.originalUrl=='/favicon.ico') {
        next();
    }
    else {
        console.clear();
        console.log('>',req.method,req.originalUrl);
        if(Object.entries(req.body).length) {
            console.log('Posted:');
            console.log(req.body);
            console.log("\n");
        }
        next();
    }
});              

const UsersController = require('./my_modules/controllers/users_controller');
const CategoriesContoller = require('./my_modules/controllers/categories_controller');
const ProductController = require('./my_modules/controllers/product_contoller');
const CartController = require('./my_modules/controllers/cart_controller');


app.use('/users',UsersController);
app.use('/categories',CategoriesContoller);
app.use('/products',ProductController);
app.use('/cart',CartController);


app.use('**',(req,res)=>{
    console.log('request Unknown');
    res.status(404).end('404 bed request');
})




