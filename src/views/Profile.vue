<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Sidebar -->
    <div class="w-full lg:w-64 bg-teal-500 shadow-md shadow-black text-white p-6 mt-20" data-aos="fade-right">
      <h2 class="text-3xl font-bold mb-6 font-mono">Dashboard</h2>
      <div class="space-y-4 text-black font-mono font-bold text-lg">
        <button @click="navigateTo('profile')"
          class="w-full bg-white text-black text-left py-2 px-4 rounded-lg transition hover:underline">
          Profile
        </button>

        <button @click="navigateTo('manageBookings')"
          class="w-full bg-white text-black text-left py-2 px-4 rounded-lg transition hover:underline">
          My Bookings
        </button>

        <button @click="navigateTo('manageCompletedBookings')"
          class="w-full bg-white text-black text-left py-2 px-4 rounded-lg transition hover:underline">
          My Completed Bookings
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 p-8 mt-8">
      <div class=" p-6 ">
        <!-- Profile Section -->
        <div v-if="currentSection === 'profile'" data-aos="zoom-in">
          <MyProfile />
        </div>

        <!-- Manage Bookings Section -->
        <div v-if="currentSection === 'manageBookings'">
          <h2 class="text-2xl font-semibold mb-4" data-aos="fade-up">My Bookings</h2>
          <p class="mb-4" data-aos="fade-up">Here you can view and manage your upcoming bookings.</p>

          <!-- Search Bar -->
          <div class="mb-4">
            <input type="text" v-model="searchQuery" @input="filterBookings" placeholder="Search bookings..."
              class="w-full p-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              data-aos="fade-up" />
          </div>

          <!-- Bookings Table -->
          <table class="min-w-full mt-4 border-collapse" data-aos="fade-up">
            <thead>
              <tr>
                <th class="border-b py-2 px-4 text-left">Booking ID</th>
                <th class="border-b py-2 px-4 text-left">Date</th>
                <th class="border-b py-2 px-4 text-left">Boat Capacity</th>
                <th class="border-b py-2 px-4 text-left">Islands</th>
                <th class="border-b py-2 px-4 text-left">Total Price</th>
                <th class="border-b py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in filteredBookings" :key="booking.id">
                <td class="border-b py-2 px-4">{{ booking.id }}</td>
                <td class="border-b py-2 px-4">{{ new Date(booking.date).toLocaleDateString() }}</td>
                <td class="border-b py-2 px-4">{{ booking.boat_capacity }}</td>

                <td class="border-b py-2 px-4">{{ booking.islands || 'Not Assigned' }}</td>
                <td class="border-b py-2 px-4"> ₱ {{ booking.total_price }}</td>
                <td class="border-b py-2 px-4">
                  <button @click="viewBookingDetails(booking)"
                    class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400">
                    <i class="fa-regular fa-eye"></i> </button>
                  <button @click="deleteBooking(booking.id)"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 ml-2">
                    <i class="fa-solid fa-trash-can"></i> </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="mt-4 flex justify-between items-center">
            <button @click="prevPage" :disabled="currentPage === 1"
              class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400">
              Previous
            </button>
            <span class="text-lg">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
              class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400">
              Next
            </button>
          </div>
        </div>

        <!-- Manage Completed Bookings Section -->
        <div v-if="currentSection === 'manageCompletedBookings'">
          <h2 class="text-2xl font-semibold mb-4" data-aos="fade-up">My Completed Bookings</h2>
          <p data-aos="fade-up">Here you can view your completed bookings.</p>
          <table class="min-w-full mt-4 border-collapse" data-aos="zoom-in">
            <thead>
              <tr>
                <th class="border-b py-2 px-4 text-left">Booking ID</th>
                <th class="border-b py-2 px-4 text-left">Date</th>
                <th class="border-b py-2 px-4 text-left">Boat Capacity</th>
                <th class="border-b py-2 px-4 text-left">Status</th>
                <th class="border-b py-2 px-4 text-left">Islands</th>
                <th class="border-b py-2 px-4 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in completedBookings" :key="booking.id">
                <td class="border-b py-2 px-4">{{ booking.id }}</td>
                <td class="border-b py-2 px-4">{{ new Date(booking.date).toLocaleDateString() }}</td>
                <td class="border-b py-2 px-4">{{ booking.boat_capacity }}</td>
                <td class="border-b py-2 px-4">
                  <span :class="{
                    'bg-green-400': booking.status === 'Approved',
                    'bg-red-400': booking.status === 'Declined'
                  }" class="px-3 py-1 rounded-full text-white">{{ booking.status }}</span>
                </td>
                <td class="border-b py-2 px-4">{{ booking.islands }}</td>
                <td class="border-b py-2 px-4"> ₱ {{ booking.total_price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Booking Details Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-2xl font-semibold mb-4">Booking Details</h2>
        <p><strong>Booking ID:</strong> {{ selectedBooking.id }}</p>
        <p><strong>Date:</strong> {{ new Date(selectedBooking.date).toLocaleDateString() }}</p>
        <p><strong>Boat Capacity:</strong> {{ selectedBooking.boat_capacity }}</p>
        <p><strong>Boat Rate:</strong> ₱{{ selectedBooking.boat_rate }}</p>
        <p><strong>Total Price:</strong> ₱{{ selectedBooking.total_price }}</p>
        <p><strong>Status:</strong> {{ selectedBooking.status }}</p>
        <p><strong>Payment Method:</strong> {{ selectedBooking.payment_method }}</p>
        <p><strong>Islands:</strong> {{ selectedBooking.islands || 'Not Assigned' }}</p>
        <button @click="closeModal" class="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400">
          Close
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import MyProfile from '@/components/MyProfile.vue';

const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest', email: 'guest@example.com' };
const userName = ref(user.name);
const userEmail = ref(user.email);

const currentSection = ref('profile');
const bookings = ref([]);
const completedBookings = ref([]);
const filteredBookings = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(1);
const showModal = ref(false);
const selectedBooking = ref(null);

const navigateTo = (section) => {
  currentSection.value = section;
};

const fetchBookings = async () => {
  try {
    const userId = user.id;
    const response = await axios.get(`http://localhost:3000/api/mybookings?user_id=${userId}`);
    bookings.value = response.data.bookings;
    completedBookings.value = bookings.value.filter(booking => booking.status === 'Approved');
    totalPages.value = Math.ceil(bookings.value.length / itemsPerPage.value);
    filterBookings();
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

const filterBookings = () => {
  const query = searchQuery.value.toLowerCase();
  filteredBookings.value = bookings.value.filter(booking =>
    booking.id.toString().includes(query) ||
    booking.islands.toLowerCase().includes(query)
  );
  totalPages.value = Math.ceil(filteredBookings.value.length / itemsPerPage.value);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    paginateBookings();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    paginateBookings();
  }
};

const paginateBookings = () => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  filteredBookings.value = filteredBookings.value.slice(start, end);
};

const viewBookingDetails = (booking) => {
  selectedBooking.value = booking;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Delete booking with SweetAlert2 confirmation
const deleteBooking = async (id) => {
  // Show confirmation dialog with SweetAlert2
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this booking!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/bookings/${id}`);
      if (response.status === 200) {
        // Remove the deleted booking from the bookings array
        bookings.value = bookings.value.filter(booking => booking.id !== id);
        filteredBookings.value = filteredBookings.value.filter(booking => booking.id !== id);

        // Show success message with SweetAlert2
        Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      // Show error message with SweetAlert2
      Swal.fire('Error!', 'Failed to delete the booking.', 'error');
    }
  }
};

onMounted(() => {
  fetchBookings();
});
</script>