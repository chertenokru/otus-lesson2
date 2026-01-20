<script setup lang="ts">

import {useTradeStream} from "@/composable/useTradeStream.ts";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";

const selectedSymbol = ref("btcusdt");

const {
  status: streamStatus,
  lastPrice,
  lastTradeTime,
  lastSymbol,
  connect,
  disconnect,
} = useTradeStream();

onMounted(async () => {
  connect(selectedSymbol.value);
});

onBeforeUnmount(() => {
  disconnect();
});

watch(selectedSymbol, (value) => {
  connect(value);
})

</script>


<template>
  <div class="websocket-section">
    <div class="ticker-card">
      <div class="controls">
        <label class="select-label">
          Торговая пара
          <select v-model="selectedSymbol" class="select-input">>
            <option value="btcusdt">BTC / USDT</option>
            <option value="ethusdt">ETH / USDT</option>
            <option value="bnbusdt">BNB / USDT</option>
          </select>
        </label>
        <button class="refresh-button" @click="connect(selectedSymbol)">Переподключиться</button>
      </div>
      <div class="ticker-row status-row">
        <span class="label">Статус:</span>
        <span class="value" :class="streamStatus">{{ streamStatus }}</span>
      </div>
      <div class="ticker-row">
        <span class="label">Пара:</span>
        <span class="value">{{ lastSymbol?.toUpperCase() || selectedSymbol.toUpperCase() }}</span>
        <span class="label">Цена:</span>
        <span class="value">{{ lastPrice?.toFixed(2) || "—" }}</span>
        <span class="label"> на:</span>
        <span class="value">{{ lastTradeTime || "—" }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.websocket-section {
  background: transparent;

  padding: 10px 10px;
  min-width: 400px;
}

.controls {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.status-row {
  width: 110px;
}

.label {
  color: #6c757d;
}

.ticker-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.value {
  font-weight: 600;
}

.ticker-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  max-width: 460px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.online {
  color: #2f9e44;
}

.connecting {
  color: #f59f00;
}

.error {
  color: #e03131;
}

.offline {
  color: #495057;
}

</style>
