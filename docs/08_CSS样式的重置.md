1. normalize.css

```bash
npm install normalize.css
```

在[main.ts](../src/main.ts)中引入

```ts
import 'normalize.css'
```

2. reset.less

将重置样式放在[reset.less](../src/assets/css/reset.less)文件中

然后在[index.css](../src/assets/css/index.css)中引入[reset.less](../src/assets/css/reset.less)

最后在[main.ts](../src/main.ts)中引入[index.css](../src/assets/css/index.css)

less生效需要安装库

```bash
npm install less -D
```
