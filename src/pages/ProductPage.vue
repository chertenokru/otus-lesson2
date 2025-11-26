<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref, defineProps, onMounted, computed} from 'vue';
import type {Product} from '@/model/Product.ts';
import ProductCard from "@/components/ProductCard.vue";
import {useProducts} from "@/composable/useProducts.ts";
import {useCartStore} from "@/stores/CartStore.ts";

const router = useRouter();
const product = ref<Product | null>(null);

const cartStore = useCartStore();
const {addItem, removeItem, hasItem} = cartStore;
const countInCart = computed(() => hasItem(product.value?.id ?? 0))

const {getProductById, isError, isLoading} = useProducts();

const props = defineProps<{
  id: number
}>();

onMounted(async () => {
    product.value = await getProductById(props.id)
  }
)

const addToCart = () => {
  if (product.value) {
    addItem(product.value);
  }
}

const removefromCart = () => {
  if (product.value) {
    removeItem(product.value.id);
  }
}


</script>

<template>
  <div v-if="!isLoading && !isError && product" class="product-page">

    <div class="product-info">
      <ProductCard :product="product" :full-show="true"/>
    </div>
    <div class="product-actions">
      <div class="buttons">

        <button class="button" @click="()=>router.push('/')">Назад</button>
        <button v-show="countInCart>0" class="button" @click="removefromCart">Удалить из корзины
        </button>
        <p v-if="countInCart">В корзине - {{ countInCart }}</p>
        <button class="button" @click="addToCart">Добавить в корзину</button>

      </div>
    </div>
  </div>
  <div v-else-if="isError || (!isLoading || !product)" class="error-message">
    Товар с таким ID не найден.
    <div class="button-error-back">
      <button class="button" @click="()=>router.push('/')">Назад</button>
    </div>
  </div>
  <div v-else class="loading">
    Загрузка...
  </div>
</template>

<style scoped>
.product-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-info {
  margin: 20px 0;
  line-height: 1.6;
}

.product-actions {
  margin: 30px 0;
  text-align: center;
}

.button {
  background-color: #00bcd4;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0097a7;
}

.error-message, .loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 60px 20px;
  font-size: 18px;
  color: #666;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.button-error-back {
  margin-top: 60px;
}
</style>
