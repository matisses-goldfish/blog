const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async(req,res) =>{
    console.log('in dashboard routes')
    try {
        
        const userProfile = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: BlogPost,
                }
            ]
        });

        const profile = userProfile.get({ plain: true });
        console.log(profile)
        res.render('dashboard', {
            profile,
            logged_in: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// I'm not sure if this route will work :/
router.get('/', withAuth, async (req, res) => {
    console.log('in dashboard routes')
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: Comment,
          }
        ]
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));
  
      res.render('dashboard', { 
        comments, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;