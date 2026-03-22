<template>
    <div class="common-layout h-screen w-full overflow-hidden">
        <el-container class="h-full w-full">
            <!-- 菜单区域 -->
            <UrsaMenu :menus="userInfo?.menus" :default-active="$route.path" :title="layoutConfig.menu.title"
                :aside-width="layoutConfig.menu.asideWidth" />

            <el-container direction="vertical" class="h-full min-w-0 flex-1">
                <!-- 顶部区域 -->
                <Nav />

                <!-- 标签区域 -->
                <UrsaTagsView :home-path="layoutConfig.tagsView.homePath"
                    :home-title="layoutConfig.tagsView.homeTitle" />

                <el-main class="bg-gray-50 min-h-0">
                    <!-- 主体区域 -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
    import { layoutConfig } from '@/config/layout';
    import { useUserStore } from '@/stores/user';
    import { storeToRefs } from 'pinia';
    import { UrsaMenu, UrsaTagsView } from 'ursacomponents';
    import Nav from './Nav.vue';

    const { userInfo } = storeToRefs(useUserStore())
</script>

<style scoped></style>
