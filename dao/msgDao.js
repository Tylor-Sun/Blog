var dbutil = require("./DButil");

function queryCommentsByBlogId(blog_id, success) {
    
    var querySql = "select * from comments where blog_id = ?;";
    var params = [blog_id];

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

function insertMessage(blog_id, parent, parent_name, user_name, comments, email, cur_time, mod_time, success) {

    var insertSql = "insert into comments(`blog_id`, `parent`, `parent_name`,`user_name`, `comments`, `email`, `cur_time`, `mod_time`) values(?,?,?,?,?,?,?,?);";
    var params = [blog_id, parent, parent_name, user_name, comments, email, cur_time, mod_time];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

function queryCommentsNumByBlogId(blog_id, success) {

    var querySql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blog_id];

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

function queryCommentsByCurTime(length, success) {

    var querySql = "select * from comments order by cur_time desc limit ?;";
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

module.exports.insertMessage = insertMessage;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsNumByBlogId = queryCommentsNumByBlogId;
module.exports.queryCommentsByCurTime = queryCommentsByCurTime;