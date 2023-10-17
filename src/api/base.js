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
    insertCategory: "/api/itemCategory/insertCategory",  // 增加一级导航类目 name
    /* 订单管理 */
    orderList: '/api/order/list',  //订单列表数据渲染 page
    orderCollectList: '/api/order/collect',  //汇总清单列表
    changeStatus: "/api/order/changeStatus", //订单汇总
    cancelSummary: "/api/order/cancel",  //撤销汇总  id
    gerOrderDetail: "/api/order/list/detail", //订单详情
    /* 广告分类 */
    getAdvertCategory: "/api/advert/content/selectContentCategoryByParentId",//广告分类 id
    insertContentCategory: "/api/advert/content/insertContentCategory",  //增加子导航 pid name
    updateContentCategory: "/api/advert/content/updateContentCategory",  //修改子导航 pid name
    deleteAdvertContentCategoryById: "/api/advert/content/deleteContentCategoryById",   //删除子导航 pid
    selectTbContentAllByCategoryId: "/api/advert/content/selectTbContentAllByCategoryId", //内容查询 pid
    deleteContentByIds: "/api/advert/content/deleteContentByIds", //内容删除 id
    insertTbContent: "/api/advert/content/insertTbContent", //内容新增 pid name url image
    /* 登录页 */
    login: "/api/login", //登录 user pwd post
    permission: "/api//permission" //用户权限 token
}
export let imgUploadUrl = '/api/upload'
export let baseUrl = "http://localhost:7788"
