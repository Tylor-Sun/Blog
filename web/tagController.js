var respUtil = require("../utils/respUtil")

var tagDao = require("../dao/TagDao");

var tagBlogMappingDao = require("../dao/TagBlogMappingDao");

var blogDao = require("../dao/BlogDao");

var url = require("url");

var path = new Map();


function queryTagAll(request, response) {
    tagDao.queryTagAll(function (res) {
        res.sort(function () {
            return Math.random() > 0.5 ? 1 : -1;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}
path.set("/queryTagAll", queryTagAll);


function queryBlogByPageAndTag(request, response) {

    var params = url.parse(request.url, true).query;

    tagDao.queryTagByTag(params.tag, function (res) {

        if (res == null || res.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", res));
            response.end();
        } else {
            tagBlogMappingDao.queryBlogByPageAndTag(res[0].id, parseInt(params.nowPage), parseInt(params.pageSize), function (res) {

                var blogList = [];
                for (var i = 0; i < res.length; i++) { //异步
                    blogDao.queryBlogById(res[i].blog_id, function (res) {
                        blogList.push(res[0]);
                    })
                }
                getResult(blogList, res.length, response);//利用定时器阻塞异步读取数据库直到全部读取完成

            })
        }
    })
}
path.set("/queryBlogByPageAndTag", queryBlogByPageAndTag);
function getResult(blogList, len, response) {
    if (blogList < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 100)
    } else {
        for(var i = 0; i < blogList.length ; i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/g,"");// 前端图片会转换成Base64格式
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,30}||&[\w]{1,5};>/g, "");// 标签替换
            blogList[i].content = blogList[i].content.substring(0,300);//截取
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }
}



function queryBlogCountByTag(request, response) {

    var params = url.parse(request.url, true).query;

    tagDao.queryTagByTag(params.tag, function (res) {
        if (res == null || res.length == 0) {
 
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", res));
            response.end();
        } else {
            tagBlogMappingDao.queryBlogCountByTag(res[0].id, function (res) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success", "查询成功", res));
                response.end();
            })
        }
    })
}

path.set("/queryBlogCountByTag", queryBlogCountByTag);
module.exports.path = path;