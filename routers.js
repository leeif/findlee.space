/**
 * register router info
 */

var express = require('express');
var Welcome = require('./controllers/pages/Welcome');
var BlogIndex = require('./controllers/pages/BlogIndex');
var BlogAdmin = require('./controllers/pages/BlogAdmin');
var BlogArticle = require('./controllers/pages/BlogArticle');
var GetTag = require('./controllers/get/GetTag');
var GetArticle = require('./controllers/get/GetArticle');
var BlogPublish = require('./controllers/post/BlogPublish');
var BlogWrite = require('./controllers/pages/BlogWrite');
var BlogEdit = require('./controllers/pages/BlogEdit');
var BlogUpdate = require('./controllers/put/BlogUpdate');
var AddTag = require('./controllers/post/AddTag');
var AddRelationship = require('./controllers/post/AddRelationship');
var DeleteTag = require('./controllers/delete/DeleteTag');
var DeleteRelationship = require('./controllers/delete/DeleteRelationship');
var router = express.Router();

//pages
router.get('/', function(req, res, next) {
  var welcome = new Welcome();
  welcome.run(req, res, next);
});

router.get('/blog', function(req, res, next) {
  var blogIndex = new BlogIndex();
  blogIndex.run(req, res, next);
});

router.get('/blog/admin', function(req, res, next) {
  var blogAdmin = new BlogAdmin();
  blogAdmin.run(req, res, next);
});

router.get('/blog/admin/article/write', function(req, res, next) {
  var blogWrite = new BlogWrite();
  blogWrite.run(req, res, next);
});

router.get('/blog/admin/article/:cid/edit', function(req, res, next) {
  var blogEdit = new BlogEdit();
  blogEdit.run(req, res, next);
});


router.get('/blog/article/:cid', function(req, res, next) {
  var blogArticle = new BlogArticle();
  blogArticle.run(req, res, next);
});

//get
router.get('/blog/api/tag/get', function(req, res, next) {
  var getTag = new GetTag();
  getTag.run(req, res, next);
});

router.get('/blog/api/article/get', function(req, res, next) {
  var getArticle = new GetArticle();
  getArticle.run(req, res, next);
});

//post
router.post('/blog/api/article/publish', function(req, res, next) {
  var blogPublish = new BlogPublish();
  blogPublish.run(req, res, next);
});


router.post('/blog/api/tag/add', function(req, res, next) {
  var addTag = new AddTag();
  addTag.run(req, res, next);
});

router.post('/blog/api/relationship/add', function(req, res, next) {
  var addRelationship = new AddRelationship();
  addRelationship.run(req, res, next);
});

//put
router.put('/blog/api/article/update', function(req, res, next) {
  var blogUpdate = new BlogUpdate();
  blogUpdate.run(req, res, next);
});

//delete
router.delete('/blog/api/tag/delete', function(req, res, next) {
  var deleteTag = new DeleteTag();
  deleteTag.run(req, res, next);
});

router.delete('/blog/api/relationship/delete', function(req, res, next) {
  var deleteRelationship = new DeleteRelationship();
  deleteRelationship.run(req, res, next);
});

module.exports = router;
