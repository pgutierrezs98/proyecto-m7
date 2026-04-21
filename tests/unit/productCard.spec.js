import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';
import store from '@/store';

// Mocks: doble inteligente jest.mock()
// Stubs: doble "tonto", se hace pasar por una pieza compleja (como un componente de vuetify) y la reemplaza por una mínima y estática

const vuetifyStubs = {
  'v-card': { template: '<div><slot/></div>' },
  'v-img': { template: '<img :src="src" />', props: ['src'] },
  'v-card-title': { template: '<div><slot/></div>' },
  'v-card-subtitle': { template: '<div><slot/></div>' },
  'v-card-text': { template: '<div><slot/></div>' },
  'v-btn': { template: '<button @click="$emit(\'click\'))"><slot /></button>' },
  'v-toolbar': { template: '<div><slot name="append" /><slot /></div>' },
  'v-card-item': { template: '<div><slot /></div>' },
};

describe('ProductCard.vue', () => {
  it('renders product data correctly', () => {
    const product = {
      id: 1,
      title: 'Product 1',
      brand: 'Brand 1',
      category: 'Category 1',
      type: 'Type 1',
      price: 10,
      image: 'image.jpg',
    };

    const wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        stubs: vuetifyStubs,
      },
    });

    expect(wrapper.text()).toContain(product.title);
    expect(wrapper.text()).toContain(String(product.price));
    expect(wrapper.find('img').attributes('src')).toBe(product.image);
  });
});
