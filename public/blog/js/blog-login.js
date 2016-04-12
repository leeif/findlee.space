function Login(option) {
  this.option = option;
  this.init();
}

Login.prototype.init = function() {
  this.setLoginButtonListener();
};

Login.prototype.setLoginButtonListener = function() {
  var self = this;
  this.option.login.click(function() {
    self.login();
  });
};

Login.prototype.login = function() {
  console.log('login');
  var data = {
    account: this.option.account.val(),
    password: this.option.password.val()
  };
  console.log(data);
  $.ajax({
    url: 'http://' + window.location.host + '/blog/admin/login',
    method: 'post',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=UTF-8',
    dataType: 'json'
  }).done(function(data) {
  	console.log(data);
    if (data.redirect) {
      window.location.href = data.redirect;
    }
  }).fail(function(err) {
    console.log(err);
    alert('Login Failed');
  });
};

$(document).ready(function() {
  var login = new Login({
    account: $('#account'),
    password: $('#password'),
    login: $('.login')
  });
});
