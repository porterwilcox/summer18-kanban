<template>
  <div class="board">
    <navbar v-bind:description="this.description" />
    <div class="board-body">
      <div class="container-fluid">
          <div class="spacer"></div>
        <div class="row listholder">
          <list v-bind:listData="list" v-for="list in lists" :key="list._id" />
          <form v-if="Object.keys(lists).length < 5" @submit.prevent="addList">
            <input type="text" required v-model="listTitle">
          </form>
        </div>
        <!-- <div class="listholder"> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import List from "@/components/List";
export default {
  name: "board",
  data() {
    return {
      listTitle: ""
    };
  },
  computed: {
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
        boardId: this.boardId
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
    this.$store.dispatch("getLists", this.boardId);
  },
  props: ["boardId", "description"]
};
</script>

<style scoped>
.board-body {
  margin-top: 10vh;
  height: 90vh;
}
.listholder {
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
}
input, .spacer {
  height: 5vh;
}
</style>