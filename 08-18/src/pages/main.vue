<template>
  <div>
    <div v-for="(item, idx) in listData" :key="idx">
      <multiple-pic
        v-if="item.type==='multiplePic'"
        v-bind="item.data"
      ></multiple-pic>
      <single-pic
        v-else-if="item.type==='singlePic'"
        v-bind="item.data"
      ></single-pic>
      <Agriculture
        v-else
      ></Agriculture>
    </div>
  </div>
</template>

<script>

import MultiplePic from '../components/multiple-pic.vue';
import SinglePic from '../components/single-pic.vue';
import Agriculture from '../components/agriculture.vue';

export default {
  components: {
    MultiplePic,
    SinglePic,
    Agriculture,
  },
  data() {
    return {
      listData: [],
    }
  },
  created() {
    this.getListData()
      .then((res) => {this.listData = res});
  },
  methods: {
    getListData() {
      return fetch('./list?tab=agriculture')
        .then(res => res.json())
        .then(res => res.data)
    }
  }
}
</script>