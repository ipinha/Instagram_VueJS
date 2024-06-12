<script setup>
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined, } from '@ant-design/icons-vue';
import { RouterLink } from 'vue-router'
import AuthModel from './AuthModel.vue';
import { ref, watch } from 'vue';



const state = ref({
    isLogin: false,
});

const token = ref(localStorage.getItem('access_token'))
if (token) {
    state.value.isLogin = true;
} else {
    state.value.isLogin = false;
}

watch(
    () => localStorage.getItem('access_token'),
    (newToken) => {
        state.value.isLogin = !!newToken;
    }
);


const logOut = () => {
    localStorage.removeItem('access_token');
    state.value.isLogin = false;
}


const isLoginModalOpen = ref(false);

const showLoginModal = () => {
    isLoginModalOpen.value = true;
};

const setLoginModalOpen = (newValue) => {
    isLoginModalOpen.value = newValue;
};



</script>

<template>
    <a-layout-header>
        <div class="nav-container">
            <div class="left-container">
                <RouterLink to="/" style="text-decoration: none;color: #05386B;font-size: 30px;font-weight: 500;">
                    E-COMMERCE</RouterLink>

            </div>
            <div class="right-container">
                <user-outlined class="user-icon" />
                <RouterLink to="/cart">
                    <shopping-cart-outlined class="shopping-cart-icon" />
                </RouterLink>

                <logout-outlined @click="logOut" v-if="state.isLogin" class="logout-icon" />
                <login-outlined v-else class="login-icon" @click="showLoginModal"></login-outlined>
                <AuthModel :isOpen="isLoginModalOpen" @update:isOpen="setLoginModalOpen" />
            </div>
        </div>
    </a-layout-header>
</template>

<style>
.custom-input-search ::placeholder {
    color: #4c759f;
}

.router-link-active {
    text-decoration: none;
}

.nav-container {
    min-width: 30vw;
    display: flex;
    justify-content: space-between;
    padding: 2vh 1vh 3vh;
    background: linear-gradient(to right, #c3f0d7, #bcfbf3);
}

.right-container,
.left-container {
    display: flex;
    align-items: center;
}

.left-container {
    margin-left: 5%;
}

.user-icon {
    font-size: 25px;
    color: #05386B;
    padding-right: 25px;
}

.shopping-cart-icon {
    font-size: 25px;
    color: #05386B;
}

.logout-icon {
    font-size: 25px;
    margin-left: 25px;
    color: #05386B;
    margin-right: 25px;
}

.login-icon {
    font-size: 25px;
    margin-left: 25px;
    color: #05386B;
    margin-right: 25px;
}
</style>
