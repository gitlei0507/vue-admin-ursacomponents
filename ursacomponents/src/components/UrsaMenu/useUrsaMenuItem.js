import { computed, unref } from 'vue'
import { getUrsaMenuIcon } from '../../router'

// 统一菜单项的标题、图标、层级判断逻辑。
export const useUrsaMenuItem = (menuRef, options = {}) => {
    const { defaultTitle = '未命名菜单', iconResolver = getUrsaMenuIcon } = options

    const hasChildren = computed(() => {
        const menu = unref(menuRef)
        return Array.isArray(menu?.children) && menu.children.length > 0
    })

    const menuTitle = computed(() => {
        const menu = unref(menuRef)
        return menu?.menu_name || menu?.title || defaultTitle
    })

    const menuIcon = computed(() => {
        const menu = unref(menuRef)
        const iconName = menu?.meta?.icon || menu?.icon
        const resolve = typeof iconResolver === 'function' ? iconResolver : getUrsaMenuIcon
        return resolve(iconName)
    })

    return {
        hasChildren,
        menuTitle,
        menuIcon
    }
}
