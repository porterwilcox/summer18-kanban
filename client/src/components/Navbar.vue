<template>
<div class="navbar">
  <router-link :to="{name: 'boards', path: '/'}"><img src="../assets/trillo.png" alt=""></router-link>
  <div v-if="this.description" class="board-details">
    <h3>{{this.title}} :</h3>
    <h4>{{this.description}}</h4>
  </div>
  <div class="user-actions">
    <h5 @click="showSettings = !showSettings"><i class="fas fa-user-circle"></i></h5>
    <div class="settings card" v-if="showSettings">
      <p>this is a test</p>
    </div>
    <button class="btn-secondary" @click="logout">Sign Out</button>
  </div>
</div>
</template>

<script>
export default {
  name: "navbar",
  props: ['description', 'title'],
  data(){
    return {
      showSettings: false
    }
  },
  computed: {
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
:root {
  --fresh: #4abdac;
  --vermillion: #fc4a1a;
  --sunshine: #f7b733;
  --clean: #dfdce3;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  opacity: .9;
  background-color: rgba(0, 0, 0, 0.253);
}
img {
  height: 10vh;
  width: auto;
}
.board-details {
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
  align-items: center;
}
h3, h4 {
  color: var(--clean);
}
.user-actions {
  display: flex;
  width: fit-content;
  flex-flow: wrap row;
  justify-content: flex-end;
  align-items: center;
}
h5 {
  color: #f7b733;
  cursor: pointer;
  margin: 5px 10px;
  font-size: 2rem;
}
h5:hover {
  color:#e4a528;
}
</style>


