<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import router from "@/router";
import {type CartItem, useCartStore} from "@/stores/CartStore.ts";
import {storeToRefs} from "pinia";

const cartStore = useCartStore();


const {items: cartItems, totalCount, totalPrice} = storeToRefs(cartStore);
const {clear, addItem, removeItem} = cartStore

const handleRemoveItem = (productItem: CartItem) => {
  if (productItem.count > 1 || (productItem.count === 1 && confirm('Вы действительно хотите удалить этот товар из корзины?'))) {
    removeItem(productItem.product.id);
  }
}


const incItem = (product: Product) => {
  addItem(product);
}


const clearCart = () => {
  if (confirm('Вы действительно хотите очистить корзину?')) {
    clear();
  }
};

// Перейти к оформлению заказа
const goToOrder = () => {
  router.push("/order");
};
</script>

<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Ваша корзина пуста</p>
      <button class="continue-shopping" @click="() => $router.push('/')">Продолжить покупки</button>
    </div>

    <div v-else class="cart-items">
      <div class="cart-item" v-for="item in cartItems" :key="item.product.id">
        <RouterLink :to="{name:'product', params: {id: item.product.id}}"><p
          style="text-align: start">{{ item.product.title }}</p>
        </RouterLink>

        <p>{{ item.product.price }}</p>
        <button class="edit-count-button" @click="handleRemoveItem(item)">-</button>
        <p>{{ item.count }} </p>
        <button class="edit-count-button" @click="incItem(item.product)">+</button>
      </div>

      <div class="cart-summary">

        <p><strong>Всего товаров:</strong> {{ totalCount }}</p>
        <p><strong>Общая стоимость:</strong> {{ totalPrice }} </p>
      </div>

      <div class="cart-actions">
        <button class="clear-cart" @click="clearCart">Очистить корзину</button>
        <button class="checkout" @click="goToOrder">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 100px 50px 60px 50px;
  text-align: center;
  align-items: center;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.edit-count-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-count-button:hover {
  background-color: #c82333;
}

.cart-summary {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.cart-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.clear-cart, .checkout {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.clear-cart {
  background-color: #6c757d;
  color: white;
}

.clear-cart:hover {
  background-color: #5a6268;
}

.checkout {
  background-color: #00bcd4;
  color: white;
}

.checkout:hover {
  background-color: #0097a7;
}

.empty-cart {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.continue-shopping {
  background-color: #00bcd4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.continue-shopping:hover {
  background-color: #0097a7;
}
</style>
