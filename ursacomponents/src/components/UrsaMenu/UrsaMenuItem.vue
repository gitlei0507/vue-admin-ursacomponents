<template>
    <el-sub-menu v-if="hasChildren" :index="menu.path">
        <template #title>
            <el-icon>
                <component :is="menuIcon" />
            </el-icon>
            <span>{{ menuTitle }}</span>
        </template>

        <UrsaMenuItem v-for="child in menu.children" :key="child.path" :menu="child" :default-title="defaultTitle"
            :icon-resolver="iconResolver" />
    </el-sub-menu>

    <el-menu-item v-else :index="menu.path">
        <el-icon>
            <component :is="menuIcon" />
        </el-icon>
        <span>{{ menuTitle }}</span>
    </el-menu-item>
</template>

<script setup>
    import { toRef } from 'vue'
    import { useUrsaMenuItem } from './useUrsaMenuItem'

    defineOptions({
        name: 'UrsaMenuItem'
    })

    const props = defineProps({
        menu: {
            type: Object,
            required: true
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

    const { hasChildren, menuTitle, menuIcon } = useUrsaMenuItem(toRef(props, 'menu'), {
        defaultTitle: props.defaultTitle,
        iconResolver: props.iconResolver
    })
</script>
