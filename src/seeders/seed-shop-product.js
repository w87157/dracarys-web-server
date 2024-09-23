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
    await queryInterface.bulkInsert('shop_product', [
      {
        id: 1,
        product_name: '新手冒險裝備組',
        product_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        category: 'A',
        price: 2000,
        image: '/shop/product_01.png',
        onshelf_status: '上架中'
      },
      {
        id: 2,
        product_name: '無畏探險者寶箱',
        product_desc: '為勇敢的探險者準備！使用探險者指南針發現隱藏的寶藏，強化護甲套裝提供卓越保護和敏捷性。',
        category: 'A',
        price: 2200,
        image: '/shop/product_02.png',
        onshelf_status: '上架中'
      },
      {
        id: 3,
        product_name: '勝利勇士至尊包',
        product_desc: '每位戰士的夢想！內含史詩武器和勇士護甲，助你在戰場上無往不利。',
        category: 'A',
        price: 2200,
        image: '/shop/product_03.png',
        onshelf_status: '上架中'
      },
      {
        id: 4,
        product_name: '巫師魔力珍藏包',
        product_desc: '這是為魔法師量身打造的道具包！神秘法杖增強你的魔力輸出，巫師長袍提供保護和魔力加成。',
        category: 'A',
        price: 2200,
        image: '/shop/product_04.png',
        onshelf_status: '上架中'
      },
      {
        id: 5,
        product_name: '歡慶嘉年華豪華包',
        product_desc: '歡慶嘉年華豪華包讓你在節日中成為焦點！穿上派對服裝，點燃20個煙火，讓節日更加歡樂。',
        category: 'A',
        price: 2000,
        image: '/shop/product_05.png',
        onshelf_status: '上架中'
      },
      {
        id: 6,
        product_name: '至尊VIP皇家包',
        product_desc: '至尊VIP皇家包為尊貴的VIP會員打造！獨家坐騎展示你的威風，皇家護甲套裝提供極致保護。',
        category: 'A',
        price: 2400,
        image: '/shop/product_06.png',
        onshelf_status: '上架中'
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
    await queryInterface.bulkDelete('shop_product', null, {});
  }
};
