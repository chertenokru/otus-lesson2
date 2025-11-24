<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import ProductCard from "@/components/ProductCard.vue";
import {RouterLink} from "vue-router";

defineProps<{ productList: Product[] }>()


</script>

<template>

  <div class="productList">

    <div class="productCard" v-for="product in productList" :key="product.id">
      <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="product-card-link">
        <ProductCard :product="product" :fullShow="false"/>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.productList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 20px;
  gap: 10px;
}

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}

.product-card-link:hover {
    background-color: rgba(236, 231, 151, 0.16);

}


</style>
