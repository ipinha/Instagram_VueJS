<script setup>
    import { defineProps } from 'vue';
    import UploadPhotoModal from './UploadPhotoModal.vue'
    import {useRoute} from "vue-router"
    import { useUserStore } from "../stores/users";
    import {storeToRefs} from "pinia"
    import { supabase } from '@/supabase';

    const props = defineProps(['user','userInfo','addNewPost','isFollowing','updateIsFollowing']) 

    const route = useRoute();
    const userStore = useUserStore();

    // lay gia tru cua usernam trong route vaf gans cho bien moi profileUsername
    const {user} = storeToRefs(userStore)
    const {username: profileUsername} = route.params


    // follow user
    const followUser =async() => {
        props.updateIsFollowing(true)
        await supabase.from("followers_following").insert({
                follower_id: user.value.id,
                following_id: props.user.id
            })
    }
    const unfollowUser =async() => {
        props.updateIsFollowing(false)
        await supabase.from("followers_following")
            .delete()
            .eq("follower_id", user.value.id)
            .eq("following_id", props.user.id)
    }
</script>

<template>
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <a-typography-title :level="2">{{props.user.username}}</a-typography-title>
            <div v-if="user">
                <UploadPhotoModal 
                    v-if="profileUsername === user.username "
                    :addNewPost="addNewPost"
                />

                <div  v-else>
                    <a-button v-if="!props.isFollowing" @click="followUser">Theo dõi</a-button>
                    <a-button v-else @click="unfollowUser">Hủy theo dõi</a-button>
                </div>
            </div>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{props.userInfo.posts}} posts</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.followres}} followers</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.follwing}} following</a-typography-title>
        </div>
    </div>

    <div class="userbar-container" v-else>
        <div class="top-content">
            <a-typography-title :level="2">Không tìm thấy người dùng</a-typography-title>
            <UploadPhotoModal 
                v-if="user && profileUsername === user.username "
                :addNewPost="addNewPost"
            />
        </div>
    </div>
</template>


<style scoped>
    .userbar-container{
        padding-bottom: 75px;
    }
    .bottom-content {
        display: flex;
        align-items: center;
    }
    .bottom-content h5 {
        margin: 0;
        padding: 0;
        margin-right: 5vw;
    }

    .top-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
    } 
</style>