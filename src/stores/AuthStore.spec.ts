import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'

const STORAGE_KEY = 'auth_state'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.restoreAllMocks()
  })

  test('по умолчанию: не авторизован, username пустой', () => {
    const store = useAuthStore()

    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')
  })

  test('login: успешный вход устанавливает state и сохраняет в localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const store = useAuthStore()
    const ok = store.login('admin', '12345')

    expect(ok).toBe(true)
    expect(store.state.isAuthenticated).toBe(true)
    expect(store.state.username).toBe('admin')

    expect(setItemSpy).toHaveBeenCalledTimes(1)
    expect(setItemSpy).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify({ isAuthenticated: true, username: 'admin' }),
    )

    expect(localStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify({ isAuthenticated: true, username: 'admin' }),
    )
  })

  test('login: неверные креды возвращает false и НЕ меняет state', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const store = useAuthStore()

    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')

    const ok = store.login('admin', 'wrong')
    expect(ok).toBe(false)

    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')

    expect(setItemSpy).not.toHaveBeenCalled()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  test('logout: сбрасывает state и сохраняет сброс в localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const store = useAuthStore()

    store.login('admin', '12345')
    expect(store.state.isAuthenticated).toBe(true)
    expect(store.state.username).toBe('admin')

    store.logout()

    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')

    expect(setItemSpy).toHaveBeenCalledTimes(2)
    expect(setItemSpy).toHaveBeenLastCalledWith(
      STORAGE_KEY,
      JSON.stringify({ isAuthenticated: false, username: '' }),
    )
  })

  test('восстанавливает состояние из localStorage при инициализации (loadState внутри стора)', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isAuthenticated: true, username: 'admin' }),
    )

    // новый pinia, чтобы создать новый экземпляр стора, который прочитает localStorage
    setActivePinia(createPinia())
    const store = useAuthStore()

    expect(store.state.isAuthenticated).toBe(true)
    expect(store.state.username).toBe('admin')
  })

  test('битый JSON в localStorage: не падает и остаётся в дефолте', () => {
    localStorage.setItem(STORAGE_KEY, '{not-json')

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const store = useAuthStore()

    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')
    expect(warnSpy).toHaveBeenCalled()
  })

  test('localStorage.setItem выбрасывает исключение: login всё равно возвращает true и state меняется', () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Что-то там...')
      })

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const store = useAuthStore()
    const ok = store.login('admin', '12345')

    expect(ok).toBe(true)
    expect(store.state.isAuthenticated).toBe(true)
    expect(store.state.username).toBe('admin')

    expect(setItemSpy).toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalled()
  })
})
