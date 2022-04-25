<template>
    <!-- 
        ref="upload"  可以获取到dom元素
        action  必选参数，上传的地址string
        on-preview	点击文件列表中已上传的文件时的钩子function(err, file, fileList)
        on-remove	文件列表移除文件时的钩子
        on-success	文件上传成功时的钩子
        on-error	文件上传失败时的钩子
        on-error	文件上传失败时的钩子
        auto-upload	是否在选取文件后立即进行上传
        file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
     -->

    <el-upload
    class="upload-demo"
    ref="upload"
    accept=".JPG, .PNG, .JPEG,.jpg, .png, .jpeg"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="successUpload"
    :file-list="fileList"
    :auto-upload="false"
    :before-upload="beforeAvatarUpload">

        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button 
        style="margin-left: 10px;" 
        size="small" type="success" 
        @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
import base from '../../api/base'
export default {
    data() {
      return {
        fileList: [],
        url:base.uploadUrl   //图片地址服务器
      };
    },
    methods: {
        //点击上传按钮事件
      submitUpload() {
        this.$refs.upload.submit();
      },
      //上传成功的函数
      successUpload(response,file, fileList){
          if(response){
              this.fileList=[]
              this.$message({
                message: '图片上传成功',
                type: 'success'
        })
          }else{
              this.$message.error('图片上传失败，请检查格式和大小');
          }
          //把成功的数据接口response传递给 父组件
          //http://localhost:8989/1650638452843-1.jpg
          // console.log('上传成功',response);
          let imgUrl=base.host+'/'+response.url.split("\\")[1]
          this.$emit('sendImg',imgUrl)

      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      beforeAvatarUpload(file){
          const isJPG = file.type === 'image/jpeg';
          const isLt2M=file.size/1024/1024<1;
          if(['image/jpeg','image/png','image/PNG'].indexOf(file.type)==-1){
              this.$message.error('上传头像图片只能是JPG、PNG格式!')
              return false
          }
          if(!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB!');
          return false
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style>

</style>