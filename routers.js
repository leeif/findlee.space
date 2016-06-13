/**
 * register router info
 */

var express = require('express');

var pages = require('./controllers/pages');

var get = require('./controllers/get');

var post = require('./controllers/post');

var put = require('./controllers/put');

var del = require('./controllers/delete');

var router = express.Router();

//pages
router.get('/', function(req, res, next) {
  var welcome = new pages.Welcome();
  welcome.run(req, res, next);
});

router.get('/blog', function(req, res, next) {
  var blogIndex = new pages.BlogIndex();
  blogIndex.run(req, res, next);
});

router.get('/blog/admin', function(req, res, next) {
  var blogAdmin = new pages.BlogAdmin();
  blogAdmin.run(req, res, next);
});

router.get('/blog/admin/article/write', function(req, res, next) {
  var blogWrite = new pages.BlogWrite();
  blogWrite.run(req, res, next);
});

router.get('/blog/admin/article/:cid/edit', function(req, res, next) {
  var blogEdit = new pages.BlogEdit();
  blogEdit.run(req, res, next);
});


router.get('/blog/article/:cid', function(req, res, next) {
  var blogArticle = new pages.BlogArticle();
  blogArticle.run(req, res, next);
});

router.get('/blog/admin/login', function(req, res, next) {
  var blogLoginPage = new pages.BlogLoginPage();
  blogLoginPage.run(req, res, next);
});

//get
router.get('/blog/api/tag/get', function(req, res, next) {
  var getTag = new get.GetTag();
  getTag.run(req, res, next);
});

router.get('/blog/api/article/get', function(req, res, next) {
  var getArticle = new get.GetArticle();
  getArticle.run(req, res, next);
});

router.get('/blog/api/articles/get', function(req, res, next) {
  var getArticles = new get.GetArticles();
  getArticles.run(req, res, next);
});

//post
router.post('/blog/api/article/publish', function(req, res, next) {
  var blogPublish = new post.BlogPublish();
  blogPublish.run(req, res, next);
});


router.post('/blog/api/tag/add', function(req, res, next) {
  var addTag = new post.AddTag();
  addTag.run(req, res, next);
});

router.post('/blog/api/relationship/add', function(req, res, next) {
  var addRelationship = new post.AddRelationship();
  addRelationship.run(req, res, next);
});

router.post('/blog/admin/login', function(req, res, next) {
  var blogLoginURL = new post.BlogLoginURL();
  blogLoginURL.run(req, res, next);
});

//put
router.put('/blog/api/article/update', function(req, res, next) {
  var blogUpdate = new put.BlogUpdate();
  blogUpdate.run(req, res, next);
});

//delete
router.delete('/blog/api/tag/delete', function(req, res, next) {
  var deleteTag = new del.DeleteTag();
  deleteTag.run(req, res, next);
});

router.delete('/blog/api/relationship/delete', function(req, res, next) {
  var deleteRelationship = new del.DeleteRelationship();
  deleteRelationship.run(req, res, next);
});

module.exports = router;
