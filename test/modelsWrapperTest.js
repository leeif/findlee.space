var wrapper = require('../modelsWrapper');
wrapper.contents.get({
  where: [{
    'cid': 1
  }]
}).then(function(content){
  console.log(content[0].get());
});