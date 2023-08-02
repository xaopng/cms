## 创建Vue项目的方式

1. 方式一：Vue CLI

    - 基于webpack工具

    -  命令：vue create

2. 方式二：create-vue

    - 基于vite工具，目前Vue官方已经使用这种方式创建项目了

        - 官网：https://cn.vuejs.org/guide/quick-start.html#try-vue-online

        - 最新要求node版本高于16.20

    - 命令：npm init vue@latest

    ```bash
    Vue.js - The Progressive JavaScript Framework

    √ Project name: ... vue3-ts-cms # 配置项目名，也是项目文件夹名
    √ Add TypeScript? ... No / Yes # 添加TS
    √ Add JSX Support? ... No / Yes # 添加JSX，VUE中很少使用，react中用的比较多
    √ Add Vue Router for Single Page Application development? ... No / Yes # 添加vue router
    √ Add Pinia for state management? ... No / Yes # 添加pinia state管理
    √ Add Vitest for Unit Testing? ... No / Yes # 添加单元测试
    √ Add an End-to-End Testing Solution? » No # 添加端对端测试
    √ Add ESLint for code quality? ... No / Yes # 检查代码规范
    ? Add Prettier for code formatting? » No / Yes # ctrl + s自动格式化代码
    Scaffolding project in D:\xxx\vue3-ts-cms...

    Done. Now run:

    cd vue3-ts-cms
    npm install
    npm run format
    npm run dev
    ```


## 项目的配置

- 配置项目的icon
- 配置项目的标题
- 配置项目别名等（vite默认配置）
- 配置tsconfig.json


