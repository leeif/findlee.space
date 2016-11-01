function Article(option) {
  this.option = option;
  this.init();
}

Article.prototype.init = function() {
  this.setListener();
  this.getComments();
};

Article.prototype.setListener = function() {
  var self = this;
  this.option.commentWriter.find('.submit').click(function() {
    self.addComments();
  });
};

Article.prototype.getComments = function() {
  var self = this;
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/article/' + self.option.cid + '/comments',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log(data);
    if (data.comments.length > 0) {
      self.option.comments.find('.load').hide();
    } else {
      self.option.comments.find('.load').show();
    }
    self.option.comments.find('.item').remove();
    data.comments.forEach(function(item) {
      var jqobj = $('<div class="item clearfix">' +
        '<div class="author">' +
        '<p></p>' +
        '</div>' +
        '<div class = "text">' +
        '<p></p>' +
        '</div>' +
        '<div class = "created">' +
        '<p></p>' +
        '</div >' +
        '</div>');
      console.log(item.author);
      jqobj.find('.author p').text(item.author);
      jqobj.find('.text p').text(item.text);
      var date = new Date(item.created * 1000);
      var dateString = date.getFullYear() + '.' +
        (date.getMonth()+1) + '.' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
      jqobj.find('.created p').text(dateString);
      self.option.comments.append(jqobj);
    });

  }).fail(function() {

  });
};

Article.prototype.addComments = function() {
  var self = this;
  var data = {
    'cid': self.option.cid,
    'author': self.option.commentWriter.find('.author input').val(),
    'text': self.option.commentWriter.find('textarea').val()
  };
  if (data.author === '' || data.text === '') {
    alert('Name or text can not be empty');
    return;
  }
  console.log(data);
  $.ajax({
    url: 'http://' + window.location.host + '/blog/api/comment/add',
    method: 'post',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    dataType: 'json'
  }).done(function(data) {
    self.getComments();
  }).fail(function() {

  });
};

$(document).ready(function() {
  var article = new Article({
    cid: cid,
    comments: $('.comment-container .comments'),
    commentWriter: $('.comment-container .comment-writer')
  });
});
