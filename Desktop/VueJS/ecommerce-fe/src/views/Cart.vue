<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const data = ref([
  {
    id: "1",
    image: "https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
    name: "iphone 15",
    price: 15000,
    quantity: 3
  },
]);

const total = computed(() => {
  let sum = 0;
  for (const product of data.value) {
    sum += product.price * product.quantity;
  }
  return sum;
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8004/api/cart_service/cart/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    });

    if (Array.isArray(response.data.data)) {
      data.value = response.data.data;
      console.log(data.value); // Access the nested array
    } else {
      console.error('Fetched data is not an array:', response.data.data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class="cart-container">
    <div class="title">
      <h2>Shopping Cart</h2>
    </div>
    <CartItem v-for="product in data" :key="product.id" :product="product" />

    <div class="final">
      <div class="total">Total : {{ total }}</div>
      <RouterLink class="order-btn" to="/order">
        <a-button type="primary" danger ghost> Order</a-button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
    background-color: #eef4e6;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #05386B;
}

.final {
    display: flex;
    justify-content: space-between;
}

.total {
    font-size: 24px;
    color: #05386B;
    font-weight: 500;
}

.order-btn,
.total {
    margin-top: 50px;
    margin-bottom: 150px;
    width: 25%;
    height: 10%;
    margin-right: auto;
    margin-left: auto;
}
</style>