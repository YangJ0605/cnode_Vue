<template>
    <div class='PostList'> 
        <!-- 数据为加载完成时候显示 -->
        <div class="loading" v-if='isLoading'>
            <img src="../assets/loading.gif" alt="">
        </div>
        <!-- 帖子列表 -->
        <div class="posts" v-else> 
            <ul>
                <li>
                    <div class="topbar">
                    <span @click='changeBg' class="active">全部</span>
                    <span @click='changeBg'>精华</span>
                    <span @click='changeBg'>分享</span>
                    <span @click='changeBg'>问答</span>
                    <span @click='changeBg'>招聘</span>
                    <span @click='changeBg'>客户端测试</span>
                    </div>
                </li>
            <li v-for='(post,index) in postlists' :key='index'>
                <!-- 动态绑定属性需要v-bind -->
                <!-- 头像区域 -->
                <img :src="post.author.avatar_url" > 
                <!-- 回复数/浏览量 -->
                <span class="reply_count">{{post.reply_count}}</span>/<span class="visit_count">{{post.visit_count}}</span>
                <!-- 帖子分类 -->
                <span :class="[{put_good:(post.good===true)},
                {put_top:(post.top===true)},{topiclist_tab:(post.good===false&&post.top===false)}]">
                {{post|formTab}}</span>
                <!-- 文章标题 -->
                <router-link :to="{
                  name:'post_content',
                  params:{
                    id:post.id,
                    name:post.author.loginname,
                  }
                }">
                  <span>{{post.title}}</span>
                </router-link>
                
                <!-- 时间 -->
                <span class="last_reply_at">{{post.last_reply_at | formDate}}</span>
            </li>
        </ul>
        <div>
          <Pagination @changePage='renderlist'></Pagination>
        </div>
        </div>
        
        
    </div>
</template>

<script>
import $ from 'jquery'
import Pagination from './Pagination';

export default {
    name:'Postlist',
    data(){
        return {
            isLoading:false,
            postlists:[],
            page:1
        }
    },
    components: {
      Pagination
    },
    methods:{
        getData(){
            this.$http.get('https://cnodejs.org/api/v1/topics',{
              params:{
                page:this.page,
                limit:15
              }
                
            })
            .then((res)=>{
                this.isLoading=false
                //console.log(res)
                this.postlists=res.data.data
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        changeBg(e){
          // console.log(e)
          $(e.target).addClass('active').siblings().removeClass('active')
        },
        renderlist(val){
          this.page=val
          this.getData()
        }

    },
    beforeMount(){
        this.isLoading=true
        this.getData()
    },
    
    
}
</script>
    
<style scoped>
.PostList{
    background-color: #e1e1e1;
    position: relative;
  }
  .posts {
    margin-top: 10px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }
.visit_count {
   font-size: 10px;
   color: #b4b4b4
}
  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist_tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply_at {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    display: inline-block;
    color: #778087;
    font-size: 12px;
    position: absolute;
    right: 0;
    margin-right: 15px;
  }

  .topbar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .topbar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }
  .topbar span.active {
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }
  .topbar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }
</style>