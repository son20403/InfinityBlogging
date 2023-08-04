import express from 'express'
const router = express.Router()
import PostController from '../controllers/PostController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, uploadCloud.single("image"), PostController.create)
router.get('/getAll', PostController.getAll)
router.get('/getAllPostByCustomer?:id', PostController.getAllPostByCustomer)
router.get('/getPostByCategory?:id', PostController.getPostByCategory)
router.get('/detail?:slug', PostController.detail)
router.put('/like?:id', middlewareAuth.verifyToken, PostController.like)
router.put('/updateView?:slug', PostController.updateView)

module.exports = router;
