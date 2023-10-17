import base from './base.js'
import axios from '@/utils/request.js'
export default {
    /* 首页 */
    getDataCount() {  ////销量额等数据统计
        return axios.get(base.dataCount)
    },
    getMonthlySalesData() {  //首页折线图数据统计 月销量、月销售额
        return axios.get(base.monthlySalesData)
    },
    getHomeOrderInfo() {     //首页今日订单统计
        return axios.get(base.homeOrderInfo)
    },
    /*产品管理页*/
    getProductList(params) {       //商品列表  参数page页码
        return axios.get(base.productList, { params })
    },
    getProductSearch(params) {       //商品查询 参数search
        return axios.get(base.productSearch, { params })
    },
    deleteProductList(params) {     //商品删除 参数id
        return axios.get(base.deleteProductList, { params })
    },
    getProductTypeListInfo(params) { //类目选择type
        return axios.get(base.productTypeListInfo, { params })
    },
    //商品添加 * 参数： title cid  category sellPoint price num descs paramsInfo image
    insertTbItem(params) {
        return axios.get(base.insertTbItem, { params })
    },
    //修改商品id, title cid  category sellPoint price num descs paramsInfo image
    updateTbItem(params) {
        return axios.get(base.updateTbItem, { params })
    },
    batchDelete(params) {    //批量删除商品接口，参数ids数组字符串
        return axios.get(base.batchDelete, { params })
    },
    /* 产品分类页 */
    itemCategory() {   //分类类目列表
        return axios.get(base.itemCategory)
    },
    insertItemCategory(params) { // 增加子导航 cid  name
        return axios.get(base.insertItemCategory, { params })
    },
    updateCategory(params) {  //修改导航类目  id name
        return axios.get(base.updateCategory, { params })
    },
    deleteContentCategoryById(params) { // 删除导航 id
        return axios.get(base.deleteContentCategoryById, { params })
    },
    insertCategory(params) {   // 增加一级导航类目 name
        return axios.get(base.insertCategory, { params })
    },

    //订单列表页 
    getOrderList(params) {   //订单列表数据渲染 page
        return axios.get(base.orderList, { params })
    },
    getOrderCollectList() {   //汇总清单列表
        return axios.get(base.orderCollectList)
    },
    changeStatus(params) {   // 订单汇总
        return axios.get(base.changeStatus, { params })
    },
    cancelSummaryById(params) {  //撤销汇总  id
        return axios.get(base.cancelSummary, { params })
    },
    gerOrderDetail() {  //订单详情
        return axios.get(base.gerOrderDetail)
    },
    /* 广告分类 */
    getAdvertCategory(params) {     //广告分类 id
        return axios.get(base.getAdvertCategory, { params })
    },
    insertContentCategory(params) {  //增加子导航 pid name
        return axios.get(base.insertContentCategory, { params })
    },
    updateContentCategory(params) {  //修改子导航 pid name
        return axios.get(base.updateContentCategory, { params })
    },
    deleteAdvertContentCategoryById(params) {   //删除子导航 pid
        return axios.get(base.deleteAdvertContentCategoryById, { params })
    },
    selectTbContentAllByCategoryId(params) {  //内容查询 pid
        return axios.get(base.selectTbContentAllByCategoryId, { params })
    },
    deleteContentByIds(params) {  //内容删除 id
        return axios.get(base.deleteContentByIds, { params })
    },
    insertTbContent(params) {  //内容新增 pid name url image
        return axios.get(base.insertTbContent, { params })
    },
    /* 登录页 */
    login(params) {  //登录 user pwd
        return axios.post(base.login, params)
    },
    permission(params) {  //用户权限
        return axios.get(base.permission, { params })
    }
}
export let permission = function (params) {  //用户权限 token
    return axios.get(base.permission, { params })
}
