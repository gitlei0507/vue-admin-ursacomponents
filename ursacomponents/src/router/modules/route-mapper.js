import { normalizeViewPath } from './path';

// 创建菜单到路由的映射器：将单个菜单节点转换为 Vue Router 路由记录。
export const createMenuRouteMapper = ({ resolveComponent, debug = false } = {}) => {
    // 返回实际映射函数，支持传入父级路径用于拼接子路由路径。
    return (menu, parentPath = '') => {
        // 缺少路径或组件时无法生成路由，直接跳过。
        if (!menu?.path || !menu?.component) {
            return null
        }

        // 通过外部解析器把菜单 component 字段映射成真实组件。
        const component = resolveComponent(menu.component)

        if (!component) {
            if (debug) {
                console.warn(`[ursa-router] 未找到组件: ${menu.component}`)
            }
            return null
        }

        // 支持绝对路径与相对路径：相对路径会基于父路径拼接。
        const fullPath = menu.path.startsWith('/')
            ? menu.path
            : `${parentPath}/${menu.path}`.replace(/\/+/g, '/')


        // 动态子路由通常使用相对 path，因此去掉开头 '/'.
        const routePath = fullPath.replace(/^\//, '')
        // 若未提供 name，则优先用路径生成；路径为空时退化为组件路径生成。
        const fallbackName = routePath.replace(/\//g, '_') || normalizeViewPath(menu.component).replace(/[/.]/g, '_')

        const route = {
            path: routePath,
            name: menu.name || fallbackName,
            component,
            meta: {
                // 兼容多种后端菜单字段命名。
                title: menu.meta?.title || menu.menu_name || menu.title || menu.name || routePath,
                icon: menu.meta?.icon || menu.icon || '',
                hidden: Boolean(menu.meta?.hidden || menu.hidden)
            }
        }

        // 递归映射子菜单，并过滤掉无效子路由。
        if (Array.isArray(menu.children) && menu.children.length > 0) {
            route.children = menu.children
                .map((child) => createMenuRouteMapper({ resolveComponent, debug })(child, fullPath))
                .filter(Boolean)
        }

        return route
    }
}
