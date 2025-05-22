<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-blue-100">
    <!-- Left Pane -->
    <div class="hidden lg:flex flex-1 shadow-md shadow-black" data-aos="fade-up">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Plantation_Bay_Cebu.jpg"
        alt="Island Hopping"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Pane -->
    <div class="flex items-center justify-center w-full lg:w-1/2 bg-white rounded-none lg:rounded-r-xl shadow-md shadow-black p-6 sm:p-10 md:p-16" data-aos="fade-up">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
        <div class="flex justify-center items-center mb-4">
          <img src="@/assets/img/image.png" alt="Island Hopper Logo" class="w-12 h-12 mr-2" />
          <RouterLink to="/" class="text-xl font-bold text-black font-mono">Island Hopper</RouterLink>
        </div>
        <h2 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Join our community with all-time access and it's free!
        </h2>

        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Fullname</label>
            <input
              v-model="name"
              type="text"
              id="name"
              name="name"
              required
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              required
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              required
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            Already have an account?
            <RouterLink to="/login" class="text-black hover:underline">Login here</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
  <section>
  <footer
    class="mx-auto w-full bg-black max-w-container px-4 sm:px-6 lg:px-8"
    aria-labelledby="footer-heading"
  >
    <div
      class="items-center grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2"
    >
      <p class="text-sm/6 text-gray-100 max-md:text-center">
        © 2024 Island Hopper. All rights reserved.
      </p>
      <div class="flex items-center justify-center space-x-4 text-sm/6 text-gray-100 md:justify-end">
        <a href="#" class="hover:underline">Privacy policy</a>
        <div class="h-4 w-px bg-gray-100"></div>
        <a href="#" class="hover:underline">Terms</a>
      </div>
    </div>
  </footer>
</section>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: response.data.message,
    });

    // Redirect to login page
    router.push('/login');
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error.response?.data?.error || 'Something went wrong. Please try again.',
    });
  }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
