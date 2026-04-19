<script setup>
import ProductList from '@/components/ProductList.vue';
import apiClient from '@/api/apiClient';
import { onMounted, ref } from 'vue';

const loading = ref(false)
const error = ref(null)
const products = ref([])

const fetchProducts = async () => {
    try {
        loading.value = true
        const response = await apiClient.get('/products')
        products.value = response.data.data
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

const onCategory = (value) => console.log(value)

onMounted(() => {
    fetchProducts()
})


</script>

<template>
    <h1></h1>

    <v-row class="align-center">
        <v-col cols="12" md="3">
            <!-- Filtro por CATEGORÍA -->
            <v-select class="text-capitalize" label="Category" :items="['Show all', 'Men', 'Women', 'Kids']" item-title="item" item-value="item" @update:model-value="onCategory" hide-details></v-select>
        </v-col>
        <v-col cols="12" md="3">
            <!-- Filtro PRECIO MÍNIMO-->
            <v-number-input label="Lowest price" :min="0" hide-details>
            </v-number-input>
        </v-col>
        <v-col cols="12" md="3">
            <!-- Filtro PRECIO MÁXIMO -->
            <v-number-input label="Highest price" :min="0" hide-details>
            </v-number-input>
        </v-col>
        <v-col cols="12" md="3">
            <!-- Botón para LIMPIAR FILTROS -->
            <v-btn text="Clear filters" block></v-btn>
        </v-col>
    </v-row>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error" class="text-red">{{ error }}</div>
    <ProductList v-else :products="products"/>
</template>

