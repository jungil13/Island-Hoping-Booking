<template>
  <div class="container mx-auto p-4 shadow-md shadow-black mt-8" data-aos="fade-up">
    <h2 class="text-3xl font-bold mb-4">Manage Users</h2>

    <!-- Search Bar -->
    <div class="mb-4">
      <input type="text" v-model="searchQuery" @input="searchUsers" placeholder="Search users..."
        class="p-2 border border-gray-300 rounded-lg w-full" />
    </div>

    <!-- Table to display users -->
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th class="border border-gray-300 px-4 py-2 text-left">User Type</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.userType }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <span :class="user.isRestricted ? 'text-red-500' : 'text-green-500'">
                {{ user.isRestricted ? 'Restricted' : 'Active' }}
              </span>
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <!-- Restrict/Unrestrict Button -->
              <button @click="toggleRestriction(user.id, user.isRestricted)" class="px-4 py-2 text-white rounded-lg"
                :class="user.isRestricted ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'">
                {{ user.isRestricted ? 'Unrestrict' : 'Restrict' }}
              </button>

              <!-- View/Edit Button -->
              <button @click="viewUser(user.id)"
                class="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400">
                View/Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-500 text-white rounded-lg">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg">
        Next
      </button>
    </div>

    <!-- Modal for View/Edit User -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-2xl font-semibold mb-4">View/Edit User</h3>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label for="name" class="block">Name</label>
            <input v-model="selectedUser.name" type="text" id="name"
              class="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block">Email</label>
            <input v-model="selectedUser.email" type="email" id="email"
              class="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div class="mb-4">
            <label for="userType" class="block">User Type</label>
            <select v-model="selectedUser.userType" id="userType" class="w-full p-2 border border-gray-300 rounded-lg"
              required>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="flex justify-between">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-lg">
              Close
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
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

// State variables
const users = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const usersPerPage = 5;
const isModalOpen = ref(false);
const selectedUser = ref({});
const totalPages = computed(() => Math.ceil(users.value.length / usersPerPage));

// Fetch all users from the API
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Search users based on the search query
const searchUsers = () => {
  currentPage.value = 1; // Reset to the first page when searching
};

// Get the users for the current page (pagination)
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage;
  const end = start + usersPerPage;
  return users.value.slice(start, end);
});

// View and Edit user
const viewUser = (userId) => {
  const user = users.value.find(u => u.id === userId);
  if (user) {
    selectedUser.value = { ...user }; // Clone user data
    isModalOpen.value = true;
  }
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = {};
};

// Update user details
const updateUser = async () => {
  try {
    await axios.put(`http://localhost:3000/api/users/${selectedUser.value.id}`, selectedUser.value);
    Swal.fire('Success', 'User details updated successfully', 'success');
    closeModal();
    fetchUsers();
  } catch (error) {
    console.error('Error updating user:', error);
    Swal.fire('Error', 'Failed to update user details', 'error');
  }
};

// Toggle user restriction status
const toggleRestriction = async (userId, currentStatus) => {
  try {
    const newStatus = currentStatus ? 0 : 1;
    await axios.put(`http://localhost:3000/api/users/restrict/${userId}`, { isRestricted: newStatus }); // Send the new status
    Swal.fire('Success', `User ${newStatus ? 'restricted' : 'unrestricted'}`, 'success');
    fetchUsers(); // Refresh the user list after the update
  } catch (error) {
    console.error('Error updating user restriction:', error);
    Swal.fire('Error', 'Failed to update user restriction', 'error');
  }
};

// Pagination controls
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Fetch users on mount
onMounted(fetchUsers);
</script>

<style scoped>
/* Add specific styles for responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 2rem;
  }
}
</style>
