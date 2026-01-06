import {defineStore} from "pinia";
import {ref} from "vue";

export type AuthType = {
  isAuthenticated: boolean,
  username: string,
}


export const useAuthStore = defineStore('Auth', () => {

  // Фиксированные учетные данные
  const FIXED_USERNAME = 'admin';
  const FIXED_PASSWORD = '12345';

  const STORAGE_KEY = 'auth_state';


  const state = ref<AuthType>({isAuthenticated: false, username: ''})

  const saveState = () => {
    try {
      const data = {
        isAuthenticated: state.value.isAuthenticated,
        username: state.value.username
      };
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Не удалось сохранить состояние авторизации', e);
    }
  };


  const loadState = () => {
    try {
      const savedData = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        state.value.isAuthenticated = data.isAuthenticated;
        state.value.username = data.username;
        console.log('Состояние авторизации восстановлено');
      }
    } catch (e) {
      console.warn('Не удалось загрузить состояние авторизации', e);
    }
  };

  const login = (username: string, password: string) => {
    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
      state.value.isAuthenticated = true;
      state.value.username = username;
      saveState();
      console.log('Успешный вход:', username);
      return true;
    } else {
      console.log('Неверные учетные данные');
      return false;
    }
  }


  const logout = () => {
    state.value.isAuthenticated = false;
    state.value.username = '';
    saveState();
    console.log('Выход из системы');
  }


// Загружаем состояние при инициализации
  loadState();


  return {state, login, logout}
})
