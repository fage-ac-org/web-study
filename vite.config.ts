import { defineConfig } from 'vite'
import vueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueRouter({
      routesFolder: ['src/views'], // 默认扫描的目录
      dts: 'types/typed-router.d.ts', // 自动生成类型声明文件
      extensions: ['.page.vue', '.vue', '.md']
    }),
    vue(),
    vitePluginFakeServer()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dxqvjsuybhke.sealosgzg.site']
  }
})
