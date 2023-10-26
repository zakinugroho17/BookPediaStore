const {Book,BooksHasCategories, Categories,Profile,User} = require('../models/index')
const {Op} = require('sequelize')
class Controller{
    static async showBook(req,res){
        try {
            let data = await Book.findAll({
                where : {
                    stock : {
                        [Op.gt] : 0
                    }
                },
                order : [["id", "ASC"]]
            })
            res.render('showBook', {data})
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async buyBook(req,res){
        try {
            let {id} = req.params
            let data = await Book.decrement('stock',{
                where : {
                    id : id
                },
                by : 1,
            })
            res.redirect('/book')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async soldBook(req,res){
        try {
            let data = await Book.findAll({
                where :{
                    stock : {
                        [Op.lte] : 0
                    }
                },
                order : [["id", "ASC"]]
            })
            res.render('soldBookList', {data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAddNewBook(req,res){
        try {
            res.render('addBook')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddNewBook(req,res){
        try {
            const {id} = req.params
            const {title,stock,price,image,status} = req.body
            let data = await Book.create({title,stock,price,image,status});
            res.redirect('/book')
            } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editProfile(req,res){
        try {
            const {id} = req.params
            let users = await Profile.findByPk(id)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getBookCategories(req,res){
        try {
            let dataBook = await Book.findAll();
            let dataCategories = await Categories.findAll()

            res.render('bookCategory',{dataBook,dataCategories})
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postBookCategories(req,res){
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;