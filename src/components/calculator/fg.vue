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
            <x-input title="*边宽(D)" v-model="val_d" keyboard="number" :show-clear="false"><div slot="right" mini>mm</div></x-input>
            <x-input title="*壁厚(S)" v-model="val_s" keyboard="number" :show-clear="false"><div slot="right" mini>mm</div></x-input>
         </group>
         <group v-show="showTab1">
            <x-input title="*长度(L)" v-model="val_ll" keyboard="number" :show-clear="false"><div slot="right" mini>m</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res1" disabled keyboard="number" :show-clear="false"><div slot="right" mini>吨（参考）</div></x-input>
        </group>
        <div v-show="showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计重量<br/>W=（D×4÷3.14-S）×S×0.00002491×L</p>
                </div>
            </card>
        </div>
         <group v-show="!showTab1">
            <x-input title="*重量(W)" v-model="val_ww" keyboard="number" :show-clear="false"><div slot="right" mini>吨</div></x-input>
            <x-input class="result_cell" title="计算结果：" v-model="res2" disabled keyboard="number" :show-clear="false"><div slot="right" mini>m（参考）</div></x-input>
        </group>
        <div v-show="!showTab1">
            <divider>使用须知</divider>
            <card>
                <div slot="content" class="card-padding">
                    <p>1.本工具计算的理论重量与实际重量有出入，误差约为0.2%-0.7%，计算结果仅估算参考，不建议在实际交易中使用。</p>
                    <p>2.理计长度<br/>L=W/（D×4÷3.14-S）×S×0.00002491</p>
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
                title: '不锈钢方管',
                itemList: ['304系列', '321系列', '316系列', ],
                itemData: [
                    ['304系列', '321系列', '316系列', ]
                ],
                item: ['304系列'],
                numList: ['0.00002491', '0.00002491', '0.00002507', ],
                nowTab: 0,
                showTab1: true,
                val_d: '0',
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
                //var totalWeight =(wDiameter*4/3.14-wWidth)*wWidth*density*wLength
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //W=（d×4÷3.14-s）×s×0.00002491×L
                    var result = (parseInt(this.val_d) * 4 / 3.14 - parseInt(this.val_s)) * parseInt(this.val_s) * density * parseInt(this.val_ll)
                    return result;
                } else {
                    return 0;
                }
            },
            res2() {
                //var totalWidth = lWeight/((lDiameter*4/3.14-lWidth)*lWidth*density);
                var key_num = this.itemList.indexOf(this.item[0]);
                var density = this.numList[key_num];
                if (density > 0) {
                    //L=W/（D×4÷3.14-S）×S×0.00002491
                    var result = parseInt(this.val_ww) / ((parseInt(this.val_d) * 4 / 3.14 - parseInt(this.val_s)) * parseInt(this.val_s) * density);
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