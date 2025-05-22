<template>
  <nav class="fixed top-0 left-0 w-full bg-sky-600 shadow-md border-b z-50 transition-all duration-300 ease-in-out">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="@/assets/img/image.png" alt="Island Hopper Logo"
          class="w-12 h-12 mr-2 rounded-full border shadow-md transition-transform transform hover:scale-110">
        <RouterLink to="/" class="text-xl font-bold text-white font-mono hover:text-gray-200 transition-colors">Island
          Hopper</RouterLink>
      </div>

      <!-- User Avatar or Login/Sign-Up Buttons -->
      <div class="flex space-x-4 relative">
        <div v-if="isLoggedIn" class="flex items-center">
          <!-- Avatar -->
          <router-link to="/book" class="bg-white p-2 mr-6 rounded-xl font-mono">Book Now!</router-link>
          <div @click="toggleDropdown"
            class="w-8 h-8 rounded-full bg-gray-500 text-white border flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110">
            <img :src="profilePhotoUrl" alt="Profile Photo" class="w-full h-full object-cover rounded-full" />
          </div>
          <span class="text-gray-100 font-medium ml-2">{{ userName }}</span>
          <!-- Dropdown Menu -->
          <div v-if="isDropdownOpen"
            class="absolute right-0 p-2 top-12 mt-2 w-48 bg-white border rounded shadow-md transition-opacity duration-300 opacity-100">
            <RouterLink to="/profile" class="w-full text-left px-4 py-2 text-gray-700 hover:underline">Profile</RouterLink>
            <button @click="confirmLogout" class="w-full text-left px-4 py-2 text-gray-700 hover:underline">
              Log out
            </button>
          </div>
        </div>
        <div v-else class="flex gap-6 font-mono font-bold">
          <router-link to="/login"
            class="block bg-white text-black p-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors">
            Login
          </router-link>
          <router-link to="/register"
            class="block bg-white text-black p-2 rounded-full shadow-md hover:bg-green-500 hover:text-white transition-colors">
            Register
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const router = useRouter();

// Reactive variables
const isDropdownOpen = ref(false);
const isLoggedIn = ref(false);
const userName = ref('');
const userInitial = ref('');
const user = ref({}); // Store user data

// Computed property for profile photo URL
const profilePhotoUrl = computed(() => {
  return user.value.profilePhoto
    ? `http://localhost:3000/${user.value.profilePhoto}`
    : 'http://localhost:3000/default-profile-photo.jpg'; // Use a default image if no photo is set
});

// Toggle dropdown menu visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Fetch user data from the backend
const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
    const userData = response.data;

    if (userData) {
      user.value = userData; // Set the user data
      userName.value = userData.name;
      userInitial.value = userData.name.charAt(0).toUpperCase(); // Get the first letter
      isLoggedIn.value = true;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Check login status and initialize user info
const checkLoginStatus = () => {
  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  if (userFromStorage && userFromStorage.id) {
    fetchUserData(userFromStorage.id); // Fetch user data if logged in
  } else {
    isLoggedIn.value = false;
  }
};

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
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isLoggedIn.value = false;
  isDropdownOpen.value = false;
  router.push('/login');
  window.location.reload();
};

// On mounted, check login status
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
