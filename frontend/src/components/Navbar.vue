<template>
  <div>
    <nav class="navbar" v-if="isAuthen && role == 'student'">
      <div id="navbar" class="navbar-menu">
        <div class="navbar-start">
          <a class="item">
            <router-link to="/" id="nav-item">Home</router-link>
          </a>

          <a class="item">
            <router-link to="/signup" id="nav-item">My Sheet</router-link>
          </a>

          <a class="item">
            <router-link to="/profile" id="nav-item">Profile</router-link>
          </a>

          <a class="item">
            <router-link to="/profile" id="nav-item">Report</router-link>
          </a>
        </div>

        <div class="navbar-end">
        <div class="navbar-item">
          <span class="button is-warning is-outlined">
            <i class="fa fa-sign-out fas fa-2x" aria-hidden="true"></i>
          </span>
        </div>
      </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  // Add any component options or logic you need
  props: ['isAuthen', 'role'],
  data() {
    return {
      name: "Navbar",
    };
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
}
</style>