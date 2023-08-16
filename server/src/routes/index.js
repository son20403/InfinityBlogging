import authController from './auth'
import adminController from './admin'
import commentController from './comment'
import postController from './post'
import customerController from './customer'
import categoryController from './category'
let router = (app) => {
    app.use('/admin', adminController)
    app.use('/auth', authController)
    app.use('/comment', commentController)
    app.use('/customer', customerController)
    app.use('/category', categoryController)
    app.use('/post', postController)
    app.use('/', (req, res) => { res.send('HELLO') })
}
module.exports = { router }