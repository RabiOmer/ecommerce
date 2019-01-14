const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'./upload/');
    },
    filename: function (req,file,cb){
        cb(null, + new Date() + file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb({
            success: false,
            message: 'Invalid file'
        },false);
    }
};

module.exports = {
    upload: multer({
        storage: storage, 
        limits:{ fileSize: 1024 * 1024 * 10 },
        fileFilter: fileFilter
    })
}