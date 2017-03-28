(function() {
  function Admin() {
    this.article = [];
    this.tags = [];
  }

  Admin.prototype.loadArticle = function() {
    var self = this;
    $.ajax({
      url: 'http://' + window.location.host + '/blog/api/articles/get',
      method: 'get',
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
      self.article = self.article.concat(data);
      data.forEach(function(article) {
        self.appendArticle($('.subjects ul'), article);
      });
      $('.subjects .loader').remove();
    }).fail(function() {

    });
  };

  Admin.prototype.loadTag = function() {
    var self = this;
    $.ajax({
      url: 'http://' + window.location.host + '/blog/api/tag/get',
      method: 'get',
      dataType: 'json'
    }).done(function(data) {
      self.tags = self.tags.concat(data);
      data.forEach(function(tag) {
        self.appendTag($('.tags ul'), tag);
      });
      $('.tags .loader').remove();
    }).fail(function() {

    });
  };

  Admin.prototype.addTag = function(name, callback) {
    var data = {
      name: name
    };
    $.ajax({
      url: 'http://' + window.location.host + '/blog/api/tag/add',
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

  Admin.prototype.deleteTag = function(mid, callback) {
    var data = {
      mid: mid
    };
    console.log(mid);
    $.ajax({
      url: 'http://' + window.location.host + '/blog/api/tag/delete',
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

  Admin.prototype.appendTag = function(element, tag) {
    var html = '<li class="board-row-tag">' +
      '<p>' +
      tag.name +
      '<p>' +
      '<i class="fa fa-times"></i>' +
      '</li>';
    element.append(html);
    this.setOnDeleteTagClick(element.children().last(), tag.mid);
  };

  Admin.prototype.appendArticle = function(element, article) {
    var html = '<li class="row board-row-article">' +
      '<p class="column large-9">' +
      article.title +
      '<div class="edit column large-1">' +
      '<i class="fa fa-pencil-square-o"></i>' +
      '</div>' +
      '</li>';
    element.append(html);
    this.setOnEditArticleClick(element.children().last(), article.cid);
  };

  Admin.prototype.setOnAddTagClick = function() {
    var self = this;
    var tag;
    $('.add-tag input').keydown(function(event) {
      var name = $('.tags input').val();
      if (event.which === 13) {
        self.addTag(name, function(err, data) {
          if (!err) {
            tag = {
              mid: data.mid,
              name: name
            };
            self.tags.push(tag);
            console.log(self.tags);
            self.appendTag($('.tags ul'), tag);
            $('.add-tag input').val('');
          } else {
            alert('add tag failed ' + err.responseText);
          }
        });
      }
    });
  };

  Admin.prototype.setOnDeleteTagClick = function(element, mid) {
    var self = this;
    element.find('i').click(function() {
      console.log('click');
      self.deleteTag(mid, function(err) {
        if (err) {
          alert('delete failed');
        } else {
          element.remove();
        }
      });
    });
  };

  Admin.prototype.setOnEditArticleClick = function(element, cid) {
    var self = this;
    var url;
    element.find('i').click(function() {
      console.log('click ' + cid);
      url = 'http://' + window.location.host + '/blog/admin/article/' + cid + '/edit';
      console.log(url);
      window.location.href = url;
    });
  };


  $(document).ready(function() {
    var admin = new Admin();
    admin.loadArticle();
    admin.loadTag();
    admin.setOnAddTagClick();
  });

}());
