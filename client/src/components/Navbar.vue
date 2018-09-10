<template>
<div class="navbar">
  <router-link :to="{name: 'boards', path: '/'}"><img src="../assets/trillo.png" alt=""></router-link>
  <h4 v-if="this.description">{{description}}</h4>
  <div class="user-actions">
    <h5 @click="settingsBlock"><i class="fas fa-user-circle"></i></h5>
    <div class="settings card" v-if="showSettings">
      <div class="name">
        <h4 v-if="!changeName" @click="changeName = !changeName">{{user.name}}</h4>
        <form v-else @submit.prevent="updateUser">
          <input type="text" v-model="userName" placeholder="new username" autofocus>
        </form>
      </div>
      <hr>
      <p @click="deleteAccount">delete account</p>
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
      showSettings: false,
      changeName: false,
      userName: ""
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
    },
    settingsBlock(){
      this.showSettings = !this.showSettings,
      this.changeName = false
    },
    updateUser(){
      let obj = {
        userId: this.user._id,
        name: this.userName
      }
      this.$store.dispatch('updateUser', obj)
      this.changeName = false
      this.userName = ''
    },
    deleteAccount(){
      if(confirm("Are you sure you want to delete your account?")){
        this.$store.dispatch("deleteAccount", this.user._id)
      }
      else {
        console.log('close one')
      }
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
  background-color: rgba(0, 0, 0, 0.253);
  z-index: 2;
}
img {
  height: 10vh;
  width: auto;
}
h4 {
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
.settings {
  position: absolute;
  top: 8vh;
  right: 1vw;
  width: 12vw;
  background-color: var(--fresh);
}
.settings h4 {
  cursor: pointer;
  margin: auto;
}
.name input {
  width: 100%;
}
.settings p {
  color: red;
}
</style>


