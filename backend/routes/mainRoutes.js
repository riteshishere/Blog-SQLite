const express = require('express');
const mainController = require('../controllers/mainController');
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const blogController = require('../controllers/blogController')

const router = express.Router();
const app = express();

router.route('/').get(mainController.homepage)
router.route('/home').get(mainController.login)

router.route('/login').get(mainController.login);
router.route('/login').post(loginController.login);

router.route('/signup').get(mainController.signup);
router.route('/signup').post(signUpController.signup);

router.route('/homepage').get(mainController.homepage);

router.route('/logout').get(mainController.logout);

router.route('/createBlog').get(mainController.createBlog);
router.route('/createBlog').post(blogController.createBlog);

router.route('/profile').get(mainController.profile);
router.route('/blog').get(mainController.blog);

router.route('/delete').post(mainController.deleteBlog);

router.route('/likePost').post(mainController.likePost);
router.route('/dislikePost').post(mainController.dislikePost);
router.route('/comment').post(mainController.createComment);

router.route('/editBlog').get(mainController.editBlog);
router.route('/editBlog').post(blogController.editBlog)

module.exports = router;