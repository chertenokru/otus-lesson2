import {createRouter, createWebHashHistory} from 'vue-router'
import {routes} from "./routes.ts";
import {useAuthStore} from "@/stores/AuthStore.ts";




const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Проверяем, требует ли маршрут аутентификации
  if (to.meta?.requiresAuth && !authStore.state.isAuthenticated) {
    // Перенаправляем на главную страницу, если пользователь не аутентифицирован
    next('/login');
  } else {
    next();
  }
})

export default router;
