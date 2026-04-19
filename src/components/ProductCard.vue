<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps ({
  product: {
    type: Object,
    required: true
  }
})

const esFavorito = ref(false)
const toggleFavorito = () => {
  esFavorito.value = !esFavorito.value
}
</script>

<template>
  <v-card flat>
    <v-img :src="props.product.image" height="200px" cover>
      <v-toolbar color="transparent">
      <template #append>
        <v-btn :icon="esFavorito ? 'mdi-heart' : 'mdi-heart-outline'" @click="toggleFavorito" :color="esFavorito ? 'red' : 'gray'"></v-btn>
      </template>
    </v-toolbar>
    </v-img>
    <v-card-item>
      <v-card-subtitle class="font-weight-semibold">
        ${{ props.product.price }}
      </v-card-subtitle>
      <v-card-title class="text-body-medium">
        {{ props.product.title }} - {{ props.product.brand }}
      </v-card-title>
    </v-card-item>
    <v-card-text class="text-medium-emphasis">
      {{ props.product.type }} - {{ props.product.category }}
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>