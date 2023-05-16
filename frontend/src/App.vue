<template>
  <div>
    <Navbar :isAuthen="isAuthenticated" :role="user.role" />
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import service from './utils/backend';
import Navbar from "./components/Navbar.vue";

export default ({
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        // Set the user object with the required props
        user_id: 0,
        role: ''
      },
      isAuthenticated: false
    };
  },
  watch: {
    $route() {
      this.setProps();
    }
  },
  methods: {
    setProps() {
      const token = localStorage.getItem('npaToken');

      if (token) {
        axios.get(`${service.authen}/login`, {
          params: {
            token: token, // Replace with the actual token value
          },
        })
          .then(response => {
            // Handle the response
            this.user.user_id = response.data.user_id
            this.user.role = response.data.role
            this.isAuthenticated = true
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      }
      else {
        this.isAuthenticated = false
      }
    }
  },
});
</script>

<style>
body {
  background: #fdc5725f;
  font-family: "Itim", cursive;
}
/* Add custom styles for the navigation bar */
nav {
  background: #333;
  color: #fff;
}

nav ul {
  display: flex;
  list-style-type: none;
}

nav ul li {
  margin-right: 1rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>