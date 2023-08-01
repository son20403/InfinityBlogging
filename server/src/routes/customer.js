import express from 'express'
const router = express.Router()
import CustomerController from '../controllers/CustomerController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'

// router.post('/create', middlewareAuth.verifyToken, uploadCloud.single("image"), CustomerController.create)
router.get('/getAll', CustomerController.getAll)
router.get('/detailCustomer?:id', CustomerController.detailCustomer)
router.get('/detail', middlewareAuth.verifyToken, CustomerController.detail)
router.put('/updateCustomer', middlewareAuth.verifyToken, uploadCloud.single("image"), CustomerController.updateCustomer)

module.exports = router;
