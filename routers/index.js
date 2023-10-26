const express = require('express')
const router = express.Router()
const Controller = require("../controller/controller")

// router.get('/home', Controller.showBook)
// router.get('/signup', Controller.showBook)
// router.get('/login', Controller.showBook)
router.get('/book', Controller.showBook)
router.get('/book/buy/:id', Controller.buyBook)
router.get('/book/add', Controller.getAddNewBook)
router.post('/book/add', Controller.postAddNewBook)
router.get('/book/add/categories', Controller.getBookCategories)
// router.post('/book/add/categories', Controller.showBook)

router.get('/book/soldlist', Controller.soldBook)
// router.get('/book', Controller.showBook)
// router.get('/book', Controller.showBook)
// router.get('/book', Controller.showBook)

module.exports = router;