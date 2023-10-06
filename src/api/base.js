export default {
    /* 首页 */
    dataCount: '/api/home/dataCount', //销量额等数据统计
    monthlySalesData: '/api/home/format', //首页折线图数据统计 月销量、月销售额
    homeOrderInfo: '/api/home/orderinfo', //首页今日订单统计


    /*产品管理页*/
    productList: '/api/goods/projectList',  //商品列表
    productSearch: '/api/goods/search',     //商品查询
    deleteProductList: '/api/goods/deleteItemById', //商品删除 id
    productTypeListInfo: "/api/goods/itemCategory/selectItemCategoryByParentId",//类目选择type
    //商品添加 * 参数： title cid  category sellPoint price num descs paramsInfo image
    insertTbItem: '/api/goods/item/insertTbItem',
    //修改商品id, title cid  category sellPoint price num descs paramsInfo image
    updateTbItem: '/api/goods/item/updateTbItem',
    batchDelete: '/api/goods/batchDelete',  //批量删除商品接口，参数ids数组字符串
    /* 产品分类页 */
    itemCategory: '/api/itemCategory', //分类类目列表
    insertItemCategory: '/api/itemCategory/insertItemCategory',  // 增加子导航 cid  name
    updateCategory: '/api/itemCategory/updateCategory',   //修改导航类目  id name
    deleteContentCategoryById: '/api/content/deleteContentCategoryById', // 删除导航 id
    insertCategory: "/api/itemCategory/insertCategory"  // 增加一级导航类目 name
}
export let imgUploadUrl = '/api/upload'
export let baseUrl = "http://localhost:7788"