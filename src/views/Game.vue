<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: liumin
 * @Date: 2022-02-15 16:23:22
 * @LastEditors: liumin
 * @LastEditTime: 2022-06-07 16:25:00
-->
<template>
 <div class="wrap">
   <div id="gameScene"   style="width: 1440px; height:810px;">
            <canvas id="GameCanvas" style="width: 1440px; height:  810px;" v-if="showGameCanvas" ></canvas>
    </div> 
     
</div>
</template>

<script>

  export default {
         
    name: 'Game',
    data(){
        return{
        classicModal:false,
        showGameCanvas:true//是否还没有场景gamecanvas，只能创建一次，之后再index.js中的container中保存了该对象
        }
    },
    
    methods: {
        classicModalHide(){
            this.classicModal=false
        }
    },
    mounted(){
        console.log("vue mounted--------------");
        if(sessionStorage.getItem("isLoadMain") == null)
       {
         let myEvent = new CustomEvent("ShowMainScene", {
              detail: {
              },
            });
          document.body.dispatchEvent(myEvent);
         // console.log("vue firstShowMainScene--------------");
          sessionStorage.setItem("isLoadMain",1);
          this.showGameCanvas = true;
       } 
       else
       {
           let myEvent = new CustomEvent("ShowSaveMainScene", {
              detail: {
              },
            });
            this.showGameCanvas = false;
            document.body.dispatchEvent(myEvent);
        
       }
    },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeUnmount() {
       if(sessionStorage.getItem("isLoadMain") != null)
       {
          let myEvent = new CustomEvent("refreshMainScene", {//该事件需要creator项目中监听，刷新主场景
              detail: {
              },
            });
          console.log("vue --- refreshMainScene--------------");
          document.body.dispatchEvent(myEvent);
      }
  }, // 生命周期 - 销毁之前
  unmounted() { }, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>

<style lang="scss" scoped>

 
 
 
</style>
 
