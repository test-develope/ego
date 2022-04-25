<template>
  <div class="add-goods">
      <!-- 面包屑 -->
      <div class="title">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品添加</el-breadcrumb-item>
            </el-breadcrumb>
      </div>
      <!-- 表单数据 -->
      <div class="formtable">
        <el-form :model="goodsForm" 
        :rules="rules" ref="ruleForm" 
        label-width="80px" 
        class="demo-ruleForm">

        <el-form-item label="类目选择" prop="category">
            <el-button type="primary" @click="innerVisible=true">类目选择</el-button>
        &nbsp;&nbsp;<span>{{goodsForm.category}}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
            <el-input v-model.trim="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
            <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
         <el-form-item label="商品数量" prop="num">
            <el-input v-model.number="goodsForm.num"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
            <el-col :span="11">
            <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model.trim="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="image">
            <el-button type="primary" @click="innerVisibleImg=true">上传图片</el-button>
            <img :src="goodsForm.image"  height="100px"  style="margin-left:20px" alt="">
        </el-form-item>
         <el-form-item label="商品描述" prop="descs">
            <WangEditor @sendEdtior="sendEdtior" ref="wangedit" />
        </el-form-item>
        </el-form>
      <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button @click="resetForm">清空</el-button>
        <el-button type="primary"  @click="submitForm">确 定</el-button>
      </span>

      <!-- 1.第一个内弹框  类目选择 -->
        <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body>

        <TreeGoods @sendTreeData="sendTreeData"/>

        <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible=false">取 消</el-button>
        <el-button type="primary"  @click="showTreeData" >确 定</el-button>
      </span>
        </el-dialog>
        
        <!-- 2.内弹框   上传图片 -->
        <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
        >
        <UploadImg @sendImg='sendImg'/>
        <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisibleImg=false">取 消</el-button>
        <el-button type="primary"  @click="showImg" >确 定</el-button>
      </span>
      </el-dialog>
      </div>
         
    </div>
</template>

<script>
import TreeGoods from './TreeGoods'
import UploadImg from './UploadImg'
import WangEditor from './WangEditor'

