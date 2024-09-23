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
    await queryInterface.bulkInsert('shop_payment', [
      {
        id:1234566,
        fk_order_id: '1',
        transaction_date: new Date(),
        transaction_status: '待付款',
        coupon_used: 'N',
        fk_coupon_id: 1
      },
      {
        id:1234567,
        fk_order_id: '2',
        transaction_date: new Date(),
        transaction_status: '已付款',
        coupon_used: 'Y',
        fk_coupon_id: 2
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('shop_payment', null, {});
  }
};
