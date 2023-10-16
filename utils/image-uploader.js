const multer = require('multer')
const path = require('path');

const filestorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './images') 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({
    storage: filestorageEngine,
    limits: {
        fileSize:1024*1024*10
    }
});

module.exports = {
    upload: upload
}