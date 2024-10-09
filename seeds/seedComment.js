const { Comment } = require('../models');


const commentData = [
  {
    comment_text: 'This is an insightful post!',
    blog_id: 1,  // Assuming blog with ID 1 exists
    user_id: 1,  // Assuming user with ID 1 exists
  },
  {
    comment_text: 'I completely agree with your point.',
    blog_id: 1,  // Same blog ID, different user
    user_id: 2,  // Assuming user with ID 2 exists
  },
  {
    comment_text: 'Great writing, looking forward to more posts!',
    blog_id: 2,  // Comment on another blog post
    user_id: 1,  // Same user as before
  },
  {
    comment_text: 'I have some different thoughts on this.',
    blog_id: 3,  // Comment on a third blog post
    user_id: 2,  // Different user
  },
  
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
