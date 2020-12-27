<template>
  <div class="home">
    <h1>HOME</h1>
    {{this.$store.state.recorded_username}}
    <router-link to="/login">login</router-link>
  </div>
</template>
