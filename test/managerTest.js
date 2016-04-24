var manager = require('../manager');
var db = require('../modelsWrapper');
// manager.Get(db).getArticle(1, function(err, result){
//   console.log(result);
//   console.log(err);
// });

manager.Get(db).getArticleList(function(err, result){
  console.log(result);
  console.log(err);
});