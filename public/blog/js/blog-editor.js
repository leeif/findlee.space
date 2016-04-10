function Editor(option) {
  this.article = {};
  this.option = option;
  this.tagsDropDownLoaded = false;
  this.init();
}

Editor.prototype.init = function() {
  this.setListener();
  if (this.option.type === 'edit' && this.option.cid) {
    this.bindUpdate(this.option.updateButton);
  } else {
    this.bindPublish(this.option.publishButton);
  }
  this.loadArctile();
};

Editor.prototype.setListener = function() {
  //text listener
  this.setTextListener();
  //title listener
  this.setTitleListener();
  //author listener
  this.setAuthorListener();
  //tagInput listener
  this.setTagInputListener();
};

Editor.prototype.bindPublish = function(button) {
  var self = this;
  button.click(function() {
    if (self.option.type === 'write') {
      self.publish();
    }
  });
};

Editor.prototype.bindUpdate = function(button) {
  var self = this;
  button.click(function() {
    if (self.option.type === 'edit' && self.option.cid) {
      self.update();
    }
  });
};

Editor.prototype.setTextListener = function() {
  var self = this;
  this.option.text.bind('input propertychange', function() {
    //update preview
    self.option.preview.html(marked(self.option.text.val()));
    //update article object
    self.article.text = self.option.text.val();
  });
};

Editor.prototype.setTitleListener = function() {
  var self = this;
  this.option.title.bind('input propertychange', function() {
    self.article.title = self.option.title.val();
  });
};

Editor.prototype.setAuthorListener = function() {
  var self = this;
  this.option.author.bind('input propertychange', function() {
    //update article object
    self.article.author = self.option.author.val();
  });
};

Editor.prototype.setTagInputListener = function() {
  var self = this;
  this.option.tagInput.focus(function() {
    console.log('focus');
    self.loadAllTags();
  });
};

Editor.prototype.deleteRelationship = function(mid, callback) {
  var self = this;
  var data = {
    cid: this.option.cid,
    mid: mid
  };
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/relationship/delete',
    method: 'delete',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    dataType: 'json'
  }).done(function(data) {
    callback(null, data);
  }).fail(function(err) {
    callback(err);
  });
};

Editor.prototype.addRelationship = function(mid, callback) {
  var self = this;
  console.log(mid);
  var data = {
    cid: this.option.cid,
    mid: mid
  };
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/relationship/add',
    method: 'post',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    dataType: 'json'
  }).done(function(data) {
    callback(null, data);
  }).fail(function(err) {
    callback(err);
  });
};

Editor.prototype.publish = function() {
  var data = {
    title: this.article.title.val(),
    text: this.article.text.val(),
    created: Date.now() / 1000,
    modified: Date.now() / 1000
  };
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/article/publish',
    method: 'post',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    dataType: 'json'
  }).done(function(data) {
    console.log(data);
    alert('publish success');
  }).fail(function() {
    console.log('failed');
  });
};

Editor.prototype.update = function() {
  var data = {
    cid: this.article.cid,
    title: this.article.title,
    author: this.article.author,
    text: this.article.text,
    modified: Date.now() / 1000
  };
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/article/update',
    method: 'put',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    dataType: 'json'
  }).done(function(result) {
    console.log(result);
    if (result.redirectURL) {
      var url = 'http://' + window.location.host + result.redirectURL;
      console.log(url);
      window.location.href = url;
    }
  }).fail(function(err) {
    console.log(err);
    console.log('failed');
  });
};

Editor.prototype.loadArctile = function() {
  var self = this;
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/article/get?cid=' + this.option.cid,
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    self.article = data;
    self.setView();
  }).fail(function() {
    console.log('failed');
  });
};

Editor.prototype.loadAllTags = function() {
  var self = this;
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/tag/get',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    if (!self.tagsDropDownLoaded) {
      setInterval(self.appendTagDropDown(data), 1000);
      self.tagsDropDownLoaded = true;
    }
  }).fail(function() {

  });
};

Editor.prototype.appendTagDropDown = function(data) {
  var self = this;
  data.forEach(function(item) {
    var jqObj = $('<span class="tag" data="' + JSON.stringify(item) + '">' +
      item.name +
      '</span>');
    $('#tags-dropdown').append(jqObj);
    jqObj.click(function() {
      self.addRelationship(item.mid, function(err, data) {
        if (err) {
          alert('add relationship failed');
          return;
        } else {
          self.article.metas.push(item);
          self.setTagView(self.article.metas, self.article.metas.length - 1, self.option.tagInput);
        }
      });
    });
  });
};

Editor.prototype.setView = function() {
  var i = 0;
  this.option.title.val(this.article.title);
  this.option.author.val(this.article.author);
  this.option.text.val(this.article.text);
  for (i = 0; i < this.article.metas.length; i++) {
    this.setTagView(this.article.metas, i, this.option.tagInput);
  }
  this.option.preview.html(marked(this.option.text.val()));
};

Editor.prototype.setTagView = function(metas, i, element) {
  var self = this;
  var jqObj = $('<span class="tag">' +
    metas[i].name +
    '<span class="fa fa-times"></span>' +
    '</span>');
  jqObj.find('.fa-times').click(function() {
    self.deleteRelationship(metas[i].mid, function(err) {
      if (err) {
        alert('delete failed');
        return;
      }
      jqObj.remove();
      metas.splice(i, 1);
    });
  });
  element.before(jqObj);
};

$(document).ready(function() {
  var editor = new Editor({
    type: type,
    cid: cid,
    title: $('.editor-title input'),
    author: $('.editor-author input'),
    tagInput: $('.editor-tag input'),
    tagsDropDown: $('#tags-dropdown'),
    text: $('.editor-text textarea'),
    preview: $('.editor-text .preview'),
    updateButton: $('.editor-footer .update'),
    publishButton: $('.editor-footer .publish')
  });
});