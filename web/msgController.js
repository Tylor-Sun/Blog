var createTimeUtil = require("../utils/createTimeUtil");

var msgDao = require("../dao/msgDao");

var respUtil = require("../utils/respUtil")

var url = require("url");

var captcha = require("svg-captcha");//验证码

var path = new Map();




function insertMessage(request, response) {

    var params = url.parse(request.url, true).query;

    msgDao.insertMessage(parseInt(params.blogId), parseInt(params.parent), params.parentName, params.userName, params.comments, params.email, createTimeUtil.getNowTime(), createTimeUtil.getNowTime(), function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "留言成功", res));
        response.end();
    })
}
path.set("/insertMessage", insertMessage)


function queryRandomCode(request, response) { //验证码
    var img = captcha.create({ fontSize: 50, width: 100, height: 40 });
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "获取验证码成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);


function queryCommentsByBlogId(request, response) {

    var params = url.parse(request.url, true).query;

    msgDao.queryCommentsByBlogId(parseInt(params.blogId), function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "留言成功", res));
        response.end();
    })
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId)


function queryCommentsNumByBlogId(request, response) {

    var params = url.parse(request.url, true).query;
    
    msgDao.queryCommentsNumByBlogId(parseInt(params.blogId), function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "留言成功", res));
        response.end();
    })
}
path.set("/queryCommentsNumByBlogId", queryCommentsNumByBlogId)


function queryCommentsByCurTime(request, response) {

    msgDao.queryCommentsByCurTime(5, function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "留言成功", res));
        response.end();
    })
}
path.set("/queryCommentsByCurTime", queryCommentsByCurTime)


module.exports.path = path;