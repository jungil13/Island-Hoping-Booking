<template>
  <div class="border shadow-md shadow-black">
    <!-- Drawer Button for Mobile -->
    <button @click="toggleDrawer" class="lg:hidden p-4 text-black">
      <i class="fas fa-bars"></i> <!-- Hamburger Icon -->
    </button>

    <!-- Sidebar (Drawer) -->
    <div :class="{'block': isDrawerOpen, 'hidden': !isDrawerOpen}" class="lg:block w-64 bg-white text-white p-6 fixed inset-0 z-50 lg:relative lg:w-64 min-h-screen" data-aos="fade-right">
      <h2 class="text-2xl text-black font-extrabold font-mono mb-12">Admin Dashboard</h2>
      <div class="space-y-8 text-black font-mono font-bold text-lg">
        <button 
          @click="navigateTo('dashboard')" 
          :class="{'bg-teal-500': activeLink === 'dashboard'}"
          class="w-full text-left py-2 px-2 rounded-lg transition hover:bg-teal-400">
          <i class="fa-solid fa-chart-line"></i> Dashboard
        </button>
        <button 
          @click="navigateTo('bookings')" 
          :class="{'bg-teal-500': activeLink === 'bookings'}"
          class="w-full text-left py-2 px-2 rounded-lg transition hover:bg-teal-400">
          <i class="fa-solid fa-list-check"></i> Manage Bookings
        </button>
        <button 
          @click="navigateTo('users')" 
          :class="{'bg-teal-500': activeLink === 'users'}"
          class="w-full text-left py-2 px-2 rounded-lg transition hover:bg-teal-400">
          <i class="fa-solid fa-users"></i> Manage Users
        </button>
        <button 
          @click="navigateTo('records')" 
          :class="{'bg-teal-500': activeLink === 'records'}"
          class="w-full text-left py-2 px-2 rounded-lg transition hover:bg-teal-400">
          <i class="fa-solid fa-users"></i> Booking Records
        </button>
        <button 
          @click="navigateTo('settings')" 
          :class="{'bg-teal-500': activeLink === 'settings'}"
          class="w-full text-left px-2 px-4 rounded-lg transition hover:bg-teal-400">
          <i class="fa-solid fa-gear"></i> Settings
        </button>
      </div>
    </div>

    <!-- Overlay for Drawer on Mobile -->
    <div v-if="isDrawerOpen" @click="toggleDrawer" class="lg:hidden fixed inset-0 bg-black opacity-50 z-40"></div>

    <!-- Main Content Area -->
    <div :class="{'ml-64': !isDrawerOpen, 'lg:ml-0': isDrawerOpen}" class="transition-all duration-300 p-4">
      <!-- Content will go here -->
      <slot></slot>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const isDrawerOpen = ref(false); // State for drawer visibility
const activeLink = ref('dashboard'); // Default active link

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value; // Toggle the drawer
};

const emit = defineEmits();

const navigateTo = (section) => {
  // Emit event to parent component to change section
  activeLink.value = section; // Set the active link when a button is clicked
  emit('navigate', section);
};
</script>

<style scoped>
/* Sidebar Styling */
@media (max-width: 1024px) {
  .lg\\:block {
    display: block !important;
  }
  .lg\\:hidden {
    display: none !important;
  }
}

/* Main Content Area */
@media (max-width: 1024px) {
  .transition-all {
    transition: margin-left 0.3s ease-in-out;
  }
  .ml-64 {
    margin-left: 0 !important;
  }
  .lg\\:ml-0 {
    margin-left: 0 !important;
  }
}

/* Drawer Overlay Styling */
@media (max-width: 1024px) {
  .lg\\:hidden {
    display: none !important;
  }
}
</style>
