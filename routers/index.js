const express = require('express')
const router = express.Router()
const Controller = require("../controller/controller")
const session = require('express-session')

// Global session 
router.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
);

// signup and login
router.get('/', Controller.home)
router.get('/home', Controller.directHome)
router.get('/signup', Controller.signUp)
router.post('/signup', Controller.signUpProcess)
router.get('/login', Controller.login)
router.post('/login', Controller.loginProcess)
router.get('/login/admin', Controller.loginAdmin)
router.post('/login/admin', Controller.loginAdminProcess)

router.use(function (req, res, next) {
    console.log(req.session.userId, "<<< kena");
    if (!req.session.userId) {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`)
    }
    else {
        next()
    }
})

router.get('/logout', Controller.logout)

// admin session
router.get('/admin', Controller.homeAdmin)
router.post('/admin', Controller.homeAdmin)
router.get('/admin/books', Controller.showBookAdmin)
router.get('/admin/books/add', Controller.getAddNewBook)
router.post('/admin/books/add', Controller.postAddNewBook)
router.get('/admin/books/edit/:id', Controller.getEditBook)
router.post('/admin/books/edit/:id', Controller.postEditBook)
router.get('/admin/books/delete/:id',Controller.deleteBook)
router.get('/admin/categories')
router.get('/admin/categories/add', Controller.getBookCategories)
router.post('/admin/categories/add', Controller.postBookCategories)

//books session
router.get('/user', Controller.homeUser)
router.get('/books', Controller.showBook)
router.get('/books/detail')
router.get('/books/buy/:id', Controller.buyBook)
router.get('/books/soldlist', Controller.soldBook)
router.get('/categories')

module.exports = router;