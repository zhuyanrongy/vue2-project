import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enJs from './en.js'
import zhJs from './zh.js'
// import Element from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
//语言环境
const messages = {
    zh: {
        ...zhJs,
        ...zhLocale
    },
    en: {
        ...enJs,
        ...enLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})
/* Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
}) */
ElementLocale.i18n((key, value) => i18n.t(key, value))
export default i18n

