<template>
    <div v-if="sheet">
        <h1>{{ sheet.name }}</h1>
        <img src="../assets/detail.png" alt="Sheet Image">
        <p>Category: {{ sheet.category }}</p>
        <p>Created Date: {{ sheet.created_date }}</p>
        <button @click="openPDF">Open PDF</button>
        <button v-if="user.role === 'admin' || user.user_id === sheet.user_id" @click="deleteSheet">Delete PDF</button>

        <div>
            <h1>Comments</h1>
            <div v-for="comment in comments" :key="comment.comment_id">
                <p>{{ comment.comment }}</p>
                <p>{{ comment.created_date }}</p>
                <button v-if="user.role === 'admin' || user.user_id === comment.user_id" @click="deleteComment(comment.comment_id)">Delete</button>
            </div>
        </div>

        <div>
            <h3>Add Comment</h3>
            <input type="text" v-model="newComment" placeholder="comment">
            <button @click="addComment">Add</button>
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
  
<style scoped></style>