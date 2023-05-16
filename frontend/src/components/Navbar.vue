<template>
  <div>
    <nav class="navbar" v-if="isAuthen">
      <div id="navbar" class="navbar-menu">
        <div class="navbar-start">
          <a class="item">
            <router-link to="/" id="nav-item">Home</router-link>
          </a>

          <a class="item">
            <router-link to="/mySheet" id="nav-item">My Sheet</router-link>
          </a>

          <a class="item" v-if="role=='student'">
            <router-link to="/profile" id="nav-item">Profile</router-link>
          </a>

          <a class="item" v-if="role=='admin'">
            <router-link to="/profile/admin" id="nav-item">Profile</router-link>
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <span class="button is-warning is-outlined" @click="logout()">
              <i class="fa fa-sign-out fas fa-2x" aria-hidden="true"></i>
            </span>
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import service from "../utils/backend";
import router from '@/router';

export default {
  // Add any component options or logic you need
  props: ['isAuthen', 'role'],
  data() {
    return {
      name: "Navbar",
    };
  },
  methods: {
    logout() {
      const model = {
        token: localStorage.getItem("npaToken"),
      };
      axios
        .post(`${service.authen}/logout`, model)
        .then((response) => {
          // Handle the response
          localStorage.removeItem("npaToken");
          router.push('/login');
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
  },
}
</script>

<style>
#navbar {
  background: #80400B;
  font-size: 20px;
}

/* .navbar-start {
  margin: 0 auto;
} */
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
}

.item:hover {
  background: #FC6A03;
}

#nav-item {
  color: #ffffff;
}</style>