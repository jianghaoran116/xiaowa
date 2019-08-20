<template>
  <div class="item single-pic">
    <div class="content">
      <span>
        {{item.data.title}}
      </span>
    </div>
    <img v-bind:src="item.data.imageList[0]" />
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>