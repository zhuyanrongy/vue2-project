export let formatDescs = function (str) {
    let newStr = str.replace(/<img.*?>/g, '[图片]').replace(/<[^<>]+>/g, '').replace(/&nbsp;/ig, '')
    return newStr
}
import _ from "lodash"
export function pushArr(frontMenu, backendMenu) {
    let cloneFrontMenu = _.cloneDeep(frontMenu)
    let newMenu = []
    cloneFrontMenu.forEach(item => {
        backendMenu.forEach(ele => {
            if (item.meta.name === ele.name) {
                if (ele.children && ele.children.length > 0) {
                    item.children = pushArr(item.children, ele.children)
                }
                newMenu.push(item)
            }
        })
    })
    return newMenu
}