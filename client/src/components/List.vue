<template>
<drop @drop="changeList" class="card">
  <h3>{{listData.title}}</h3>
  <i class="far fa-trash-alt" @click="deleteList"></i>
  <form @submit.prevent="addTask">
    <input type="text" required v-model="taskTitle" placeholder="add a task" maxlength="40">
  </form>
  <div class="task-container">
    <div v-for="(value, key) in tasks" :key="key">
      <div v-for="task in value" :key="task._id" v-if="task.listId == listData._id">
        <task :taskData="task"/>
      </div>
    </div>
  </div>
</drop>
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
      this.taskTitle = ''
    },
    changeList(data) {
      let obj = {
        listId: this.listData._id,
        oldList: data.oldList,
        taskId: data.taskId
      };
      this.$store.dispatch("changeList", obj);
    }
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
  }
};
</script>

<style scoped>
:root {
  --fresh: #4abdac;
  --vermillion: #fc4a1a;
  --sunshine: #f7b733;
  --clean: #dfdce3;
}
.card {
  color: black;
  background-color: var(--clean);
  width: 19vw;
  display: flex;
  justify-content: space-evenly;
  height: 80vh;
  align-items: center;
  /* background: rgba(0, 0, 0, 0.199); */
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 4px;
  margin: 0 0.1%;
  position: relative;
}
.task-container {
  margin-top: 80px; 
  height: 70vh;
  overflow-y: scroll;
}
.task-container::-webkit-scrollbar {
  display: none;
}
h3 {
  position: absolute;
  top: 5px;
  left: 10px;
  border-bottom: 1px solid black;
}
i {
  position: absolute;
  top: 0;
  right: 5px;
}
form {
  position: absolute;
  top: 50px;
  width: 100%;
}
</style>