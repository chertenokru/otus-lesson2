<script setup lang="ts">
import {computed, onMounted, ref, watchEffect} from "vue"
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
  errorText,
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

// const onSubmitForm = async (value: NewProductValues) => {
//   const res = await addProduct(value as Product)
//
//   if (res?.title === value.title) {
//     alert(`Добавлен новый товар ${res.title}  id = ${res.id} `);
//   }
// }
</script>

<template>
  <div id="top" class="app">
    <h2>Каталог товаров</h2>
    <div v-show="isLoading"> Загрузка...</div>
    <div v-show="!isLoading && !isError">
      <div class="filters-container">
        <div class="filters-center">
          <div class="filters-left">
            <ProductNameFilter class="filter-item" v-model="nameFilter"/>
            <ProductCategoryFilter class="filter-item" v-model="categoryFilter"
                                 :filters="categoryList"/>
          </div>
          <div class="filters-right">
            <ProductPriceFilter class="filter-item" v-model="filterPrice" :minValue="minPriceValue"
                                :maxValue="maxPriceValue"/>
            <p class="products-count">Найдено товаров: {{ filteredProductList.length }}</p>
          </div>
        </div>
      </div>

      <ProductCardList :product-list="filteredProductList"/>
    </div>
    <div class="error-message" v-show="isError">
      у нас что-то поломалось и мы типа уже чиним...
      <p>{{ errorText }}</p>
      <button @click="loadProducts" class="refresh-button">попробуйте ещё раз!</button>
    </div>

    <div class="back-to-top-container">
      <a href="#top" class="back-to-top">Вернуться в начало</a>
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
}

h2 {
  text-align: center;
  margin: 20px 0;
  color: #333;
}

.filters-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.filters-center {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
}

.filters-left, .filters-right {
  min-width: 280px;
}

.filters-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.filters-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.filter-item {

}

.products-count {
  font-weight: 500;
  color: #666;
  font-size: 0.9em;
  margin-top: 10px;
  opacity: 0.9;
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

.back-to-top-container {
  text-align: center;
  width: 100%;
  margin: 20px 0;
}

.back-to-top {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f8f9fa;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  background-color: #00bcd4;
  color: white;
  transform: translateY(-2px);
}

</style>
