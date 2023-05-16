<template>
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>

        <label for="category">Category:</label>
        <select id="category" v-model="category" required>
            <option v-for="category in categories" :value="category.category_id" :key="category.category_id">{{
                category.name }}</option>
        </select>

        <label for="file">File:</label>
        <input type="file" id="file" @change="onFileChange" required>

        <button @click="addSheet">Add</button>

        <div v-for="sheet in sheets" :key="sheet.sheet_id" class="card">
            <router-link :to="`/Detail/${sheet.sheet_id}`">
                <div>{{ sheet.name }}</div>
                <img src="../assets/sheet.jpg" alt="Sheet Image">
                <div>{{ sheet.created_date }}</div>
                <div>{{ convertToName(sheet.category_id) }}</div>
            </router-link>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import service from "../utils/backend";

export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            name: '',
            category: '',
            file: null,
            categories: [], // Replace with actual categories from API
            sheets: [],
        };
    },
    created() {
        this.getCategories();
        this.getSheets();
    },
    methods: {
        onFileChange(event) {
            this.file = event.target.files[0];
        },
        addSheet() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('category', this.category);
            formData.append('file', this.file);
            formData.append('user_id', this.user.user_id);

            axios
                .post(`${service.upload}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    // Handle success
                    console.log('Sheet added successfully:', response.data);
                    // Reset form fields
                    this.name = '';
                    this.category = '';
                    this.file = null;
                    this.getSheets();
                })
                .catch(error => {
                    // Handle error
                    console.error('Failed to add sheet:', error);
                });
        },
        getCategories() {
            axios
                .get(`${service.upload}/category`)
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error('Failed to retrieve categories:', error);
                });
        },
        getSheets() {
            axios
                .get(`${service.sheet}/pdf`, {
                    params: {
                        user_id: this.user.user_id
                    }
                })
                .then(response => {
                    this.sheets = response.data;
                })
                .catch(error => {
                    console.error('Failed to retrieve sheets:', error);
                });
        },
        convertToName(id) {
            const category = this.categories.find(cat => cat.category_id === id);
            return category ? category.name : '';
        },
    }
};
</script>
.card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
<style scoped></style>