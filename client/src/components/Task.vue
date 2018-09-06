<template>
  <!-- <drag :transfer-data="taskData._id" class="task"> -->
  <drag :transfer-data="{taskId: taskData._id, oldList: taskData.listId}" class="task">
    <!-- @dragend="passTargetTask" -->
    <h3>{{taskData.title}}</h3>
    <select @change="changeList">
      <option selected disabled>move to a new list</option>
      <option v-for="(value, key) in lists" :key="key" :value="key" v-if="value._id != taskData.listId">{{value.title}}</option>
    </select>
    <p>{{ taskData.timestamp | timeFormat }}</p>
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
        <p>{{comment.timestamp | timeFormat}}</p>
        <button @click="deleteComment(comment._id)">Delete Comment</button>
      </div>
    </div>
    <button @click="deleteTask">delete task</button>
  </drag>
</template>

<script>
let moment = require("moment");

export default {
  name: "task",
  props: ["taskData", "targetListId"],
  data() {
    return {
      showCommentForm: false,
      commentDescription: "",
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.taskData.listId];
    },
    comments() {
      return this.$store.state.comments;
    },
    lists() {
      return this.$store.state.lists;
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
    },
    deleteComment(commentId) {
      let obj = {
        commentId,
        taskId: this.taskData._id
      };
      this.$store.dispatch("deleteComment", obj);
    },
    changeList() {
      let obj = {
        listId: this.targetListId,
        oldList: this.taskData.listId,
        taskId: this.taskData._id
      };
      this.$store.dispatch("changeList", obj);
    },
    // passTargetTask(transferData, nativeEvent) {
    //   console.log(nativeEvent)
    //   this.$emit("passTaskId", this.taskData._id);
    // },
    // initiateChange(transferData, nativeEvent) {
    //   let obj = {
    //     listId: this.listData._id,
    //     oldList: this.oldListId,
    //     taskId: this.taskId
    //   };
    //   this.$store.dispatch("changeList", obj);
    // }
  },
  filters: {
    timeFormat: function(date) {
      if (
        moment(date)
          .fromNow()
          .includes("hours") &&
        parseInt(moment(date).fromNow()) > 23
      ) {
        return moment(date).format("ddd MMM Do, YYYY");
      }
      return moment(date).fromNow();
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