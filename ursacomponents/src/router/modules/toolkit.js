import { flattenMenus } from './menu'
import { normalizeViewPath } from './path'
import { createMenuRouteMapper } from './route-mapper'
import { createViewResolver } from './view-resolver'

// 创建菜单路由工具集：负责菜单拍平、组件解析、路由映射与动态注册。
export const createUrsaMenuRouterToolkit = (options = {}) => {
    // 支持外部注入实现，未传入时使用默认能力。
    const {
        viewModules = {},
        flattenMenus: customFlattenMenus = flattenMenus,    // 无自定义拍平函数，使用默认
        viewsDir = '/src/views',
        debug = false
    } = options

    // 视图路径 -> 组件解析器。
    const resolveComponent = createViewResolver({ viewModules, viewsDir, debug })
    // 菜单项 -> 路由记录映射器。
    const mapMenuToRoute = createMenuRouteMapper({ resolveComponent, debug })

    // 根据菜单构建可用于 Vue Router 的路由数组。
    const buildRoutesFromMenus = (menus = []) => {
        // 优先使用外部传入的拍平函数，便于兼容不同菜单结构。
        const sourceMenus = typeof customFlattenMenus === 'function' ? customFlattenMenus(menus) : menus
        if (!Array.isArray(sourceMenus)) {
            // 非数组结果视为无效输入，返回空数组保证调用方安全。
            return []
        }
        // 映射后过滤掉无效路由（如缺少必要字段导致返回 null）。
        return sourceMenus.map((menu) => mapMenuToRoute(menu)).filter(Boolean)
    }

    // 初始化动态路由：将菜单路由批量挂载到指定父路由下。
    const initDynamicRoutes = (router, menus = [], initOptions = {}) => {
        const { parentRouteName = 'layout' } = initOptions

        // 仅在传入合法 router 实例时继续执行。
        if (!router || typeof router.addRoute !== 'function' || typeof router.hasRoute !== 'function') {
            return []
        }

        const routes = buildRoutesFromMenus(menus)
        console.log('##', routes);

        if (debug) {
            console.log('routes', routes)
        }

        routes.forEach((route) => {
            // 无名称路由无法用于去重判断，直接跳过。
            if (!route?.name) {
                return
            }

            // 避免重复注册同名动态路由。
            if (!router.hasRoute(route.name)) {
                router.addRoute(parentRouteName, route)
            }
        })

        return routes
    }

    // 统一暴露工具能力，供业务按需使用。
    return {
        normalizeViewPath,
        resolveComponent,
        mapMenuToRoute,
        buildRoutesFromMenus,
        initDynamicRoutes
    }
}
