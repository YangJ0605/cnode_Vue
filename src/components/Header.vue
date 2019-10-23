<template>
    <div class="header">
        <div class="header-inner">
            <router-link :to="{name:'root'}"> <img src="../assets/cnodejs_light.svg" alt=""></router-link> 
        <div class="nav">
            <ul>
            <li><a href="/">首页</a></li>
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Header',

    }
</script>

<style scoped>
.header {
    background: #444;
    width: 100%;
    height: 50px;
    font-size:13px;
    position: relative;
}
.header-inner {
    background: 0 0;
    border-radius: 0;
    border: none;
    box-shadow: none;
    width: 90%;
    margin: auto;
    padding: 5px
}
.header-inner a {
    width: 120px;
    padding: 3px 20px;
    height: 34px;
    line-height: 34px;
    color: #ccc;
    font-weight: 700;
    text-shadow: none;
    text-decoration: none;
}
a>img {
    max-width: 120px;
    vertical-align: initial;
    
}
.nav{
    position: absolute;
    right: 0;
    top: 10px;
}
ul {
    margin: 0 10px 0 0;
    display: flex;
}
ul>li{
    list-style: none;  
}
</style>