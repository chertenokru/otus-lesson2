<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import Rating from "@/components/Rating.vue";

defineProps<{ product: Product }>()

</script>

<template>
  <div class="product-card">
    <p class="product-title">{{ product.title }}</p>
    <img :src="product.image" :alt="product.description" width="100px"/>
    <Rating :rate="product.rating.rate" :count="product.rating.count"/>
    <p >Категория:
      {{ product.category }}</p>
<!--    <p>Описание: {{ product.description }}</p>-->
    <p>Цена: {{ product.price }}</p>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px  darkgray solid ;
  border-radius: 20px;
  min-height: 450px;
  padding: 10px;
  cursor: pointer;
}

.product-title {
  font-weight: bold;
}


</style>
