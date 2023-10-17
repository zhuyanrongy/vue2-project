import { permission } from '@/api/index'
import { pushArr } from '@/utils/index'
import router, { baseRoutes } from '@/router/index'
import { frontMenu } from '@/router/menu'
import _ from "lodash"
export default {
    namespaced: true,
    actions: {
        async getMenuInfoList(content, token) {
            let res = await permission({ token })
            if (res.status === 200) {
                let newMenu = pushArr(frontMenu, res.data.data)
                content.commit('setMenuInfoList', newMenu)
                let cloneBaseRoutes = _.cloneDeep(baseRoutes)
                cloneBaseRoutes[0].children.push(...newMenu)
                return cloneBaseRoutes
            }
        }
    },
    mutations: {
        setMenuInfoList(state, info) {
            state.menuInfoList = info
        },
        removeMenuInfoList(state) {
            state.menuInfoList = []
        }
    },
    state: {
        menuInfoList: []
    },
}