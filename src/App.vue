<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute(); // Access the current route
</script>

<template>
  <!-- Conditionally render Navbar based on the current route -->
  <Navbar v-if="!route.meta.hideNavbar" />
  
  <RouterView />
</template>
