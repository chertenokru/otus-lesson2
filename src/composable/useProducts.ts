import {ref} from "vue";
import type {Product} from "@/model/Product.ts";
import api from "@/api.ts";

export const useProducts = () => {

  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const productList = ref<Product[]>([])
  const errorText = ref<string>("")
  const categoryList = ref<string[]>([])


  const get = async <T>(url: string) => {
    isError.value = false;
    isLoading.value = true;
    errorText.value = ''
    try {
      return (await api.get<T>(url)).data;
    } catch (e) {
      errorText.value = `Ошибка загрузки : ${e}`
      console.log(errorText)
      isError.value = true;
      return null
    } finally {
      isLoading.value = false

    }

  }

  const loadProducts = async () => {
    productList.value = await get<Product[]>('/products') ?? []
  }

  const loadCategories = async () => {
    categoryList.value = await get<string[]>('products/categories') ?? []
  }


  return {productList, categoryList, isLoading, isError, loadProducts, loadCategories, errorText}
}
