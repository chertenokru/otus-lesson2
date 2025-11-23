import {ref} from "vue";
import type {Product} from "@/model/Product.ts";
import api from "@/api.ts";

export const useProducts = () => {

  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const productList = ref<Product[]>([])
  const errorText = ref<string>("")

  const updateProducts = async () => {
    isError.value = false;
    isLoading.value = true;
    errorText.value = ''
    try {
      productList.value = (await api.get<Product[]>('products')).data;
    } catch (e) {
      errorText.value = `Ошибка загрузки : ${e}`
      console.log(errorText)
      isError.value = true;
    }
    isLoading.value = false
  }

  return {productList, isLoading, isError, updateProducts, errorText}
}
