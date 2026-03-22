// 路由守卫：负责登录校验、按需加载动态路由、无权限时跳转兜底页。
export { setupUrsaRouterGuard } from './modules/guard'

// 图标解析：根据菜单 icon 名称返回对应图标组件，支持兜底图标。
export { getUrsaMenuIcon } from './modules/icon'

// 菜单工具：提供菜单拍平和首个可访问菜单路径获取能力。
export { buildMenuTree, flattenMenus, getFirstMenuPath } from './modules/menu'

// 路径标准化：统一菜单组件路径格式，保证与 viewModules 的 key 匹配。
export { normalizeViewPath } from './modules/path'

// 菜单转路由：将单个菜单节点映射为 Vue Router 路由对象。
export { createMenuRouteMapper } from './modules/route-mapper'

// 路由工具箱：整合菜单转路由、动态注入等能力，供业务快速接入。
export { createUrsaMenuRouterToolkit } from './modules/toolkit'

// 视图解析器：把字符串形式的组件路径解析为可加载的页面组件模块。
export { createViewResolver } from './modules/view-resolver'

