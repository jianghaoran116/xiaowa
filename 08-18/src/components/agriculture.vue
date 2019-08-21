<template>
    <div class="item agriculture">
        <h3>猪肉价格查询器</h3>
        <label for="area">地名/区号</label>
        <input 
          type="text" 
          value="" 
          id="area"
          v-on:input="onInput"
        />
        <div class="price-area">
            <h4>{{area}}猪肉价格: {{price}}</h4>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      area: '北京',
      price: 0,
    }
  },
  created() {
    this.$watch('area', () => {
      this.requestPrice(this.area);
    });
  },
  methods: {
    requestPrice(area) {
      fetch(`/price?area=${area}`)
        .then(res => res.json())
        .then(res => this.price = res.infos)
    },
    onInput(e) {
      this.area = e.data;
    }
  }
}
</script>