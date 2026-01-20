import {ref} from "vue";

const BINANCE_STREAM_URL = "wss://stream.binance.com:9443/ws";

export const useTradeStream = () => {
  const status = ref("offline");
  const lastPrice = ref<number | null>(null);
  const lastTradeTime = ref<string | null>(null);
  const lastSymbol = ref<string | null>(null);
  let socket: WebSocket | null = null;
  let connectionId = 0;

  const disconnect = () => {
    connectionId++; // инвалидируем все старые хендлеры
    if (socket) {
      socket.close();
      socket = null;
    }
    status.value = "offline";
  };

  const connect = (symbol: string) => {
    disconnect();
    lastSymbol.value = symbol;
    status.value = "connecting";
    const localConnectionId = connectionId;
    socket = new WebSocket(`${BINANCE_STREAM_URL}/${symbol}@trade`);

    socket.onopen = () => {
      if (localConnectionId !== connectionId) return;
      status.value = "online";
    };

    socket.onmessage = (event) => {
      if (localConnectionId !== connectionId) return;
      const data = JSON.parse(event.data) as { p?: string; T?: number };
      if (data.p) {
        lastPrice.value = Number(data.p);
      }
      if (data.T) {
        lastTradeTime.value = new Date(data.T).toLocaleTimeString();
      }
    };

    socket.onerror = (error) => {
      if (localConnectionId !== connectionId) return;
      status.value = "error";
      console.error(error);
    };

    socket.onclose = () => {
      if (localConnectionId !== connectionId) return;
      status.value = "offline";
    };
  };

  return {
    status,
    lastPrice,
    lastTradeTime,
    lastSymbol,
    connect,
    disconnect,
  };
};
