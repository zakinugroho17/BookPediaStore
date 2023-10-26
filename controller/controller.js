const bookshascategories = require('../models/bookshascategories');
const { Book, BooksHasCategories, Categories, Profile, User } = require('../models/index')
const { Op } = require('sequelize')
class Controller {
    static async showBookAdmin(req, res) {
        try {
            const { deleteMsg } = req.query
            const data = await Book.bookAdminShowAll()
            // res.send(data)
            res.render('showBookAdmin', { data, deleteMsg })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async showBook(req, res) {
        try {
            const { buyMsg } = req.query
            const data = await Book.bookShowAll()
            res.render('showBook', { data, buyMsg })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async buyBook(req, res) {
        try {
            let { id } = req.params
            let dataMsg = await Book.findOne({
                where: {
                    id: id
                }
            })
            let data = await Book.decrement('stock', {
                where: {
                    id: id
                },
                by: 1,
            })
            res.redirect(`/books?buyMsg=Success Buy Book ${dataMsg.title}!`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async soldBook(req, res) {
        try {
            let data = await Book.findAll({
                where: {
                    stock: {
                        [Op.lte]: 0
                    }
                },
                order: [["id", "ASC"]]
            })
            res.render('soldBookList', { data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAddNewBook(req, res) {
        try {
            let { errors } = req.query
            if (errors) {
                errors = errors.split(',')
            }
            console.log(errors);
            res.render('addBook', { errors })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddNewBook(req, res) {
        try {

            console.log(req.body);
            const { title, stock, price, image, status } = req.body
            let data = await Book.create({ title, stock, price, image, status, UserId: 1 });
            res.redirect('/books')
        } catch (error) {
            console.log(error);

            let errorMsg = []
            if (error.name === 'SequelizeValidationError') {
                errorMsg = error.errors.map(err => err.message)
                console.log(errorMsg);
                res.redirect('/admin/books/add?errors=' + errorMsg)
            } else {
                res.send(error)
            }
        }
    }

    static async getEditBook(req, res) {
        try {
            const { id } = req.params;
            const selectedBook = await Book.findByPk(id);
            res.render('editBook', { selectedBook });
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postEditBook(req, res) {
        try {
            const { id } = req.params
            const { title, stock, price, image, status } = req.body;
            await Book.update({
                title: `${title}`,
                stock: `${stock}`,
                price: `${price}`,
                image: `${image}`,
                status: `${status}`,
            }, {
                where: {
                    id: `${id}`
                }
            })
            res.redirect('/admin/books')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editProfile(req, res) {
        try {
            const { id } = req.params
            let users = await Profile.findByPk(id)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getBookCategories(req, res) {
        try {
            let dataBook = await Book.findAll();
            let dataCategories = await Categories.findAll()
            // res.send(dataCategories)

            res.render('bookCategory', { dataBook, dataCategories })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postBookCategories(req, res) {
        try {
            const { BooksId, CategoriesId } = req.body

            await BooksHasCategories.create({ BooksId: BooksId, CategoriesId })

            res.redirect('/admin/books')
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async deleteBook(req, res) {
        try {
            const { id } = req.params
            let dataMsg = await Book.findOne({
                where: {
                    id: id
                }
            })
            await Book.destroy({
                where: {
                    id: `${id}`
                }
            })

            res.redirect(`/admin/books?deleteMsg=Book ${dataMsg.title} has been remove!`)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;