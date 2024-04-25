<script setup>
    import Container from './Container.vue';
    import UserBar from './UserBar.vue';
    import ImageGallart from './ImageGallart.vue';
    import { ref, onMounted,watch, reactive } from 'vue';
    import {useRoute} from "vue-router"
    import { supabase } from '@/supabase';
    import {useUserStore} from '../stores/users'
    import { storeToRefs } from 'pinia';

    const route = useRoute()
    const user= ref(null)

    // lấy username từ đường dẫn. trang mà đang xem profile
    const {username} = route.params
    const posts = ref([])
    const userStore = useUserStore()

    // lấy giá trị user từ store gán cho loggedInUser. user này là thông tin đang đăng nhâpk
    const {user: loggedInUser} = storeToRefs(userStore)
    const loading =ref(true)
    const isFollowing = ref(false)

    // thông tin của user để truyền sang userbarr
    const userInfo = reactive({
        posts:null,
        followres:null,
        follwing:null
    })

    // lấy dữ liệu mới nhất từ component con và thêm vào đầu chuỗi posts để ưu tiên hiển thị
    const addNewPost  = (post) => {
        posts.value.unshift(post)
    }

    const updateIsFollowing = (follow) => {
        isFollowing.value = follow
    }

    const fetchData =async () => {
        // tim ra user tương ứng với tên trên route
        const {data: userData} = await supabase
            .from("users")
            .select()
            .eq('username',username)
            .single();

            if(!userData){
                loading.value =false
                return user.value = null
            }
            user.value= userData

            const {data: postData} = await supabase
                .from("posts")
                .select()
                .eq("owner_id", user.value.id)
            
            posts.value = postData

            await fetchIsFollowing()
            const followerCount =await fetchFollowersCount()
            const followingCount = await fetchFollowingCount()

            userInfo.followres = followerCount
            userInfo.follwing = followingCount
            userInfo.posts = posts.value.length


            loading.value = false
    }
    // dem so luong nguoi follow

    const fetchFollowersCount = async() => {
        const {count} = await supabase
            .from("followers_following")
            .select('*',{count: 'exact' })
            .eq("following_id",user.value.id);
        return count
    }
    // dem so luong duọc follow
    const fetchFollowingCount = async() => {
        const {count} = await supabase
            .from("followers_following")
            .select('*',{count: 'exact' })
            .eq("follower_id",user.value.id);
        return count
    }

    // so sanh xem da follow chuwa
    const fetchIsFollowing = async() => {
        if(loggedInUser.value && (loggedInUser.value.id !== user.value.id)){
            const {data} = await supabase
            .from("followers_following")
            .select()
            .eq("follower_id", loggedInUser.value.id)
            .eq("following_id",user.value.id)
            .single();

            if(data) return isFollowing.value =true
        }
        
    }
    watch(loggedInUser,() => {
        fetchIsFollowing()
    })
    onMounted(() => {
        fetchData()
    })

</script>

<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar
                :key="$route.params.username" 
                :user="user"
                :userInfo="userInfo"
                :addNewPost="addNewPost"
                :isFollowing="isFollowing"
                :updateIsFollowing="updateIsFollowing"
            />
            <ImageGallart :posts="posts" />
        </div>
        <div class="spinner" v-else>
            <a-spin />
        </div>
    </Container>
</template>

<style scoped>
    .profile-container {
        display: flex;
        flex-direction: column;
        padding: 3vh 0;
    }

    .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 85vh;
    }
</style>