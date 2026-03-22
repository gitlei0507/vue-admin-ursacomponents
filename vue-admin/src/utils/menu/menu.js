/**
 * 菜单处理工具
 */

import {
    buildMenuTree as buildUrsaMenuTree,
    getFirstMenuPath as getUrsaFirstMenuPath
} from 'ursacomponents'

/**
 * 将扁平菜单列表转换为树形结构
 * @param {Array} menus
 * @returns {Array}
 */
export const buildMenuTree = (menus = []) => {
    // 委托组件库实现，保证多项目菜单构建规则一致。
    return buildUrsaMenuTree(menus)
}

/**
 * 获取第一个可用菜单路径
 * @param {Array} menus
 * @param {{ fallbackPath?: string }} options
 * @returns {string}
 */
export const getFirstMenuPath = (menus = [], options = {}) => {
    // fallbackPath 可由业务侧传入，默认 dashboard。
    const { fallbackPath = '/dashboard' } = options
    // 委托组件库实现，保证多项目菜单规则一致。
    return getUrsaFirstMenuPath(menus, { fallbackPath })
}