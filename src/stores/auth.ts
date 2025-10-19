import { defineStore } from 'pinia'
import type { LoginRequest, LoginResponse } from '@/api/auth'
import { loginApi } from '@/api/auth'

interface AuthState {
  token: string | null
  user: LoginResponse['user'] | null
  loading: boolean
  error: string | null
}

const STORAGE_KEY = 'auth_token'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem(STORAGE_KEY),
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async login(payload: LoginRequest) {
      this.loading = true
      this.error = null
      try {
        const data = await loginApi(payload)
        this.token = data.token
        this.user = data.user
        localStorage.setItem(STORAGE_KEY, data.token)
        return data
      } catch (error) {
        const message = error instanceof Error ? error.message : '登录失败'
        this.error = message
        throw error
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})
