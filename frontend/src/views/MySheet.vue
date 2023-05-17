<template>
  <div class="container is-max-widescreen">
    <div class="columns mt-5">
      <!-- ###### card PDF ##### -->
      <div class="column is-8">
        <div class="hero is-fullheight">
          <div id="col-card" class="columns">
            <div class="column is-4" v-for="sheet in sheets" :key="sheet.sheet_id">
              <div class="card pb-2">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="../assets/sheet.jpg" alt="Sheet Image">
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <p class="is-size-6 title">
                    {{ sheet.name }}
                  </p>
                  <p class="is-size-7 subtitle mb-2">
                    {{ convertToName(sheet.category_id) }}
                  </p>
                  <p class="is-size-7 mb-5" style="color: #bab2b5">
                    Date : {{ sheet.created_date }}
                  </p>
                  <router-link :to="`/Detail/${sheet.sheet_id}`">
                    <button class="button is-rounded mb-2" style="
                    color: #f7f9fb;
                    background-color: #DD571C;
                    width: 100%;
                    ">
                      Read
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ###### Add PDF ##### -->
      <div class="column is-4">
        <div id="add-card" class="card p-6">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="กรอกชื่อ" v-model="name">
            </div>
          </div>
          <div class="field">
            <label class="label">Category</label>
              <div class="control">
                <div class="select">
                  <select v-model="category" style="width: 300px;">
                    <option value="" disabled>--- ประเภท ---</option>
                    <option v-for="category in categories" :value="category.category_id" :key="category.category_id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field mb-6">
            <label class="label">File</label>
            <div class="control">
              <input class="input" type="file" @change="onFileChange">
            </div>
          </div>
          <div class="field has-text-centered">
            <button class="button is-dark is-rounded is-medium px-6" @click="addSheet()">Add</button>
          </div>
        </div>
      </div>
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
<style>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

#col-card {
display: flex;
flex-wrap: wrap;
}

#add-card {
  background: #fff9e9e3;
}

</style>