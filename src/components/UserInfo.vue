<template>
     <!-- 数据为加载完成时候显示 -->
     <div>
         <!-- <div class="loading" v-if='isLoading'>
            <img src="../assets/loading.gif" alt="">
        </div> -->
        <div class="userInfomation" >
            <section>
                <img :src="user_informations.avatar_url" alt="">
                <span>{{user_informations.loginname}}</span>
                <p>
                    {{user_informations.score}}积分
                </p>
                <p>
                   注册时间： {{user_informations.create_at |formDate}}
                </p>
            </section>
            <div class="topics">
                <div>
                    最近创建的话题
                </div>
                <div>
                    <ul>
                        <li v-for='(item,index) in titleLists' :key='index'>
                            <img :src="item.author.avatar_url" >
                            
                            <router-link :to='{
                                name:"post_content",
                                params:{
                                    id:item.id,
                                    limit:1,
                                    page:1
                                }
                            }'>{{item.title}}</router-link>
                        </li>
                    </ul>
                    <div>
                        <router-link :to="{
                            name:'more',
                            pramas:{
                                name:this.user_informations.loginname
                            }
                        }">查看更多>></router-link>
                    </div>
                </div>
            </div>
            <div class="replies">
                <div>最近参与的话题</div>
                <div>
                    <ul>
                        <li v-for='(item,index) in repliesLists' :key='index'>
                            <img :src="item.author.avatar_url" >
                            
                            <router-link :to='{
                                name:"post_content",
                                params:{
                                    id:item.id,
                                    limit:1,
                                    page:1
                                }
                            }'>{{item.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     </div>
        
</template>

<script>
export default {
    name:'UserInfo',
    data(){
        return {
            isLoading:false,
            user_informations:{},
            titleLists:[],
            repliesLists:[]
        }
    },
    methods:{
        getUserData(){
            this.$http.get('https://cnodejs.org/api/v1/user/'+this.$route.params.name)
            .then((res)=>{
                
                // console.log(res)
                if(res.data.success===true){
                    this.isLoading=false
                    this.user_informations=res.data.data
                    this.repliesLists=res.data.data.recent_replies
                    if(res.data.data.recent_topics.length>5){
                        this.titleLists=res.data.data.recent_topics.splice(0,5)
                    }else{
                         this.titleLists=res.data.data.recent_topics
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        },
    },
    beforeMount(){
        this.isLoading=true
        this.getUserData()
    }

}
</script>

<style scoped>
.userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }

</style>