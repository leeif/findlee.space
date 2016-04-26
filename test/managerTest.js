var manager = require('../manager');
var db = require('../modelsWrapper');
// manager.Get(db).getArticle(1, function(err, result){
//   console.log(result);
//   console.log(err);
// });

manager.Get(db).getArticles(function(err, result){
  console.log(result);
  console.log(err);
});

// manager.Get(db).getTags(2, function(err, result){
//   console.log(err);
//   console.log(result);
// });

// manager.Post(db).addTag({name: 'd'}, function(err, result){
//   console.log(err);
//   console.log(result);
// });

// manager.Post(db).publishArticle({
//   title: 'asdasdasd',
//   text: 'asdasdasdas',
//   created: 123123123,
//   modified: 123123123,
//   author: 'liyifan',
//   relationships: [{
//     mid: 1,
//   }, {
//     mid: 2
//   }]
// }, function(err, result){
//   console.log(result);
// });

// manager.Put(db).updateArticle({
//   cid: 10,
//   title: 'update',
//   text: 'asdasdasdas',
//   created: 123123123,
//   modified: 123123123,
//   author: 'liyifan',
// }, function(err, result){
//  console.log(err);
//  console.log(result);
// });