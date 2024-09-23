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
    await queryInterface.bulkInsert('product_item', [
      {
        id: 1,
        item_name: '新手包',
        item_desc: '提供基本保護的新手護甲。前3小時遊戲時間獲得雙倍經驗值。',
        image: '/shop/productItem_01_01.png',
        fk_product_id: 1,
      },
      {
        id: 2,
        item_name: '刺客匕首',
        item_desc: '一把可靠的基礎武器，適合開始冒險之旅。',
        image: '/shop/productItem_01_02.png',
        fk_product_id: 1,
      },
      {
        id: 3,
        item_name: '生命藥水',
        item_desc: '10瓶在戰鬥中恢復生命的藥水。',
        image: '/shop/productItem_01_03.png',
        fk_product_id: 1,
      },
      {
        id: 4,
        item_name: '無畏探險者組',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_02_01.png',
        fk_product_id: 2,
      },
      {
        id: 5,
        item_name: '無畏探險者組',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_02_02.png',
        fk_product_id: 2,
      },
      {
        id: 6,
        item_name: '無畏探險者組',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_02_03.png',
        fk_product_id: 2,
      },
      {
        id: 7,
        item_name: '勝利勇士包',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_03_01.png',
        fk_product_id: 3,
      },
      {
        id: 8,
        item_name: '勝利勇士包',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_03_02.png',
        fk_product_id: 3,
      },
      {
        id: 9,
        item_name: '勝利勇士包',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_03_03.png',
        fk_product_id: 3,
      },
      {
        id: 10,
        item_name: '巫師魔力珍藏壺',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_04_01.png',
        fk_product_id: 4,
      },
      {
        id: 11,
        item_name: '巫師魔力珍藏壺',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_04_02.png',
        fk_product_id: 4,
      },
      {
        id: 12,
        item_name: '節慶限定寶箱',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: null,
        fk_product_id: 5,
      },
      {
        id: 13,
        item_name: '至尊皇家組',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_06_01.png',
        fk_product_id: 6,
      },
      {
        id: 14,
        item_name: '至尊皇家組',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_06_02.png',
        fk_product_id: 6,
      },
      {
        id: 15,
        item_name: '至尊皇家組',
        item_desc: '每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。',
        image: '/shop/productItem_06_03.png',
        fk_product_id: 6,
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
    await queryInterface.bulkDelete('product_item', null, {});
  }
};
