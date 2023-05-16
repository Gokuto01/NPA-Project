<template>
  <div>
    <h1 class="title is-2 has-text-centered mt-5">
      Profile
    </h1>
    <div class="hero is-fullheight">
      <div id="detail_card" class="p-6">
        <div class="columns">
          <!-- ######## ส่วน Detail ########-->
          <div class="column is-6">
            <p class="is-size-4 mb-2">
              <strong>Name : </strong>
              <span id="text_color">{{ profile.name }}</span>
            </p>
            <p class="is-size-4 mb-2">
              <strong>Student Id : </strong>
              <span id="text_color">{{ profile.student_no }}</span>
            </p>
            <p class="is-size-4 mb-2">
              <strong>Email : </strong>
              <span id="text_color">{{ profile.email }}</span>
            </p>
          </div>
          <div class="column is-6">
            <p class="is-size-4 mb-2">
              <strong>Surname : </strong>
              <span id="text_color">{{ profile.surname }}</span>
            </p>
            <p class="is-size-4 mb-2" v-for="major in majors" :value="major.major_id" :key="major.major_id">
              <strong v-if="profile.major == major.major_id">Major : </strong>
              <span id="text_color" v-if="profile.major == major.major_id">{{ major.name }}</span>
            </p>
            <p class="is-size-4 mb-2">
              <strong>Information :</strong>
              <span id="text_color">{{ profile.information }}</span>
            </p>
          </div>
        </div>
        <!-- ######## ส่วน Btn ########-->
        <div id="btn" class="field has-addons mt-5">
          <div class="button is-dark is-light is-rounded mr-3" @click="showEditProfile = true">
            Edit Profile
          </div>
          <div class="button is-warning is-light is-rounded mr-3" @click="showModal = true">
            Change Password
          </div>
        </div>

        <!-- ###### ส่วน New Password ###### -->
        <div v-if="showModal">
          <div class="field">
            <label class="label is-size-5">New Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="กรอกรหัสผ่านใหม่" v-model="password">
            </div>
          </div>
          <div class="field">
            <label class="label is-size-5">Confirm Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="ยืนยันรหัสผ่านใหม่" v-model="confirmPassword">
            </div>
          </div>
          <!-- ######## ส่วน Btn ########-->
          <div id="btn" class="field has-addons mt-5">
            <div class="button is-primary is-rounded is-medium mr-3" @click="updatePassword()">
              Save
            </div>
            <div class="button is-danger is-rounded is-medium mr-3" @click="cancelModal()">
              Cancel
            </div>
          </div>
          <p v-if="passwordMismatch" style="color: red;">Passwords do not match.</p>
        </div>
      </div>
    </div>

    <!-- ###### ส่วน Edit Profile ###### -->
    <div class="modal" :class="[showEditProfile ? 'is-active': 'hidden']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Profile</p>
          <button class="delete" aria-label="close" @click="cancelEdit()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="กรอกชื่อ" v-model="profile.name">
            </div>
          </div>
          <div class="field">
            <label class="label">Surname</label>
            <div class="control">
              <input class="input" type="text" placeholder="กรอกนามสกุล" v-model="profile.surname">
            </div>
          </div>
          <div class="field">
            <div class="columns">
              <div class="column is-8">
                <label class="label">Student ID</label>
                <div class="control">
                  <input class="input" type="text" placeholder="กรอกรหัสนักศึกษา" v-model="profile.student_no">
                </div>
              </div>
              <div class="column is-4">
                <label class="label">Major</label>
                <div class="control">
                  <div class="select">
                    <select v-model="this.profile.major">
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
              <input class="input" type="email" placeholder="กรอกอีเมล" v-model="profile.email">
            </div>
          </div>
          <div class="field">
            <label class="label">Information</label>
            <div class="control">
              <textarea class="textarea" placeholder="กรอกข้อมูล" v-model="profile.information" rows="5"></textarea>
            </div>
          </div>
        </section>
        <!-- ######## ส่วน Btn ########-->
        <footer class="modal-card-foot">
          <button class="button is-success" @click="editProfile()">Save changes</button>
          <button class="button" @click="cancelEdit()">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import service from "../utils/backend";
import router from '@/router';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profile: {
        name: "",
        surname: "",
        email: "",
        student_no: "",
        major: "",
        information: "",
      },
      majors: [],
      password: "",
      confirmPassword: "",
      showModal: false,
      showEditProfile: false,
      passwordMismatch: false
    };
  },
  created() {
    // Fetch the user profile data from an API or local storage
    // and assign it to the profile object
    this.getProfile();
    this.getMajor();
  },
  methods: {
    updatePassword() {
      if (this.password != this.confirmPassword) {
        this.passwordMismatch = true
      }
      else {
        this.passwordMismatch = false
        const model = {
          password: this.password,
          user_id: this.user.user_id
        };

        axios
          .put(`${service.user}/password`, model)
          .then((response) => {
            // Handle the response
            this.showModal = false;
            this.password = ""
            this.confirmPassword = ""
          })
          .catch((error) => {
            // Handle the error
            console.error(error);
          });
      }
    },
    cancelModal() {
      this.showModal = false;
      this.password = ""
      this.confirmPassword = ""
      this.passwordMismatch = false
    },
    cancelEdit(){
      this.showEditProfile = false;
    },
    editProfile() {
      const model = {
        name: this.profile.name,
        surname: this.profile.surname,
        email: this.profile.email,
        student_no: this.profile.student_no,
        major: this.profile.major,
        information: this.profile.information,
        user_id: this.user.user_id
      };

      axios
        .put(`${service.user}/profile/${this.user.role}`, model)
        .then((response) => {
          // Handle the response
          this.showEditProfile = false;
          this.getProfile();
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
    getProfile() {
      axios
        .get(`${service.user}/profile/${this.user.role}`, {
          params: {
            user_id: this.user.user_id,
          },
        })
        .then((response) => {
          // Handle the response
          this.profile.name = response.data.name;
          this.profile.surname = response.data.surname;
          this.profile.email = response.data.email;
          this.profile.student_no = response.data.student_no;
          this.profile.information = response.data.information;
          this.profile.major = response.data.major_id
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
  },
};
</script>

<style>
#detail_card {
  margin: 10px auto;
  background: #ffd76a9d;
  width: 55%;
  border-radius: 50px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.351);
}

#btn {
  display: flex;
  justify-content: center;
}
</style>