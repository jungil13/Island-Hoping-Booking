<template>
    <div class="flex">
      <!-- Sidebar -->
      <AdminSidebar @navigate="changeSection" />
  
      <!-- Main Content -->
      <div class="flex-1">
        <AdminHeader @logout="handleLogout" />
        
        <!-- Dynamic Content Based on Section -->
        <div v-if="currentSection === 'dashboard'">
          <Dashboard />
        </div>
        <div v-if="currentSection === 'bookings'">
          <AdminBookings />
        </div>
        <div v-if="currentSection === 'users'">
          <AdminUsers />
        </div>
        <div v-if="currentSection === 'records'">
          <Records />
        </div>
        <div v-if="currentSection === 'settings'" class="mt-12"data-aos="fade-up">
         <router-link to="/" class="ml-6 p-3 bg-teal-600 text-white font-bold  rounded-full shadow-md shadow-black">Go to Page</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AdminSidebar from '@/components/AdminSidebar.vue';
  import AdminHeader from '@/components/AdminHeader.vue';
  import AdminBookings from '@/components/AdminBookings.vue';
  import AdminUsers from '@/components/AdminUsers.vue';
  import Dashboard from '@/components/Dashboard.vue';
  import Records from '@/components/Records.vue';
  
  const currentSection = ref('dashboard'); // Default section
  const changeSection = (section) => {
    currentSection.value = section;
  };
  
  const handleLogout = () => {
    // Handle logout logic here (clear local storage, redirect, etc.)
    console.log('Logging out...');
  };
  </script>
  
  <style scoped>
  /* You can add specific styles for the dashboard layout here */
  </style>
  