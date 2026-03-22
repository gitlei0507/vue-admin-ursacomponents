import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const getUrsaMenuIcon = (iconName, options = {}) => {
    const { iconMap = ElementPlusIconsVue, fallbackIcon = 'Menu' } = options
    return iconMap?.[iconName] || iconMap?.[fallbackIcon] || ElementPlusIconsVue.Menu
}
