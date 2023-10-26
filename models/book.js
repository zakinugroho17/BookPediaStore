'use strict';
const {
  Model
} = require('sequelize');
const {Op} = require('sequelize')
const formatRupiah = require('../helpers/helper')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.User,{
        foreignKey : "UserId"
      })
      Book.hasMany(models.BooksHasCategories,{
        foreignKey : "BooksId"
      })

    }

    get formatRupiah(){
      return formatRupiah(this.price)
    }

    static async bookAdminShowAll(){
      let data = Book.findAll({
        where : {
            stock : {
                [Op.gt] : 0
            }
        },
        order : [["price", "ASC"], ["stock", "ASC"]]
    })
    return data
    }

    static async bookShowAll(){
      let data = await Book.findAll({
        where : {
            stock : {
                [Op.gt] : 0
            }
        },
        order : [["price", "ASC"], ["stock", "ASC"]]
    })
    return data
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is not null"
        },
        notNull: {
          args: true,
          msg: "Title is not empty"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is not null"
        },
        notNull: {
          args: true,
          msg: "Stock is not empty"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is not null"
        },
        notNull: {
          args: true,
          msg: "Price is not empty"
        }
      }
    },
    image: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image is not null"
        },
        notNull: {
          args: true,
          msg: "Image is not empty"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is not null"
        },
        notNull: {
          args: true,
          msg: "Status is not empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { hooks: {
    beforeCreate: (instance, options) => {
      instance.title = instance.title.toUpperCase()
    },
  },
    sequelize,
    modelName: 'Book',
  });
  return Book;
};