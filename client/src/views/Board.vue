<template>
  <div class="board">
   <form @submit.prevent="addList">
     <input type="text" required v-model="listTitle">

   </form>
   <div v-for="(value, key) in lists" :key="key">
     {{value.title}}
   </div>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      listTitle: ""
    };
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
  computed: {
    theBoardId() {
      return this.boardId;
    },
    lists() {
      console.log('you are getting the list from state')
      return this.$store.state.lists;
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