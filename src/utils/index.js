export let formatDescs = function (str) {
    let newStr = str.replace(/<img.*?>/g, '[图片]').replace(/<[^<>]+>/g, '').replace(/&nbsp;/ig, '')
    return newStr
}