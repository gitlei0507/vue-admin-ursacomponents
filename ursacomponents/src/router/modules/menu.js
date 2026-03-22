// 将树形菜单拍平为一维数组，便于统一做路由映射等处理。
export const flattenMenus = (menus = []) => {
    if (!Array.isArray(menus)) {
        return []
    }

    const result = []

    const walk = (items) => {
        items.forEach((item) => {
            if (!item || typeof item !== 'object') {
                return
            }

            // 拍平时移除 children，仅保留当前节点自身字段。
            const { children, ...rest } = item
            result.push(rest)

            if (Array.isArray(children) && children.length > 0) {
                walk(children)
            }
        })
    }

    walk(menus)
    return result
}

// 将拍平菜单（或半树形菜单）重建为标准树结构。
export const buildMenuTree = (menus = []) => {
    if (!Array.isArray(menus) || menus.length === 0) {
        return []
    }

    const flatMenus = []
    const collectMenus = (items) => {
        items.forEach((menu) => {
            if (!menu || typeof menu !== 'object') {
                return
            }

            flatMenus.push(menu)

            if (Array.isArray(menu.children) && menu.children.length > 0) {
                collectMenus(menu.children)
            }
        })
    }

    collectMenus(menus)

    const menuMap = new Map()
    flatMenus.forEach((menu) => {
        if (!menu || typeof menu !== 'object') {
            return
        }

        menuMap.set(menu.id, { ...menu, children: [] })
    })

    const roots = []
    menuMap.forEach((menu) => {
        // parent_id > 0 且父节点存在时挂到父节点下，否则作为根节点。
        const parentId = Number(menu.parent_id)
        const parent = menuMap.get(parentId)

        if (parentId > 0 && parent) {
            parent.children.push(menu)
            return
        }

        roots.push(menu)
    })

    const sortMenus = (items) => {
        // 按 sort_no 升序排序，保证菜单展示顺序稳定。
        items.sort((a, b) => (a.sort_no ?? 0) - (b.sort_no ?? 0))
        items.forEach((item) => {
            if (Array.isArray(item.children) && item.children.length > 0) {
                sortMenus(item.children)
            }
        })
    }

    sortMenus(roots)
    return roots
}

// 获取首个可用菜单 path；若不存在则返回兜底路径。
export const getFirstMenuPath = (menus = [], options = {}) => {
    const { fallbackPath = '/dashboard' } = options
    const first = flattenMenus(menus).find((menu) => typeof menu.path === 'string' && menu.path)
    return first?.path || fallbackPath
}
