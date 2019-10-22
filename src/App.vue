<template>
  <div id="app">
   <Header></Header>
   <main class="main">
     <router-view name="slidebar"></router-view>
      <router-view name='main'></router-view>
      
   </main>
  
    <router-view/> 
  </div>
</template>

<script>

import Header from './components/Header'
import Postlist from './components/Postlist'
import Article from './components/Article'
import UserInfo from './components/UserInfo'
import more from './components/more'

export default {
  name: 'App',
  components:{
    Header,
    Postlist,
    Article,
    UserInfo,
    more
  }
}
</script>

<style>
@import url('./assets/markdown-github.css');
*{
  margin: 0;
  padding: 0;
  box-sizing:border-box;
}
body {
    background-color: #e1e1e1;
    font-size: 14px;
    word-break: break-word;
    line-height: 20px;
    color: #333;
}
.main {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px
}
</style>
