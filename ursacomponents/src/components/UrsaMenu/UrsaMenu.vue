<template>
    <el-aside :width="asideWidth" class="ursa-menu-aside">
        <div class="ursa-menu-title">
            {{ title }}
        </div>

        <el-menu :router="router" :default-active="defaultActive" active-text-color="#ffd04b" background-color="#1f2937"
            class="el-menu-vertical-demo ursa-menu-panel" text-color="#fff">
            <UrsaMenuItem v-for="menu in visibleMenus" :key="menu.path" :menu="menu" :default-title="defaultTitle"
                :icon-resolver="iconResolver" />
        </el-menu>
    </el-aside>
</template>

<script setup>
    import { toRef } from 'vue'
    import UrsaMenuItem from './UrsaMenuItem.vue'
    import { useUrsaMenu } from './useUrsaMenu'

    const props = defineProps({
        menus: {
            type: Array,
            default: () => []
        },
        defaultActive: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '管理系统后台'
        },
        asideWidth: {
            type: String,
            default: '200px'
        },
        router: {
            type: Boolean,
            default: true
        },
        filterHidden: {
            type: Boolean,
            default: true
        },
        defaultTitle: {
            type: String,
            default: '未命名菜单'
        },
        iconResolver: {
            type: Function,
            default: undefined
        }
    })

    const { visibleMenus } = useUrsaMenu(toRef(props, 'menus'), toRef(props, 'filterHidden'))
</script>

<style scoped>
    .ursa-menu-aside {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #1f2937;
        color: #ffffff;
        overflow: hidden;
    }

    .ursa-menu-title {
        padding: 1rem;
        text-align: center;
        font-weight: 700;
        border-bottom: 1px solid #374151;
        flex-shrink: 0;
    }

    .ursa-menu-panel {
        border-right: none;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
    }
</style>
