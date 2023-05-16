<template>
    <div>
        <h1>Profile Page</h1>
        <div>
            <p><strong>Name:</strong><input v-model="profile.name" /></p>
            <p><strong>Surname:</strong><input v-model="profile.surname" /></p>
            <p><strong>Email:</strong><input v-model="profile.email" /></p>
            <p><strong>Student Id:</strong><input v-model="profile.student_no" /></p>
            <label for="major">Major:</label>
            <select id="major" v-model="this.profile.major" required>
                <option v-for="major in majors" :value="major.major_id" :key="major.major_id">
                    {{ major.name }}
                </option>
            </select>
            <label><strong>Information:</strong></label>
            <textarea v-model="profile.information" rows="5"></textarea>
        </div>
        <div>
            <button @click="editProfile">Edit Profile</button>
            <button @click="showModal = true">Change Password</button>
            <button @click="logout">Logout</button>
        </div>

        <!-- Modal -->
        <div class="modal" v-if="showModal">
            <h2>Change Password</h2>
            <label for="password">New Password:</label>
            <input type="password" id="password" v-model="password" />
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" />
            <button @click="updatePassword">Save</button>
            <button @click="cancelModal">Cancel</button>
            <p v-if="passwordMismatch" style="color: red;">Passwords do not match.</p>
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
};
</script>
  
<style scoped>
/* Add custom styles for the profile page */
</style>