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
    await queryInterface.bulkInsert('content_detail', [
      {
        id: 1,
        Player_id: 10,
        submit_time: CURRENT_TIMESTAMP,
        area: 'News',
        category: 'Headline News',
        article_title: '新作公布《龍焰與魔法》！全新世界地圖與角色揭曉',
        article: '期待已久的新作《龍焰與魔法》終於揭曉，為玩家帶來一個全新的魔幻世界。這次更新中，開發團隊投入大量心血設計了全新的世界地圖，將帶領玩家踏上一段前所未有的冒險旅程。新地圖不僅擁有多樣的地形和風景，還充滿了神秘的隱藏寶藏和未知的危險挑戰，讓探索變得更加刺激和富有挑戰性。除了全新的世界地圖，《龍焰與魔法》還推出了數個全新角色，每個角色都有獨特的背景故事和技能設計。這些新角色將為遊戲注入新的活力，玩家可以選擇並培養他們，利用各自的特殊技能來應對不同的戰鬥和任務挑戰。新角色的加入不僅擴展了遊戲的可玩性，也為玩家提供了更多策略組合的可能性。',
        image_1: '/forum/castle-6.jpg',
        image_2: '/shop/productItem_01_01.png',
        figcaption: '《龍焰與魔法》的全新世界地圖與角色現已上線，快來探索這個充滿魔法與冒險的新世界，展開屬於你的英雄之旅！',
      },
      {
        id: 3,
        Player_id: 18,
        submit_time: CURRENT_TIMESTAMP,
        area: 'News',
        category: 'Popular News',
        article_title: '新增多人模式，挑戰你的策略極限',
        article: '《龍焰與魔法》最新更新帶來了激動人心的多人模式，為玩家提供了全新的合作與對戰體驗。這次新增的多人模式不僅讓玩家可以與好友並肩作戰，共同探索神秘的魔幻世界，還能挑戰各種高難度的副本和任務。每個副本和任務都需要隊友間密切合作，發揮各自角色的特長來擊敗強大的敵人。',
        image: '/forum/person-2.jpg',
        figcaption: '新增多人模式，為玩家帶來了前所未有的挑戰和樂趣。快召集你的好友，一起迎接這場策略和合作的極限挑戰，體驗更加豐富多彩的遊戲世界！',
      },
      {
        id: 5,
        Player_id: 25,
        submit_time: CURRENT_TIMESTAMP,
        area: 'Forum',
        category: 'Guide',
        article_title: '新手指南：從零開始的冒險之路',
        article: '歡迎來到《龍焰與魔法》的奇幻世界！首先，花些時間熟悉遊戲介面和基本操作，了解主選單、設置和快捷鍵，以便快速上手。選擇適合你的遊戲風格的角色，每個角色都有獨特的技能和屬性，了解它們的優缺點是成功的關鍵。完成遊戲提供的新手任務，這些任務不僅能幫助你熟悉遊戲機制，還能獲得初始資源和裝備。',
        image: '/forum/person-2.jpg',
        figcaption: '這些建議將幫助你在《龍焰與魔法》的世界中迅速成長，從零開始踏上屬於你的冒險之路。祝你遊戲愉快，早日成為強大的冒險者！',
      },
      {
        id: 7,
        Player_id: 70,
        submit_time: CURRENT_TIMESTAMP,
        area: 'Forum',
        category: 'Equipment',
        article_title: '高手進階：裝備選擇與搭配',
        article: '裝備的選擇與搭配至關重要。根據角色的特性選擇最佳裝備，可以大幅提升戰力。不同角色有不同的需求，戰士需要高防禦和攻擊力的裝備，法師則更注重法力和魔法攻擊。合理搭配防具與武器，以最大化屬性增益。例如，某些裝備可以提高暴擊率，適合高攻擊速度的角色；而增加生命值的裝備則適合坦克角色。',
        image: '/shop/productItem_06_03.png',
        figcaption: '定期更新和調整裝備，確保在各種挑戰中保持優勢，這樣才能在《龍焰與魔法》的世界中脫穎而出，成為真正的高手。ss',
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
    await queryInterface.bulkDelete('content_detail', null, {});
  }
};
