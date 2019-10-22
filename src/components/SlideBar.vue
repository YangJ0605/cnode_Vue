<template>
    <div id='sidebar'>
      <div class="panel">
        <div class="header">
          <span>
            作者
          </span>
        </div>
        <div class="inner">
          <div class="user_card">
            <router-link :to="{
                    name:'user_info',
                    params:{
                      name:userinfo.loginname
                    }
                    }">
            <img :src="userinfo.avatar_url" alt="">
            <span class="username">{{userinfo.loginname}}</span>
          </router-link>
          <div class="score">
            <span >积分:{{userinfo.score}}</span>
          </div>
          </div>
        </div>
      </div>
      <div class="recent_topics">
        <div class="header">
          <span>
            作者其他话题
          </span>
        </div>
        <div class="list">
          <ul>
            <li v-for='(item,index) in getFiveTopic' :key=index><div>
              
              <router-link :to="{name:'post_content',params:{
                id:item.id,
                name:item.author.loginname
              }}"><span>{{item.title}}</span> </router-link>
              </div>
              </li>
          </ul>
        </div>
      </div>
      <div class="recent_replies">
         <div class="header">
          <span>
            无人回复的话题
          </span>
        </div>
        <div class="list">
          <ul>
            <li v-for='(item,index) in getFiveReply' :key=index><div>
              
              <router-link :to="{name:'post_content',params:{
                id:item.id,
                name:item.author.loginname
              }}"><span>{{item.title}}</span> </router-link>
              </div>
              </li>
          </ul>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
      name:'SlideBar',
      data () {
        return {
          userinfo:{},
          topic_lists:[],
          reply_lists:[]
        }
      },
      methods:{
         getUserData(){
            this.$http.get('https://cnodejs.org/api/v1/user/'+this.$route.params.name)
            .then((res)=>{
                
                // console.log(res)
                if(res.data.success===true){
                 
                  this.userinfo=res.data.data
                  // console.log(this.userinfo)
                  this.topic_lists=res.data.data.recent_topics
                  this.reply_lists=res.data.data.recent_replies
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
      },
      beforeMount(){
        this.getUserData()
        
      },
      computed: {
        getFiveTopic:{
          get(){
           if(this.topic_lists.length){
             return this.topic_lists.splice(0,5)
           }
          }
        },
        getFiveReply:{
          get(){
            if(this.reply_lists.length){
             return this.reply_lists.splice(0,5)
           }
          }
        }
      }
    }
</script>


<style  scoped>
a {
  text-decoration: none;
}
li {
  list-style: none;
}
#sidebar {
    width: 290px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
    
}
.panel,.recent_topics,.recent_replies {
  margin-bottom: 13px;
  background-color: #ffffff;
}
 .header {
    color: #51585c;
    border-radius: 3px 3px 0 0;
    background-color: #f6f6f6;
    padding: 10px;
}
#sidebar .header span {
    color: #444;
}
.panel .inner {
    padding: 10px;
    border-radius: 0 0 3px 3px;
}
.panel .inner img {
  width: 48px;
  vertical-align: middle;
}
.panel .inner .username{
  padding: 0 5px;
  color: #778087;
}
.score {
  margin-top: 10px;
  font-size: 16px;
}
li div {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 270px;
  font-size: 14px;
  padding: 5px 5px;
}
li div span {
    white-space: nowrap;
    color: #778087;
}
</style>