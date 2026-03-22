import { normalizeViewPath } from './path'

// 创建视图组件解析器：根据菜单中的 viewPath 从 viewModules 中取出对应组件。
export const createViewResolver = ({ viewModules = {}, viewsDir = '/src/views', debug = false } = {}) => {
    // 统一 views 根目录格式，保证形如 '/src/views'（去首尾多余斜杠）。
    const normalizedViewsDir = `/${String(viewsDir).replace(/^\/+|\/+$/g, '')}`

    if (debug) {
        // 调试模式下输出当前可匹配的视图模块 key。
        console.log('[ursa-router] 可用组件路径:', Object.keys(viewModules))
    }

    // 返回实际解析函数：输入菜单配置中的 viewPath，输出组件（或 undefined）。
    return (viewPath = '') => {
        // 统一路径格式并补齐 .vue 后缀。
        const normalized = normalizeViewPath(viewPath)
        if (!normalized) {
            return undefined
        }

        // 组合成 import.meta.glob 产出的标准 key。
        const key = `${normalizedViewsDir}/${normalized}`

        if (debug) {
            console.log(`[ursa-router] 尝试加载组件: ${viewPath} -> ${key}`)
        }

        const component = viewModules[key]
        if (!component && debug) {
            // 调试提示：路径能算出，但在模块映射表中未命中。
            console.warn(`[ursa-router] viewModules 中不存在该路径: ${key}`)
        }

        // 返回示例：() => import("/src/views/dashboard/index.vue")
        return component
    }
}
