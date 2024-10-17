const router = require('express').Router();
const { Blog, User,Comment } = require("../models")
const moment = require('moment');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogs = blogData.map((blog) =>{
      const blogPlain=blog.get({ plain: true })
     
// console.log(blogPlain)
    const createdAtDate = new Date(blogPlain.createdAt);
      blogPlain.createdAtFormatted = moment(createdAtDate).format('DD MMM YYYY, HH:mm:ss');
      return blogPlain;
      });
      res.render('home', {blogs ,
      loggedIn: req.session.loggedIn,
    })
  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
// route to get the comment
router.get('/comment',async(req,res)=>{
  try{ 
    const commentData=await Comment.findAll({
      where:blog_Id.req.query,
      include:[
        { model: User,
          attributes: ['username'],}
      ],
      order:[['createdAt', 'DESC']],
    })
    console.log(commentData)
res.status(200).json(commentData)
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }

})


// POST route to add a new comment
router.post('/comment', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      blog_id: req.body.blog_id, // Assuming you have a foreign key to associate the comment with a blog
      user_id: req.session.user_id, // Assuming the user is logged in
    });
    console.log(newComment)
    console.log(req.session)
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});




router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/dashboard",(req,res)=>{
  // if(!req.session.loggedIn){
  //   res.redirect("/login");
  //   return;
  // }
  res.render("dashboard",{
    loggedIn:req.session.loggedIn
  })
})
// display a single blog post 
router.get('/:id',async(req,res)=>{
    if(req.session.loggedIn){
      try{
        const blogData = await Blog.findByPk(req.params.id,{
          attributes: ['id','title', 'content', 'createdAt'],

          include: [
           
            {
              model:User,
              attributes:['username'],
              
            },
            
              {
                model: Comment, // Fetch the comments associated with the blog
                attributes: ['comment_text', 'createdAt'], // Fetch comment text and created date
                include: {
                  model: User, // Fetch the user who made the comment
                  attributes: ['username'],
                },
            }
          ]
  
    })
   
      const blogPlain=blogData.get({ plain: true })
      // console.log(blogPlain)
   
  
  
    const createdAtDate = new Date(blogPlain.createdAt);
      blogPlain.createdAtFormatted = moment(createdAtDate).format('DD MMM YYYY, HH:mm:ss');
    //  console.log(blogPlain)
      res.render('blog', {blogPlain ,
        loggedIn: req.session.loggedIn,
      })
      }
      catch(err){
        console.log(err)
        res.status(500).json(err)
  
      }  
   
  }else{
    res.render('login')
  }
  });

router.get("/signup", (req, res) => {
  // if (req.session.loggedIn) {
  // res.redirect("/");
  //   return;
  // }
  res.render("signup");
});

module.exports = router;
// GET all the blogs
