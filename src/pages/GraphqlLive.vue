<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useCountriesGraphql} from "@/composable/useCountriesGraphql.ts";
import {useTradeStream} from "@/composable/useTradeStream.ts";

const {countries, isLoading, isError, errorText, loadCountries} = useCountriesGraphql();

const searchQuery = ref("");
const selectedSymbol = ref("btcusdt");

const filteredCountries = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const list = query
    ? countries.value.filter((country) =>
      country.name.toLowerCase().includes(query) || country.code.toLowerCase().includes(query),
    )
    : countries.value;

  return list.slice(0, 16);
});

const {
  status: streamStatus,
  lastPrice,
  lastTradeTime,
  lastSymbol,
  connect,
  disconnect,
} = useTradeStream();

onMounted(async () => {
  await loadCountries();
  connect(selectedSymbol.value);
});

watch(selectedSymbol, (value) => {
  connect(value);
});

onBeforeUnmount(() => {
  disconnect();
});
</script>

<template>
  <section class="graphql-section">
    <div class="section-header">
      <h2>GraphQL: список стран</h2>
      <p class="section-note">
        Данные берутся из публичного GraphQL API Countries (https://countries.trevorblades.com).
      </p>
    </div>

    <div class="controls">
      <input
        v-model="searchQuery"
        class="search-input"
        placeholder="Поиск по стране или коду"
        type="text"
      />
      <button class="refresh-button" @click="loadCountries">Обновить</button>
    </div>

    <div v-if="isLoading" class="status">Загрузка данных...</div>
    <div v-else-if="isError" class="status error">
      {{ errorText || "Не удалось получить данные" }}
    </div>

    <div v-else class="countries-grid">
      <article v-for="country in filteredCountries" :key="country.code" class="country-card">
        <div class="country-flag">{{ country.emoji }}</div>
        <div>
          <h3>{{ country.name }}</h3>
          <p class="country-meta">Код: {{ country.code }}</p>
          <p class="country-meta">Столица: {{ country.capital || "—" }}</p>
          <p class="country-meta">Валюта: {{ country.currency || "—" }}</p>
        </div>
      </article>
    </div>
  </section>

  <section class="websocket-section">
    <div class="section-header">
      <h2>WebSocket: обновления цены</h2>
      <p class="section-note">
        Используем публичный поток Binance WebSocket, чтобы увидеть обновления в реальном времени.
      </p>
    </div>

    <div class="controls">
      <label class="select-label">
        Торговая пара
        <select v-model="selectedSymbol" class="select-input">
          <option value="btcusdt">BTC / USDT</option>
          <option value="ethusdt">ETH / USDT</option>
          <option value="bnbusdt">BNB / USDT</option>
        </select>
      </label>
      <button class="refresh-button" @click="connect(selectedSymbol)">Переподключиться</button>
    </div>

    <div class="ticker-card">
      <div class="ticker-row">
        <span class="label">Статус:</span>
        <span :class="['value', streamStatus]">{{ streamStatus }}</span>
      </div>
      <div class="ticker-row">
        <span class="label">Пара:</span>
        <span class="value">{{ lastSymbol?.toUpperCase() || selectedSymbol.toUpperCase() }}</span>
      </div>
      <div class="ticker-row">
        <span class="label">Цена:</span>
        <span class="value">{{ lastPrice?.toFixed(2) || "—" }}</span>
      </div>
      <div class="ticker-row">
        <span class="label">Последняя сделка:</span>
        <span class="value">{{ lastTradeTime || "—" }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
}

.section-header {
  margin-bottom: 16px;
}

.section-note {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 4px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.search-input,
.select-input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  min-width: 220px;
}

.select-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  color: #495057;
}

.refresh-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #00bcd4;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

.refresh-button:hover {
  background-color: #0097a7;
}

.status {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.status.error {
  background: #ffe3e3;
  color: #c92a2a;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.country-card {
  display: flex;
  gap: 12px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.country-flag {
  font-size: 2rem;
}

.country-meta {
  margin: 4px 0;
  color: #6c757d;
  font-size: 0.85rem;
}

.websocket-section {
  background: #f8f9fa;
  padding: 20px 0 40px;
}

.ticker-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  max-width: 460px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.ticker-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.label {
  color: #6c757d;
}

.value {
  font-weight: 600;
}

.value.online {
  color: #2f9e44;
}

.value.connecting {
  color: #f59f00;
}

.value.error {
  color: #e03131;
}

.value.offline {
  color: #495057;
}
</style>
