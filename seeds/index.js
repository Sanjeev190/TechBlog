const sequelize = require('../config/connection');
// const { User, Blog,Comment } = require("../models");

const seedUser = require('./seedUser');
const seedBlog = require('./seedBlog');
const seedComment = require('./seedComment');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlog();
  await seedComment();

  process.exit(0);
};

seedAll();
