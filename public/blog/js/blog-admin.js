function Admin(title, text){
	this.title = title;
  this.text = text;
}

Admin.prototype.bindPublish = function(button){
	var self = this;
	button.click(function(){
		self.publish();
	});
};

Admin.prototype.bindPreview = function(preview){
	var self = this;
  this.text.bind('input propertychange', function(){
  	self.update(preview);
  });
};
//update preview when textarea change
Admin.prototype.update = function(preview) {
  preview.html(marked(this.text.val()));
};

Admin.prototype.publish = function(){
  var data = {
  	title: this.title.val(),
  	text: this.text.val(),
  	created: Date.now()/1000,
  	modified: Date.now()/1000
  };
  $.ajax({
  	url : 'http://findlee.space/blog/article/publish',
  	method : 'post',
  	contentType : 'application/json; charset=UTF-8',
    data : JSON.stringify(data),
    dataType : 'json'
  }).done(function(data){
    console.log(data);
  }).fail(function(){
  	console.log('failed');
  });
};

$(document).ready(function() {
  var admin = new Admin($('input.title'), $('textarea.markdown'));
  admin.bindPreview($('div.preview'));
  admin.bindPublish($('a.button'));
});
