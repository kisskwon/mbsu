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
