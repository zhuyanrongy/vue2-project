import langJs from '@/lang/index'
export default {
    namespaced: true,
    actions: {},
    mutations: {
        changeLanguage(state, val) {
            langJs.locale = val
            state.language = val
        }
    },
    state: {
        language: 'zh'
    },
}