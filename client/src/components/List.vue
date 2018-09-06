<template>
  <div class="card">
    <h2>{{listData.title}}</h2>
    <button @click="deleteList">Delete</button>
    <form @submit.prevent="addTask">
      <input type="text" required v-model="taskTitle">
    </form>
    <div v-for="(value, key) in tasks" :key="key">
      <div v-for="task in value" :key="task._id" v-if="task.listId == listData._id">
        <task v-bind:taskData="task" />  
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task";

export default {
  name: "List",
  data() {
    return {
      taskTitle: ""
    };
  },
  props: ["listData"],
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    theBoardId() {
      return this.boardId;
    },
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    Task
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData._id);
    },
    addTask() {
      let obj = {
        title: this.taskTitle,
        listId: this.listData._id,
        timestamp: Date.now()
      };
      this.$store.dispatch("addTask", obj);
    }
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
  }
};
</script>

<style scoped>
.card {
  color: black;
  background-color: #485fb0;
  width: 19vw;
  display: flex;
  justify-content: space-evenly;
  height: 80vh;
  align-items: center;
  background: rgba(0, 0, 0, 0.199);
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 4px;
  margin: 0 .1%;
}
</style>