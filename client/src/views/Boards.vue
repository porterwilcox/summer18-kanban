<template>
<div class="boards container-fluid">
  <navbar />
    <div class="boards-body">
      <div class="the-boards">
        <div class="card board-card" v-for="board in boards" :key="board._id">
          <router-link class="r-link" :to="{name: 'board', params: {boardId: board._id, description: board.description}}">{{board.title}}</router-link>
          <i @click="deleteBoard(board._id)" class="fas fa-trash-alt"></i>
        </div>
        <div v-if="boards.length < 20" class="addBoard">
          <form class="board-card card" id="add-card" v-if="createBoard" @submit.prevent="addBoard">
            <input type="text" placeholder="title" v-model="newBoard.title" required autofocus>
            <input type="text" placeholder="description" v-model="newBoard.description" required>
            <button class="btn-primary" type="submit">Create Board</button>
            <button @click="createBoard = !createBoard" class="btn-info">cancel</button>
          </form>
          <div v-else class="board-card card" id="add-card" @click="createBoard = !createBoard">
            <p>add a board</p><i class="fas fa-plus-circle"></i>
          </div>
        </div>
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
        description: ""
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
    boardView(boardId, description) {
      router.push();
    },
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
      this.createBoard = false;
    },
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    }
  }
};
</script>

<style>
.boards {
  background-color: #f8f9f9;
}
.boards-body {
  margin-top: 10vh;
  padding-top: 2vh;
  padding-left: 3vw;
  height: 85vh;
  background-color: #f8f9f9;
  z-index: -1;
}
.the-boards {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  z-index: -1;
}
.board-card {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
  height: 15vh;
  width: 30vh;
  margin: 2vh 2vw;
  border-radius: 2%;
  box-shadow: 1px 1px 2px #e7e7e7;
  border-radius: 4px;
  z-index: 0;
}
#add-card {
  background-color: #697c82;
  color: #f8f9f9;
}
#add-card i {
  font-size: 2rem;
  color: var(--sunshine);
}
#add-card p {
  font-size: 1.3rem;
  margin: 3% 0 0 5%;
}
#add-card button {
  height: 4.5vh;
  border-radius: 3%;
}
.card a {
  font-size: 1.3rem;
  font-weight: bold;
  color: #3b3b3b;
  margin: 3% 0 0 5%;
  width: 100%;
}
.card a:hover {
  text-decoration: none;
  color: #838282;
}
.card i {
  font-size: 2rem;
  cursor: pointer;
  margin: 3% 3% 0 0;
}
.card i:hover {
  color: var(--vermillion);
}
.addBoard h2 {
  cursor: pointer;
}
input, ::placeholder {
  background-color: transparent;
  color: #f8f9f9;
  width: 29.5vh;
}
</style>
