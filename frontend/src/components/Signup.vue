<template>
  <div>
    <h1>Sign up</h1>
    <form @submit.prevent="signup" @reset="resetForm" >
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required />
      <br />
      <label for="surname">Surname:</label>
      <input type="text" id="surname" v-model="surname" required />
      <br />
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <label for="major">Major:</label>
      <select id="major" v-model="major" required>
        <option v-for="major in majors" :value="major.major_id" :key="major.major_id">
          {{ major.name }}
        </option>
      </select>
      <br />
      <label for="studentID">Student ID:</label>
      <input type="text" id="studentID" v-model="studentID" required />
      <br />
      <button type="submit">Sign up</button>
      <button type="reset">Reset</button>
      <button @click="back">Back</button>
    </form>
  </div>
</template>
  
<script>
import axios from "axios";
import service from "../utils/backend";
import router from '@/router';

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      major: '',
      studentID: '',
      majors: [],
    };
  },
  created() {
    this.getMajor()
  },
  methods: {
    signup() {
      const model = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        major_id: this.major,
        student_no: this.studentID,
      };

      axios
        .post(`${service.authen}/signup`, model)
        .then((response) => {
          // Handle the response
          router.push('/login');
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
    getMajor() {
      axios
        .get(`${service.authen}/major`)
        .then((response) => {
          // Handle the response
          this.majors = response.data;
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
    resetForm() {
      this.name = '';
      this.surname = '';
      this.email = '';
      this.password = '';
      this.major = '';
      this.studentID = '';
    },
    back() {
      router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>