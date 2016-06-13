var Q = require('q');
/**
 * mothod promisify
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
exports.promisify = function(object, method) {
  return function() {
    var deferred = Q.defer();
    var args = Array.prototype.slice.call(arguments, 0);
    args.push(deferred.makeNodeResolver());
    method.apply(object, args);
    return deferred.promise;
  };
};

// determine whether two coordinates are in the certain distance()
exports.distance = function(ca, cb, minDistance) {
  var lat1 = ca.latitude;
  var lng1 = ca.longitude;
  var lat2 = cb.latitude;
  var lng2 = cb.longitude;
  if ((Math.abs(lat1) > 90) || (Math.abs(lat2) > 90)) {
    return false;
  }
  if ((Math.abs(lng1) > 180) || (Math.abs(lng2) > 180)) {
    return false;
  }
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) *
    Math.cos(radLat2) *
    Math.pow(Math.sin(b / 2), 2)));
  // private const double EARTH_RADIUS = 6378.137;
  s = s * 6378.137;
  // EARTH_RADIUS; unit:Km
  s = Math.round(s * 10000) / 10000;
  if (s * 1000 < minDistance) {
    return true;
  } else {
    return false;
  }
};


function rad(d) {
  return d * Math.PI / 180.0;
}

exports.capitalizeFirstLetter = function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
};