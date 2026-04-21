import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import HomeView from '@/views/HomeView.vue';
import apiClient from '@/api/apiClient';
import { createStore } from 'vuex';
import products from '@/store/modules/products';
import filtros from '@/store/modules/filtros';
import favoritos from '@/store/modules/favoritos';

jest.mock('@/api/apiClient', () => ({ get: jest.fn() }));

const createFreshStore = () =>
  createStore({
    modules: { products, filtros, favoritos },
  });

const vuetifyStubs = {
  'v-row': { template: '<div><slot /></div>' },
  'v-col': { template: '<div><slot /></div>' },
  'v-select': { template: '<div />' },
  'v-number-input': { template: '<div />' },
  'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  'v-card': { template: '<div><slot /></div>' },
  'v-img': { template: '<img :src="src" />', props: ['src'] },
  'v-card-item': { template: '<div><slot /></div>' },
  'v-card-title': { template: '<div><slot /></div>' },
  'v-card-subtitle': { template: '<div><slot /></div>' },
  'v-card-actions': { template: '<div><slot /></div>' },
  'v-card-text': { template: '<div><slot /></div>' },
  'v-icon': { template: '<span />' },
  'v-chip': { template: '<span><slot /></span>' },
  'v-toolbar': { template: '<div><slot name="append" /><slot /></div>' },

  ProductList: { template: '<div />' },
};

describe('HomeView.vue', () => {
  it('shows error when API fails', async () => {
    apiClient.get.mockRejectedValue(new Error('Network Error'));

    const store = createFreshStore();

    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
        stubs: vuetifyStubs,
      },
    });

    await flushPromises();
    await nextTick();

    expect(wrapper.find('[data-test="error-msg"]').exists()).toBe(true);
  });
});
