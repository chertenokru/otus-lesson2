<script setup lang="ts">

import {RouterLink} from "vue-router";
</script>

<template>
  <h1>Welcome to SampleShop !</h1>
  <nav class="navigation">
    <RouterLink to="/" class="nav-link">Каталог</RouterLink>
    <RouterLink to="/order" class="nav-link">Заказать</RouterLink>
    <RouterLink to="/newProduct" class="nav-link">Новый товар</RouterLink>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
  padding: 0.5rem 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #343a40;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #00bcd4;
  color: white;
  transform: translateY(-2px);
}

</style>
