'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('forum_news', [
      {
        submit_time: CURRENT_TIMESTAMP,
        area: 'News',
        category: 'Headline News',
        article_title: '全新世界地圖與角色揭曉',
        article: '新遊戲更新公布了全新世界地圖與角色，為玩家帶來更多探索和挑戰的機會。快來體驗這個精彩的冒險旅程！',
        image: '/forum/castle-6.jpg',
      },
      {
        submit_time: CURRENT_TIMESTAMP,
        area: 'News',
        category: 'Headline News',
        article_title: '跨平台版本即將上線',
        article: '期待已久的跨平台版本即將上線，玩家可以在不同裝置上無縫切換，享受一致的遊戲體驗。',
        image: '/forum/dragon-1.jpg',
      },
      {
        submit_time: CURRENT_TIMESTAMP,
        area: 'News',
        category: 'Popular News',
        article_title: '新增多人模式，挑戰你的策略極限',
        article: '最新更新中加入了全新的多人模式，讓玩家可以與好友一起挑戰極限，測試策略和協作能力。',
        image: '/forum/person-2.jpg',
      },
      {
        submit_time: CURRENT_TIMESTAMP,
        area: 'News',
        category: 'Popular News',
        article_title: '發布大型擴展包，增加新劇情與任務',
        article: '新的擴展包已經發布，帶來更多的劇情和任務，讓遊戲內容更加豐富，為玩家提供更多的遊戲樂趣。',
        image: '/forum/world-2.jpg',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('forum_news', null, {});
  }
};
