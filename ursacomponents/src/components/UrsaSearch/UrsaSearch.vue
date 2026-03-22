<template>
    <el-card class="search-card" shadow="never">
        <el-form :inline="inline" class="search-form">
            <template v-if="fields.length > 0">
                <el-form-item v-for="field in fields" :key="field.prop || field.label" :label="field.label">
                    <el-input v-if="field.type === 'input'" :model-value="getFieldValue(field.prop)"
                        @update:model-value="(value) => setFieldValue(field.prop, value)"
                        :placeholder="field.placeholder || `请输入${field.label || ''}`"
                        :clearable="field.clearable ?? true" :class="field.class ?? '!w-48'"
                        v-bind="field.componentProps" />
                    <el-select v-else-if="field.type === 'select'" :model-value="getFieldValue(field.prop)"
                        @update:model-value="(value) => setFieldValue(field.prop, value)"
                        :placeholder="field.placeholder || `请选择${field.label || ''}`"
                        :clearable="field.clearable ?? true" :class="field.class" v-bind="field.componentProps">
                        <el-option v-for="option in field.options || []" :key="option.value" :label="option.label"
                            :value="option.value" />
                    </el-select>
                    <slot v-else name="field" :field="field" :value="getFieldValue(field.prop)"
                        :set-value="(value) => setFieldValue(field.prop, value)" />
                </el-form-item>
            </template>
            <slot v-else />
            <el-form-item>
                <el-button type="primary" @click="emit('search')" :icon="Search">查询</el-button>
                <el-button @click="handleReset" :icon="Refresh">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
    import { Refresh, Search } from '@element-plus/icons-vue'
    import { useUrsaSearch } from './useUrsaSearch'

    defineOptions({
        name: 'UrsaSearch'
    })

    const props = defineProps({
        model: {
            type: Object,
            default: () => ({})
        },
        fields: {
            type: Array,
            default: () => []
        },
        inline: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['search', 'reset'])

    const { resetSearch } = useUrsaSearch(
        props.model,
        () => emit('search'),
        () => emit('reset')
    )

    const handleReset = () => {
        resetSearch()
    }

    const getFieldValue = (prop) => {
        if (!prop || !props.model) {
            return ''
        }
        return props.model[prop]
    }

    const setFieldValue = (prop, value) => {
        if (!prop || !props.model) {
            return
        }
        props.model[prop] = value
    }
</script>

<style scoped>
    .search-card {
        margin-bottom: 16px;
        border-radius: 8px;
        flex-shrink: 0;
    }

    .search-form {
        margin-bottom: 0;
    }
</style>
