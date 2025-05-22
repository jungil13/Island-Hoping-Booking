<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg">
        <h1 class="text-3xl font-bold mb-4" data-aos="zoom-in">Welcome, {{ user.name }} 👋🏻</h1>

      <h1 class="text-3xl font-bold font-mono text-teal-600 mb-6">Edit Profile</h1>
      
      <!-- Profile Edit Form -->
      <div class="flex space-x-6">
        <!-- Right side (Profile photo) -->
        <div class="flex-shrink-0">
          <div class="w-40 h-40 bg-gray-200 rounded-full shadow-md border shadow-black overflow-hidden mb-4">
            <!-- Display profile photo from API response or a default if not available -->
            <img :src="profilePhotoUrl" alt="Profile Photo" class="w-full h-full object-cover " />
          </div>
          <input type="file" @change="handleProfilePhotoChange" class="mt-2 p-2 text-sm text-teal-500" />
        </div>
  
        <!-- Left side (form) -->
        <div class="flex-1">
          <form @submit.prevent="updateProfile" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input v-model="user.name" type="text" id="name" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="user.email" type="email" id="email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
            </div>
  
            <!-- Phone Number -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input v-model="user.phone" type="text" id="phone" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
  
            <!-- Address -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <textarea v-model="user.address" id="address" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
  
            <!-- Current Password -->
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
              <input v-model="currentPassword" type="password" id="currentPassword" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
  
            <!-- New Password -->
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
              <input v-model="newPassword" type="password" id="newPassword" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
  
            <!-- Submit Button -->
            <div>
              <button type="submit" class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const user = ref({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '', // Keep password blank initially
    profilePhoto: '', // URL or path to the profile photo
  });
  
  const currentPassword = ref('');
  const newPassword = ref('');
  
  // Fetch the current user data on component mount
  onMounted(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get the user from local storage
    if (storedUser && storedUser.id) {
      user.value.id = storedUser.id; // Set the user ID from local storage
      fetchUserProfile(); // Fetch the profile data
    } else {
      console.error('User not found in local storage');
    }
  });
  
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${user.value.id}`);
      const fetchedUser = response.data; // Assuming the response has the user data
      user.value.name = fetchedUser.name;
      user.value.email = fetchedUser.email;
      user.value.phone = fetchedUser.phone;
      user.value.address = fetchedUser.address;
      user.value.profilePhoto = fetchedUser.profilePhoto; // Set the profile photo URL
      user.value.password = ''; // Keep password blank to not update it unless the user changes it
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  // Compute the full URL for the profile photo
  const profilePhotoUrl = computed(() => {
    return user.value.profilePhoto
      ? `http://localhost:3000/${user.value.profilePhoto}`
      : 'http://localhost:3000/default-profile-photo.jpg'; // Use a default image if no photo is set
  });
  
  // Handle profile photo change
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePhoto', file);
  
      axios.put(`http://localhost:3000/api/users/${user.value.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        user.value.profilePhoto = response.data.profilePhoto; // Update profile photo path from the backend
      })
      .catch(error => {
        console.error('Error uploading profile photo:', error);
      });
    }
  };
  
  // Update profile
  const updateProfile = async () => {
  try {
    const updatedData = new FormData();
    updatedData.append('name', user.value.name);
    updatedData.append('email', user.value.email);
    updatedData.append('phone', user.value.phone);
    updatedData.append('address', user.value.address);
    updatedData.append('currentPassword', currentPassword.value);
    updatedData.append('newPassword', newPassword.value);

    if (user.value.profilePhoto) {
      updatedData.append('profilePhoto', user.value.profilePhoto); // Add profile photo
    }

    const response = await axios.put(`http://localhost:3000/api/users/${user.value.id}`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      Swal.fire('Success', 'Profile updated successfully!', 'success').then(() => {
        location.reload(); // Reload the page after alert confirmation
      });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    Swal.fire('Error', 'Error updating profile', 'error');
  }
};

  </script>
  
  <style scoped>
  /* Additional styling for the form */
  </style>
  