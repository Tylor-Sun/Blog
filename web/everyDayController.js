var path = new Map();

var createTime = require("../utils/createTimeUtil");

var respUtil = require("../utils/respUtil");

var everyDayDao = require('../dao/EveryDayDao');

function setEveryDay(request, response) {

    request.on("data", function (data) {
        everyDayDao.setEveryDay(data.toString().trim(), createTime.getNowTime(),function (res){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));//返回的结果
            response.end();
        })
    })
}
path.set("/setEveryDay", setEveryDay);

function getEveryDay(request, response) {
    
    everyDayDao.getEveryDay(function (res){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "获取成功", res));//返回的结果
        response.end();

    })
}

path.set("/getEveryDay", getEveryDay);

module.exports.path = path;