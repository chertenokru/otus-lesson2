<script setup lang="ts">
import {useCountriesGraphql} from "@/composable/useCountriesGraphql.ts";
import {computed, onMounted, ref, watch} from "vue";
import twemoji from 'twemoji'
const {countries,countryOptions, isLoading, isError, errorText, loadCountries} = useCountriesGraphql();

const searchQuery = ref("");

const filteredCountries = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const list = query
    ? countries.value.filter((country) =>
      country.name.toLowerCase().includes(query) || country.code.toLowerCase().includes(query),
    )
    : countries.value;

  return list.slice(0, 16);
});

onMounted(async () => {
  await loadCountries();
})

watch(countryOptions.value,()=>loadCountries())
</script>

<template>
  <div>
    <div class="header">
      <h2>Cписок стран</h2>
      <p class="section-note">
        Данные берутся из публичного GraphQL API Countries (https://countries.trevorblades.com).
      </p>
    </div>

      <div class="controls-query"> Запросить :
        <div class="controls-query-list">
        <label><input type="checkbox" v-model="countryOptions.capital"/> столица</label>
        <label><input type="checkbox" v-model="countryOptions.emoji"/> флаг</label>
        <label><input type="checkbox" v-model="countryOptions.currency"/> валюта</label>
        <label><input type="checkbox" v-model="countryOptions.languages"/> языки</label>
        </div>
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
        <div v-if="country.emoji"  v-html="twemoji.parse(country.emoji)"  class="country-flag"></div>
        <div>
          <h3>{{ country.name }}</h3>
          <p class="country-meta">Код: {{ country.code }}</p>
          <p v-if="country.capital" class="country-meta">Столица: {{ country.capital || "—" }}</p>
          <p v-if="country.currency" class="country-meta">Валюта: {{ country.currency || "—" }}</p>
          <div v-if="country.languages">
            <p>Языки:</p>
            <p  v-for="language in country.languages" :key="language.code" class="country-meta">{{language.code}}: {{language.name}}</p>
          </div>

        </div>
      </article>
    </div>


  </div>
</template>

<style scoped>
.header {
  margin-bottom: 16px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.controls-query{
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 16px;
  font-weight: bold;
}
.controls-query-list{
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  font-weight: normal;
}

.search-input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  min-width: 220px;
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


</style>
