'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const returnURL = () => {
      const categories = ['church', 'castle', 'medieval', 'knight', 'sunset'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const height = 1000;
      const width = 800;

      const imageUrl = faker.image.urlLoremFlickr({
        category: randomCategory,
        height: height,
        width: width
      });
      return imageUrl
    }

    await queryInterface.bulkInsert('artwork',
      Array.from({ length: 100 }, () => ({
        title: faker.word.words({ count: { min: 1, max: 5 } }),
        desc: faker.word.words({ count: { min: 50, max: 200 } }),
        img: returnURL(),
        view_count: faker.number.int({ min: 10, max: 4000 }),
        download_count: faker.number.int({ min: 10, max: 4000 }),
        like_count: faker.number.int({ min: 10, max: 4000 }),
        artwork_type_id: faker.helpers.arrayElement([1, 2, 3]),
        user_account: faker.internet.email().split('@')[0],
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('artwork', null, {});
  }
};
