<template>
  <div class="boards container-fluid">
    <navbar />
      <div class="boards-body">
      <div class="addBoard">
        <form v-if="createBoard" @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required>
          <input type="text" placeholder="description" v-model="newBoard.description" required>
          <button class="btn-primary" type="submit">Create Board</button>
          <button @click="createBoard = !createBoard" class="btn-info">cancel</button>
        </form>
        <h2 v-else @click="createBoard = !createBoard">add a board</h2>
      </div>
      <div class="card" v-for="board in boards" :key="board._id">
        <router-link class="r-link" :to="{name: 'board', params: {boardId: board._id, description: board.description}}">{{board.title}}</router-link>
        <i @click="deleteBoard(board._id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "boards",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
      createBoard: false
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  components: {
    Navbar
  },
  methods: {
    boardView(boardId, description){
      router.push()
    },
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    }
  }

};
</script>

<style>
.boards-body {
  margin-top: 10vh;
  height: 90vh;
}
.card {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
  height: 10vh;
  width: fit-content;
}
.card a {
  font-size: 3rem;
  color: #3b3b3b
}
.card a:hover {
  text-decoration: none;
  color: #838282  
}
.card i {
  font-size: 3rem;
  cursor: pointer;  
}
.addBoard h2 {
  cursor: pointer;
}
</style>
