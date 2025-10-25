<template>
  <div class="login-page">
    <el-card class="login-card" shadow="hover">
      <header class="login-card__header">
        <h1>用户登录</h1>
        <p>使用任意账号即可体验，我们会通过假数据服务返回结果。</p>
      </header>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="large"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            autocomplete="username"
            :disabled="auth.loading"
            clearable
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password"
            :disabled="auth.loading"
            show-password
          />
        </el-form-item>

        <el-button class="login-submit" type="primary" native-type="submit" :loading="auth.loading" block>
          登录
        </el-button>
      </el-form>

      <el-alert
        v-if="auth.error"
        type="error"
        :closable="false"
        show-icon
        class="login-feedback"
        title="登录失败"
        :description="auth.error"
      />

      <el-alert v-if="success" type="success" :closable="false" show-icon class="login-feedback" title="登录成功">
        <template #default>
          <span>Token：{{ success.token }}</span>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const formRef = ref<FormInstance>()
const success = ref<{ token: string } | null>(null)

interface LoginForm {
  username: string
  password: string
}

const form = reactive<LoginForm>({
  username: '',
  password: ''
})

const rules: FormRules<LoginForm> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名至少包含3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少包含6个字符', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) {
    return
  }

  try {
    await formRef.value.validate()
  } catch {
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

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  padding: clamp(24px, 6vw, 64px);
  background: linear-gradient(135deg, #42b883 0%, #2c3e50 100%);
  display: grid;
  place-items: center;
}

.login-card {
  @include responsive-card(300px, 440px);
  border-radius: 20px;
  box-shadow: 0 24px 64px rgba(17, 27, 45, 0.18);
  backdrop-filter: blur(6px);

  :deep(.el-card__body) {
    padding: clamp(24px, 5vw, 48px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.login-card__header {
  text-align: center;

  h1 {
    margin: 0 0 8px;
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: clamp(14px, 3.2vw, 16px);
    color: #5c6c7c;
  }
}

.login-submit {
  margin-top: 12px;
}

.login-feedback {
  word-break: break-all;
}

@media (max-width: 640px) {
  .login-card {
    border-radius: 16px;

    :deep(.el-card__body) {
      gap: 16px;
    }
  }
}
</style>
