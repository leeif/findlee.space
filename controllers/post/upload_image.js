var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function UploadImage() {
  Base.call(this);
  this.name = 'UploadImage';
}

util.inherits(UploadImage, Base);

UploadImage.prototype.run = function(req, res, next) {
  UploadImage.super_.prototype.run.call(this, req, res);
  Manager.Post(req.db).uploadImage(req.busboy, function(err, data) {
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
  req.pipe(req.busboy);
};

module.exports = UploadImage;
