<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import Rating from "@/components/Rating.vue";

defineProps<{ product: Product }>()
const emits = defineEmits<{ 'category-click': [category: string] }>()
</script>

<template>
  <div class="product-card">
    <p class="product-title">{{ product.title }}</p>
    <img :src="product.image" :alt="product.description" width="100px"/>
    <Rating :rate="product.rating.rate" :count="product.rating.count"/>
    <p class="underline" @click="emits('category-click',product.category)">Категория:
      {{ product.category }}</p>
    <p>Описание: {{ product.description }}</p>
    <p>Цена: {{ product.price }}</p>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
}

.product-title {
  font-weight: bold;
}

.underline {
  text-decoration: underline;
  cursor: pointer;
}

</style>
