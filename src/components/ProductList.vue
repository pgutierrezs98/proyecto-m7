<script setup>
import { defineProps } from 'vue';
import ProductCard from './ProductCard.vue';

const props = defineProps ({
  products: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <div>
    <v-row>
      <v-col v-for="product in props.products" :key="product._id" cols="12" md="6" lg="4" xl="3">
        <ProductCard :product="product"/>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>