export default {
    namespaced: true,
    actions: {},
    mutations: {
        setEditProductInfo(state, info) {
            state.editProductInfo = info
        },
        removeEditProductInfo(state) {
            state.editProductInfo = {}
        }
    },
    state: {
        editProductInfo: {}
    },
}