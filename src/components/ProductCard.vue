<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import Rating from "@/components/Rating.vue";

defineProps<{ product: Product, fullShow: Boolean }>();

</script>

<template>


  <div class="product-card">
    <h2 class="product-title">{{ product.title }}</h2>
    <img :src="product.image" :alt="product.description" width="100px"/>
    <Rating :rate="product.rating.rate" :count="product.rating.count"/>
    <p><strong>Категория:</strong>
      {{ product.category }}</p>
    <p v-if="fullShow"><strong>Описание:</strong> {{ product.description }}</p>
    <p><strong>Цена:</strong> {{ product.price }}</p>
  </div>


</template>

<style scoped>

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px darkgray solid;
  border-radius: 20px;
  min-height: 450px;
  padding: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-weight: bold;
  color: #333;
}


</style>
