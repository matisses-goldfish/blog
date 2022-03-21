const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get blog post
router.get('/', async (req, res) =>{
    try {
        const blogData = await BlogPost.findAll({
			attributes: [
				'id',
				'topic',
				'title',
				'date_created',
				'description'
			],

			include: [
				// {
				// 	model: Comment,
				// 	attributes: ['id', 'response', 'topic', 'user_id', 'date_created'],
				// 	include: {
				// 		model: User,
				// 		attributes: ['username']
				// 	}
				// },
				{
					model: User,
					attributes: ['username']
				}
            ],
        });
        //serializing  data
        const blogPosts = blogData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/blog_post/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                model: User,
                attributes: ['username']
                },
            ],
        });
    const blogPost = blogData.get({ plain:true });

    res.render('blog_post', {
        ...blogPost,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: BlogPost
			}],
		});

		const user = userData.get({
			plain: true
		});

		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/blog_post/:id', async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				}, {
					model: Comment,
					include: [
						User
					]
				}
			],
		});

		const blog = blogData.get({
			plain: true
		});

		res.render('blog_post', {
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});


router.get('/blogForm', withAuth, async(req,res) =>{
    console.log('this is the blogForm route')
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    res.render('blogForm');
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});


router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signUp');
});

module.exports = router;