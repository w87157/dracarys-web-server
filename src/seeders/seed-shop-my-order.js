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
    await queryInterface.bulkInsert('my_order', [
      {
        fk_player_account: 'player1',
        order_date: new Date(),
        status: '購物車',
      },
      {
        fk_player_account: 'player1',
        order_date: new Date(),
        status: '已下單',
      },
      {
        fk_player_account: 'player1',
        order_date: new Date(),
        status: '我的最愛',
      },
      {
        fk_player_account: 'player2',
        order_date: new Date(),
        status: '我的最愛',
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
    await queryInterface.bulkDelete('my_order', null, {});
  }
};
