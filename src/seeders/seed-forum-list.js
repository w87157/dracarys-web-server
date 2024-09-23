'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('forum_list', [
      {
        img: "/forum/castle-6.jpg",
        article_title: "年全新世界地圖與角色揭曉",
        description: "新遊戲更新公布了全新世界地圖與角色，為玩家帶來更多探索和挑戰的機會。快來體驗這個精彩的冒險旅程！",
      },
      {
        img: "/forum/dragon-1.jpg",
        article_title: "跨平台版本即將上線",
        description: "期待已久的跨平台版本即將上線，玩家可以在不同裝置上無縫切換，享受一致的遊戲體驗。",
      },
      {
        img: "forum/person-2.jpg",
        article_title: "新增多人模式，挑戰你的策略極限",
        description: "最新更新中加入了全新的多人模式，讓玩家可以與好友一起挑戰極限，測試策略和協作能力。",
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('forum_list', null, {});
  }
};
