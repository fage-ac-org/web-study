import { defineFakeRoute } from 'vite-plugin-fake-server/client'

interface LoginBody {
  username: string
  password: string
}

const USERS = [
  {
    id: '1',
    username: 'admin',
    password: '123456',
    name: '管理员',
    role: 'admin'
  },
  {
    id: '2',
    username: 'user',
    password: '123456',
    name: '普通用户',
    role: 'user'
  }
]

export default defineFakeRoute([
  {
    url: `/auth/login`,
    method: 'POST',
    response: (processed, _req, res) => {
      const body = processed.body as LoginBody
      const matched = USERS.find((user) => user.username === body?.username && user.password === body?.password)

      if (!matched) {
        res.statusCode = 401
        return {
          message: '用户名或密码错误'
        }
      }

      return {
        token: `fake-token-${Date.now()}`,
        user: {
          id: matched.id,
          name: matched.name,
          role: matched.role
        }
      }
    }
  }
])
