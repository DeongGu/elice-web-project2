"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Tasks",
      [
        {
          taskName: "This is task number one!",
          createdAt,
          updatedAt,
        },
        {
          taskName: "This is task number two!",
          createdAt,
          updatedAt,
        },
        {
          taskName: "This is task number three!",
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Task"); // Deletes ALL Tasks
  },
};
