<template>
<div>
     <form @submit.prevent="addList">
      <input type="text" required v-model="listTitle">
   </form>
     <div v-for="(value, key) in lists" :key="key">
     <h1>
     {{value.title}}
     </h1>
    <button @click="deleteList(value._id)">Delete</button>
     </div>
     <div>{{boardId}}</div>
</div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      listTitle: ""
    };
  },
  props: ["boardId"],
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    theBoardId() {
      return this.boardId;
    }
  },
  methods: {
    addList() {
      let obj = {
        title: this.listTitle,
        boardId: this.theBoardId
      };
      this.$store.dispatch("addList", obj);
    },
    deleteList(listId) {
      this.$store.dispatch("deleteList", listId);
    }
  },
  mounted() {
    this.$store.dispatch("getLists", this.theBoardId);
  }
};
</script>

<style scoped>
</style>
