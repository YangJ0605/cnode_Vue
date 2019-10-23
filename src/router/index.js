import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '../components/Postlist.vue'
import Article from '../components/Article.vue'
import UserInfo from '../components/UserInfo.vue'
import more from '../components/more.vue'
import SlideBar from '../components/SlideBar.vue'


Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:Postlist
      }
    },
    {
      name:'post_content',
      path:'/tocpic/:id&author=:name',
      components:{
        main:Article,
        slidebar:SlideBar
      }
    },
    {
      name:'user_info',
      path:'/user/:name',
      components:{
        main:UserInfo
      }
    },
    {
      name:'more',
      path:'/more/:name',
      components:{
        main:more
      }
    }
  ]
})
