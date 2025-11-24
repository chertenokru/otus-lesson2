import {createRouter, createWebHashHistory} from 'vue-router'
import {routes} from "./routes.ts";
import auth from "@/store/auth.ts";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


router.beforeEach((to, from, next) => {

  const isAuth = auth.isAuthenticated();

  // Проверяем, требует ли маршрут аутентификации
  if (to.meta?.requiresAuth && !isAuth) {
    // Перенаправляем на главную страницу, если пользователь не аутентифицирован
    next('/login');
  } else {
    next();
  }
})

export default router;
