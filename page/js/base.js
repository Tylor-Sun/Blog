var moduleTag = new Vue({
    el: '#module-tag',
    data: {
        tagList: []
    },
    computed: {
        randomColor() {
            return function () {
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return `rgb(${red},${green},${blue})`;
            }
        },
        randomSize() {
            return function () {
                var size = ((Math.random() * 35) + 18) + 'px';
                return size;
            }
        },
        getTags(){
            return function (){
                axios({
                    method:"get",
                    url: "/queryTagAll"
                }).then(function (res){
                    var result = res.data.data;
                    var list = [];
                    for(var i = 0; i < result.length; i++){
                        var temp = {};
                        temp.tag = result[i].tag;
                        temp.link = `/?tag=${result[i].tag}`
                        list.push(temp);
                    }
                    moduleTag.tagList = list;
                })
            }
        }
    },
    created() {
        this.getTags();
    },
})

var moduleHot = new Vue({
    el: "#module-hot",
    data: {
        hotList: []
    },
    computed: {
        getHotList(){
            return function (){
                axios({
                    method: "get",
                    url: "/querylBlogHotList"
                }).then(function (res){
                    moduleHot.hotList = res.data.data
                    for(var i = 0; i < moduleHot.hotList.length; i++){
                        moduleHot.hotList[i].link = "/blogDetail.html?blogId=" + moduleHot.hotList[i].id;
                    }
                })
            }   
        }
    },
    created() {
        this.getHotList();
    }
})

var moduleNewComment = new Vue({
    el: "#module-comment",
    data: {
        commentList: []
    },
    computed: {
        getNewComment(){
            return function (){
                axios({
                    method: "get",
                    url: "/queryCommentsByCurTime"
                }).then(function (res){
                    moduleNewComment.commentList = res.data.data
                })
            }   
        }
    },
    created() {
        this.getNewComment();
    }
})

