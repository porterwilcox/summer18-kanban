<template>
  <div class="task">
    <h3>{{taskData.title}}</h3>
    <p>{{ taskData.timestamp | moment("ddd, h:mma") }}</p>
    <div>
      <div v-if="!showCommentForm">
        <p @click="showCommentForm = !showCommentForm">add comment</p>
      </div>
      <div v-else>
        <form @submit.prevent="addComment">
          <input type="text" v-model="commentDescription" autofocus @focusout="showCommentForm = !showCommentForm">
        </form>
      </div>
    </div>
    <div v-for="(value, key) in comments" :key="key" class="comments">
      <div v-for="comment in value" :key="comment._id" v-if="comment.taskId == taskData._id">
        <h5>{{comment.description}}</h5>
        <p>{{ comment.timestamp | moment("h:mma") }}</p>
      </div>
    </div>
    <button @click="deleteTask">delete task</button>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {
      showCommentForm: false,
      commentDescription: ""
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.taskData.listId];
    },
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", {
        taskId: this.taskData._id,
        listId: this.taskData.listId
      });
    },
    addComment() {
      let obj = {
        description: this.commentDescription,
        taskId: this.taskData._id,
        timestamp: Date.now()
      };
      this.$store.dispatch("addComment", obj);
      this.commentDescription = "";
      this.showCommentForm = false;
    }
  },
  mounted() {
    this.$store.dispatch("getComments", this.taskData._id);
  }
};
</script>

<style>
.task {
  background-color: #e7d5be;
}
.comments {
  background-color: #f4f0f0;
}
p {
  cursor: pointer;
}
</style>