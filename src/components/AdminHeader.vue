<template>
  <div class="flex justify-between shadow-md shadow-black items-center p-4 bg-white text-black">
    <!-- Logo and Website Name -->
    <div class="flex items-center space-x-3">
      <img src="@/assets/img/image.png" alt="Island Hopper Logo" class="w-8 h-8 rounded-full" />
      <div class="text-xl font-bold">Island Hopper</div>
    </div>

    <!-- Admin Info and Logout -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9z2IpZagy0I6RWL80m6dFmz60PsauqPR9Bw&s" alt="Admin Avatar" class="w-8 h-8 rounded-full" />
        <span class="font-semibold">{{ adminName }}</span>
      </div>
      <button @click="confirmLogout" class="text-white py-2 px-4 bg-red-500 rounded-lg hover:bg-red-400 transition">
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'; // Import the useRouter hook

const router = useRouter(); // Initialize the router

// State for admin name
const adminName = ref('');

// Get admin name from local storage on mounted
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.name) {
    adminName.value = user.name;
  }
});

// Confirm logout with SweetAlert
const confirmLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out of your account.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log me out!'
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
  });
};

// Perform logout
const logout = () => {
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Redirect to login page
  router.push('/login');
  
  // Optionally reload the page
  window.location.reload();
};
</script>

<style scoped>
/* Navbar background color is set to white, and text color is black */
</style>
