import {ref} from "vue";

const BINANCE_STREAM_URL = "wss://stream.binance.com:9443/ws";

export const useTradeStream = () => {
  const status = ref("offline");
  const lastPrice = ref<number | null>(null);
  const lastTradeTime = ref<string | null>(null);
  const lastSymbol = ref<string | null>(null);
  let socket: WebSocket | null = null;

  const disconnect = () => {
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

    socket = new WebSocket(`${BINANCE_STREAM_URL}/${symbol}@trade`);

    socket.onopen = () => {
      status.value = "online";
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as { p?: string; T?: number };
      if (data.p) {
        lastPrice.value = Number(data.p);
      }
      if (data.T) {
        lastTradeTime.value = new Date(data.T).toLocaleTimeString();
      }
    };

    socket.onerror = () => {
      status.value = "error";
    };

    socket.onclose = () => {
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
