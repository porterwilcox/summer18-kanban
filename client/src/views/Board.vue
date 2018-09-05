<template>
  <div class="board">
  <lists v-bind:boardId="theBoardId" />
   </div>
</template>

<script>
import Lists from "@/components/List"
export default {
  name: "board",
  computed: {
    theBoardId() {
      return this.boardId;
    }
  },
  components: {
    Lists
  },
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  props: ["boardId"]
};
</script>