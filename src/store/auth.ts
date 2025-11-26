// Глобальное состояние авторизации
const state = {
  isAuthenticated: false,
  username: '',
}

// Фиксированные учетные данные
const FIXED_USERNAME = 'admin';
const FIXED_PASSWORD = '12345';

const STORAGE_KEY = 'auth_state';

// Сохранение состояния в localStorage
const saveState = () => {
  try {
    const data = {
      isAuthenticated: state.isAuthenticated,
      username: state.username
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Не удалось сохранить состояние авторизации', e);
  }
};

// Загрузка состояния из localStorage
const loadState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const data = JSON.parse(savedData);
      state.isAuthenticated = data.isAuthenticated;
      state.username = data.username;
      console.log('Состояние авторизации восстановлено');
    }
  } catch (e) {
    console.warn('Не удалось загрузить состояние авторизации', e);
  }
};

// Загружаем состояние при инициализации
loadState();

const auth = {
  // Проверка аутентификации
  isAuthenticated: () => state.isAuthenticated,

// Имя пользователя
  username: () => state.username,

  // Вход в систему
  login(credentials:
        {
          username: string, password: string
        }
  ) {
    if (credentials.username === FIXED_USERNAME && credentials.password === FIXED_PASSWORD) {
      state.isAuthenticated = true;
      state.username = credentials.username;
      saveState();
      console.log('Успешный вход:', credentials.username);
      return true;
    } else {
      console.log('Неверные учетные данные');
      return false;
    }
  }
  ,

// Выход из системы
  logout() {
    state.isAuthenticated = false;
    state.username = '';
    saveState();
    console.log('Выход из системы');
  }
}


export default auth;
