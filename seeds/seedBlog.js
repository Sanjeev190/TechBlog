const {Blog  } = require('../models');

const blogData = [
  {
    title: "My Amazing Trip to Rome",
    content:
      "I spent a week exploring the ancient ruins and enjoying delicious pasta in Rome. The Colosseum was breathtaking!",
   
    date: "2023-05-15",
    user_id: 1,
  },
  {
    title: "Paris: City of Lights",
    content:
      "From the Eiffel Tower to the Louvre, Paris never disappoints. The croissants were to die for!",
    date: "2023-07-22",
    user_id: 2,
  },
  {
    title: "Tokyo Adventures",
    content:
      "Exploring the bustling streets of Tokyo was an unforgettable experience. The blend of tradition and technology is fascinating.",
    date: "2023-09-10",
    user_id: 1,
  },
];

const seedBlogpost = () => Blog.bulkCreate(blogData);

module.exports = seedBlogpost;
