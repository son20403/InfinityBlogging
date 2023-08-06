import express from 'express'
const router = express.Router()
import AuthCustomer from '../controllers/AuthController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'


router.post('/register', AuthCustomer.register)
router.post('/login', AuthCustomer.login)
router.get('/getDataCustomer', middlewareAuth.verifyToken, AuthCustomer.getDataCustomer)

module.exports = router;
