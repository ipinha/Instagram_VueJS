<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const quantity = ref(1)
const productDetail = ref(null);
import axios from 'axios';

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}
const increQuantity = () => {
    quantity.value++
}

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:8001/api/product_service/book/get_book/${route.params._id}`);
        productDetail.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching book:', error);
    }
});

const add_product = reactive({
    // userID:"",
    productID:route.params._id,
    quantity:quantity.value,
})


const add_to_cart = () => {
    if (localStorage.getItem('access_token') !== null) {
        axios.post('api/add_to_cart', add_product, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        .then(response => {
            console.log(route.params._id);
            Swal.fire({
                icon: 'success',
                text: 'Bạn đã thêm vào giỏ hàng',
            });
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            Swal.fire({
                icon: 'error',
                text: 'Có lỗi xảy ra khi thêm vào giỏ hàng',
            });
        });
    } else {
        console.log("Please login");
        Swal.fire({
            icon: 'warning',
            text: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
        });
    }
};


watch(quantity, (newQuantity) => {
    add_product.quantity = newQuantity;
});





</script>
<template>
    <div v-if="productDetail" class="product-detail-container">
        <div class="container-top">

            <div class="container-left">
                <!-- <img src="https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-max-blue-thumbnew-600x600.jpg" alt=""> -->
                <img :src="productDetail.image" :alt="productDetail.title">
            </div>

            <div class="container-right">
                <h3 class="name">{{ productDetail.title }}</h3>
                <p class="tpye">Categories: {{ productDetail.categories }}</p>
                <p class="author">Author : {{ productDetail.author }}</p>
                <p class="publisher">Publisher: {{ productDetail.publisher }}</p>
                <p class="published_date">Published_date: {{ productDetail.published_date }}</p>
                <h3 class="price">{{ productDetail.price }}</h3>
                <div class="btn">
                    <button @click="decreaseQuantity" class="decre">-</button>
                    <p class="quantity">{{ quantity }}</p>
                    <button @click="increQuantity" class="incre">+</button>
                    <button @click="add_to_cart" class="add-to-cart">Add to cart</button>
                </div>
            </div>
        </div>

        <div class="container-bottom">
            <p>Description: {{ productDetail.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.product-detail-container {
    width: 80%;
    min-height: 100vh;
    margin: 0px 10%;
    color: #05386B;
}

.container-top {
    display: flex;
    width: 100%;
}

.container-left {
    width: 40%;
    margin: 5%;
}

img {
    width: 80%;
}

.container-right {
    width: 40%;
    margin: 5%;
}

h3 {
    font-size: 30px;
}

.btn {
    display: flex;
    position: relative;
    align-items: center;
}

.decre,
.incre {
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin: auto 0px;
    border: none;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

button {
    background-color: #eef4e6;
    border: 1px solid #05386B;
}

.quantity {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    border: 0.5px solid #96cbff;
    height: 30px;
}

.add-to-cart {
    position: absolute;
    right: 10%;
    height: 40px;
    cursor: pointer;
    width: 50%;
    margin: 0px;
    border-radius: 5px;
    border: 1px solid #05386B;
}
</style>