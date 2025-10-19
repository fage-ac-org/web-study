import { http } from '@/utils/http'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    role: string
  }
}

export const loginApi = (payload: LoginRequest) => {
  return http.post<LoginResponse, LoginRequest>('/auth/login', { data: payload })
}
