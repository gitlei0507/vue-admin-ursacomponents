// 根据菜单数据动态生成并注册路由
import { createUrsaMenuRouterToolkit, getUrsaMenuIcon } from 'ursacomponents';

// 扫描 views 下所有页面组件，按路径匹配菜单配置
// 示例：key：组件路径，value：懒加载函数
// {'/src/views/dashboard/index.vue': () => import('/src/views/dashboard/index.vue')}
const viewModules = import.meta.glob(['@/views/**/*.vue', '!@/views/login/index.vue'])

const { buildRoutesFromMenus, initDynamicRoutes } = createUrsaMenuRouterToolkit({
    viewModules,
    viewsDir: '/src/views',
    debug: true
})

export { buildRoutesFromMenus, initDynamicRoutes };

// 根据图标名获取组件，未命中时使用默认图标
export const getMenuIcon = (iconName) => {
    return getUrsaMenuIcon(iconName)
}
