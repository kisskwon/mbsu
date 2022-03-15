cordova.define("com.lge.mbsu.tvconnect.TVConnect", function(require, exports, module) {
var exec = require("cordova/exec");

exports.toast = function (arg0, success, error) {
  exec(success, error, "TVConnect", "toast", [arg0]);
};

exports.turnOn = function (arg0, arg1, success, error) {
  exec(success, error, "TVConnect", "turnOn", [arg0, arg1]);
};

exports.startThinqGallery = function (arg0, success, error) {
  console.log("TVConnect - startThinqGallery");
  exec(success, error, "TVConnect", "startThinqGallery", [arg0]);
};

exports.setTime = function (arg0, arg1, arg2, arg3, arg4, success, error) {
  exec(success, error, "TVConnect", "setTime", [arg0, arg1, arg2, arg3, arg4]);
};

});
