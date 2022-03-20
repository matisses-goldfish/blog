const router = require('express').Router();
const withAuth = require('../../utils/auth')

const { BlogPost, User, Comment } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try {
      const newBlogPost = await BlogPost.create({
        topic: req.body.topic,
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id
        }
      );

      res.status(200).json({message: "successfully created new blog post", newBlogPost});
  } catch (err) {
      res.status(400).json({ message: "error posting new blog post", err})
  }
});


  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await BlogPost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'no blog post with this id' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;