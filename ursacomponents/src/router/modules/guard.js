// 默认从用户信息中读取菜单列表。
const defaultGetMenus = (store) => store?.userInfo?.menus || []
// 默认从 store 中读取“是否已加载过动态路由”标记。
const defaultHasLoadedRoutes = (store) => Boolean(store?.hasLoadedAsyncRoutes)
// 默认写入“已加载动态路由”标记。
const defaultSetLoadedRoutes = (store, loaded) => {
    if (typeof store?.setHasLoadedAsyncRoutes === 'function') {
        store.setHasLoadedAsyncRoutes(loaded)
    }
}

// 注册 Ursa 路由前置守卫：处理登录校验、动态路由注入与缺失菜单兜底。
export const setupUrsaRouterGuard = (router, options = {}) => {
    const {
        getToken = () => null,
        loginPath = '/login',
        getUserStore = () => null,
        getMenus = defaultGetMenus,
        hasLoadedRoutes = defaultHasLoadedRoutes,
        setLoadedRoutes = defaultSetLoadedRoutes,
        initDynamicRoutes,
        initDynamicRoutesOptions = {},
        shouldLoadRoutes,
        onMissingMenus,
        debug = false
    } = options


    // 基础参数校验：必须传入可用 router 实例。
    if (!router || typeof router.beforeEach !== 'function') {
        throw new Error('[ursa-router] setupUrsaRouterGuard 需要有效的 router 实例')
    }

    // 必须提供动态路由初始化方法。
    if (typeof initDynamicRoutes !== 'function') {
        throw new Error('[ursa-router] setupUrsaRouterGuard 需要 initDynamicRoutes 方法')
    }

    return router.beforeEach((to, from, next) => {
        if (debug) {
            console.log('[ursa-router] 导航到:', to.path, '路由名称:', to.name)
        }

        // 登录页放行，避免登录页被二次拦截。
        if (to.path === loginPath) {
            next()
            return
        }

        // 无 token 则跳转登录。
        const token = typeof getToken === 'function' ? getToken() : null
        if (!token) {
            next(loginPath)
            return
        }

        const userStore = typeof getUserStore === 'function' ? getUserStore() : null

        // 判断是否需要加载动态路由：可由外部自定义，也可走默认判定。
        const needLoadRoutes = typeof shouldLoadRoutes === 'function'
            ? shouldLoadRoutes({ to, from, router, userStore })
            : !hasLoadedRoutes(userStore) || to.matched.length === 0 || (to.name ? !router.hasRoute(to.name) : false)

        if (debug) {
            console.log('[ursa-router] needLoadRoutes:', needLoadRoutes)
        }

        if (!needLoadRoutes) {
            next()
            return
        }

        // 读取菜单并初始化动态路由。
        const menus = typeof getMenus === 'function' ? getMenus(userStore, to, from) : []
        if (Array.isArray(menus) && menus.length > 0) {
            initDynamicRoutes(router, menus, initDynamicRoutesOptions)
            if (typeof setLoadedRoutes === 'function') {
                setLoadedRoutes(userStore, true)
            }
            // replace 避免重复历史记录，并让新注入路由立即生效。
            next({ ...to, replace: true })
            return
        }

        if (debug) {
            console.warn('[ursa-router] 没有菜单数据，跳转登录页')
        }

        // 菜单缺失时允许外部提供兜底跳转策略。
        if (typeof onMissingMenus === 'function') {
            const fallback = onMissingMenus({ to, from, router, userStore })
            if (fallback) {
                next(fallback)
                return
            }
        }

        next(loginPath)
    })
}
