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
      console.log(blogPlain)


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

router.get("/signup", (req, res) => {
  // if (req.session.loggedIn) {
  // res.redirect("/");
  //   return;
  // }
  res.render("signup");
});

module.exports = router;
// GET all the blogs
