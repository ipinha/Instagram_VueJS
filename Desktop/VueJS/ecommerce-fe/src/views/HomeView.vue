<script setup>
import Card from '@/components/Card.vue';
import router from '@/router';
import { defineProps, ref, computed, watch } from 'vue';
import { AudioOutlined, CameraOutlined } from '@ant-design/icons-vue';

const searchProductname = ref("");
const isLogin = ref(true);
import axios from 'axios';


const data = [
    {
        id: "1",
        productName: "iphone doan nay cho them vao de test xuong dong thoi",
        price: "1500",
        image: "https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
        type: "mobile"
    },


]
const filteredData = ref(data);

watch(searchProductname, (newValue) => {
    if (newValue.trim() !== "") {
        filteredData.value = data.filter(product =>
            product.productName.toLowerCase().includes(newValue.toLowerCase())
        );
    } else {
        filteredData.value = data;
    }
});

const onSearch = () => {
};


let isRecording = false;
let recognition;

const startVoiceSearch = () => {
    if (isRecording) {
        recognition.stop();
        isRecording = false;
    } else {
        searchProductname.value = "";
        recognition = new (webkitSpeechRecognition || SpeechRecognition)();
        recognition.lang = 'vi-VN';
        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript;
            transcript = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
            searchProductname.value = transcript.trim();
            onSearch();
        };
        recognition.onend = () => {
            isRecording = false;
        };
        recognition.start();
        isRecording = true;
    }
};

const handleFileChange = (event) => {
    const files = event.target.files;

};



const props = defineProps({
    data: Array
});


onSearch()


const getBook = () => {

    axios.get('http://localhost:8001/api/product_service/book/get_books')
        .then(response => {
            data.value = response.data
            console.log(data.value);
            filteredData.value = response.data;

        })
        .catch(error => {
            console.error('Error fetching books:', error)
        })
}





</script>

<template>
    <div class="home-container">
        <div class="header">
            <button @click="getBook" style="margin-right: 10vw; color:#05386B">BOOK</button>
            <button style="color:#05386B">CLOTHES</button>
            <button style="margin-left: 10vw; color:#05386B">MOBILE</button>
        </div>

        <div class="search">
            <a-input-search v-model:value="searchProductname" placeholder="Search" style="width: 300px;"
                @search="onSearch" class="custom-input-search" />
            <AudioOutlined @click="startVoiceSearch" class="icon-voice" />
            <CameraOutlined @change="handleFileChange" class="icon-camera" />

            <label for="fileInput" class="icon-camera"></label>
            <input id="fileInput" type="file" style="display: none;" @change="handleFileChange">
        </div>

        <div v-if="filteredData.length > 0" class="list-product">
            <Card v-for="product in filteredData" key="product.id" :product="product" />
        </div>
        <div class="message" v-else>
            <h3>Không có sản phẩm tìm kiếm</h3>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    background-color: #eef4e6;
    min-height: 100vh;
}

.header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5vh;
}

button {
    border: none;
    background-color: #eef4e6;
    font-size: large;
    cursor: pointer;
}

.list-product {
    width: 80%;
    height: 100%;
    margin: 5% 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
}

.search {
    margin-left: 7%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #05386B;
}

.icon-voice,
.icon-camera {
    font-size: 20px;
    color: #05386B;
    padding-right: 10px;
}

a-input-search {
    width: 80%;
    height: 30px;
}

.message {
    display: flex;
    justify-content: center;
}
</style>
