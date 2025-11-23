<script setup lang="ts">
import {computed, onMounted, ref,  watchEffect} from "vue"
import ProductCardList from "@/components/ProductCardList.vue";
import {useProducts} from "@/composable/useProducts.ts";
import ProductCategoryFilter from "@/components/ProductCategoryFilter.vue";
import ProductPriceFilter from "@/components/ProductPriceFilter.vue";
import type {Product} from "@/model/Product.ts";
import ProductNameFilter from "@/components/ProductNameFilter.vue";

const {
  productList,
  categoryList,
  loadProducts,
  loadCategories,
  isLoading,
  isError,
  errorText
} = useProducts()

const categoryFilter = ref('')
const nameFilter = ref('')

const filteredProductList = ref<Product[]>([])

watchEffect(() => {
  filteredProductList.value = productList.value.filter(product =>
    (!categoryFilter.value || product.category == categoryFilter.value)
    && (!nameFilter.value || product.title.toLowerCase().trim().includes(nameFilter.value.toLowerCase().trim()))
    && product.price >= filterPrice.value.minFilter
    && product.price <= filterPrice.value.maxFilter)
})

const minPriceValue = computed(() => {
  return productList.value && productList.value.length > 0 ?
    productList.value.reduce((prev, cur) => (prev.price >= cur.price) ? cur : prev).price : 0
})

const maxPriceValue = computed(() => {
  return productList.value && productList.value.length > 0 ?
    productList.value.reduce((prev, cur) => (prev.price <= cur.price) ? cur : prev).price : 0
})

const filterPrice = ref<{ maxFilter: number, minFilter: number }>({maxFilter: 0, minFilter: 0})

onMounted(async () => {
  await loadProducts()
  await loadCategories()
  filterPrice.value = {minFilter: minPriceValue.value, maxFilter: maxPriceValue.value}
})

</script>

<template>
  <div class="app">
    <h1>Welcome to SampleShop !</h1>

    <div v-show="isLoading"> Загрузка...</div>
    <div v-show="!isLoading && !isError">
      <div style="">
        <ProductNameFilter class="filter-item" v-model="nameFilter"/>
        <ProductCategoryFilter class="filter-item" v-model="categoryFilter"
                               :filters="categoryList"/>
        <ProductPriceFilter class="filter-item" v-model="filterPrice" :minValue="minPriceValue"
                            :maxValue="maxPriceValue"/>
      </div>
      <p>Найдено товаров: {{ filteredProductList.length }}</p>
      <ProductCardList :product-list="filteredProductList"/>
    </div>
    <div class="error-message" v-show="isError">
      у нас что-то поломалось и мы типа уже чиним...
      <p>{{ errorText }}</p>
      <button @click="loadProducts" class="refresh-button">попробуйте ещё раз!</button>
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
}

.error-message {
  text-align: center;
  color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin: 100px auto;
  width: 100%;

  .refresh-button {
    width: 200px;
  }
}

.filter-item {
  padding-bottom: 10px;
}
</style>
