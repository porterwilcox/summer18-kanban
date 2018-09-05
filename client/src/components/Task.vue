<template>
<div class="task">
  <h3>{{taskData.title}}</h3>
  <p>{{taskData.timestamp}}</p>
  <input type="checkbox">
  <button @click="deleteTask">delete task</button>
</div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  computed: {
    tasks() {
      return this.$store.state.tasks[this.taskData.listId];
    }
  },
  methods: {
    deleteTask(){
      this.$store.dispatch('deleteTask', {
        taskId: this.taskData._id,
        listId: this.taskData.listId
      })
    }
  }
};
</script>

<style>
.task {
  background-color: red;
}
</style>
