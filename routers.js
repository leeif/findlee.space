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
  pages.Welcome.run(req, res, next);
});

router.get('/blog', function(req, res, next) {
  pages.BlogIndex.run(req, res, next);
});

router.get('/blog/admin', function(req, res, next) {
  pages.BlogAdmin.run(req, res, next);
});

router.get('/blog/admin/article/write', function(req, res, next) {
  pages.BlogWrite.run(req, res, next);
});

router.get('/blog/admin/article/:cid/edit', function(req, res, next) {
  pages.BlogEdit.run(req, res, next);
});


router.get('/blog/article/:cid', function(req, res, next) {
  pages.BlogArticle.run(req, res, next);
});

router.get('/blog/admin/login', function(req, res, next) {
  pages.BlogLogin.run(req, res, next);
});

//get
router.get('/blog/api/tag/get', function(req, res, next) {
  get.GetTag.run(req, res, next);
});

router.get('/blog/api/article/get', function(req, res, next) {
  get.GetArticle.run(req, res, next);
});

router.get('/blog/api/articles/get', function(req, res, next) {
  get.GetArticles.run(req, res, next);
});

router.get('/blog/api/article/:cid/comments', function(req, res, next) {
  get.GetComments.run(req, res, next);
});

//post
router.post('/blog/api/article/image/upload', function(req, res, next) {
  post.UploadImage.run(req, res, next);
});

router.post('/blog/api/comment/add', function(req, res, next) {
  post.CommentPublish.run(req, res, next);
});

router.post('/blog/api/article/publish', function(req, res, next) {
  post.BlogPublish.run(req, res, next);
});


router.post('/blog/api/tag/add', function(req, res, next) {
  post.AddTag.run(req, res, next);
});

router.post('/blog/api/relationship/add', function(req, res, next) {
  post.AddRelationship.run(req, res, next);
});

router.post('/blog/admin/login', function(req, res, next) {
  post.BlogLogin.run(req, res, next);
});

//put
router.put('/blog/api/article/update', function(req, res, next) {
  put.BlogUpdate.run(req, res, next);
});

//delete
router.delete('/blog/api/tag/delete', function(req, res, next) {
  del.DeleteTag.run(req, res, next);
});

router.delete('/blog/api/relationship/delete', function(req, res, next) {
  del.DeleteRelationship.run(req, res, next);
});

module.exports = router;
