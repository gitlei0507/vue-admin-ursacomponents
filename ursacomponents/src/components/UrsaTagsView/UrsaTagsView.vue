<template>
    <div class="ursa-tags-view">
        <el-tabs v-model="activeTab" type="card" class="ursa-tags-tabs" @tab-click="handleTabClick"
            @tab-remove="handleTabRemove">
            <el-tab-pane v-for="tab in tabs" :key="tab.path" :label="tab.title" :name="tab.path"
                :closable="tab.closable" />
        </el-tabs>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    defineOptions({
        name: 'UrsaTagsView'
    })

    const props = defineProps({
        homePath: {
            type: String,
            default: '/dashboard'
        },
        homeTitle: {
            type: String,
            default: '首页'
        }
    })

    const route = useRoute()
    const router = useRouter()

    const tabs = ref([])

    const activeTab = computed({
        get: () => route.path,
        set: (val) => val
    })

    const createTab = (currentRoute) => ({
        path: currentRoute.path,
        title: currentRoute.meta?.title || currentRoute.name || currentRoute.path,
        closable: currentRoute.path !== props.homePath
    })

    const ensureHomeTab = () => {
        const existed = tabs.value.some((tab) => tab.path === props.homePath)
        if (existed) {
            return
        }

        const homeRoute = router.resolve(props.homePath)
        tabs.value.unshift(
            createTab({
                path: props.homePath,
                meta: { title: homeRoute.meta?.title || props.homeTitle },
                name: homeRoute.name || props.homeTitle
            })
        )
    }

    const addTabIfNotExists = (currentRoute) => {
        if (!currentRoute?.path || currentRoute.path === '/') {
            return
        }

        const existed = tabs.value.some((tab) => tab.path === currentRoute.path)
        if (!existed) {
            tabs.value.push(createTab(currentRoute))
        }
    }

    const handleTabClick = (tabPane) => {
        const targetPath = tabPane?.props?.name
        if (targetPath && targetPath !== route.path) {
            router.push(targetPath)
        }
    }

    const handleTabRemove = (targetPath) => {
        const currentIndex = tabs.value.findIndex((tab) => tab.path === targetPath)
        if (currentIndex === -1) {
            return
        }

        tabs.value.splice(currentIndex, 1)

        if (route.path !== targetPath) {
            return
        }

        const nextTab = tabs.value[currentIndex] || tabs.value[currentIndex - 1]
        const fallbackPath = nextTab?.path || props.homePath
        router.push(fallbackPath)
    }

    watch(
        () => route.path,
        () => {
            ensureHomeTab()
            addTabIfNotExists(route)
        },
        { immediate: true }
    )
</script>

<style scoped>
    .ursa-tags-view {
        border-bottom: 1px solid var(--el-border-color-light);
        background-color: #ffffff;
        padding: 0 16px;
    }

    :deep(.ursa-tags-tabs .el-tabs__header) {
        margin-bottom: 0;
    }

    :deep(.ursa-tags-tabs .el-tabs__nav-wrap::after) {
        height: 0;
    }
</style>