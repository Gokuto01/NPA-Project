<template>
  <div>
    <section class="section hero is-fullheight">
      <div class="columns is-centered">
        <div class="card p-6" style="width: 500px">
          <h2 class="title is-2 has-text-centered mb-5">Login</h2>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" placeholder="กรอกอีเมล" v-model="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="กรอกรหัสผ่าน" v-model="password">
            </div>
          </div>
          <div class="field has-text-centered my-5">
            <button class="button is-primary is-rounded is-medium" @click="login()">Login</button>
          </div>
          <div class="field has-text-centered">
            <p>
            Don't have an account? <router-link to="/signup">Sign up</router-link>
          </p>
          </div>
        </div>
      </div>
    </section>
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