<template>
<div class="task">
  <form @submit.prevent="addTask">
      <input type="text" required v-model="taskTitle">
  </form>
  {{taskData}}
</div>
</template>

<script>
export default {
  name: "task",
  data() {
    return {
      taskTitle: ""
    };
  },
  props: ["taskData"],
  computed: {
  tasks(){
    return this.$store.state.tasks[this.taskData.listId]
  }
},
  methods: {
      addTask(){
        let obj = {
            title: this.taskTitle,
            listId: this.theListId
        }
        this.$store.dispatch('addTask', obj)
      }
  }
};
</script>

<style>
</style>
