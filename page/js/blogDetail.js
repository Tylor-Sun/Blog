var articleDetail = new Vue({
    el: "#articleDetail",
    data: {
        title: "",
        tag: "",
        curTime: "",
        views: "",
        content: "",
        commentNum: "",

    },
    computed: {

    },
    created() {

        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }
        var blogId = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "blogId") {
                try {
                    blogId = searchUrlParams[i].split("=")[1];
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?blogId=" + blogId
        }).then(function (res) {
            var result = res.data.data[0];
            articleDetail.title = result.title;
            articleDetail.tag = result.tags;
            articleDetail.curTime = result.cur_time;
            articleDetail.views = result.views;
            articleDetail.content = result.content;
        }).catch(function (err) {
            console.log("文章详情页请求错误：queryBlogById", err)
        })
    },
})

var messageList = new Vue({
    el: "#message-list",
    data: {
        total: 0,
        messageList: [
            {
                blogId: 22,
                userName: "sunhao",
                options: "",
                curTime: "2019年5月18日",
                comments: "这个怎么打不开呀？？？？"
            },
        ]
    },
    computed: {
        getComments() {
            return function () {
                var blogId = -1;
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return;
                }
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "blogId") {
                        try {
                            blogId = searchUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                axios({
                    method: "get",
                    url: "queryCommentsByBlogId?blogId=" + blogId
                }).then(function (res) {
                    var list = res.data.data;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].parent > -1) {
                            list[i].options = `@${list[i].parent_name}`;
                        }
                    }
                    messageList.messageList = list;
                }).catch(function (err) {
                    console.log("获取评论信息失败：queryCommentsByBlogId", err)
                })
                axios({
                    method: "get",
                    url: "/queryCommentsNumByBlogId?blogId=" + blogId
                }).then(function(res){
                    messageList.total = res.data.data[0].count;
                })
            }
        },
        replySomeBody() {
            return function (id, username) {
                document.getElementById("reply").value = id;
                document.getElementById("parentName").value = username;
                document.getElementById("usermessage").placeholder = `想跟${username}说点什么？`;
                location.href = "#write-message";
            }
        }
    },
    created() {
        this.getComments();
    }
})

var writeMessage = new Vue({
    el: "#write-message",
    data: {
        code: "",
        rightCode: ""
    },
    computed: {
        submitMessage() {
            return function () {
                var code = document.getElementById("code").value;
                if (writeMessage.rightCode != code) {
                    alert("验证码错误")
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return;
                }
                var blogId = -1;
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "blogId") {
                        try {
                            blogId = searchUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                var reply = document.getElementById("reply").value;
                var parentName = document.getElementById("parentName").value;
                var userName = document.getElementById("username").value;
                var comments = document.getElementById("usermessage").value;
                var email = document.getElementById("useremail").value;
                axios({
                    method: "get",
                    url: "/insertMessage?blogId=" + blogId + "&parent=" + reply + "&userName=" + userName + "&comments=" + comments + "&email=" + email + "&parentName=" + parentName,
                }).then(function (res) {
                    alert("留言成功！")
                    document.getElementById("username").value = "";
                    document.getElementById("usermessage").value = "";
                    document.getElementById("useremail").value = "";
                    document.getElementById("code").value = "";
                }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        changeCode() {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (res) {
                    writeMessage.code = res.data.data.data;
                    writeMessage.rightCode = res.data.data.text;
                })
            }
        }
    },
    created() {
        this.changeCode();
    },
})