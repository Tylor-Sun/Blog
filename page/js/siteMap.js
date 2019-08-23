
var blogList = new Vue({
    el:"#blog-list",
    data:{
        nowPage: 1,
        pageSize:6,
        pageCount:10 ,
        pageList: [],
        blogList:[]
    },
    computed: {
        getBlogList(){
            return function (){
                axios({
                    method:"get",
                    url: "/queryBlogAll"
                }).then(function (res){
                    var list = res.data.data;
                    for(var i = 0; i < list.length; i++){
                        list[i].link = "/blogDetail.html?blogId=" + list[i].id;
                    }
                    blogList.blogList = list;
                }).catch(function (err){
                    console.log("请求失败:queryBlogAll",err)
                })
            }
        },
        jump:function (){
            return function (nowPage){
                this.getBlogByPage(nowPage,this.pageSize);
            }
        },
        getBlogByPage: function () {
            return function (nowPage, pageSize) {
                axios({
                    url:"/queryBlogCount",
                    method:"get"
                }).then(function (res){
                    blogList.pageCount = res.data.data[0].count;
                }).catch(function (err){
                    console.log("请求失败：queryBlogCount", err);
                })
                axios({
                    method: "get",
                    url: "/queryBlogByPage?nowPage=" + (nowPage - 1) + "&pageSize=" + pageSize
                }).then(function (res) {
                    var result = res.data.data;
                    var list = []
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
                    blogList.blogList = list;
                    blogList.nowPage = nowPage;
                }).catch(function (err) {
                    console.log("请求失败：getBlogByPage", err);
                });

                this.generatePageTool;
            }
        },
        generatePageTool: function () {
            var nowPage = this.nowPage;
            var pageSize = this.pageSize;
            var pageCount = this.pageCount;
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
        this.getBlogList();
        this.getBlogByPage(this.nowPage, this.pageSize);
    },
})