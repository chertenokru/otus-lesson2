import {ref} from "vue";
import type {Product} from "@/model/Product.ts";
import api from "@/api.ts";
import type {AxiosResponse} from "axios";

export const useProducts = () => {

  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const productList = ref<Product[]>([])
  const errorText = ref<string>("")
  const categoryList = ref<string[]>([])

  enum Method {
    GET = 1, POST = 2
  }

  const send = async <T>(url: string, method: Method, data?: T) => {
    isError.value = false;
    isLoading.value = true;
    errorText.value = ''
    try {
      const response = method === Method.GET ? (await api.get<T>(url)) : (await api.post<T, AxiosResponse<T>>(url, data));

      if (response.status < 200 || response.status > 300) {
        errorText.value = `Ошибка выполнения запроса к серверу : ${response.statusText}`
        console.log(response.statusText)
        isError.value = true;
        return null
      }
      return response.data
    } catch (e) {
      errorText.value = `Ошибка выполнения запроса к серверу : ${e}`
      console.log(errorText)
      isError.value = true;
      return null
    } finally {
      isLoading.value = false

    }

  }

  const loadProducts = async () => {
    productList.value = await send<Product[]>('/products', Method.GET) ?? []
  }

  const addProduct = async (newProduct:Product) => {
    return await send<Product>('/products', Method.POST, newProduct)

  }

  const loadCategories = async () => {
    categoryList.value = await send<string[]>('products/categories', Method.GET) ?? []
  }


  return {
    productList,
    categoryList,
    isLoading,
    isError,
    loadProducts,
    loadCategories,
    addProduct,
    errorText
  }
}
