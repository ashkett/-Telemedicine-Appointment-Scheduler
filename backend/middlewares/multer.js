<<<<<<< HEAD
import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
=======
import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null, file.originalname)
>>>>>>> da05cc051b69c560ede27383f9ee76b145881147
    }
})

const upload = multer({storage})

export default upload