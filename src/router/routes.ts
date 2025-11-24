import type {RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: `/`,
    components: {
      default: () => import('@/pages/Catalog.vue'),
    },
  },
  {path: `/order`, component: () => import('@/components/OrderForm.vue'),},
  {path: `/newProduct`, component: () => import('@/components/NewProductForm.vue'),},
  {
    path: `/product/:id`,
    name: 'product',
    components: {default: () => import('@/pages/ProductPage.vue')},
    props: {
      default: (route) => ({
        id: route.params.id,
      })

    }
  },

]

