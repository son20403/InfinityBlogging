import express from 'express'
const router = express.Router()
import PostController from '../controllers/PostController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, uploadCloud.single("image"), PostController.create)
router.get('/getAll', PostController.getAll)
router.get('/getAllPostByCustomer?:id', PostController.getAllPostByCustomer)
router.get('/detail?:id', PostController.detail)

module.exports = router;
