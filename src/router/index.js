import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
//页面目录
import Menu from '@/components/Menu'
import Error from '@/components/Error'
//不锈钢板材
import cal_bc from '@/components/calculator/bc'
//不锈钢管
import cal_gg from '@/components/calculator/gg'
//不锈钢方管
import cal_fg from '@/components/calculator/fg'
//不锈钢矩形管
import cal_jxg from '@/components/calculator/jxg'
//不锈钢圆钢盘条
import cal_ypt from '@/components/calculator/ypt'
//不锈钢扁钢
import cal_bg from '@/components/calculator/bg'
//不锈钢槽钢
import cal_cg from '@/components/calculator/cg'
//不锈钢方棒
import cal_fb from '@/components/calculator/fb'
//不锈钢六角钢
import cal_ljg from '@/components/calculator/ljg'
//不锈钢八角钢
import cal_bjg from '@/components/calculator/bjg'
//等边角钢
import cal_dbjg from '@/components/calculator/dbjg'
//不等边角钢
import cal_bdbjg from '@/components/calculator/bdbjg'

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
        path: '/calculator/bc',
        name: '不锈钢板材',
        component: cal_bc
    }, {
        path: '/calculator/gg',
        name: '不锈钢管',
        component: cal_gg
    }, {
        path: '/calculator/fg',
        name: '不锈钢方管',
        component: cal_fg
    }, {
        path: '/calculator/jxg',
        name: '不锈钢矩形管',
        component: cal_jxg
    }, {
        path: '/calculator/ypt',
        name: '不锈钢圆钢盘条',
        component: cal_ypt
    }, {
        path: '/calculator/bg',
        name: '不锈钢扁钢',
        component: cal_bg
    }, {
        path: '/calculator/cg',
        name: '不锈钢槽钢',
        component: cal_cg
    }, {
        path: '/calculator/fb',
        name: '不锈钢方棒',
        component: cal_fb
    }, {
        path: '/calculator/ljg',
        name: '不锈钢六角钢',
        component: cal_ljg
    }, {
        path: '/calculator/bjg',
        name: '不锈钢八角钢',
        component: cal_bjg
    }, {
        path: '/calculator/dbjg',
        name: '等边角钢',
        component: cal_dbjg
    }, {
        path: '/calculator/bdbjg',
        name: '不等边角钢',
        component: cal_bdbjg
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