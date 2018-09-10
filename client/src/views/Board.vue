<template>
  <div class="board">
    <navbar v-bind:description="this.description" />
    <div class="board-body">
      <div class="container-fluid">
          <div class="spacer"></div>
        <div class="row listholder">
          <list v-bind:listData="list" v-for="list in lists" :key="list._id" />
          <div class="add-list" v-if="Object.keys(lists).length < 5">
            <h3>your new list</h3>
            <form @submit.prevent="addList">
              <input type="text" required v-model="listTitle" placeholder="add a list" maxlength="25">
            </form>
          </div>
        </div>
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
      this.listTitle = ''
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
  margin-left: 2vw;
}
.listholder {
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
}
input, .spacer {
  height: 5vh;
}
.add-list {
  color: #f8f9f9;
  background-color: #697c82;
  width: 19vw;
  height: 15vh;
  align-items: center;
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 2%;
  position: relative;
}
.add-list h3 {
  color: var(--sunshine);
  position: absolute;
  top: 5px;
  left: 10px;
  border-bottom: 1px solid var(--sunshine);
}
.add-list input {
  position: absolute;
  top: 50%;
  width: 80%;
  left: 10%;
  color: var(--sunshine)
}
</style>