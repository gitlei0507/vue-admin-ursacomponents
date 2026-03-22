<template>
    <el-card class="table-card" shadow="never">
        <div v-if="$slots.toolbar" class="toolbar">
            <slot name="toolbar" />
        </div>

        <div class="table-wrapper">
            <el-table :data="data" v-loading="loading" stripe border style="width: 100%" height="100%"
                :default-sort="defaultSort" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
                <el-table-column v-if="showIndex" type="index" :label="indexLabel" :width="indexWidth" align="center"
                    :index="calcIndex" />
                <el-table-column v-if="showSelection" type="selection" :width="selectionWidth" align="center" />

                <slot />
            </el-table>
        </div>

        <div class="pagination-container">
            <div class="pagination-wrapper">
                <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizes" background
                    layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @current-change="handleCurrentChange" @size-change="handleSizeChange" />
            </div>
        </div>
    </el-card>
</template>

<script setup>
    defineOptions({
        name: 'UrsaTable'
    })

    const props = defineProps({
        data: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
        pageSizes: {
            type: Array,
            default: () => [5, 10, 20, 50]
        },
        defaultSort: {
            type: Object,
            default: () => ({})
        },
        showIndex: {
            type: Boolean,
            default: true
        },
        indexLabel: {
            type: String,
            default: '序号'
        },
        indexWidth: {
            type: Number,
            default: 70
        },
        showSelection: {
            type: Boolean,
            default: false
        },
        selectionWidth: {
            type: Number,
            default: 55
        }
    })

    const emit = defineEmits(['sort-change', 'current-change', 'size-change', 'selection-change'])

    const calcIndex = (index) => (props.currentPage - 1) * props.pageSize + index + 1

    const handleSortChange = (payload) => emit('sort-change', payload)
    const handleCurrentChange = (page) => emit('current-change', page)
    const handleSizeChange = (size) => emit('size-change', size)
    const handleSelectionChange = (rows) => emit('selection-change', rows)
</script>

<style scoped>
    .table-card {
        border-radius: 8px;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .table-card :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        padding: 20px;
    }

    .toolbar {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .table-wrapper {
        flex: 1;
        overflow: hidden;
        min-height: 0;
    }

    .pagination-container {
        margin-top: 20px;
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
        border-top: 1px solid #f0f0f0;
    }

    .pagination-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    :deep(.el-table) {
        font-size: 14px;
    }

    :deep(.el-table th.el-table__cell) {
        background-color: #fafafa;
        color: #333;
        font-weight: 600;
    }

    :deep(.el-button + .el-button) {
        margin-left: 8px;
    }
</style>
