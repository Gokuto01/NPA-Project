<template>
  <div class="container is-max-desktop">
    <div class="columns my-5">
      <!-- ##### Category ##### -->
      <div class="column">
        <div class="field has-addons">
          <div class="control">
            <p class="button is-static is-rounded">Category : </p>
          </div>
          <div class="control">
            <div class="select is-rounded ">
              <select v-model="category">
                <option value="">All</option>
                <option v-for="category in categories" :value="category.name" :key="category.category_id">
                  {{ category.name }}
              </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- ##### Sort By ##### -->
      <div class="column">
        <div class="field has-addons">
          <div class="control">
            <p class="button is-static is-rounded">Sort By : </p>
          </div>
          <div class="control">
            <div class="select is-rounded ">
              <select v-model="sortOption">
                <option value="name">Name</option>
                <option value="created_date">Created Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- ##### search ##### -->
      <div class="column">
        <div class="field has-addons">
          <p class="control search_input">
            <input
              v-model="searchText"
              class="input is-rounded"
              type="text"
              placeholder="Search"
              style="width: 255px;"
            />
          </p>
          <p class="control" @click="getProducts()">
            <button class="button is-dark is-rounded">
              <i class="fa fa-search"></i>
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- ###### card PDF ##### -->
    <div class="hero is-fullheight">
      <div id="col-card" class="columns">
        <div class="column is-4" v-for="sheet in sortedSheets" :key="sheet.sheet_id">
          <div class="card pb-2">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="../assets/sheet.jpg" alt="Sheet Image">
              </figure>
            </div>
            <div class="card-content has-text-centered">
              <p class="is-size-5 title">
                {{ sheet.name }}
              </p>
              <p class="is-size-6 subtitle mb-2">
                {{ sheet.category }}
              </p>
              <p class="is-size-7 mb-5" style="color: #bab2b5">
                Date : {{ sheet.created_date }}
              </p>
              <router-link :to="`/Detail/${sheet.sheet_id}`">
                <button
                  class="button is-rounded mb-2"
                  style="
                    color: #f7f9fb;
                    background-color: #DD571C;
                    width: 100%;
                    "
                >
                  Read
                </button>
              </router-link>
            </div>
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
#btn-read {
  margin: auto;
}
#col-card {
  display: flex;
  flex-wrap: wrap;
}

</style>