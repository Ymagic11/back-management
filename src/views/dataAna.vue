<template>
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
        <span style="font-size:26px;font-weight:700">数据统计</span>
        <div>
            <ul style="display:flex">
                <li class="biaoqian">总数据:</li>
                <li class="biaoqian"><span class="total">{{ usertotal }}</span>注册用户</li>
                <li class="biaoqian"><span class="total">{{ bustotal }}</span>注册商家</li>
                <li class="biaoqian"><span class="total">{{ foodtotal }}</span>菜品</li>
            </ul>
        </div>
    </div>
    <div id="echart" style="width:1000px;height:500px;margin: 50px auto 0;"></div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import { getdata, gettotal } from '../server/Interface'

type res = {
    userone: number, usertwo: number, usertree: number, userfour: number, userfive: number,
    busone: number, bustwo: number, bustree: number, busfour: number, busfive: number
}

let usertotal = ref<number>()
let bustotal = ref<number>()
let foodtotal = ref<number>()

const str = new Date()
const yy = str.getFullYear()
const mm = str.getMonth() + 1
let dd = str.getDate()
const dateArr = reactive<string[]>([])
for (var i = 0; i < 5; i++) {
    dateArr.push(`${yy}` + '-' + `${mm}` + '-' + `${dd - i}`);
}

onBeforeMount(() => {
    setTotal()
})

onMounted(() => {
    setChart()
})

const setTotal = async () => {
    const total = await gettotal() as Array<any>
    usertotal.value = total[0][0].usertotal
    bustotal.value = total[1][0].bustotal
    foodtotal.value = total[2][0].foodtotal
}

const setChart = async () => {
    const myChart  = echarts.init(document.querySelector("#echart") as HTMLElement)
    const res = await getdata() as res
    let userdata = [res.userone, res.usertwo, res.usertree, res.userfour, res.userfive]
    let busdata = [res.busone, res.bustwo, res.bustree, res.busfour, res.busfive]
    myChart.setOption({
        title: {
            text: '走势图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['用户', '商家']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateArr
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '用户',
                data: userdata,
                type: 'line'
            },
            {
                name: '商家',
                data: busdata,
                type: 'line'
            }
        ]
    })
}

</script>

<style scoped lang="less">
.biaoqian {
    background-color: #e5e9f2;
    border-radius: 5px;
    font-size: 14px;
    color: #444;
    text-align: center;
    width: 150px;
    height: 30px;
    line-height: 30px;
    list-style: none;
    margin-right: 20px;
}

.biaoqian:first-child {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    background-color: #545c64;
}

.total {
    font-size: 22px;
    color: black;
    font-weight: 700;
}
</style>