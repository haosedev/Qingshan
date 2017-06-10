<template>
    <div>
        <group title="不锈钢计算器">
            <cell title="不锈钢板材" link="/calculator/bc"></cell>
            <cell title="不锈钢管" link="/calculator/gg"></cell>
            <cell title="不锈钢方管" link="/calculator/fg"></cell>
            <cell title="不锈钢矩形管" link="/calculator/jxg"></cell>
            <cell title="不锈钢圆钢盘条" link="/calculator/ypt"></cell>
            <cell title="不锈钢扁钢" link="/calculator/bg"></cell>
            <cell title="不锈钢槽钢" link="/calculator/cg"></cell>
            <cell title="不锈钢方棒" link="/calculator/fb"></cell>
            <cell title="不锈钢六角钢" link="/calculator/ljg"></cell>
            <cell title="不锈钢八角钢" link="/calculator/bjg"></cell>
            <cell title="等边角钢" link="/calculator/dbjg"></cell>
            <cell title="不等边角钢" link="/calculator/bdbjg"></cell>
        </group>
    </div>
</template>

<script>
    import {
        Group,
        Cell
    } from 'vux'
    export default {
        components: {
            Group,
            Cell
        },
        name: 'hello',
        data() {
            return {
                msg: 'Welcome'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>