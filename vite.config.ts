import { defineConfig } from 'vite'
import vueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  envDir: 'env',
  plugins: [
    vueRouter({
      routesFolder: ['src/views'], // 默认扫描的目录
      dts: 'types/typed-router.d.ts', // 自动生成类型声明文件
      extensions: ['.page.vue', '.vue', '.md']
    }),
    vue(),
    vitePluginFakeServer({
      include: 'mock', // 设置目标文件夹，将会引用该文件夹里包含xxx.fake.{ts,js,mjs,cjs,cts,mts}的文件
      basename: 'api'
    }),
    // 自动导入 Element Plus 相关 API，同时生成类型和 ESLint 声明配置
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts'
    }),
    // 自动注册组件，但关闭样式自动导入，避免与自定义主题重复引用
    Components({
      resolvers: [ElementPlusResolver({ importStyle: false })],
      dts: 'types/components.d.ts'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 配置全局变量导入 - 重点修改这里
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dxqvjsuybhke.sealosgzg.site']
  }
})
