import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

import LoginForm from '@/pages/LoginForm.vue'
import { useAuthStore } from '@/stores/AuthStore'

describe('LoginForm (auth form)', () => {
  beforeEach(() => {
       setActivePinia(createPinia())
    localStorage.clear()
     pushMock.mockReset()
  })

  test('успешный логин: переходит на "newProduct" и не показывает ошибку', async () => {
    const wrapper = mount(LoginForm)

    // ввод логина/пароля (2 инпута: username, password)
    const inputs = wrapper.findAll('input')
    const usernameInput = inputs[0]!
    const passwordInput = inputs[1]!

    await usernameInput.setValue('admin')
    await passwordInput.setValue('12345')

    await wrapper.find('form').trigger('submit')

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('newProduct')

    // ошибка не должна отображаться
    expect(wrapper.find('.error-message').exists()).toBe(false)

    // и состояние стора должно стать авторизованным
    const store = useAuthStore()
    expect(store.state.isAuthenticated).toBe(true)
    expect(store.state.username).toBe('admin')
  })

  test('неуспешный логин: показывает ошибку и НЕ вызывает router.push', async () => {
    const wrapper = mount(LoginForm)

    const inputs = wrapper.findAll('input')
    await inputs[0]!.setValue('admin')
    await inputs[1]!.setValue('wrong')

    await wrapper.find('form').trigger('submit')

    expect(pushMock).not.toHaveBeenCalled()

    const err = wrapper.find('.error-message')
    expect(err.exists()).toBe(true)
    expect(err.exists()).toBe(true)
    expect(err.text().trim()).not.toBe('')

    const store = useAuthStore()
    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')
  })


  test('авторизованный пользователь: показывает приветствие и logout ведёт на "/"', async () => {
    // заранее авторизуем store (до mount)
    const store = useAuthStore()
    store.login('admin', '12345')

    const logoutSpy = vi.spyOn(store, 'logout')

    const wrapper = mount(LoginForm)

    // должен показываться блок авторизованного пользователя
    expect(wrapper.find('.auth-logged-in').exists()).toBe(true)
    expect(wrapper.find('.username').text()).toContain('Привет, admin')

    // кликаем "Выйти"
    await wrapper.find('button.logout-btn').trigger('click')

    expect(logoutSpy).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('/')

    // состояние сброшено
    expect(store.state.isAuthenticated).toBe(false)
    expect(store.state.username).toBe('')
  })
})
