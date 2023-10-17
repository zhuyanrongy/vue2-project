export default {
    namespaced: true,
    actions: {},
    mutations: {
        changeisCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    state: {
        isCollapse: false
    },
}