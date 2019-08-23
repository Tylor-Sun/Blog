var everyDay = new Vue({
    el: "#every-day",
    data: {
        dayContent: "Dare and the world always yields. If it beats you sometimes, dare it again and again and it will succumb.",
        chinese: "大胆挑战，这世界总会让步。如果有时候你被打败了，一次次的挑战，它总会屈服。"
    },
    computed: {
        getEveryDay() {
            return this.dayContent;
        },
        everyDayChinese() {
            return this.chinese;
        }
    },
    created() {
        axios({
            method: "get",
            url: "/getEveryDay"
        }).then(function (res) {
            everyDay.dayContent = res.data.data[0].content;
        }).catch(function (err) {
            console.log("请求失败", err);
        })
    },
})

var articleList = new Vue({
    el: "#article-list",
    data: {
        nowPage: 1,
        pageSize: 4,
        pageCount: 6,
        pageList: [],
        articleList: []
    },
    computed: {
        jump: function () {
            return function (nowPage) {
                this.getBlogByPage(nowPage, this.pageSize);
            }
        },
        getBlogByPage: function () {
            return function (nowPage, pageSize) {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                if (searchUrlParams != "") {
                    for (var i = 0; i < searchUrlParams.length; i++) {
                        if (searchUrlParams[i].split("=")[0] == "tag") {
                            try {
                                tag = searchUrlParams[i].split("=")[1];
                            } catch (e) {
                                console.log(e)
                            }
                        }
                    }
                }
                if (tag == "") {
                    axios({
                        url: "/queryBlogCount",
                        method: "get"
                    }).then(function (res) {
                        articleList.pageCount = res.data.data[0].count;
                    }).catch(function (err) {
                        console.log("请求失败：queryBlogCount", err);
                    })

                    axios({
                        method: "get",
                        url: "/queryBlogByPage?nowPage=" + (nowPage - 1) + "&pageSize=" + pageSize
                    }).then(function (res) {
                        var result = res.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.link = "/blogDetail.html?blogId=" + result[i].id;
                            temp.id = result[i].id;
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.views = result[i].views;
                            temp.tag = result[i].tags;
                            temp.time = result[i].cur_time;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.nowPage = nowPage;
                    }).catch(function (err) {
                        console.log("请求失败：getBlogByPage", err);
                    });
                } else {
                    axios({
                        url: "/queryBlogCountByTag?tag=" + tag,
                        method: "get"
                    }).then(function (res) {
                        articleList.pageCount = res.data.data[0].count;
                    }).catch(function (err) {
                        console.log("请求失败：queryBlogCountByTag", err);
                    })
                    axios({
                        method: "get",
                        url: "/queryBlogByPageAndTag?nowPage=" + (nowPage - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function (res) {
                        console.log(res);
                        var result = res.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.link = "/blogDetail.html?blogId=" + result[i].id;
                            temp.id = result[i].id;
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.views = result[i].views;
                            temp.tag = result[i].tags;
                            temp.time = result[i].cur_time;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.nowPage = nowPage;
                    }).catch(function (err) {
                        console.log("请求失败：queryBlogByPageAndTag", err);
                    });

                }

                this.generatePageTool;//获取页码数组
            }
        },
        generatePageTool: function () {
            var nowPage = this.nowPage;//当前页
            var pageSize = this.pageSize;//总页数
            var pageCount = this.pageCount;//总条数
            var result = [];
            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 })
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= ((pageCount + pageSize - 1) / pageSize)) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= ((pageCount + pageSize - 1) / pageSize)) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            result.push({ text: ">>", page: Math.ceil((pageCount + pageSize - 1) / pageSize) - 1 });
            this.pageList = result;
            return result;
        }
    },
    created() {
        this.getBlogByPage(this.nowPage, this.pageSize);
    }
})

