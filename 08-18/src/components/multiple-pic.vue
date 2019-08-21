<template>
  <div class="item multiple-image">
    <h3>
      {{title}}
    </h3>
    <div class="image-list">
      <img 
        v-for="(image, idx) in imageList" :key="idx" 
        v-bind:src="image" 
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'imageList']
}
</script>