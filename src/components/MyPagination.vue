<template>
   <div style="text-align:center;margin:20px">
       <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="total" 
        :page-sizes="[8, 10, 20, 100]"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="changePage"  @size-change="handleSizeChange">
    </el-pagination>
   </div>
</template>

<script>
export default {
    name:'mypagination',
    data(){
        return{
            flag:true
        }
    },
    props:{
        total:{
            type:Number,
            default:100
        },
        pageSize:{
            type:Number,
            default:8
        },
        currentPage:{
            type:Number,
            default:1
        }
    },
    methods:{
        //改变当前页码
        changePage(currentPage){
            if(this.flag)
                this.$emit('changePage',[currentPage,this.pageSize])
        },
        //改变一页多少条数据
        handleSizeChange(pageNum){
            this.flag=!this.flag
            this.$emit('handleSizeChange',pageNum)
            setTimeout(()=>{
                this.flag=!this.flag
            },1000)
        }
    }
}
</script>

<style>

</style>