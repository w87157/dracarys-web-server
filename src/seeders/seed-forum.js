'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('forum', [
      {
        area: "News",
        category: "Headline News",
      },
      {
        area: "News",
        category: "Popular News",
      },
      {
        area: "Official Event",
        category: "Latest Event",
      },
      {
        area: "Official Event",
        category: "Popular Event",
      },
      {
        area: "Forum Area",
        category: "Guide",
      },
      {
        area: "Forum Area",
        category: "Equipment",
      },
      {
        area: "Forum Area",
        category: "Map",
      },
      {
        area: "Forum Area",
        category: "Other",
      },
      {
        area: "Video Stream",
        category: "Popular",
      },
      {
        area: "Video Stream",
        category: "Today"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('forum', null, {});
  }
};
