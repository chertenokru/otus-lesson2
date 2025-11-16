<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps<{ productList: Product[] }>()

</script>

<template>
  <div class="productList">

    <div class="productCard" v-for="product in productList" :key="product.id">
      <ProductCard :product="product"/>
    </div>
  </div>
</template>

<style scoped>
.productList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

}
</style>
