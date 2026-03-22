import { computed, unref } from 'vue'

// 统一处理菜单可见性过滤，组件侧只关心渲染。
export const useUrsaMenu = (menusRef, filterHiddenRef = true) => {
    const visibleMenus = computed(() => {
        const menus = unref(menusRef)
        const filterHidden = unref(filterHiddenRef)

        if (!Array.isArray(menus)) {
            return []
        }

        if (!filterHidden) {
            return menus
        }

        return menus.filter((menu) => !menu?.hidden)
    })

    return {
        visibleMenus
    }
}
