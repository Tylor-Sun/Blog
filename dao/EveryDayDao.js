var dbutil = require("./DButil");

function setEveryDay(content, curTime, success) {
    var insertSql = "insert into every_day (`content`, `cur_time`) values (?, ?);"
    var params = [content, curTime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (err, result) {
        if (err == null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

function getEveryDay(success) {

    var querySql = "select * from every_day order by id desc limit 1"//取倒数第一个

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (err, result) {
        if (err == null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

module.exports = {
    "setEveryDay": setEveryDay,
    "getEveryDay": getEveryDay
}