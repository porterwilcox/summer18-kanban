<template>
<div class="task">

  {{taskData}}
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
  methods: {}

};
</script>

<style>
.task {
  background-color: red;
}
</style>
