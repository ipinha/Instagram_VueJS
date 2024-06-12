<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import Container from './Container.vue';
    import AuthModal from './AuthModal.vue';
    import {useUserStore} from "@/stores/users"
    import {ref} from 'vue'
    import { storeToRefs } from 'pinia';

    const userStore = useUserStore()

    // lay du lieu user và loadingauser tu store. user này là user đăng nhập
    const {user, loadingUser} = storeToRefs(userStore)

    const searchUsername=ref("")

    const router = useRouter()

    const onSearch = () => {
        if(searchUsername.value){
            router.push(`/profile/${searchUsername.value}`);
            searchUsername.value=""
        }
    }

    const handleLogout =  async () => {
        await userStore.handleLogout()
    } 

    const goToUserProfile = () => {
        router.push(`/profile/${user.value.username}`)
    }
</script>

<template>
    <a-layout-header style="background-color: black;">
        <Container>
            <div class="nav-container">
                
                <div class="right-container">
                    <RouterLink to="/">Instagram</RouterLink>
            
                    <a-input-search
                        v-model:value="searchUsername"
                        placeholder="Username"
                        style="width: 200px"
                        @search="onSearch"
                    />
                </div>
                <div v-if="!loadingUser">
                    <div class="left-container" v-if="!user">
                        <AuthModal :isLogin="true" />
                        <AuthModal :isLogin="false" />
                    </div>
                    <div class="left-container" v-else>
                        <a-button type="primary" @click="goToUserProfile">Profile</a-button>
                        <a-button type="primary" @click="handleLogout">Logout</a-button>
                    </div>
                </div>
               
            </div>
        </Container>
    </a-layout-header>

</template>

<style scoped>
    .router-link-active {
        text-decoration: none; 
    }
    .nav-container {
        display: flex;
        justify-content: space-between;
        padding: 1%;
    }

    .right-container,.left-container {
        display: flex;
        align-items: center;
    }
    .right-container a {
        margin-right: 5%;
    }
    .left-container button {
        margin-left: 1vw;
    }
</style>