<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import ProductCard from "@/components/ProductCard.vue";
import {computed, ref} from "vue";

const props = defineProps<{ productList: Product[] }>()
const categoryFilter = ref('')


const filteredCategory = computed(() => {
  if (categoryFilter.value?.length ?? 0 > 1)
    return props.productList.filter(product => product.category.startsWith(categoryFilter.value))
  else
    return props.productList
})


</script>

<template>
  <div class="filter">
    Фильтр по категории:
    <input type="text" v-model="categoryFilter" />
    <button v-show="categoryFilter" @click="categoryFilter =''">Удалить</button>
    <p>Найдено товаров: {{ filteredCategory.length }}</p>
  </div>

  <div class="productList">

    <div class="productCard" v-for="product in filteredCategory" :key="product.id">
      <ProductCard :product="product"
                   @category-click="(newFilter)=> categoryFilter = newFilter"/>
    </div>
  </div>
</template>

<style scoped>
.productList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 20px;

}
</style>
