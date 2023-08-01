import express from 'express'
const router = express.Router()
import AuthCustomer from '../controllers/AuthController'
import uploadCloud from '../middlewares/uploader'

router.post('/register', uploadCloud.single("image"), AuthCustomer.register)
router.post('/login', AuthCustomer.login)
router.get('/getCustomer', AuthCustomer.getDataCustomer)

module.exports = router;
