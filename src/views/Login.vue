<template>
  <div class="flex flex-col lg:flex-row h-screen bg-blue-100">
    <!-- Left Pane -->
    <div class="hidden lg:flex flex-1 shadow-md shadow-black" data-aos="fade-up">
      <img
        src="https://media-cdn.tripadvisor.com/media/photo-s/26/55/5e/f9/discover-a-resort-in.jpg"
        alt="Island Hopping"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Pane -->
    <div class="flex items-center justify-center w-full lg:w-1/2 bg-white rounded-none lg:rounded-r-xl shadow-md shadow-black p-6 sm:p-10 md:p-16" data-aos="fade-up">
      <div class="w-full max-w-sm">
        <h1 class="text-2xl font-semibold mb-4 text-black text-center">Log in</h1>
        <div class="flex justify-center items-center mb-4">
          <img src="@/assets/img/image.png" alt="Island Hopper Logo" class="w-12 h-12 mr-2" />
          <RouterLink to="/" class="text-xl font-bold text-black font-mono">Island Hopper</RouterLink>
        </div>
        <p class="text-sm text-gray-500 mb-4 text-center">
          Join our community for free and get lifetime access.
        </p>
        <p class="text-sm text-gray-600 text-center mb-4">or with email</p>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-300 focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-300 focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            Log in
          </button>
        </form>
        <p class="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?
          <RouterLink to="/register" class="text-black hover:underline">Sign up here</RouterLink>
        </p>
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

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value,
    });

    const { token, user } = response.data;

    // Store token and user details in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `Welcome back, ${user.name}!`,
    });

    // Redirect based on user type
    if (user.userType === 'admin') {
      router.push('/admin');  // Redirect to admin dashboard
    } else {
      router.push('/');  // Redirect to home or user dashboard
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.response?.data?.error || 'Invalid email or password. Please try again.',
    });
  }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
