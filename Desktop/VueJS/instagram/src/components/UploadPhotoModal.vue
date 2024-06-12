<script setup>
    import {  ref, defineProps } from 'vue';
    import { supabase } from "../supabase";
    import {useUserStore} from "../stores/users"
    import { storeToRefs } from "pinia";

    const userStore = useUserStore()

    const {user} = storeToRefs(userStore)

    const props = defineProps(['addNewPost'])

    const visible = ref(false);
    const caption = ref("")
    const file = ref(null)

    const loading = ref(false)
    const errorMessage = ref("")

    const showModal = () => {
      visible.value = true;
    };


    const handleOk = async (e) => {

      loading.value = true
      const fileName = Math.floor(Math.random()*1000000000000000)
      let filePath
      if(file.value){
          const {data, error} = await supabase.storage.from("images").upload('public/'+ fileName, file.value);

          if(error) {
            loading.value = false
            return errorMessage.value = "Tải ảnh không thành công"
          }
          
          filePath = data.path
          await supabase.from("posts").insert({
              url: filePath,
              caption:caption.value,
              owner_id : user.value.id
          });
          
      }
      loading.value = false
      visible.value=false;
      caption.value ="";
      props.addNewPost({
        url: filePath,
        caption:caption.value
      })
    };

    const handleUploatChange =(e) => {
        if(e.target.files[0]){
          file.value =e.target.files[0]
        }
    }

</script>
<template>
    <div>
      <a-button  @click="showModal">Upload Photo</a-button>
      <a-modal v-model:open="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png,.jpg" @change="handleUploatChange">
        <a-input 
            v-model:value="caption" 
            placeholder="Caption..."
            :maxLength="50"
        />
        <a-typographyText v-if="errorMessage" type="danger">{{errorMessage}}</a-typographyText>
      </div>

      <div class="spinner" v-else>
        <a-spin/>
      </div>
      </a-modal>
    </div> 
  </template>
<style scoped>
  input {
    margin-top: 2vh;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>