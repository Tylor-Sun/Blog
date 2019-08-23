var fs = require("fs");

var path = require("path");

var globalConfig = require("./config");

var pathMap = new Map();

var fileNameArr = fs.readdirSync(path.join(__dirname,"/" + globalConfig.web_path));

for (var i = 0; i < fileNameArr.length; i++) {
    var temp = require("./" + globalConfig.web_path + "/" + fileNameArr[i]);

    if (temp.path) {
        for (var [key, value] of temp.path) {

            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error("url异常，url" + key);
            }
        }
    }
}

module.exports = pathMap;