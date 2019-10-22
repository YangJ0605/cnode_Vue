<template>
    <div>
        <div>{{user_informations.loginname}}创建的话题</div>
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
        
    </div>
</template>

<script>
    export default {
        name:'more',
        data () {
            return {
                user_informations:{},
                titleLists:[]
            }
        },
        methods:{
        getMore(){
            this.$http.get('https://cnodejs.org/api/v1/user/'+this.$route.params.name)
            .then((res)=>{
                
                // console.log(res)
                if(res.data.success===true){
                    this.isLoading=false
                    this.user_informations=res.data.data
                    this.titleLists=res.data.data.recent_topics
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        },
        beforeMount(){
            this.getMore()
        }
    }
</script>

<style scoped>
img {
    width: 30px;
  }
  li {
      list-style: none;
  }
</style>