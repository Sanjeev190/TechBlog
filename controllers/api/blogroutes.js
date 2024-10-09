const router = require('express').Router();
const { Blog,Comment,User} = require('../../models');
const moment = require('moment');

const path = require("path");

//  It will get the blog related to the user
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        where:{user_id:req.session.user_id},
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      const blogs = blogData.map((blog) =>{
        const blogPlain=blog.get({ plain: true })
        
        const createdAtDate = new Date(blogPlain.createdAt);
        blogPlain.createdAtFormatted = moment(createdAtDate).format('DD MMM YYYY, HH:mm:ss');
return blogPlain;
      })
      res.status(200).json(blogs);
// res.render('dashboard',{ blogs,
//     loggedIn:req.session.loggedIn,
// })
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    })

  

// creating a new blog
router.post('/', async (req, res) => {
  try {
    const{title,content}=req.body;
    if(!title || !content){
        res.status(400).json({message:"Please provide title and content"})
        return;
    }
    const newBlog = await Blog.create({
      title,
      content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/:id', async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: { id: req.params.id, 
            user_id: req.session.user_id }, // Ensure only the author can delete
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const blogData = await Blog.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: { id: req.params.id, user_id: req.session.user_id }, // Ensure only the author can update
        }
      );
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  

module.exports = router;