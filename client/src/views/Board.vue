<template>
  <div class="board">
   <form @submit.prevent="addList">
     <input type="text" required v-model="listTitle">

   </form>
   {{lists}}
  </div>
</template>

<script>
export default {
  name: "board",
  data(){
    return{
      listTitle: ''
    }
  },

  methods:{
  addList(){
    let obj = {
      title: this.listTitle,
      boardId: this.theBoardId
    }
    this.$store.dispatch('addList', obj)
  }

  },
  computed: {
    theBoardId(){
      return this.boardId
    },
    lists(){
      let filtered = this.$store.state.lists.filter(l => l.boardId == this.theBoardId)
      return filtered
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