'use strict';
const {
  Model
} = require('sequelize');

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
        foreignKey : "BookId"
      })

    }

    get formatRupiah(){
      return formatRupiah(this.price)
    }
  }
  Book.init({
    title: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};