const router = require ('express').Router();
const { BlogPost, User, Comment } = require ('../../models')

// Need to test routes
router.get('/', async (req, res) => {
    try{
        const blogData = await Category.findAll( {
            attributes: [
                'id',
                'topic',
                'title',
                'description',
                'date_created'
            ],
        order: [['date_created', 'DESC']],
        include: [
            {
            model: Comment,
            attributes: ['id', 'response', 'topic', 'user_id', 'date_created'],
            include: {
                model: User,
                attributes: ['username', 'date_joined']
            }
            },
            {
            model: User,
            attributes: ['username', 'date_joined']
            },
        ]
    })
        if (!blogData) {
            res.status(404).json({ message: 'No Posts Avilable!' });
            return;
        }
        res.status(200).json(blogData);
        } catch (err) {
        res.status(500).json(err);
        }
  });

router.get('/:id', async (req, res) => {
    try{
        const blogData = await Category.findByPk(req.params.id, {
            attributes: [
                'id',
                'topic',
                'title',
                'description',
                'date_created'
            ],
        order: [['date_created', 'DESC']],
        include: [
            // Comment model here -- attached username to comment
            {
            model: Comment,
            attributes: ['id', 'response', 'topic', 'user_id', 'date_created'],
            include: {
                model: User,
                attributes: ['username', 'date_joined']
            }
            },
            {
            model: User,
            attributes: ['username', 'date_joined']
            },
        ]
    })
        if (!blogData) {
            res.status(404).json({ message: 'No Posts Avilable!' });
            return;
        }
        res.status(200).json(blogData);
        } catch (err) {
        res.status(500).json(err);
        }
  });

  router.post('/', async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json({message: "successfully created new blog post", newBlogPost});
    } catch (err) {
        res.status(400).json({ message: "error posting new blog post", err})
    }
});

router.put('/:id', withAuth, (req, res) => {
    try {
        const newBlogPost = await BlogPost.update({
            title: req.body.title,
            description: req.body.description
      },
      {
        where: {
          id: req.params.id
        }
        });

        res.status(200).json({message: "successfully updated blog post", newBlogPost});
    } catch (err) {
        res.status(400).json({ message: "error updating blog post", err})
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
