<template>
    <div class="item multiple-image" v-on:click="skip">
        <h3>
            {{title}}
        </h3>
        <div class="image-list">
            <img v-for="(image, idx) in imageList" :key="idx" v-bind:src="image" />
        </div>
    </div>
</template>

<script>
import BaseOptions from './base.js';
/**
 * @file feed流多图item
 */
export default {
    extends: BaseOptions
}
</script>

<style scoped>
@import "./index.css";

.item.multiple-image h3 {
    font-size: 17px;
}

.item.multiple-image .image-list img {
    width: 33%;
}
</style>
