<template>
  <div class="board">
    <navbar />
    
    <form @submit.prevent="addList">
      <input type="text" required v-model="listTitle">
    </form>
    <div v-for="list in lists" :key="list._id">
      <list v-bind:listData="list" />
    </div>
  </div>
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