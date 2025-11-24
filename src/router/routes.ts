import type {RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    components: {
      default: () => import('@/pages/Catalog.vue'),
    },
  },
  {path: `/order`, component: () => import('@/pages/OrderForm.vue'),},
  {path: `/newProduct`, component: () => import('@/components/NewProductForm.vue'),},
  {
    path: `/product/:id`,
    name: 'product',
    components: {default: () => import('@/pages/ProductPage.vue')},
    props: {
      default: (route) => ({
        id: Number(route.params.id),
      })

    }
  },
  {path: `/cart`, component: () => import('@/pages/CartPage.vue')},

]

