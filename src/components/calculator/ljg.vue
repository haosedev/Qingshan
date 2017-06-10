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
            <x-input title="*对边距离(s)" v-model="val_s" type="number" keyboard="number" :show-clear="false"><div slot="right" mini>mm</div></x-input>
         </group>
         <group v-show="showTab1">
            <x-input title="*长度(L)" v-model="val_ll" type="number" keyboard="number" :show-clear="false"><div slot="right" mini>m</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res1" disabled type="number" keyboard="number" :show-clear="false"><div slot="right" mini>吨（参考）</div></x-input>
        </group>
        <div v-show="showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计重量W=0.00000669*s*s*L</p>
                </div>
            </card>
        </div>
         <group v-show="!showTab1">
            <x-input title="*重量(W)" v-model="val_ww" type="number" keyboard="number" :show-clear="false"><div slot="right" mini>吨</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res2" disabled type="number" keyboard="number" :show-clear="false"><div slot="right" mini>m（参考）</div></x-input>
        </group>
        <div v-show="!showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计长度L=W/0.00000669*s*s</p>
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
                title: '不锈钢六角钢',
                //itemList: ['201', '202', '301', '302', '304', '304L', '305', '310', '321', '309S', '310S', '316', '316L', '347', '405', '410', '420', '409', '430', '434'],
                itemList: ['默认'],
                //itemData: [
                //    ['201', '202', '301', '302', '304', '304L', '305', '310', '321', '309S', '310S', '316', '316L', '347', '405', '410', '420', '409', '430', '434']
                //],
                itemData: [
                    ['默认']
                ],
                item: ['默认'],
                //numList: ['0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669', '0.00000669'],
                numList: ['0.00000669'],
                nowTab: 0,
                showTab1: true,
                val_s: '0',
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
                //var totalWeight = density*wWidth*wWidth*wLength;
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //W = 0.00000669 * s * s * L
                    var result = density * parseInt(this.val_s) * parseInt(this.val_s) * parseInt(this.val_ll);
                    return result;
                } else {
                    return 0;
                }
            },
            res2() {
                //var totalWidth = lWeight/(density*lWidth*lWidth);
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //L = W / 0.00000669 * s * s
                    var result = parseInt(this.val_ww) / (density * parseInt(this.val_s) * parseInt(this.val_s));
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