var gctwUtils = require('../tool/GCTWUtils');

var ca = {
  latitude : -80,
  longitude : 80
};

var cb = {
  latitude : -80,
  longitude : 80
};

var result = gctwUtils.distance(ca, cb, 200);
console.log(result);