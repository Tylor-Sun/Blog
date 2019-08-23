var dbutil = require("./DButil");

function insertTagBlogMapping(tag_id, blog_id, cur_time, mod_time, success) {

    var insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`,`cur_time`, `mod_time`) values (?,?,?,?);";
    var params = [tag_id, blog_id, cur_time, mod_time];

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
function queryBlogByPageAndTag(tag_id, nowPage, pageSize, success) {

    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";
    var params = [tag_id, nowPage * pageSize, pageSize];

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

function queryBlogCountByTag(tag_id, success) {

    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var params = [tag_id];

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

module.exports = {
    "insertTagBlogMapping": insertTagBlogMapping,
    "queryBlogByPageAndTag": queryBlogByPageAndTag,
    "queryBlogCountByTag": queryBlogCountByTag
}