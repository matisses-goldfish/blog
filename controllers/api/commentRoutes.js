const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get comment post

router.get('/comment/:id', async (req, res) => {
	try {
	  const commentData = await Comment.findByPk(req.params.id, {
		include: [
		  {
			model: Comment,
		  },
		],
	  });
  
	  const comment = commentData.get({ plain: true });
  
	  res.render('comment', {
		...comment,
		logged_in: req.session.logged_in
	  });
	} catch (err) {
	  res.status(500).json(err);
	}
  });
  
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      response: req.body.response,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
      }
    );
    
    res.status(200).json( {message: "succesfully created new comment", newComment});
  } catch (err) {
    res.status(500).json({message: "please try again at a later time!",err});
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'Please try again, there were no comments found with this ID!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;