<template>
  <div class="goods">
    <!-- 1.搜索区域 -->
      <div class="header">
        <!-- change	仅在输入框失去焦点或用户按下回车时触发 -->
          <el-input @change="searchInp" v-model="input" placeholder="请输入内容"></el-input>
            <el-button type="primary" >查询</el-button>
              <el-button type="primary" @click="showPush">页面添加</el-button>
              <el-button type="primary" @click="addGoods">弹框添加</el-button>
      </div>
      <!-- 2.表格区域 -->
      <div class="wrapper">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column align="center" header-align="center" prop="id" label="商品ID" width="100">
          </el-table-column>
            <el-table-column align="center" header-align="center" prop="title" label="商品名称" width="140" show-overflow-tooltip> </el-table-column>
            <el-table-column align="center" header-align="center" prop="price" label="商品价格"  width="100"></el-table-column>
            <el-table-column align="center" header-align="center" prop="num" label="商品数量"  width="100"></el-table-column>
            <el-table-column align="center" header-align="center" prop="category" label="规格类目"  width="100"></el-table-column>
            <el-table-column align="center" header-align="center" prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" header-align="center" prop="category" label="商品卖点" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" header-align="center" prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" header-align="center" prop="date" label="操作"  width="280">
              <template  slot-scope="scope">
                  <el-button size="mini" icon="el-icon-search">查看</el-button>
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
    </el-table>
      </div>
      <!-- 3.分页 -->
      <div>
        <MyPagination :total='total' :pageSize='pageSize' @changePage='changePage'  @handleSizeChange="handleSizeChange" :currentPage="currentPage"/>
      </div>
      <!-- 弹框子组件  操作子组件：1.父传子 2.children 3.ref-->
       <!-- <GoodsDialog :dialogVisible="dialogVisible" @chageDialogVisible='chageDialogVisible'/> -->
         <GoodsDialog ref="dialog" :rowData='rowData'  />
  </div>
</template>

<script>
import { raw } from 'mysql'
import MyPagination from '../../components/MyPagination.vue'
import GoodsDialog from '../Goods/GoodsDialog'
export default {
    name:'Goods',
    components:{
      MyPagination,
      GoodsDialog
      },
    methods:{
      //分页页码
      changePage(page){
         let params={
          page:page[0],
          pageSize:page[1],
          search:this.input
        }
        if(page)
        // console.log('arr',page[0],page[1]);
        this.http(params)
      },

      //改变一页多少条数据
      handleSizeChange(pageSize){
        let params={
          Page:1,
          pageSize,
          search:this.input
        }
          this.http(params)
      },

      //搜索查询数据
      searchInp(searchInp){
        let params={
          Page:1,
          pageSize:8,
          search:this.input
        }
        this.http(params)
      },
      //添加页面按钮
      showPush(){
        this.$router.push({
          name:'AddGoods',
        })
      },

      //添加弹框商品页面
      addGoods(){
        // this.dialogVisible=true
        //修改子组件的实例数据
        this.$refs.dialog.title='添加商品';
        this.$refs.dialog.goodsForm.treeData={}
        this.$refs.dialog.dialogVisible=true
      },
      //子组件事件取消弹框
      chageDialogVisible(){
        this.dialogVisible=false
      },

      //编辑操作
      handleEdit(index,row){
          //1/点击编辑  显示弹框  弹框上回显当前行的数据
          this.$refs.dialog.dialogVisible=true;
          this.$refs.dialog.title='编辑商品';
          // this.$refs.dialog.goodsForm=row //方法1
          this.rowData={...row}
      },
      //删除操作
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.disabled=false
          //请求删除商品
          this.$api.deleteGoods({
            id:row.id
          }).then((res)=>{
            if(res.data.status===200){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
              });
              //视图更新
              this.http(1)
            }
            if(res.data.status===500){
                this.$message.error('删除失败');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //商品列表获取
      http(params){
        this.$api.getSearch(params)
        .then(res=>{
            if(res.data.status===200){
                // console.log('成功',res.data);
                this.tableData=res.data.data  //数据列表
                this.total=res.data.total
                this.pageSize=res.data.pageSize
                this.currentPage=res.data.currentPage
                return
            }if(res.data.status===500){
              // console.log('失败',res.data);
              this.tableData=[]
              this.total=res.data.total
              this.pageSize=res.data.pageSize
              this.currentPage=res.data.currentPage
            }
        })
      }
    },
    data(){
      return{
        input:'',
        tableData:[],
        total:10,
        pageSize:8,
        currentPage:1,
        input:'',
        dialogVisible:false,
        rowData:{},//当前行的数据
      }
    },
     created(){
       let params={
          page:'1',
          pageSize:this.pageSize
        }
        this.http(params)
    }
}
</script>

<style>
.goods{
  margin: 20px;
}

.goods .header{
  display: flex;
}

.goods .header button{
  margin-left: 20px;
}

.goods .wrapper{
  margin: 20px 0;
}

</style>