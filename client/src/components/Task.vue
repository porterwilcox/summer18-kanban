<template>
<div class="task">
<form @submit.prevent="addTask">
    <input type="text" required v-model="taskTitle">
</form>
<div v-for="(value, key) in tasks" :key="key">
 <h2>{{value.title}}</h2>
 <p>{{value.timestamp}}</p>
 <input type="checkbox">
</div>



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
  props: ["listId"],
  computed: {
  theListId(){
      return this.listId
  },
  tasks(){
    return this.$store.state.tasks
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
  },
  mounted(){
      this.$store.dispatch('getTasks', this.theListId)
  }
};
</script>

<style>
</style>
