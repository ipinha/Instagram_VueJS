<script setup>
import { RouterLink } from 'vue-router'
import OrderItem from '@/components/OrderItem.vue';
import { computed } from 'vue';

const data = [
    {
        id: "1",
        image: "https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
        name: "iphone 15",
        price: 15000,
        quantity: 3
    },
    {
        id: "2",
        image: "https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
        name: "samsung 16",
        price: 25000,
        quantity: 3
    }
]

const total = computed(() => {
    let sum = 0;
    for (const product of data) {
        sum += product.price * product.quantity;
    }
    return sum;
});


</script>
<template>
    <div class="title">
        <h2>Order</h2>
    </div>
    <OrderItem v-for="product in data" :key="product.id" :product="product" />

    <div class="final">
        <div class="total">Total : {{ total }}</div>


        <RouterLink class="order-btn" to="/order">
            <a-button type="primary" danger ghost> Order</a-button>
        </RouterLink>
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