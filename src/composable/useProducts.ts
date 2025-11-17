import {ref} from "vue";
import type {Product} from "@/model/Product.ts";

export const useProducts = () => {

  const url = "https://fakestoreapi.com/products"
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const productList = ref<Product[]>([])
  const errorText = ref<string>("")

  const updateProducts = async () => {
    isError.value = false;
    isLoading.value = true;
    errorText.value = ''
    try {
      await loadProducts()
    } catch (e) {
      errorText.value = `Ошибка загрузки : ${e}`
      console.log(errorText)
      isError.value = true;
    }
    isLoading.value = false
  }

  const loadProducts = async () => {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    productList.value = await result.json()
  }

  return {productList, isLoading, isError, updateProducts, errorText}
}
