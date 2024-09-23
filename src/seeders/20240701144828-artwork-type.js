'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('artwork-type', [
      {
        category: "AI生成"
      },
      {
        category: "2D動漫"
      },
      {
        category: "遊戲截圖"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('artwork-type', null, {});
  }
};
