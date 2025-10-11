import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: ['src/views'], // 默认扫描的目录
      dts: 'types/typed-router.d.ts', // 自动生成类型声明文件
      extensions: ['.page.vue', '.vue', '.md']
    }),
    vue()
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dxqvjsuybhke.sealosgzg.site']
  }
})
