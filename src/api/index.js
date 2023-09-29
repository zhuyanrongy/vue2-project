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
    }
}
