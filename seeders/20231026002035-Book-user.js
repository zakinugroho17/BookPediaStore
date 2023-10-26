'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let book = JSON.parse(fs.readFileSync("./data/books.json","utf-8"));

   book.forEach(el =>{
    delete el.id
    el.createdAt = new Date();
    el.updatedAt = new Date();
   })

    await queryInterface.bulkInsert('Books', book);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Books',null,{});
  }
};
