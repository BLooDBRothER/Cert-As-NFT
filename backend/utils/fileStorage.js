const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, path.join('public', 'logos'))
    },
    filename (req, file, cb){
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file)
    const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png'];
    cb(null, allowedFileType.includes(file.mimetype));
}

const upload =  multer({storage, fileFilter});
module.exports = upload;
