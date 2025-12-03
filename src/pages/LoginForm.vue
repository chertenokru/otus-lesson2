<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.ts";

// Состояние формы
const isLoginMode = ref(true);
const authStore = useAuthStore();

const username = ref('')
const password = ref('')

// Ошибки
const error = ref('');
const router = useRouter();

// Переключение между режимами
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  error.value = '';
  username.value = ''
  password.value = ''
};

// Обработка входа/выхода
const handleSubmit = () => {
  error.value = '';

  if (isLoginMode.value) {
    // Попытка входа
    if (authStore.login(username.value, password.value)) {
      error.value = '';
      router.push('newProduct');
    } else {
      error.value = 'Неверное имя пользователя или пароль';
    }
  } else {
    isLoginMode.value = true;
  }
};

// Выход из системы
const handleLogout = () => {
  authStore.logout();
  error.value = '';
  router.push('/');
};
</script>

<template>
  <div style="place-items: center">
    <div class="auth-widget">
      <!-- Авторизованный пользователь -->
      <div v-if="authStore.state.isAuthenticated" class="auth-logged-in">
        <div class="username">Привет, {{ authStore.state.username }}!</div>
        <button class="logout-btn" @click="handleLogout">Выйти</button>
      </div>

      <!-- Неавторизованный пользователь -->
      <div v-else class="auth-form">
        <h3>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h3>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <input
              v-model="username"
              type="text"
              placeholder="Имя пользователя"
              required
            />
          </div>

          <div class="form-group">
            <input
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
            />
          </div>

          <button type="submit" class="submit-btn">
            {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
          </button>

          <p class="toggle-text">
            {{ isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
            <button type="button" @click="toggleMode" class="toggle-btn">
              {{ isLoginMode ? 'Зарегистрироваться' : 'Войти' }}
            </button>
          </p>

          <p class="hint">
            Подсказка: используйте admin / 12345
          </p>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-widget {
  margin: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 300px;
  place-items: center;
}

.auth-logged-in {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.username {
  font-weight: bold;
  color: #333;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c82333;
}

.auth-form h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #00bcd4;
}

.submit-btn {
  background-color: #00bcd4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0097a7;
}

.toggle-text {
  margin: 15px 0 10px;
  font-size: 14px;
  color: #666;
}

.toggle-btn {
  background: none;
  border: none;
  color: #00bcd4;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.toggle-btn:hover {
  color: #0097a7;
}

.error-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  font-size: 14px;
}

.hint {
  margin-top: 15px;
  font-size: 12px;
  color: #6c757d;
  font-style: italic;
}
</style>
