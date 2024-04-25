import { ref } from 'vue'
import { defineStore } from 'pinia'

import { supabase } from '@/supabase';


export const useUserStore = defineStore('users', () => {
  
  const user = ref(null);
  const errorMessage = ref("")
  const loading = ref(false)

  const loadingUser = ref(false)

  // validate du lieu email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
    // dang nhap
  const handleLogin =async (credentials) => {

    const{email,password} = credentials

    if(!validateEmail(email)){
      return errorMessage.value="Email is invalid"
    }
    if(!password.length){
      return  errorMessage.value="Password cannot be emty"
    }

    loading.value = true;

    const {error, data} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      loading.value = false;
      return errorMessage.value = error.message
    }

    const {data: existingUser} = await supabase
        .from("users")
        .select()
        .eq('email',email)
        .single()
    user.value ={
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id
    }
    loading.value = false
    errorMessage.value =""
  }

  // dang ki
  const handleSignup = async (credentials) => {
      const {email, password, username} =  credentials;

      if(username.length <4){
        return  errorMessage.value="Username ngắn hơn Thạch"
      }

      if(!validateEmail(email)){
        return errorMessage.value="Email is invalid"
      }

      if(password.length <6){
        return  errorMessage.value="Password ngắn hơn Thạch"
      }
      
      loading.value =true
      // Validate if user exists//
      // kiem tra xem username ton tai chua
      const {data: userWithUsername} = await supabase
        .from("users")
        .select()
        .eq('username',username)
        .single()

      if(userWithUsername){
          loading.value = false
          return errorMessage.value = "User already exists"
      }

      errorMessage.value="";
      // dang ki voi email va password
      const {error} = await supabase.auth.signUp({
        email,
        password
      })
      if(error){
        loading.value = false
          return errorMessage.value =  error.message
      }
      else {
        await supabase.from("users").insert({
          username,
          email
        })
      }

      //lay du lieu user vua dang ki
      const {data: newUser} = await supabase
        .from("users")
        .select()
        .eq('email',email)
        .single()
      // gan du lieu user vua lay duoc 
      user.value = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }
      loading.value = false
     
  }

  const handleLogout = async () => {
     await supabase.auth.signOut()

     user.value = null
  }

  const getUser = async () => {
      loadingUser.value = true;
      const {data} = await supabase.auth.getUser();

      if(!data.user){
          loadingUser.value = false;
          return user.value=null
      } 

      const {data:userWithEmail} = await supabase
          .from("users")
          .select()
          .eq("email",data.user.email)
          .single()
          
      user.value ={
        username:userWithEmail.username,
        email:userWithEmail.email,
        id:userWithEmail.id,
      }

      loadingUser.value = false
  }


  const clearErrorMessage = () => {
    errorMessage.value =""
  }
  return {  user,
            loading,
            loadingUser,
            errorMessage, 
            handleLogin, 
            handleLogout, 
            handleSignup, 
            getUser,
            clearErrorMessage }
})