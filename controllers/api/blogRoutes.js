const router = require('express').Router();
const withAuth = require('../../utils/auth')

const { BlogPost } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
      const newBlogPost = await BlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlogPost);
    } catch (err) {
      res.status(400).json({message:"not able to process this"});
    }
  });



router.delete('/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                //user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: "there is no blog post associated with this id"});
            return;
        }

        res.status(200).json({message: "successfully deleted blog post", blogData})
    } catch (err) {
        res.status(500).json({message: "error deleting this blog post", err})
    }
})

module.exports = router;