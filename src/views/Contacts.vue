<template>
  <div class="container">This is your {{ email }}</div>
</template>

<script>
export default {
  computed: {
    email() {
      return this.$store.getters.users;
    },
  },
  created() {
    this.$store.dispatch("fetchUser");
  },
};
</script>
