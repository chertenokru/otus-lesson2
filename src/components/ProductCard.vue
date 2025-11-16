<script setup lang="ts">
import type {Product} from "@/model/Product.ts";

defineProps<{ product: Product }>()

</script>

<template>
  <div class="product-card">
    <p class="product-title">{{ product.title }}</p>
    <img :src="product.image" :alt="product.description" width="100px"/>
    <div class="rating">
      <img v-for="n in Math.trunc(product.rating.rate)" :key="n" src="/StarFilled.svg" alt="Rating"
           class="star"/>
      <img src="/Star.svg" alt="Rating" class="star"
           v-show="(product.rating.rate-Math.trunc(product.rating.rate))>0.01"/>
      {{ product.rating.rate }} {{ product.rating.count }} отзывов

    </div>
    <p>Категория: {{ product.category }}</p>
    <p>Описание: {{ product.description }}</p>
    <p>Цена: {{ product.price }}</p>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-weight: bold;
}

.rating {
  display: flex;
  align-items: center;
}

.star {
  width: 1em;
}
</style>
