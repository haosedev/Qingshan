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
         <group :title="itemStr">
            <x-input title="*边宽(b)" v-model="val_b"  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>mm</div></x-input>
            <x-input title="*边厚(d)" v-model="val_d"  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>mm</div></x-input>
            <x-input title="*圆弧半径(rr)" v-model="val_rr"  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>mm</div></x-input>
            <x-input title="*端弧半径(r)" v-model="val_r"  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>mm</div></x-input>
         </group>
         <group v-show="showTab1">
            <x-input title="*长度(L)" v-model="val_ll"  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>m</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res1" disabled  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>吨（参考）</div></x-input>
        </group>
        <div v-show="showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计重量<br/>W=0.00000793*[d*(2*b-d)+0.215(R*R-2*r*r)]*L</p>
                </div>
            </card>
        </div>
         <group v-show="!showTab1">
            <x-input title="*重量(W)" v-model="val_ww"  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>吨</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res2" disabled  type="number" pattern="[0-9][.]*" :show-clear="false"><div slot="right" mini>m（参考）</div></x-input>
        </group>
        <div v-show="!showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计长度<br/>L=W/0.00000793*[d*(2*b-d)+0.215（R*R-2*r*r)]</p>
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
                title: '等边角钢',
                itemList: ['201', '202', '301', '302', '304', '304L', '305', '310', '321', '309S', '310S', '316', '316L', '347', '405', '410', '420', '409', '430', '434'],
                itemData: [
                    ['201', '202', '301', '302', '304', '304L', '305', '310', '321', '309S', '310S', '316', '316L', '347', '405', '410', '420', '409', '430', '434']
                ],
                item: ['201'],
                numList: ['0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000793', '0.00000798', '0.00000798', '0.00000798', '0.00000798', '0.00000798', '0.00000775', '0.00000775', '0.00000775', '0.00000770', '0.00000770', '0.00000770'],
                nowTab: 0,
                showTab1: true,
                val_b: '0',
                val_d: '0',
                val_rr: '0',
                val_r: '0',
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
                //var totalWeight = density*(wThickness*(2*wWidth-wThickness)+0.215*(wInRadius*wInRadius-2*wTopRadius*wTopRadius))*wLength;
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //W=0.00000793*[d*(2*b-d)+0.215(R*R-2*r*r)]*L
                    var result = density * (parseFloat(this.val_d) * (2 * parseFloat(this.val_b) - parseFloat(this.val_d)) + 0.215 * (parseFloat(this.val_rr) * parseFloat(this.val_rr) - 2 * parseFloat(this.val_r) * parseFloat(this.val_r))) * parseFloat(this.val_ll);
                    return result;
                } else {
                    return 0;
                }
            },
            res2() {
                //var totalWidth = lWeight/(density*(Number(lThickness*(2*lWidth-lThickness))+Number(0.215*(lInRadius*lInRadius-2*lTopRadius*lTopRadius))));
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //L=W/0.00000793*[d*(2*b-d)+0.215（R*R-2*r*r)]
                    var result = parseFloat(this.val_ww) / (density * (parseFloat(this.val_d) * (2 * parseFloat(this.val_b) - parseFloat(this.val_d)) + 0.215 * (parseFloat(this.val_rr) * parseFloat(this.val_rr) - 2 * parseFloat(this.val_r) * parseFloat(this.val_r))));
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