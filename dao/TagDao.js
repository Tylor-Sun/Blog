var dbutil = require("./DButil");

function queryTag(tag, success){
    var querySql = "select * from tags where tag = ?;";
    var params = [tag]    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (err, res){
        if(err == null ){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}

function insertTag(tag, cur_time, mod_time, success){
    var insertSql = "insert into tags (`tag`, `cur_time`, `mod_time`) values (?,?,?);";
    var params = [tag, cur_time, mod_time];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (err, res){
        if(err == null) {
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}

function queryTagAll(success){

    var querySql = "select tag from tags;";

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (err, res){
        if(err == null) {
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}

function queryTagByTag(tag, success){

    var querySql = "select * from tags where tag = ?;";
    var params = [tag]

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (err, res){
        if(err == null) {
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}



module.exports = {
    "queryTag": queryTag,
    "insertTag": insertTag,
    "queryTagAll": queryTagAll,
    "queryTagByTag":queryTagByTag
}