'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('order_detail', [
      {
        fk_order_id: 1,
        fk_product_id: 2,
        quantity: 1,
      },
      {
        fk_order_id: 1,
        fk_product_id: 4,
        quantity: 1,
      },
      {
        fk_order_id: 2,
        fk_product_id: 1,
        quantity: 1,
      },
      {
        fk_order_id: 2,
        fk_product_id: 2,
        quantity: 1,
      },
      {
        fk_order_id: 2,
        fk_product_id: 4,
        quantity: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('order_detail', null, {});
  }
};
