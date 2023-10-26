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
   let categories = JSON.parse(fs.readFileSync("./data/categories.json","utf-8"));

   categories.forEach(el =>{
    delete el.id
    el.createdAt = new Date();
    el.updatedAt = new Date();
   })

    await queryInterface.bulkInsert('Categories', categories);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Categories',null,{});
  }
};
