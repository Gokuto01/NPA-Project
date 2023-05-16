<template>
  <div>
    <div>
      <input type="text" v-model="searchText" placeholder="Search">
      <label for="category">Category:</label>
      <select id="category" v-model="category">
        <option value="">All</option>
        <option v-for="category in categories" :value="category.name" :key="category.category_id">
          {{ category.name }}
        </option>
      </select>
      <label for="sort">Sort By:</label>
      <select id="sort" v-model="sortOption">
        <option value="name">Name</option>
        <option value="created_date">Created Date</option>
      </select>
    </div>

    <div v-for="sheet in sortedSheets" :key="sheet.sheet_id" class="card">
      <router-link :to="`/Detail/${sheet.sheet_id}`">
        <div>{{ sheet.name }}</div>
        <img src="../assets/sheet.jpg" alt="Sheet Image">
        <div>{{ sheet.created_date }}</div>
        <div>{{ sheet.category }}</div>
      </router-link>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import service from "../utils/backend";

export default {
  data() {
    return {
      category: '',
      categories: [], // Replace with actual categories from API
      sheets: [],
      sortOption: 'name',
      searchText: '',
    };
  },
  created() {
    this.getCategories();
    this.getSheets();
  },
  computed: {
    filteredSheets() {
      const searchTerm = this.searchText.toLowerCase();
      const cat = this.category;
      if (cat === "") {
        return this.sheets.filter(sheet => {
          // Filter the sheets based on the search text
          return sheet.name.toLowerCase().includes(searchTerm);
        });
      } else {
        return this.sheets.filter(sheet => {
          // Filter the sheets based on the search text and category
          const nameMatch = sheet.name.toLowerCase().includes(searchTerm);
          const categoryMatch = sheet.category.toLowerCase() === cat.toLowerCase();
          return nameMatch && categoryMatch;
        });
      }
    },
    sortedSheets() {
      const sortOption = this.sortOption;
      const filteredSheets = this.filteredSheets;

      return filteredSheets.slice().sort((a, b) => {
        if (sortOption === 'name') {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else if (sortOption === 'created_date') {
          return new Date(a.created_date) - new Date(b.created_date);
        }
        return 0;
      });
    },
  },
  methods: {
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
        .get(`${service.sheet}/sheet`)
        .then(response => {
          this.sheets = response.data;
        })
        .catch(error => {
          console.error('Failed to retrieve sheets:', error);
        });
    },
  }
}
</script>

  
<style scoped>
/* Add custom styles for the home page */
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>