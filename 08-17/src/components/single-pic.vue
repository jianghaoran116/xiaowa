<template>
  <div class="item single-pic">
    <div class="content">
      <span>
        {{title}}
      </span>
    </div>
    <img v-bind:src="imgUrl" />
  </div>
</template>

<script>
export default {
  props: ['title', 'imageList'],
  computed: {
    imgUrl() {
      return this.imageList[0];
    }
  }
}
</script>