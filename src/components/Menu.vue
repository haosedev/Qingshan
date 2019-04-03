<template>
    <div>
        <group title="请选择您需要的材料计算器：">
            <cell title="等边角钢" link="/calculator/dbjg"></cell>
            <cell title="不锈钢管" link="/calculator/gg"></cell>
            <cell title="不锈钢方管" link="/calculator/fg"></cell>
            <cell title="不锈钢板材" link="/calculator/bc"></cell>
            <cell title="不锈钢扁钢" link="/calculator/bg"></cell>
            <cell title="不锈钢圆钢" link="/calculator/ypt"></cell>
            <cell title="不锈钢线材" link="/calculator/xc"></cell>
            <cell title="不锈钢槽钢" link="/calculator/cg"></cell>
            <cell title="不锈钢方棒" link="/calculator/fb"></cell>
            <cell title="不等边角钢" link="/calculator/bdbjg"></cell>
            <cell title="不锈钢矩形管" link="/calculator/jxg"></cell>
            <cell title="不锈钢六角钢" link="/calculator/ljg"></cell>
            <cell title="不锈钢八角钢" link="/calculator/bjg"></cell>
        </group>
        <div>
            <card>
                <div slot="content" class="version-padding center version">
                    <p>
                        <img class="logo" src="../assets/h-logo.png">
                    </p>
                    <p>Version:{{version}}</p>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import {
    Group,
    Cell,
    Card
} from 'vux'
export default {
    components: {
        Group,
        Cell,
        Card
    },
    name: 'hello',
    data() {
        return {
            msg: 'Welcome',
            version: '0.7.23',
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.version-padding {
    padding: 20px 10px 10px 10px;
}

.center {
    text-align: center;
}

.version {
    color: #ccc;
}
</style>