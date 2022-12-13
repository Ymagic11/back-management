<template>
    <div class="common-layout">
        <el-container style="height:100%">
            <elAside></elAside>
            <el-container class="is-vertical">
                <el-scrollbar>
                    <elHeader>
                        <template #default>{{ store.fullname }}</template>
                        <template #three>{{ store.basename }}</template>
                    </elHeader>
                    <el-main>
                        <router-view #default="{ Component }">
                            <KeepAlive include="dataMan,busMan,foodMan">
                                <component :is="Component" />
                            </KeepAlive>
                        </router-view>
                    </el-main>
                </el-scrollbar>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import elAside from '../components/elAside.vue'
import elHeader from '../components/elHeader.vue'

const store = useCounterStore()
</script>

<style scoped lang="less">
.common-layout {
    height: 100%;
}
</style>