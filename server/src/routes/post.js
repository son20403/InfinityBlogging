import express from 'express'
const router = express.Router()
import postController from '../controllers/PostController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, uploadCloud.single("image"), postController.create)
router.get('/getAll', postController.getAll)
router.get('/search?:key', postController.search)
router.get('/getAllPostByCustomer?:id', postController.getAllPostByCustomer)
router.get('/getPostByCategory?:id', postController.getPostByCategory)
router.get('/detail?:slug', postController.detailBySlug)
router.put('/like?:id', middlewareAuth.verifyToken, postController.like)
router.put('/updatePost?:id', uploadCloud.single("image"), middlewareAuth.verifyToken, postController.updatePost)
router.put('/updateView?:slug', postController.updateView)

module.exports = router;
