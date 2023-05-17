<template>
  <div class="container mt-6" v-if="sheet">
    <div class="columns">
      <div class="column is-7">
        <img src="../assets/detail.png" alt="Sheet Image">
      </div>
      <div class="column is-5">
        <div class="card py-5 px-6">
          <p class="is-size-3 title">{{ sheet.name }}</p>
          <p class="is-size-5"><b>Category :</b> {{ sheet.category }}</p>
          <p class="is-size-5"><b>Created Date :</b> {{ sheet.created_date }}</p>
          <div class="field mt-4">
            <button class="button is-success mr-4" @click="openPDF">Open PDF</button>
            <button class="button is-danger" v-if="user.role === 'admin' || user.user_id === sheet.user_id" @click="deleteSheet">Delete PDF</button>
          </div>
        </div>

        <!-- ##### Comment ##### -->
        <div class="field my-5">
          <div class="control" style="width: 100%;">
            <textarea class="textarea" placeholder="แสดงความคิดเห็น..." rows="3" v-model="newComment"></textarea>
          </div>
          <div class="control mt-3" @click="addComment()">
            <button class="button is-dark is-rounded" style="width: 100%;">
              Send
            </button>
          </div>
        </div>
        <div id="show-comment">
          <h1 class="title">Comment</h1>
          <div v-for="comment in comments" :key="comment.comment_id">
            <div class="card mb-4">
              <p class="mb-2">{{ comment.comment }}</p>
              <p class="is-size-7 mb-2 has-text-right" style="color: #bab2b5">
                {{ comment.created_date }}
              </p>
              <div class="has-text-right">
                <button
                  class="button is-danger is-outlined is-small"
                    v-if="user.role === 'admin' || user.user_id === comment.user_id"
                    @click="deleteComment(comment.comment_id)">
                  <i class="fa fa-trash fas fa-lg" aria-hidden="true"></i>
                </button>
              </div>
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
      sheet: null,
      comments: [],
      newComment: '',

    };
  },
  created() {
    this.getSheetDetails();
    this.getComments();
  },
  methods: {
    getSheetDetails() {
      const sheetId = this.$route.params.sheet_id;
      axios
        .get(`${service.sheet}/pdf/${sheetId}`)
        .then((response) => {
          this.sheet = response.data;
        })
        .catch((error) => {
          console.error('Failed to retrieve sheet details:', error);
        });
    },
    openPDF() {
      const sheetId = this.$route.params.sheet_id;
      axios
        .get(`${service.upload}/pdf/${sheetId}/file`, { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        })
        .catch((error) => {
          console.error('Failed to retrieve PDF:', error);
        });
    },
    deleteSheet() {
      const sheetId = this.$route.params.sheet_id;
      axios
        .delete(`${service.sheet}/sheet/${sheetId}`)
        .then(() => {
          router.push('/mySheet');
        })
        .catch((error) => {
          console.error('Failed to delete sheet:', error);
        });
    },
    getComments() {
      const sheetId = this.$route.params.sheet_id;
      axios
        .get(`${service.comment}/comment/${sheetId}`)
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('Failed to retrieve comments:', error);
        });
    },
    addComment() {
      const sheetId = this.$route.params.sheet_id;
      const commentData = {
        comment: this.newComment,
        sheet_id: sheetId,
        user_id: this.user.user_id
      };
      axios
        .post(`${service.comment}/comment`, commentData)
        .then(() => {
          this.newComment = ''; // Clear the textarea
          this.getComments(); // Refresh comments after adding a new one
        })
        .catch(error => {
          console.error('Failed to add comment:', error);
        });
    },
    deleteComment(commentId) {
      axios
        .delete(`${service.sheet}/comment/${commentId}`)
        .then(() => {
          // Remove the deleted comment from the comments array
          this.getComments();
        })
        .catch(error => {
          console.error('Failed to delete comment:', error);
        });
    }
  },
};
</script>

<style>
#show-comment {
  background: rgb(255, 254, 243);
  border-radius: 5px 5px;
  padding: 25px;
}
</style>