export default {
    namespaced: true,
    actions: {},
    mutations: {
        saveToken(state, val) {
            state.userInfo = val
        },
        removeToken(state) {
            state.userInfo = {
                token: '',
                username: ''
            }
        }

    },
    state: {
        userInfo: {
            token: '',
            username: ''
        },
    },
}