var dbutil = require("./DButil");


function queryBlogAll (success){
    
    var querySql = "select * from blog order by id desc;";

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

function updateBlogViews(blog_id,success){
    var updateSql = "update blog set views = views + 1 where id = ?;";
    var params = [blog_id]

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

function queryBlogById (blogId, success){
    
    var querySql = "select * from blog where id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

function insertBlog(title, content, views, tags, cur_time, mod_time, success) {

    var insertSql = "insert into blog(`title`, `content`, `views`, `tags`, `cur_time`, `mod_time`) values (?,?,?,?,?,?);";
    var params = [title, content, views, tags, cur_time, mod_time];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (err, result) {
        if (err == null) {
            success(result);
        } else {
            console.log(err);
        }
    })
}

function queryBlogByPage(nowPage, pageSize, success) {

    var querySql = "select * from blog order by id desc limit ?,?;";
    var params = [parseInt(nowPage * pageSize), parseInt(pageSize)];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();

}
function queryBlogCount(success) {

    var querySql = "select count(1) as count from blog;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();

}

function querylBlogHotList (length ,success){
    
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [length];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryBlogAll = queryBlogAll;
module.exports.updateBlogViews = updateBlogViews;
module.exports.querylBlogHotList = querylBlogHotList;