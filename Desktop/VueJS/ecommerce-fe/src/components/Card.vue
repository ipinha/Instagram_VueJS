<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  
    <RouterLink :to="'/product/' + product._id" class="router-link">
        <div class="container">
          <div class="image">
            <img :src="product.image" :alt="product.productName" />
          </div>
          <div class="info">
            <p  class="name">{{ product.title }}</p>
            <p class="price">{{ product.price }}</p>
          </div>
        </div>
      </RouterLink>
</template>

<style scoped>
.container {
  width: 150px;
  height: 225px;
  background-color: #fff;
  margin: 10px;
  border-radius: 5%;
  box-shadow: 1px 1px 1px #9d9c9c;
  position: relative;
}

.image {
  width: 150px;
  height: 150px;
  display: block;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  margin-top: 10px;
}

.info {
  margin: 10%;
}
.router-link {
    text-decoration: none; 
    color: inherit; 
  }
  
.router-link:hover {
    color: inherit;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    margin: 0;
  }

  .price{
    margin: 0;
    position: absolute;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px; 
    }


</style>
