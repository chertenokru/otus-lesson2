import {describe, test, expect, beforeEach, vi} from 'vitest'
import type {Product} from '@/model/Product.ts'

vi.mock('@/api.ts', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  }
})

import api from '@/api.ts'
import {useProducts} from "@/composable/useProducts.ts";

type AxiosLikeResponse<T> = {
  status: number
  statusText: string
  data: T
}

const product1: Product = {
  category: '1',
  description: 'desc1',
  id: 1,
  image: 'image1',
  price: 100,
  rating: {rate: 5, count: 1},
  title: 'product1',
}

const product2: Product = {
  category: '2',
  description: 'desc2',
  id: 2,
  image: 'image2',
  price: 200,
  rating: {rate: 3, count: 5},
  title: 'product2',
}

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('loadProducts: успешно загружает productList', async () => {
    const products = [product1, product2]

    ;(api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      {status: 200, statusText: 'OK', data: products} satisfies AxiosLikeResponse<Product[]>,
    )

    const composable = useProducts()

    expect(composable.isLoading.value).toBe(false)
    expect(composable.isError.value).toBe(false)

    const promise = composable.loadProducts()
    expect(composable.isLoading.value).toBe(true)

    await promise

    expect(api.get).toHaveBeenCalledTimes(1)
    expect(api.get).toHaveBeenCalledWith('/products')

    expect(composable.isLoading.value).toBe(false)
    expect(composable.isError.value).toBe(false)
    expect(composable.errorText.value).toBe('')
    expect(composable.productList.value).toEqual(products)
  })

  test('loadCategories: успешно загружает categoryList', async () => {
    const categories = ['electronics', 'jewelery']

    ;(api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      {status: 200, statusText: 'OK', data: categories} satisfies AxiosLikeResponse<string[]>,
    )

    const composable = useProducts()
    await composable.loadCategories()

    expect(api.get).toHaveBeenCalledWith('products/categories')
    expect(composable.categoryList.value).toEqual(categories)
    expect(composable.isError.value).toBe(false)
    expect(composable.errorText.value).toBe('')
  })

  test('getProductById: загружает товар', async () => {
    ;(api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      {status: 200, statusText: 'OK', data: product1} satisfies AxiosLikeResponse<Product>,
    )

    const composable = useProducts()
    const result = await composable.getProductById(1)

    expect(api.get).toHaveBeenCalledWith('/products/1')
    expect(result).toEqual(product1)
    expect(composable.isError.value).toBe(false)
    expect(composable.errorText.value).toBe('')
  })

  test('addProduct: делает POST и возвращает созданный продукт', async () => {
    ;(api.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      {status: 200, statusText: 'OK', data: product2} satisfies AxiosLikeResponse<Product>,
    )

    const composable = useProducts()
    const created = await composable.addProduct(product2)

    expect(api.post).toHaveBeenCalledTimes(1)
    expect(api.post).toHaveBeenCalledWith('/products', product2)

    expect(created).toEqual(product2)
    expect(composable.isError.value).toBe(false)
    expect(composable.errorText.value).toBe('')
  })

  test('Ошибка загрузки: выставляет isError=true, errorText и возвращает []', async () => {
    ;(api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      {status: 500, statusText: 'Server Error', data: []} satisfies AxiosLikeResponse<Product[]>,
    )

    const composable = useProducts()

    await composable.loadProducts()

    expect(composable.isLoading.value).toBe(false)
    expect(composable.isError.value).toBe(true)
    expect(composable.errorText.value).toContain('Ошибка выполнения запроса к серверу')
    expect(composable.productList.value).toEqual([])
  })

  test('исключение в api.get: выставляет isError=true и возвращает []', async () => {
    ;(api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network down'))

    const composable = useProducts()

    await composable.loadProducts()

    expect(composable.isLoading.value).toBe(false)
    expect(composable.isError.value).toBe(true)
    expect(composable.errorText.value).toContain('Ошибка выполнения запроса к серверу')
    expect(composable.productList.value).toEqual([])
  })
})
