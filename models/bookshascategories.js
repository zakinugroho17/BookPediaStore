'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BooksHasCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BooksHasCategories.belongsTo(models.Categories,{
        foreignKey : "CategoriesId"
      })
      // BooksHasCategories.belongsTo(models.Categories)
      BooksHasCategories.belongsTo(models.Book,{
        foreignKey : "BooksId"
      })
      // BooksHasCategories.belongsTo(models.Book)
    }
  }
  BooksHasCategories.init({
    BooksId: DataTypes.INTEGER,
    CategoriesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BooksHasCategories',
  });
  return BooksHasCategories;
};