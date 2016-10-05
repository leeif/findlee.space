var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');
var path = require('path');
var fs = require('fs');
var mime = require('mime-types');

function UploadImage() {
  Base.call(this);
  this.name = 'UploadImage';
}

util.inherits(UploadImage, Base);

UploadImage.prototype.run = function(req, res, next) {
  UploadImage.super_.prototype.run.call(this, req, res);
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    if (mimetype !== mime.lookup('jpg') && mimetype !== mime.lookup('png')) {
      res.status(400).json({
        filename: filename
      });
    }
    var dirpath = path.join(__dirname, '../../public/blog/image/article_' + req.params.cid);
    fs.stat(dirpath, function(err, stats) {
      if (err || !stats.isDirectory()) {
        fs.mkdirSync(dirpath);
      }
      filename = Date.now() + '.' + mime.extension(mimetype);
      var filepath = path.join(dirpath, filename);
        file.pipe(fs.createWriteStream(filepath));
        file.on('end', function() {
          res.status(200).json({
            filename: filename
          });
        });
    });
  });
};

module.exports = UploadImage;
