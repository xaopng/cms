import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver()
        // 自动导入图标组件
        // IconsResolver({
        //   prefix: 'Icon'
        // })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    // 自动引入样式插件
    createStyleImportPlugin({
      resolves: [
        // 自动引入ElmentPlus组件的样式
        ElementPlusResolve()
      ],
      libs: [
        // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    }),

    Components({
      resolvers: [
        // 自动注册图标组件
        // IconsResolver({
        //   enabledCollections: ['ep']
        // }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    })
    // Icons({
    //   autoInstall: true
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
