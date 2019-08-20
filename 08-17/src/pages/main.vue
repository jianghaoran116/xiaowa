<template>
  <div>
    <div v-for="(item, idx) in listData" :key="idx">
      <multiple-pic
        v-if="item.type==='multiplePic'"
        v-bind:item="item"
      ></multiple-pic>
      <single-pic
        v-else
        v-bind:item="item"
      ></single-pic>
    </div>
  </div>
</template>

<script>

import MultiplePic from '../components/multiple-pic.vue';
import SinglePic from '../components/single-pic.vue';

export default {
  components: {
    MultiplePic,
    SinglePic
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
      return fetch('./list')
        .then(res => res.json())
        .then(res => res.data)
    }
  }
}
</script>