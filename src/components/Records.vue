<template>
    <div class="p-6 min-h-screen"data-aos="fade-up">
      <div class="bg-white shadow-md shadow-black rounded-lg p-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Booking Records</h2>
  
        <!-- Search and Pagination -->
        <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Search Bar -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by user name..."
            class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
          />
  
          <!-- Pagination Controls -->
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span class="text-gray-700 font-medium">Page {{ currentPage }}</span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
  
        <!-- Bookings Table -->
        <div class="overflow-x-auto">
          <table class="table-auto w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg">
            <thead>
              <tr class="bg-blue-100 text-gray-700">
                <th class="border border-gray-300 px-4 py-2">ID</th>
                <th class="border border-gray-300 px-4 py-2">User Name</th>
                <th class="border border-gray-300 px-4 py-2">User Email</th>
                <th class="border border-gray-300 px-4 py-2">Date</th>
                <th class="border border-gray-300 px-4 py-2">Boat Capacity</th>
                <th class="border border-gray-300 px-4 py-2">Boat Rate</th>
                <th class="border border-gray-300 px-4 py-2">Total Price</th>
                <th class="border border-gray-300 px-4 py-2">Payment Method</th>
                <th class="border border-gray-300 px-4 py-2">Status</th>
                <th class="border border-gray-300 px-4 py-2">Islands</th>
                <th class="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="booking in filteredBookings"
                :key="booking.id"
                class="hover:bg-gray-50 transition duration-200"
              >
                <td class="border border-gray-300 px-4 py-2 text-center">{{ booking.id }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ booking.user_name }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ booking.user_email }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ new Date(booking.date).toLocaleString() }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">{{ booking.boat_capacity }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">{{ booking.boat_rate }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">{{ booking.total_price }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">{{ booking.payment_method }}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span
                    :class="{
                      'text-green-700 font-semibold': booking.status === 'Approved',
                      'text-red-700 font-semibold': booking.status === 'Denied',
                      'text-yellow-700 font-semibold': booking.status === 'Pending',
                    }"
                  >
                    {{ booking.status }}
                  </span>
                </td>
                <td class="border border-gray-300 px-4 py-2">{{ booking.islands }}</td>
                <td class="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                  <button
                    @click="viewBookingDetails(booking)"
                    class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                  <i class="fa-regular fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  import Swal from "sweetalert2"; // Import SweetAlert2
  
  const bookings = ref([]);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookings");
      bookings.value = response.data.bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  
  const filteredBookings = computed(() => {
    const filtered = bookings.value.filter((booking) =>
      booking.user_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  });
  
  const totalPages = computed(() =>
    Math.ceil(
      bookings.value.filter((booking) =>
        booking.user_name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ).length / itemsPerPage
    )
  );
  
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/bookings/${id}`, { status });
      bookings.value = bookings.value.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };
  
  // Function to view booking details in a SweetAlert modal
  const viewBookingDetails = (booking) => {
    Swal.fire({
      title: `Booking ID: ${booking.id}`,
      html: `
        <strong>User Name:</strong> ${booking.user_name}<br/>
        <strong>User Email:</strong> ${booking.user_email}<br/>
        <strong>Date:</strong> ${new Date(booking.date).toLocaleString()}<br/>
        <strong>Boat Capacity:</strong> ${booking.boat_capacity}<br/>
        <strong>Boat Rate:</strong> ${booking.boat_rate}<br/>
        <strong>Total Price:</strong> ${booking.total_price}<br/>
        <strong>Payment Method:</strong> ${booking.payment_method}<br/>
        <strong>Status:</strong> ${booking.status}<br/>
        <strong>Islands:</strong> ${booking.islands}
      `,
      icon: 'info',
      confirmButtonText: 'Close',
    });
  };
  
  onMounted(fetchBookings);
  </script>
  
  <style scoped>
  /* Table Scroll */
  .overflow-x-auto {
    max-height: 500px;
    overflow-y: auto;
  }
  
  /* Table Row Hover */
  tbody tr:hover {
    background-color: #f9fafb;
  }
  </style>
  