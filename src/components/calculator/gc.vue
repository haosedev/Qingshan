<template>
    <div>
        <div style="padding: 15px;">
            <button-tab v-model="nowTab">
                <button-tab-item @on-item-click="clickTab()">计算重量</button-tab-item>
                <button-tab-item @on-item-click="clickTab()">计算长度</button-tab-item>
            </button-tab>
        </div>
        <group :title="title">
            <popup-picker title="请选择材质" :data="itemData" v-model="item" value-text-align="right" ></popup-picker>
        </group>
         <group v-show="showTab1">
            <x-input title="*厚度(d)" v-model="val1" type="number" keyboard="number" :show-clear="false"><div slot="right" mini>mm</div></x-input>
            <x-input title="*宽度(w)" v-model="val2" type="number" keyboard="number" :show-clear="false"><div slot="right" mini>mm</div></x-input>
            <x-input title="*长度(L)" v-model="val3" type="number" keyboard="number" :show-clear="false"><div slot="right" mini>m</div></x-input>
            <x-input title="计算结果：" v-model="val4" disabled type="number" keyboard="number" :show-clear="false"><div slot="right" mini>吨</div></x-input>
        </group>
        <div v-show="showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计重量W=0.00000793*d*w*L</p>
                    <p>3.不锈钢卷材、带材的计算公式与不锈钢板材的计算公式相同</p>
                </div>
            </card>
        </div>
         <group v-show="!showTab1">
            111111
        </group>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        PopupPicker,
        ButtonTab,
        ButtonTabItem,
        XInput,
        Divider,
        Card

    } from 'vux'
    export default {
        components: {
            Group,
            Cell,
            PopupPicker,
            ButtonTab,
            ButtonTabItem,
            XInput,
            Divider,
            Card
        },
        name: 'hello',
        data() {
            return {
                title: '不锈钢材',
                itemList: ['201', '202', '301', '302', '304', '304L', '305', '310', '321', '309S', '310S', '316', '316L', '347', '405', '410', '420', '409', '430', '434'],
                itemData: [
                    ['201', '202', '301', '302', '304', '304L', '305', '310', '321', '309S', '310S', '316', '316L', '347', '405', '410', '420', '409', '430', '434']
                ],
                item: ['201'],
                numList: ['0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000798', '0.00000798', '0.00000798', '0.00000798', '0.00000798', '0.00000775', '0.00000775', '0.00000775', '0.00000770', '0.00000770', '0.00000770'],
                nowTab: 0,
                showTab1: true,
                val1: '0',
                val2: '0',
                val3: '0',
                //val4: '01',
            }
        },
        methods: {
            clickTab() {
                if (this.nowTab > 0)
                    this.showTab1 = false;
                else
                    this.showTab1 = true;
            }
        },
        computed: {
            val4() {
                //var totalWeight = density*wd*ww*wl;
                //a.indexOf('c');
                var key_num = this.itemList.indexOf(this.item[0]);
                var para = this.numList[key_num];
                console.log(para);
                var result = para * parseInt(this.val1) * parseInt(this.val2) * parseInt(this.val3);
                return result;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: lower-alpha;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
    
    .card-padding {
        padding: 2px 15px;
    }
</style>