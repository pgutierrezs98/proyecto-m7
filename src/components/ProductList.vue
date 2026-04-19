<script setup>
import ProductCard from './ProductCard.vue';

const products = [
  {
      "_id": 1,
      "title": "Long sleeve Jacket",
      "isNew": true,
      "oldPrice": "200",
      "price": 150,
      "discountedPrice": 135,
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
      "category": "women",
      "type": "jacket",
      "stock": 50,
      "brand": "FashionTrend",
      "size": [
        "S",
        "M",
        "L"
      ],
      "image": "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg",
      "rating": 4
    },
]

</script>

<template>
  <div>
    <h1>List</h1>
    <ProductCard v-for="product in products" :key="product._id" :product="product"/>
  </div>
</template>

<style scoped>

</style>