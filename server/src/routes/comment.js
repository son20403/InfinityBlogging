import express from 'express'
const router = express.Router()
import commentController from '../controllers/CommentController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, commentController.create)
router.get('/getAll', commentController.getAll)
router.get('/getByPost', commentController.getByPost)
router.get('/detailCategory?:id', commentController.detail)

module.exports = router;
