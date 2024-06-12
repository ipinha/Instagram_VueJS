<template>
  <a-modal :open="isOpen" :title="modalTitle" :ok-text="okButtonText" cancel-text="Cancel" @ok="handleOk"
    @update:open="handleOpenUpdate">
    <form v-if="!isRegister">
      <div>
        <label for="email">Username:</label>
        <input v-model="userInput.username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="userInput.password" id="password" type="password" required />
      </div>
      <div>
        <a @click.prevent="toggleRegister">Don't have an account? Register</a>
      </div>
    </form>
    <form v-else>
      <div>
        <label for="username">Username:</label>
        <input v-model="userInput.username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="userInput.password" id="password" type="password" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="userInput.email" id="email" type="email" required />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input v-model="userInput.phone" id="phone" type="text" required />
      </div>
      <div>
        <label for="first_name">F-Name:</label>
        <input v-model="userInput.first_name" id="first_name" type="text" required />
      </div>
      <div>
        <label for="last_name">L-Name:</label>
        <input v-model="userInput.last_name" id="last_name" type="text" required />
      </div>
      <div>
        <label for="address_">Address:</label>
        <input v-model="userInput.address_" id="address_" type="text" required />
      </div>
      <div>
        <a @click.prevent="toggleRegister">Already have an account? Login</a>
      </div>
    </form>
  </a-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, reactive } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:isOpen']);
const handleOpenUpdate = (newValue) => emit('update:isOpen', newValue);

const isRegister = ref(false);

const userInput = reactive({
  username: "",
  password: "",
  email: "",
  phone: "",
  first_name: "",
  last_name: "",
  address_: ""


})

const handleOk = () => {
  if (isRegister.value) {
    axios.post('http://127.0.0.1:8002/api/user_service/user/create_user/', userInput)
      .then(response => {

        Swal.fire({
          icon: 'success',
          text: 'Bạn đã đăng ký thành công. Vui lòng đăng nhập.',
        }).then(() => {
          isRegister.value = false;
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          text: 'Đăng ký thất bại. Vui lòng thử lại sau.',
        });
      });
  } else {
    axios.post('http://127.0.0.1:8002/api/user_service/login/', { "username": userInput.username, "password": userInput.password })
      .then(response => {
        localStorage.setItem("access_token", response.data.token)

        console.log(response.data);
        Swal.fire({
          icon: 'success',
          text: 'Đăng nhập thành công',
        }).then((response) => {
          console.log(response);
          handleOpenUpdate(false);
          window.location.reload();
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          text: 'Đăng ký thất bại. Vui lòng thử lại sau.',
        });
      });

  }
};

const toggleRegister = () => {
  isRegister.value = !isRegister.value;

};
const okButtonText = computed(() => isRegister.value ? 'Sign Up' : 'Login');
const modalTitle = computed(() => isRegister.value ? 'Register' : 'Login');


</script>

<style scoped>
a-modal {
  background-color: #eef4e6;
}

input {
  margin-top: 20px;
  padding: 5px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  min-width: 200px;

  box-shadow: 1px 1px 1px rgb(181, 178, 178);
}
</style>
