<template>
<v-fluid class="board">
  <navbar />
  <form @submit.prevent="addList">
    <input type="text" required v-model="listTitle">
  </form>
  <v-layout class="lists" v-for="list in lists" :key="list._id">
    <list v-bind:listData="list" />
  </v-layout>
</v-fluid>
</template>

<script>
import Navbar from "@/components/Navbar"
import List from "@/components/List";
export default {
  name: "board",
  data() {
    return {
      listTitle: ""
    };
  },
  computed: {
    theBoardId() {
      return this.boardId;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: {
    List,
    Navbar
  },
  methods: {
    addList() {
      let obj = {
        title: this.listTitle,
        boardId: this.theBoardId
      };
      this.$store.dispatch("addList", obj);
    }
  },
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.dispatch("getLists", this.theBoardId);
  },
  props: ["boardId"]
};
</script>

<style>
navbar {
  overflow-x: hidden;
}
.lists{
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
}

</style>
