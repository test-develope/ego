<template>
  <div id="main" >
      
  </div>
</template>

<script>
/*
wangEditor常用配置：
    1.清空内容： editor.txt.clear()
    2.设置html内容:  editor.txt.html()
    3.配置菜单: editor.config.menus = ['head','bold','fontSize','fontName',
    'italic','underline','strikeThrough','indent','lineHeight','foreColor',
    'backColor','link','list','todo','justify','quote','emoticon','image',
    'video','table','code','splitLine','undo','redo',]
    4. // 配置菜单栏，设置不需要的菜单
    editor.config.excludeMenus = ['emoticon','video']
    5.配置 onchange 回调函数
        editor.config.onchange = function (newHtml) {
        console.log("change 之后最新的 html", newHtml);
        };
        // 配置触发 onchange 的时间频率，默认为 200ms
        editor.config.onchangeTimeout = 500; // 修改为 500ms

*/
import E from 'wangeditor'
export default {
    name:'wangEditor',
    data(){
        return{
            editor:''
        }
    },
    mounted(){
        //创建wangeditor实例
        this.editor=new E('#main')
        //设置菜单那些不要
        this.editor.config.excludeMenus = ['emoticon','video','todo','list']
        //设置onchange回调函数--获取输入的值内容
        this.editor.config.onchange =(newHtml)=>{
                // console.log("change 之后最新的 html", newHtml);
                //获取到的富文本编译的内容传递给弹框组件--父组件
                this.$emit('sendEdtior',newHtml)
                };

        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 500; // 修改为 500ms
        // 取消自动 focus
        this.editor.config.focus = false
        //创建富文本
        this.editor.create();
    }
}
</script>

<style>

</style>