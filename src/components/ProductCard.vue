<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isFavourite = computed(() =>
  store.getters['favoritos/isFavourite'](props.product._id),
);
const toggleFavourite = () => {
  store.dispatch('favoritos/toggleFavourite', props.product);
};
</script>

<template>
  <v-card variant="text">
    <v-img :src="props.product.image" height="250px" cover>
      <v-toolbar color="transparent">
        <template #append>
          <v-btn
            :icon="isFavourite ? 'mdi-heart' : 'mdi-heart-outline'"
            @click="toggleFavourite"
            :color="isFavourite ? 'red' : 'grey'"
          ></v-btn>
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

<style scoped></style>
