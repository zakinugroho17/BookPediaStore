const bookshascategories = require('../models/bookshascategories');
const { Book, BooksHasCategories, Categories, Profile, User } = require('../models/index')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

class Controller {
    static async home(req, res) {
        try {
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async directHome(req, res) {
        try {
            res.render('home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async homeAdmin(req, res) {
        try {
            res.render('homeAdmin')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async homeUser(req, res) {
        try {
            const data = await User.findOne()
            res.render('homeUser', {
                data
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async signUp(req, res) {
        try {
            let errorMsg = [];
            if (req.query.error) {
                errorMsg = req.query.error.split(',')
            }
            res.render('home', {errorMsg})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async signUpProcess(req, res) {
        try {
            const { name, email, password, role } = req.body
            const hashPassword = await bcrypt.hash(password, 12);
            await User.create({ name, email, role, password: hashPassword })
            res.redirect('/login')
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errorMsg = [];
                error.errors.forEach(err => {
                    errorMsg.push(err.message)
                });

            res.redirect(`/signup?error=${errorMsg}`)
            }
        }
    }

    static async login(req, res) {
        try {
            const { error } = req.params
            res.render('login', {
                error
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginProcess(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })
            console.log(user);
            res.send(user)

            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword) {
                    if(user.role === "admin") {
                        req.session.userId = user.id;
                        res.redirect('/admin')
                    } else if(user.role === "User") {
                        req.session.userId = user.id;
                        res.redirect('/user')
                    }
                } else {
                    const error = "Invalid email or password"
                    return res.redirect(`/login?error=${error}`)
                }
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginAdmin(req, res) {
        try {
            const { error } = req.params
            res.render('loginAdmin', {
                error
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginAdminProcess(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })

            res.send(user)

            if (user) {
                const isTruePassword = bcrypt.compareSync(password, user.password)
                if (isTruePassword) {
                    req.session.id = user.id;
                    return res.redirect('/admin')
                }
                else {
                    const error = "Invalid email or password"
                    return res.redirect(`/login?error=${error}`)
                }
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

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
            const { buyMsg, orderBy } = req.query
            const data = await Book.bookShowAll(orderBy)
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
            res.redirect('/admin/books')
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

    static async logout(req, res) {
        try {
            await req.session.destroy()
            res.redirect('/')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller;