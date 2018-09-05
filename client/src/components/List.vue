<template>
  <div>
    {{listData.title}}
    <button @click="deleteList">Delete</button>
    <div v-for="task in tasks" :key="task._id">
      <task v-bind:taskData="task" />  
    </div>
  </div>
</template>

<script>
  import Task from '@/components/Task'

  export default {
    name: "List",
    props: ["listData"],
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      theBoardId() {
        return this.boardId;
      },
      tasks() {
        return this.$store.state.tasks
      }
    },
    components: {
      Task
    },
    methods: {
      deleteList() {
        this.$store.dispatch("deleteList", this.listData._id);
      }
    }
  };
</script>

<style scoped>
</style>