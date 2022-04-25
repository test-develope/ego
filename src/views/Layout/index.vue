<template>
  <div class="layout">
      <!-- 左侧导航区域 -->
      <MyMenu class="menu"/>
      <!-- 右侧内容区域 -->
      <Content class="content"  :class="{isActive:isCollapse}"/>
  </div>
</template>

<script>
import MyMenu from './Mymenu'
import Content from './Con_tent'

export default {
    name:'index',
    computed:{
        isCollapse(){
            return this.$store.state.isCollapse
        }
    },
    components:{
      MyMenu,
      Content
    }
}
</script>

<style  scoped>


.layout .menu{
  /* width: 200px; */
  /* min-height: 500px; */
  background: #545C64;
  position: fixed;
  top: 0;
  bottom: 0;
}

.layout .content{
  margin-left: 200px;
}
.layout .isActive{
  margin-left: 64px;
}



</style>