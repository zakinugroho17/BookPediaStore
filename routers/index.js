const express = require('express')
const router = express.Router()
const Controller = require("../controller/controller")

router.get('/', Controller.home)
router.get('/home', Controller.directHome)
router.get('/signup')
router.get('/login')

// function checkAdmin(req, res, next) {
//     if (req.session.admin)
// }

router.get('/admin/books', Controller.showBookAdmin)
router.get('/admin/books/add', Controller.getAddNewBook)
router.post('/admin/books/add', Controller.postAddNewBook)
router.get('/admin/books/edit/:id', Controller.getEditBook)
router.post('/admin/books/edit/:id', Controller.postEditBook)
router.post('/admin/books/delete/:id',Controller.deleteBook)
router.get('/admin/categories')
router.get('/admin/categories/add', Controller.getBookCategories)
router.post('/admin/categories/add', Controller.postBookCategories)
router.get('/admin/categories/edit/:id')
router.post('/admin/categories/edit/:id')
router.post('/admin/categories/delete/:id')

router.get('/books', Controller.showBook)
router.get('/books/detail')
router.get('/books/buy/:id', Controller.buyBook)
router.get('/books/soldlist', Controller.soldBook)
router.get('/categories')
module.exports = router;