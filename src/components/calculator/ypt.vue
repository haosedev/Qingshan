<template>
    <div>
        <div style="padding: 15px;">
            <button-tab v-model="nowTab">
                <button-tab-item @on-item-click="clickTab()">计算重量</button-tab-item>
                <button-tab-item @on-item-click="clickTab()">计算长度</button-tab-item>
            </button-tab>
        </div>
        <group :title="title">
            <popup-picker title="请选择牌号" :data="itemData" v-model="item" value-text-align="right" ></popup-picker>
        </group>
         <group :title="itemStr">
            <x-input title="*直径(l)" v-model="val_l" type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>mm</div></x-input>
         </group>
         <group v-show="showTab1">
            <x-input title="*长度(L)" v-model="val_ll" type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>m</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res1" disabled type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>吨（参考）</div></x-input>
        </group>
        <div v-show="showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计重量:W=0.00000623*d*d*L</p>
                </div>
            </card>
        </div>
         <group v-show="!showTab1">
            <x-input title="*重量(W)" v-model="val_ww" type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>吨</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res2" disabled type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>m（参考）</div></x-input>
        </group>
        <div v-show="!showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计长度:L=W/0.00000623*d*d</p>
                </div>
            </card>
        </div>
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
                title: '不锈钢圆钢盘条',
                itemList: ['青山标准：301', '青山标准：303', '青山标准：304', '青山标准：316', '青山标准：316', '青山标准：321', '行业标准：301', '行业标准：303', '行业标准：304', '行业标准：316', '行业标准：316L', '行业标准：321', '行业标准：410', '行业标准：420', '行业标准：420j', '行业标准：430', '行业标准：431'],
                itemData: [
                    ['青山标准：301', '青山标准：303', '青山标准：304', '青山标准：316', '青山标准：316', '青山标准：321', '行业标准：301', '行业标准：303', '行业标准：304', '行业标准：316', '行业标准：316L', '行业标准：321', '行业标准：410', '行业标准：420', '行业标准：420j', '行业标准：430', '行业标准：431']
                ],
                item: ['青山标准：301'],
                numList: ['0.000006228', '0.000006228', '0.000006228', '0.000006228', '0.000006228', '0.000006228', '0.00000623', '0.00000623', '0.00000623', '0.00000623', '0.00000623', '0.00000623', '0.00000609', '0.00000609', '0.00000609', '0.00000609', '0.00000609'],
                nowTab: 0,
                showTab1: true,
                val_l: '0',
                val_ll: '0',
                val_ww: '0',
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
            res1() {
                //var totalWeight = density*wDiameter*wDiameter*wLength;
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //W=0.00000623*d*d*L
                    var result = density * parseFloat(this.val_l) * parseFloat(this.val_l) * parseFloat(this.val_ll);
                    return result;
                } else {
                    return 0;
                }
            },
            res2() {
                //var totalWidth = lWeight/(density*lDiameter*lDiameter);
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //L=W/0.00000623*d*d
                    var result = parseFloat(this.val_ww) / (density * parseFloat(this.val_l) * parseFloat(this.val_l));
                    return result;
                } else {
                    return 0;
                }
            },
            itemStr() {
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                return '使用计算参数：' + density;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>