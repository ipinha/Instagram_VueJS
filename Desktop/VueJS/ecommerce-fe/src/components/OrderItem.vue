<script setup>
import { defineProps, computed, reactive } from 'vue'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const total = computed(() => {
    return props.product.price * props.product.quantity;
});

</script>
<template>
    <div class="cartItem_container">
        <div class="left-container">
            <img :src="product.image" alt="">
        </div>

        <div class="center-container">
            <p class="name">{{ product.name }}</p>
            <div class="quantity">
                <p class="quantity-text">Số lượng: {{product.quantity}}</p>
                
            </div>
            <p class="price">Giá: {{ product.price }}</p>
        </div>

        <div class="right-container">
            <p class="title">Total: </p>
            <p class="total-price">{{ total }} </p>

        </div>




    </div>
    <hr>
</template>

<style scoped>
.cartItem_container,
hr {
    width: 80%;
    margin: 2% 10%;
    display: flex;
    justify-content: space-between;
    color: #05386B;

}

.left-container,
.center-container,
.right-container {
    padding: 5px;
}

img {
    width: 120px;
    max-height: 200px;
}

.name,
.title,
.total-price {
    font-size: 20px;
    font-weight: 500;


}

.quantity,
.price {
    font-size: 16px;
}

.title {
    margin-right: 10px;
}

.title {
    font-size: 20px;
    font-weight: 500;

}

button {
    margin-right: 10px;
    margin-top: 50%;

}

.quantity-number {
    background-color: #eef4e6;
    border: 1px solid #05386B;
    box-shadow: 1px 1px 0.5 #05386B;
    font-size: 16px;
    width: 15%;
    min-width: 40px;
}
</style>