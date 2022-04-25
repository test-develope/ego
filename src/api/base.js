//接口路径配置

const base={
    goodsList:'/api/projectList', //商品列表
    search:'/api/search' , //商品搜索
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    uploadUrl:'/api/upload', //图片上传post请求
    host:'http://localhost:8989', //基础域名
    addGoods:"/api/backend/item/insertTbItem",  //添加商品 post
    deleteGoods:"/api/backend/item/deleteItemById",  //删除商品
    updateGoods:"/api/backend/item/updateTbItem" , //更新商品
    login:"/api/login"  //登陆接口
}



export default base  