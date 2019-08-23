function getNowTime(){
    return parseInt(Date.now() / 1000);
}

module.exports.getNowTime = getNowTime;