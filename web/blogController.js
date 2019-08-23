var blogDao = require("../dao/BlogDao");

var tagDao = require("../dao/TagDao");

var tagBlogMapping = require("../dao/TagBlogMappingDao");

var createTimeUtil = require("../utils/createTimeUtil");

var respUtil = require("../utils/respUtil")

var url = require("url");

var path = new Map();

function querylBlogHotList(request, response){

    blogDao.querylBlogHotList(5,function (res){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", res));
        response.end();
    })
}

path.set("/querylBlogHotList", querylBlogHotList);

function queryBlogAll(request, response){

    blogDao.queryBlogAll(function (res){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", res));
        response.end();
    })
}

path.set("/queryBlogAll", queryBlogAll);

function queryBlogById(request, response){

    var params = url.parse(request.url, true).query;

    blogDao.queryBlogById(parseInt(params.blogId), function (res){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", res));
        response.end();
        blogDao.updateBlogViews(parseInt(params.blogId), function (res){});//更新浏览次数
    })
}
path.set("/queryBlogById", queryBlogById);

function queryBlogCount(request, response) {

    blogDao.queryBlogCount(function (res) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", res));
        response.end();
    })
}
path.set("/queryBlogCount", queryBlogCount);


function queryBlogByPage(request, response) {
    var parmas = url.parse(request.url, true).query;

    blogDao.queryBlogByPage(parmas.nowPage, parmas.pageSize, function (res) {

        for(var i = 0; i < res.length ; i++){
            res[i].content = res[i].content.replace(/<img[\w\W]*>/g,"");// 前端图片会转换成Base64格式
            res[i].content = res[i].content.replace(/<[\w\W]{1,30}||&[\w]{1,5};>/g, "");// 标签替换
            res[i].content = res[i].content.substring(0,300);//截取
        }

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", res));
        response.end();
    })

}
path.set("/queryBlogByPage", queryBlogByPage);


function insertBlog(request, response) {

    var params = url.parse(request.url, true).query;

    var tags = params.tag.replace("，", ",").replace(/\s/g, "");

    request.on("data", function (data) {

        blogDao.insertBlog(params.title, data.toString(), 0, tags, createTimeUtil.getNowTime(), createTimeUtil.getNowTime(), function (res) {

            response.writeHead(200);
            response.write(respUtil.writeResult("success", "博客添加成功！", null));
            response.end();

            var blogId = res.insertId;
            var tagArr = tags.split(",");
            for (var i = 0; i < tagArr.length; i++) {
                if (tagArr[i] == "") {
                    continue;
                }
                queryTag(tagArr[i], blogId);
            }
        })
    })
}
path.set("/insertBlog", insertBlog);




function queryTag(tag, blogId) {
    console.log(tag)
    tagDao.queryTag(tag, function (res) {
        if (res == null || res.length == 0) {//没有标签插入一个标签
            insertTag(tag, blogId);
        } else {
            insertTagBlogMapping(res[0].id, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    tagDao.insertTag(tag, createTimeUtil.getNowTime(), createTimeUtil.getNowTime(), function (res) {
        insertTagBlogMapping(res.insertId, blogId)
    });
}

function insertTagBlogMapping(tag, blogId) {
    tagBlogMapping.insertTagBlogMapping(tag, blogId, createTimeUtil.getNowTime(), createTimeUtil.getNowTime(), function (res) {
        console.log("映射添加成功")
    });
}

module.exports.path = path;