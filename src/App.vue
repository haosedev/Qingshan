<template>
    <div style="height:100%;">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
    
        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
    
            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions" :right-options="rightOptions" :transition="headerTransition">{{title}}</x-header>
    
            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view"></router-view>
            </transition>
        </view-box>
    </div>
</template>

<script>
import store from '@/vuex/store'
import {
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    TransferDom
} from 'vux'
import {
    mapState,
    mapActions
} from 'vuex'

export default {
    directives: {
        TransferDom
    },
    components: {
        ButtonTab,
        ButtonTabItem,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading, 
    },
    methods: {
        changeLocale(locale) {
            this.$i18n.set(locale)
            this.$locale.set(locale)
        },
        ...mapActions([
            'updateDemoPosition'
        ])
    },
    mounted() {
        this.handler = () => {
            if (this.path === '/demo') {
                this.box = document.querySelector('#demo_list_box')
                this.updateDemoPosition(this.box.scrollTop)
            }
        }
    },
    beforeDestroy() {
        this.box.removeEventListener('scroll', this.handler, false)
    },
    watch: {
        // path(path) {
        //     if (path === '/') {
        //         this.$router.replace('/')
        //         return
        //     }
        //     if (path === '/') {
        //         setTimeout(() => {
        //             this.box = document.querySelector('#demo_list_box')
        //             if (this.box) {
        //                 this.box.removeEventListener('scroll', this.handler, false)
        //                 this.box.addEventListener('scroll', this.handler, false)
        //             }
        //         }, 1000)
        //     } else {
        //         this.box && this.box.removeEventListener('scroll', this.handler, false)
        //     }
        // }
    },
    computed: {
        ...mapState({
            route: state => state.route,
            path: state => state.route.path,
            deviceready: state => state.app.deviceready,
            demoTop: state => state.demoScrollTop,
            isLoading: state => state.isLoading,
            direction: state => state.direction
        }),
        isShowBar() {
            if (/component/.test(this.path)) {
                return true
            }
            return false
        },
        leftOptions() {
            return {
                showBack: this.route.path !== '/'
            }
        },
        rightOptions() {
            return {
                showMore: false
            }
        },
        headerTransition() {
            return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
        },
        componentName() {
            if (this.route.path) {
                const parts = this.route.path.split('/')
                if (/component/.test(this.route.path) && parts[2]) return parts[2]
            }
        },
        routerName() {
            if (this.route.path) {
                return this.route.name;
            }
        },
        title() {
            if (this.route.path === '/') return '钢材计算器'
            //return this.routerName ? `计算器-${this.routerName}` : '计算器'
            return this.routerName ? `${this.routerName}` : '计算器'
        },
    },
    data() {
        return {
            showMenu: false,
        }
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
    background-color: #fbf9fe;
}

html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}

.demo-icon-22 {
    font-family: 'vux-demo';
    font-size: 22px;
    color: #888;
}

.weui-tabbar.vux-demo-tabbar {
    /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}

.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
    color: #F70968;
}

.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
    color: rgb(53, 73, 94);
}

.demo-icon-22:before {
    content: attr(icon);
}

.vux-demo-tabbar-component {
    background-color: #F70968;
    color: #fff;
    border-radius: 7px;
    padding: 0 4px;
    line-height: 14px;
}

.weui-tabbar__icon+.weui-tabbar__label {
    margin-top: 0!important;
}

.vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}

@font-face {
    font-family: 'vux-demo';
    /* project id 70323 */
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'), url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'), url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}

.demo-icon {
    font-family: 'vux-demo';
    font-size: 20px;
    color: #04BE02;
}

.demo-icon-big {
    font-size: 28px;
}

.demo-icon:before {
    content: attr(icon);
}

.router-view {
    width: 100%;
    top: 46px;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}

.vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.menu-title {
    color: #888;
}

.result_cell {
    background-color: #FFDC31;
}

.card-padding {
    padding: 10px 15px;
}
</style>