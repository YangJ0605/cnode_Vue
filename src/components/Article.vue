<template>
    <div class="article">
         <!-- 数据为加载完成时候显示 -->
        <div class="loading" v-if='isLoading'>
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-else>
            <div class="topic_header"> 
                <div class="topic_title">
                  <span class="put_good_top">{{posts | formTab}}</span>
                  {{posts.title}}   
                </div>
                <ul>
                      <li>•{{posts.last_reply_at|formDate}}</li>
                      <li>• 作者 {{posts.author.loginname}}</li>
                      <li>•{{posts.visit_count}}次浏览</li>
                      <li>•来自 {{posts.tab|formTab2}}</li>
                </ul>
                <div class="topic_content" v-html='posts.content' id="content"></div>
            </div>
      <div id="reply">
      <div class="topbar">回复</div>
      <div v-for="(reply,index)  in posts.replies" :key='index' class="replySec">
        <div class="replyUp">
          <router-link :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }">
            <img :src="reply.author.avatar_url" alt="">
          </router-link>
          <router-link :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }">
            <span>{{reply.author.loginname}}</span>
          </router-link>
          <span>
          {{index+1}}楼
        </span>
          <span v-if="reply.ups.length>0" >
          ☝ {{reply.ups.length}}
        </span>
          <span v-else>
        </span>
        </div>
      <p v-html="reply.content"></p>
      </div>
    </div>
        </div>
    </div>
</template>


<script>

export default {
    name:'Article',
    data () {
        return {
            isLoading:false,
            posts:{}  //文章的所有页
        }
    },
    methods:{
      getArticleData(){
        this.$http.get('https://cnodejs.org/api/v1/topic/'+this.$route.params.id)
        .then((res)=>{
          if(res.data.success===true){
            this.isLoading=false
            this.posts=res.data.data
            
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    },
    beforeMount(){
      this.isLoading=true
      this.getArticleData()
    },
    watch:{
      '$route'(to,from){
        this.getArticleData()
      }
    }
}

</script>


<style scoped>

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }
  .put_good_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
}
  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 14px;
    color: #838383;
  }

  .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }
</style>
