<template>
  <div>
    <section class="section hero is-fullheight">
      <div class="columns is-centered">
        <div class="card p-6" style="width: 500px">
          <h2 class="title is-2 has-text-centered mb-5">Sign up</h2>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="กรอกชื่อ" v-model="name">
            </div>
          </div>
          <div class="field">
            <label class="label">Surname</label>
            <div class="control">
              <input class="input" type="text" placeholder="กรอกนามสกุล" v-model="surname">
            </div>
          </div>
          <div class="field">
            <div class="columns">
              <div class="column is-8">
                <label class="label">Student ID</label>
                <div class="control">
                  <input class="input" type="text" placeholder="กรอกรหัสนักศึกษา" v-model="studentID">
                </div>
              </div>
              <div class="column is-4">
                <label class="label">Major</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="major">
                        <option disabled>-- สาขา --</option>
                        <option v-for="major in majors" :value="major.major_id" :key="major.major_id">
                        {{ major.name }}
                      </option>
                      </select>
                    </div>
                  </div>
              </div>
            </div>
          </div>
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
            <button class="button is-success is-rounded is-medium mr-3" @click="signup()">Sign up</button>
            <button class="button is-warning is-rounded is-medium" @click="resetForm()">Reset</button>
          </div>
          <div class="field has-text-centered">
            <p>
              Want to go back to the login page? <router-link to="/login">Back</router-link>
          </p>
          </div>
        </div>
      </div>
    </section>

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
      major: '-- สาขา --',
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
      this.major = '-- สาขา --';
      this.studentID = '';
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>