// 统一菜单配置中的视图路径格式，便于和视图模块 key 精确匹配。
export const normalizeViewPath = (viewPath = '') => {
    // 兼容非字符串输入，并去掉开头多余的斜杠（如 '/system/user' -> 'system/user'）。
    const trimmed = String(viewPath).replace(/^\/+/, '')
    if (!trimmed) {
        // 空路径直接返回空字符串，避免后续拼接出 '.vue' 这样的无效结果。
        return ''
    }
    // 若未显式携带 .vue 后缀，则自动补齐。
    return trimmed.endsWith('.vue') ? trimmed : `${trimmed}.vue`
}
