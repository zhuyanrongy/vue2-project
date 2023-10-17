export default {
    namespaced: true,
    actions: {

    },
    mutations: {
        beingClicked(state, val) {
            state.currentContent = val
        },
        removeBeingClicked(state) {
            state.currentContent = []
        },
    },
    state: {
        currentContent: [],
    },
} 