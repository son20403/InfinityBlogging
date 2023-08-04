import express from 'express'
const router = express.Router()
import CommentController from '../controllers/CommentController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, CommentController.create)
router.get('/getAll', CommentController.getAll)
router.get('/getByPost', CommentController.getByPost)
router.get('/detailCategory?:id', CommentController.detailCategory)
router.get('/detail', CommentController.detail)

module.exports = router;
