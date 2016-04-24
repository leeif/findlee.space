var db = require('../models');
function ContentsWrapper() {
  this.contents = db.contents;
}

ContentsWrapper.prototype.get = function(option) {
  return this.contents.findAll(option);
};

ContentsWrapper.prototype.save = function(model) {
  return this.contents.build(model).then(function(content){
    content.save();
  });
};

ContentsWrapper.prototype.update = function(model) {
  return this.contents.build(model).then(function(){

  });
};

ContentsWrapper.prototype.delete = function(cid) {

};

module.exports = function() {
  return new ContentsWrapper();
};
