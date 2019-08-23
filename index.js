var path = require("path");

var express = require("express");

var globalConfig = require("./config");

var loader = require("./loader");

var app = new express();

app.use(express.static(path.join(__dirname,"/page")));

// Everyday
app.post("/setEveryDay", loader.get("/setEveryDay"));
app.get("/getEveryDay", loader.get("/getEveryDay"));

// Blog
app.post("/insertBlog", loader.get("/insertBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));
app.get("/queryBlogAll", loader.get("/queryBlogAll"));
app.get("/querylBlogHotList", loader.get("/querylBlogHotList"));

// TagBlogMapping
app.get("/queryBlogByPageAndTag", loader.get("/queryBlogByPageAndTag"));
app.get("/queryBlogCountByTag", loader.get("/queryBlogCountByTag"));

// Tag
app.get("/queryTagAll", loader.get("/queryTagAll"))

// Message
app.get("/insertMessage", loader.get("/insertMessage"));
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentsNumByBlogId", loader.get("/queryCommentsNumByBlogId"));
app.get("/queryCommentsByCurTime", loader.get("/queryCommentsByCurTime"));

// Code-验证码
app.get("/queryRandomCode", loader.get("/queryRandomCode"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动")
})

