<template>
  <div class="board">
    {{boardId}}
  </div>
</template>

<script>
export default {
  name: "board",
  // data(){
  //   return{
  //     boardId: boardId
  //   }
  // },
  computed: {
    theBoardId(){
      return this.boardId
    }
  },
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted(){
    if(!this.lists){
      this.$store.dispatch('getLists', this.theBoardId)
    }
  },
  props: ["boardId"]
};
</script>