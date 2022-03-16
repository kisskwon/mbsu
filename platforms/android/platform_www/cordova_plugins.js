cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.lge.mbsu.tvconnect.TVConnect",
      "file": "plugins/com.lge.mbsu.tvconnect/www/TVConnect.js",
      "pluginId": "com.lge.mbsu.tvconnect",
      "clobbers": [
        "cordova.plugins.TVConnect"
      ]
    }
  ];
  module.exports.metadata = {
    "com.lge.mbsu.tvconnect": "0.0.2"
  };
});