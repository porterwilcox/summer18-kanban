<template>
  <drag :transfer-data="{taskId: taskData._id, oldList: taskData.listId}" class="task">
    <p class="task-title">{{taskData.title}}</p>
    <p class="task-timestamp">{{ taskData.timestamp | timeFormat }}</p>
    <div>

      <!-- button trigger modal -->
      
          <i data-toggle="modal" data-target="#newModal" class="far fa-comment-dots"></i>

      <!-- modal -->
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
        commentDescription: ""
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
      }
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
    
    
  }
  .task-title{
    font-size: 18px;
    padding: 3%;
    font-weight: bold;
  }
  .task-timestamp{
    padding: 2%;
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