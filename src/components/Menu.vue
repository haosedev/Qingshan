<template>
    <div>
        <group title="不锈钢计算器">
            <cell title="不锈钢材" is-link></cell>
            <cell title="不锈钢管" is-link></cell>
            <cell title="不锈钢方管" is-link></cell>
            <cell title="不锈钢矩形管" is-link></cell>
            <cell title="不锈钢圆盘条" is-link></cell>
            <cell title="不锈钢扁钢" is-link></cell>
            <cell title="不锈钢槽钢" is-link></cell>
            <cell title="不锈钢方棒" is-link></cell>
            <cell title="不锈钢六角钢" is-link></cell>
            <cell title="不锈钢八角钢" is-link></cell>
            <cell title="等边角钢" is-link></cell>
            <cell title="不等边角钢" is-link></cell>
        </group>
    </div>
</template>

<script>
import {
    Group, Cell
} from 'vux'
export default {
    components: {
        Group, Cell
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
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
