/**
 * register router info
 */

var express = require('express');
var Welcome = require('./controllers/Welcome');
var BlogIndex = require('./controllers/BlogIndex');
var BlogAdmin = require('./controllers/BlogAdmin');
var BlogArticle = require('./controllers/BlogArticle');
var BlogPublish = require('./controllers/BlogPublish');
var router = express.Router();

//show root welcome page
router.get('/', function(req, res, next){
  var welcome = new Welcome();
  welcome.run(req, res, next);
});

router.get('/blog', function(req, res, next){
  var blogIndex = new BlogIndex();
  blogIndex.run(req, res, next);
});

router.get('/blog/article/:cid', function(req, res, next){
  var blogArticle = new BlogArticle();
  blogArticle.run(req, res, next);
});

router.get('/blog/admin', function(req, res, next){
	var blogAdmin = new BlogAdmin();
  blogAdmin.run(req, res, next);
});

router.post('/blog/article/publish', function(req, res, next){
  var blogPublish = new BlogPublish();
  blogPublish.run(req, res, next);
});

module.exports = router;