export default {
    props:{
      rowData:{
        type:Object,
        default:function(){
          return {}
        }
      },
    },
    components:{
        TreeGoods,
        UploadImg,
        WangEditor
    },
    // props:['dialogVisible'],
    data(){
          return {
              title:'',//弹窗名字
              innerVisibleImg:false, //内弹框---上传图片
              dialogVisible:false,//外弹框
              innerVisible:false,   //内弹框--类目选择
              imgUrl:'',
              treeData:{},  //接收tree的数据
              goodsForm: {  //表单容器
              id:'',
              title: '',  //商品名称
              price: '',    //商品价格
              num: '',
              sellPoint: '',
              image: '',
              descs: '',
              category: '', //商品类目
              date1:'', //商品时间
              date2:'',
              cid:''//类目的id
          },
        rules: {
            title: [
                { required:true, message: '请输入商品名称', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
            price: [
                { required: true, message: '请输入价格', trigger: 'blur' },
                {validator:(rule,value,callback)=>{
                    let pricereg=/(^[1-9]\d*(.\d{1,2})?$)|(^0(.\d{1,2})?$)/
                    if(!pricereg.test(value)){
                      return callback(new Error('请输入正确的价格，只能保留2位小数'))
                    }
                    else{
                      callback();
                    }
                }}
                ],
            num:[
                {required:true,message: '请输入数量',trigger: 'blur' },
                {validator:(rule, value, callback)=>{
                          let numreg=/^([1-9]|[1-9]\d|100)$/
                          if(!numreg.test(value)){
                            return callback(new Error('请输入1-100的整数'));
                          }
                          else {
                            callback();
                          }
                      }}
                ],
            date1: [
                { type:'date', required:true, message: '请选择日期', trigger: 'blur' }
                ],
            date2: [
                { type:'date', required:true, message: '请选择时间', trigger: 'blur' }
                ],
        }
        }
    },
    methods: {
        //接收wangEditor数据
        sendEdtior(val){
          this.goodsForm.descs=val
        },
        //显示图片
        showImg(){
            this.innerVisibleImg=false
            this.goodsForm.image=this.imgUrl
        },
        //显示图片的地址
        sendImg(val){
                 this.imgUrl=val
            // console.log(this.imgUrl);
        },
        //显示Tree的数据
        showTreeData(){
            this.innerVisible=false
            //显示tree数据
            this.goodsForm.category=this.treeData.name
            //存储cid
            this.goodsForm.cid=this.treeData.cid

        },
        //获取tree数据
        sendTreeData(val){
            this.treeData=val
        },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.resetForm()  //关闭表单后重置表单数据
            done();
          })
          .catch(_ => {});
      },
      //自定义事件--通知父亲修改dialogVisible
      close(){
          this.$emit('chageDialogVisible')
      },
      //提交表单数据到后台发起请求(新建和编辑商品都是这个方法)
      submitForm() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            //title cid  category sellPoint price num descs paramsInfo image
            let{title,cid,category,sellPoint,price,num,descs,image,id}=this.goodsForm
            if(this.title==='添加商品'){
              this.$api.addGoods({
              title,cid,category,sellPoint,price,num,descs,image,id
            })
            .then(res=>{
              if(res.data.status===200){
                //成功
                this.dialogVisible=false;  //关闭弹框
                // window.location.reload()  //刷新页面
                 //情况表单  1.使用element里面的重置表单  2.自己手打初始化表单元素
                this.resetForm() //调用清空方法  清空form表单和富文本中数据
                this.$parent.http(1) //重新获取默认页面
                this.$message({
                  message:'恭喜你,添加商品成功',
                  type:'success'
                })
                return
              }else{
                this.$message.error('添加商品失败')
              }
            })
            }
            if(this.title==='编辑商品'){
              this.$api.updateGoods({
              title,cid,category,sellPoint,price,num,descs,image,id
            })
            .then(res=>{
              if(res.data.status===200){
                //成功
                this.dialogVisible=false;  //关闭弹框
                //情况表单  1.使用element里面的重置表单  2.自己手打初始化表单元素
                this.resetForm() //调用清空方法  清空form表单和富文本中数据
                this.$parent.http(1) //重新获取默认页面
                this.$message({
                  message:'恭喜你,编辑商品成功',
                  type:'success'
                })
                return
              }else{
                this.$message.error('编辑商品失败')
              }
            })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消表单
      cancelForm(){
        this.dialogVisible=false  //取消弹框
        this.resetForm()
      },
      //清空表单数据
      resetForm() {
        this.$refs.ruleForm.resetFields();  //清空form表单数据
        this.$refs.wangedit.editor.txt.clear()  //清空富文本框数据
        this.title=''  //清空标题
        this.goodsForm={id:'',title: '',price: '',num: '',sellPoint: '',image: '',descs: '',category: '', date1:'',date2:'',cid:''}
      }
    },
    //监听器
    watch:{
      rowData(val){
        this.goodsForm=val
        //富文本编辑的数据内容
        this.$nextTick(()=>{
          this.$refs.wangedit.editor.txt.html(val.descs)
        })
      }
    }
}
</script>

<style>
.add-goods{
    margin: 20px;
}
.myform{
    background-color: #fff;
    padding: 10xp;
    padding-right: 40px ;
    padding-top: 20px 
}

.title{
    padding: 10px;
    background-color: #fff;
    border: 1px solid #eee;
    margin-bottom: 20px;
}
.line{
    text-align: center;
}
.formtable .dialog-footer{
  padding-left: 200px;
  margin-left: 10px;
}
.formtable{
  padding-left: 13%;
  margin-bottom: 20px;
  height: 90%;
  width: 70%;
}
</style>