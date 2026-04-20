<script setup>
import ProductList from '@/components/ProductList.vue';
import apiClient from '@/api/apiClient';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// products store
const loading = computed(() => store.state.products.loading);
const error = computed(() => store.state.products.error);
const products = computed(() => store.state.products.products);

// filtros store
const lowestPrice = computed(() => store.state.filtros.lowestPrice);
const highestPrice = computed(() => store.state.filtros.highestPrice);
const productosFiltrados = computed(() => store.getters['filtros/productosFiltrados']);

// Definir categorías únicas de forma dinámica a partir del array de productos del store
const categorias = computed(() => store.getters['products/categoriasUnicas']);
// Agrega categoría 'Todos/mostrar todo' (show all), para que no haga filtro por categoría
const categoriasItems = computed(() => [
  { title: 'Show all', value: null },
  ...categorias.value.map((category) => ({ title: category, value: category })),
]);

// Manejadores al cambiar filtros en barra de filtros
const onCategory = (value) => store.commit('filtros/SET_CATEGORY', value || null);
const onLowestPrice = (value) => store.commit('filtros/SET_LOWEST_PRICE', Number(value));
const onHighestPrice = (value) => [
  value > 0
    ? store.commit('filtros/SET_HIGHEST_PRICE', Number(value))
    : store.commit(
        'filtros/SET_HIGHEST_PRICE',
        Math.max(...store.state.products.products.map((prod) => prod.price)),
      ),
];
const resetFilters = () => {
  store.commit('filtros/RESET_FILTERS');
  store.commit(
    'filtros/SET_HIGHEST_PRICE',
    Math.max(...store.state.products.products.map((prod) => prod.price)),
  );
};

// Favoritos store
const totalFavourites = computed(() => store.getters['favoritos/totalFavourites']);

onMounted(async () => {
  await store.dispatch('products/fetchProducts');
  // Calcular inmediatamente el precio máximo de todos los productos
  store.commit(
    'filtros/SET_HIGHEST_PRICE',
    Math.max(...store.state.products.products.map((prod) => prod.price)),
  );
  console.log(categorias.value);
});
</script>

<template>
  <h1>Home</h1>

  <v-row class="align-center">
    <v-col cols="12" md="3">
      <!-- Filtro por CATEGORÍA -->
      <v-select
        class="text-capitalize"
        label="Category"
        :items="categoriasItems"
        item-title="title"
        item-value="value"
        @update:model-value="onCategory"
        hide-details
      ></v-select>
    </v-col>
    <v-col cols="12" md="3">
      <!-- Filtro PRECIO MÍNIMO-->
      <v-number-input
        label="Lowest price"
        :min="0"
        hide-details
        :model-value="lowestPrice"
        @update:model-value="onLowestPrice"
      >
      </v-number-input>
    </v-col>
    <v-col cols="12" md="3">
      <!-- Filtro PRECIO MÁXIMO -->
      <v-number-input
        label="Highest price"
        :min="0"
        hide-details
        :model-value="highestPrice"
        @update:model-value="onHighestPrice"
      >
      </v-number-input>
    </v-col>
    <v-col cols="12" md="3">
      <!-- Botón para LIMPIAR FILTROS -->
      <v-btn text="Clear filters" block @click="resetFilters"></v-btn>
    </v-col>
  </v-row>

  <p>Favoritos: {{ totalFavourites }}</p>

  <div v-if="loading">Cargando productos...</div>
  <div v-else-if="error" class="text-red">{{ error }}</div>
  <ProductList v-else :products="productosFiltrados" />
</template>
