<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['click'])
const props = defineProps ({
  theme: String,
})

const changeTheme = () => {
  emit ('click')
}

</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Product Showcase</v-app-bar-title>
    <!-- Botón para cambiar tema light/dark -->
    <v-btn @click="changeTheme" :icon="props.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-btn>
  </v-app-bar>
</template>

<style scoped></style>