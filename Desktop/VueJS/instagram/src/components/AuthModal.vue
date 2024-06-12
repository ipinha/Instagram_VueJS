<script setup >
  import { ref, defineProps, reactive } from 'vue';
  import {useUserStore} from '../stores/users'
  import { storeToRefs } from "pinia";

  const userStore = useUserStore()
  const { errorMessage, loading, user} = storeToRefs(userStore);

  const userCredentials  = reactive({
    email:"",
    password:"",
    username:""
  })

  const props =  defineProps(['isLogin'])
  const visible = ref(false);
 


  const showModal = () => {
    visible.value = true;
  };

  const clearUserCredentialsInput =() => {
    userCredentials.username="";
    userCredentials.email="";
    userCredentials.password="";
    userStore.clearErrorMessage()
  }

  const handleOk = async (e) => {
    if(props.isLogin){
        await userStore.handleLogin({
          password: userCredentials.password,
          email: userCredentials.email
        })
    }
    else {
        await userStore.handleSignup(userCredentials)
    }
     
      if(user.value){
        visible.value = false
        clearUserCredentialsInput()
      }
  };

  const handleCancel =() => {
    clearUserCredentialsInput()
    visible.value = false

  }

  const title =  props.isLogin ? 'Login' : 'Signup'

</script>
<template>
  
    <div>
      {{ user }}
      <a-button type="primary" @click="showModal" class="btn">{{title}}</a-button>
      <a-modal v-model:open="visible" :title="title" @ok="handleOk">

        <template #footer>
          <a-button key="back" @click="handleCancel">Cancel</a-button>
          <a-button :disabled="loading" 
                    key="submit" type="primary" 
                    :loading="loading" 
                     @click="handleOk">
                Submit
          </a-button>
        </template>
        <div v-if="!loading" class="input-container">
          <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
          <a-input class="input" v-model:value="userCredentials.email" placeholder="Email" />
          <a-input type="password" class="input" v-model:value="userCredentials.password" placeholder="Password" />
        </div>
        <div v-else class="spinner">
          <a-spin />
        </div>
        <a-typographyText v-if="errorMessage" type="danger">{{errorMessage}}</a-typographyText>
      </a-modal>
    </div>
</template>


<style scoped>
  .btn {
    margin-left: 1vw;
  }

  .input {
    margin-top: 2vh;
  }


  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
</style>
  
  