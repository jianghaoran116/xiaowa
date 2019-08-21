<template>
    <div class="item agriculture">
        <h3>猪肉价格查询器</h3>
        <label for="area">地名/区号</label>
        <input v-model="area" type="text" value="" id="area"/>
        <div class="price-area">
            <h4>{{area}}猪肉价格:</h4>
            <span>(测算时间：{{date()}})</span>
            <echarts v-bind:options="chartsOptions"></echarts>
        </div>
    </div>
</template>

<script>
/**
 * @file feed流单图item
 */
export default {

    data() {
        return {
            area: '北京',
            infos: [],
            a: {
                b: {
                    c: [2, 3, 4]
                }
            }
        };
    },

    created() {

        const debounce = this.createDebounce(area => {
            this.requestPrice(area);
        }, 3000);

        this.requestPrice(this.area);

        this.$watch('area', area => debounce(area));
    },

    computed: {

        chartsOptions() {
            return  {
                tooltip: {},
                legend: {
                    data:['价格']
                },
                xAxis: {
                    data: ['猪肉价格']
                },
                yAxis: {},
                series: [{
                    name: '价格',
                    type: 'bar',
                    data: this.infos.map(info => info.price)
                }]
            };
        }

        // date() {
        //     const date = new Date;
        //     return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // }

    },

    methods: {

        date() {
            const date = new Date;
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        },

        requestPrice(area) {
            fetch(`/price?area=${area}`)
                .then(res => res.json())
                .then(res => {
                    this.infos = res.infos;
                });
        }
    }
}
</script>

<style scoped>
@import "./index.css";
h3 {
    font-size: 17px;
    font-weight: normal;
    margin: 0 0 1em 0;
}

input,
button {
    font-size: 17px;
}

.price-area {
    min-height: 170px;
}

span {
    font-size: 12px;
}
</style>
