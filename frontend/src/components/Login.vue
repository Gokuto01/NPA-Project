<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <router-link to="/signup">Sign up</router-link>
    </p>
  </div>
</template>
  
<script>
import axios from 'axios';
import service from '../utils/backend';
import router from '@/router';

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const model = {
        email: this.email,
        password: this.password,
      };

      axios.post(`${service.authen}/login`, model)
        .then(response => {
          // Handle the response
          localStorage.setItem("npaToken", response.data);
          router.push('/');
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>