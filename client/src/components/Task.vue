<template>
  <drag :transfer-data="{taskId: taskData._id, oldList: taskData.listId}" class="task">
    {{taskData._id}}
    <div class="task-details">
      <p class="task-title">{{taskData.title}}</p>
      <p class="task-timestamp">{{ taskData.timestamp | timeFormat }}</p>
    </div>
    <div class="task-buttons">
      <div class="comment-bubble">      
        <i @click="actualTaskId = taskData._id" data-toggle="modal" data-target="#newModal" class="far fa-comment-dots"></i>
        <div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-labelledby="newModalTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newModalTitle">Comments</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addComment">
                  <input placeholder="Add a comment" type="text" v-model="commentDescription" autofocus @focusout="showCommentForm = !showCommentForm">
                </form>             
                <div v-for="(value, key) in comments" :key="key" class="comments">
                  <div v-for="comment in value" :key="comment._id" v-if="comment.taskId == taskData._id">
                    {{comment.taskId}}
                    <p class="commentD">{{comment.description}}</p>
                    <p>{{comment.timestamp | timeFormat}}</p>
                    <i class="far fa-trash-alt" type="button" @click="deleteComment(comment._id)"></i>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i class="far fa-trash-alt trashcan" type="button" @click="deleteTask"></i>
    </div>
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
        actualTaskId: ''
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
        console.log(obj)
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
      }
    },
    filters: {
      timeFormat: function (date) {
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
    background-color: #f9f9f9;
    border: black;
    border-style: solid;
    border-width: 1px;
    border-radius: 10%;
    height: fit-content;
    width: 18.5vw;
    display: flex;
    flex-flow: wrap row;    
  }
  .task-details {
    display: flex;
    flex-flow: wrap column;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .task-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: -10px;
    margin-left: 5px;
  }
  .task-timestamp{
    margin-bottom: -10px;
    margin-left: 5px;
  }
  .task-buttons {
    display: flex;
    flex-flow: wrap row;
    width: 100%;
    justify-content: flex-end;
  }
  .comment-bubble {
    margin-right: 10px;
    margin-top: 5px;
  }
  .comments {
    background-color: #f9f9f9;
  }
  p {
    cursor: pointer;
  }
  input{
    color: #3b3b3b;
  }
  .commentD{
    font-size: 20px;
  }

  i{
font-size: 5vh;
  }

  
</style>