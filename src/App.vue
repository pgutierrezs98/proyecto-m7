<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';

const theme = useTheme()
const systemTheme = theme.global.name.value
const selectedTheme = ref(systemTheme)

const changeTheme = () => {
    selectedTheme.value = selectedTheme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
    <v-app :theme="selectedTheme">
    <HeaderComp :theme="selectedTheme" @click="changeTheme" />
        <v-main>
            <v-container>
                <RouterView />
            </v-container>
        </v-main>
        <FooterComp />
    </v-app>
</template>

<style></style>
