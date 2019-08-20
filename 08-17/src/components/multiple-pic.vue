<template>
  <div class="item multiple-image">
    <h3>
      {{item.data.title}}
    </h3>
    <div class="image-list">
      <img 
        v-for="(image, idx) in item.data.imageList" :key="idx" 
        v-bind:src="image" 
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>