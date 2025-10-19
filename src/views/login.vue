<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="handleSubmit">
      <h1>用户登录</h1>
      <p class="hint">使用任意账号信息尝试登录，我们会通过假数据服务返回结果。</p>

      <label class="field">
        <span>用户名</span>
        <input v-model="form.username" type="text" placeholder="请输入用户名" required />
      </label>

      <label class="field">
        <span>密码</span>
        <input v-model="form.password" type="password" placeholder="请输入密码" required />
      </label>

      <button class="submit" type="submit" :disabled="auth.loading">
        {{ auth.loading ? '登录中...' : '登录' }}
      </button>

      <p v-if="auth.error" class="error">{{ auth.error }}</p>
      <p v-if="success" class="success">登录成功，Token：{{ success.token }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const success = ref<{ token: string } | null>(null)

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.username || !form.password) {
    return
  }

  try {
    const data = await auth.login({ ...form })
    success.value = { token: data.token }
    router.push('/')
  } catch (error) {
    success.value = null
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b883, #2c3e50);
  padding: 24px;
  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 32px 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-card h1 {
  margin: 0;
  font-size: 24px;
  text-align: center;
}

.hint {
  margin: 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  font-weight: 600;
}

.field input {
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
}

.submit {
  margin-top: 8px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(66, 184, 131, 0.25);
}

.error {
  color: #d93025;
  font-size: 14px;
  text-align: center;
}

.success {
  color: #42b883;
  font-size: 14px;
  word-break: break-all;
  text-align: center;
}
</style>
