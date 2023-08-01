import express from 'express'
const router = express.Router()
import CategoryController from '../controllers/CategoryController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, CategoryController.create)
router.get('/getAll', CategoryController.getAll)
router.get('/detailCategory?:id', CategoryController.detailCategory)
router.get('/detail', CategoryController.detail)

module.exports = router;
