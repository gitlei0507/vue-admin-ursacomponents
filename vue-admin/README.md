# vue-admin

基于 Vue 3 + Vite + Element Plus 的管理后台项目。

## 当前新增内容

仓库中已新增 `ursacomponents/` 目录，作为可独立拆分的通用组件库骨架，当前包含：

- `UrsaSearch`
- `UrsaTable`
- 基础安装入口 `install.js`
- 组件库构建配置 `vite.config.js`
- 独立开发调试入口 `src/main.js`

后续若需要单独维护组件库，可直接将 `ursacomponents/` 目录复制到一个新的 Git 仓库中使用。

## 项目启动

```sh
npm install
npm run dev
```

## 组件库骨架启动

```sh
cd ursacomponents
npm install
npm run dev
```

## 组件库构建

```sh
cd ursacomponents
npm run build
```
