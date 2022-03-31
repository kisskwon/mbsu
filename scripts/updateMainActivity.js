var fs = require("fs");
var path = require("path");

module.exports = function () {
  var src = "Platforms_src/android/src/MainActivity.java";
  var dest =
    "platforms/android/app/src/main/java/com/lge/mbsu/MainActivity.java";
  var data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
};
