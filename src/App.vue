<script setup lang="ts">

import { RouterView } from 'vue-router';
import PageHeader from "@/pages/PageHeader.vue";
import PageFooter from "@/pages/PageFooter.vue";
</script>

<template>
  <div class="app-container">
    <PageHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <PageFooter />

  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
