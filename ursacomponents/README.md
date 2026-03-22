# ursacomponents

Ursa 通用 Vue 3 组件库。

## 安装

```bash
npm i ursacomponents
```

## 使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import UrsaComponents from 'ursacomponents'
import 'ursacomponents/style.css'

const app = createApp(App)
app.use(UrsaComponents)
app.mount('#app')
```

按需引入：

```js
import { UrsaSearch, UrsaTable, useUrsaSearch } from 'ursacomponents'
```

路由工具按需引入：

```js
import {
	createUrsaMenuRouterToolkit,
	getUrsaMenuIcon,
	setupUrsaRouterGuard
} from 'ursacomponents'
```
