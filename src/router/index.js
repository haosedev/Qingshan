import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

import Menu from '@/components/Menu'
import Error from '@/components/Error'
//
import cal_gc from '@/components/calculator/gc'

Vue.use(Router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)


const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: '不锈钢计算器',
        component: Menu
    }, {
        path: '/calculator/gc',
        name: '钢材计算器',
        component: cal_gc
    }, { //** 404页面 */
        path: '*',
        component: Error,
    }]
})

//注册全局钩子，用于处理路径分级，判断路径变化到底是属于前进还是后退
router.beforeEach(function(to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true })

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', { direction: 'forward' })
        } else {
            store.commit('updateDirection', { direction: 'reverse' })
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', { direction: 'forward' })
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        next()
    }
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
    if (process.env.NODE_ENV === 'production') {
        //这里可以记录页面跳转
    }
})



export default router;