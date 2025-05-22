<template>
  <div class="container mx-auto px-4 py-8 mt-20" data-aos="fade-up">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Section: Boat Inclusions and Image -->
      <div>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Boat Inclusion -->
          <div class="border p-4 rounded shadow shadow-black">
            <h2 class="font-bold text-lg mb-2">Boat Inclusion:</h2>
            <ul class="list-none">
              <li>✓ Boat Registered in Marina</li>
              <li>✓ Boatman/Guide</li>
              <li>✓ Lifejacket/Lifevest</li>
              <li>✓ Life ring</li>
            </ul>
          </div>

          <!-- Boat Provided -->
          <div class="border p-4 rounded shadow shadow-black">
            <h2 class="font-bold text-lg mb-2">Boat Provided:</h2>
            <ul class="list-none">
              <li>✓ Dressing room/CR</li>
              <li>✓ Grilled Area (Sugbaanan)</li>
              <li>✓ Center Table</li>
              <li>✓ Extra Life Guards</li>
              <li>✓ Charcoal/Uling</li>
            </ul>
          </div>
        </div>

        <!-- Boat Image -->
        <img
          src="https://img1.wsimg.com/isteam/ip/733622a2-a7a0-4b8e-94bf-ba75f019e36e/IMG_1769.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1240,cg:true"
          alt="Boat"
          class="w-full h-72 object-cover rounded-lg shadow"
        />
      </div>

      <!-- Right Section: Booking Form -->
      <div class="bg-white p-6 shadow-lg rounded-lg shadow-black">
        <h2 class="text-2xl font-bold mb-4 text-center">Book Your Adventure</h2>

        <form @submit.prevent="submitBooking" class="space-y-4">
          <!-- Name and Date -->
          <div class="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              v-model="form.name"
              class="w-full border p-2 rounded"
            />
            <input
              type="date"
              v-model="form.date"
              class="w-full border p-2 rounded"
            />
          </div>

          <!-- Boat Rate Capacity -->
          <div>
            <label for="boatRate">Select Boat Rate:</label>
            <select v-model="form.capacity" id="boatRate">
              <option v-for="rate in boatRates" :key="rate.id" :value="rate.id">
                {{ rate.capacity }} Persons - {{ rate.rate }} PHP
              </option>
            </select>
          </div>

          <!-- Island Selection -->
          <div>
            <h3 class="font-semibold mb-2">Choose 3 Island Destinations</h3>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center space-x-2" v-for="island in islands" :key="island.name">
                <input
                  type="checkbox"
                  v-model="form.selectedIslands"
                  :value="island.name"
                  :disabled="form.selectedIslands.length >= 3 && !form.selectedIslands.includes(island.name)"
                />
                <span>{{ island.name }} ({{ island.entranceFee }} php)</span>
              </label>
            </div>
          </div>

          <!-- Total Payment -->
          <div>
            <label class="font-semibold">Total Payment</label>
            <input
              type="text"
              :value="`${totalPrice} php`"
              class="w-full border p-2 rounded"
              readonly
            />
          </div>

          <!-- Payment Methods -->
          <div class="flex gap-4 justify-center">
            <button
              type="button"
              @click="selectPaymentMethod('GCASH')"
              :class="{'border-2 border-blue-500': form.paymentMethod === 'GCASH'}"
              class="bg-gray-200 px-4 py-2 rounded shadow"
            >
              <img src="https://play-lh.googleusercontent.com/QNP0Aj2hyumAmYiWVAsJtY2LLTQnzHxdW7-DpwFUFNkPJjgRxi-BXg7A4yI6tgYKMeU" alt="GCash" class="w-8 h-8" />
            </button>
            <button
              type="button"
              @click="selectPaymentMethod('PayMaya')"
              :class="{'border-2 border-blue-500': form.paymentMethod === 'PayMaya'}"
              class="bg-gray-200 px-4 py-2 rounded shadow"
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPidDnjG44Xn3H9wR3MAEp5HY4Fw501be-Fg&s" alt="PayMaya" class="w-8 h-8" />
            </button>
            <button
              type="button"
              @click="selectPaymentMethod('VISA')"
              :class="{'border-2 border-blue-500': form.paymentMethod === 'VISA'}"
              class="bg-gray-200 px-4 py-2 rounded shadow"
            >
              <img src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-visa-icon-PNG.png" alt="VISA" class="w-8 h-8" />
            </button>
            <button
              type="button"
              @click="selectPaymentMethod('MasterCard')"
              :class="{'border-2 border-blue-500': form.paymentMethod === 'MasterCard'}"
              class="bg-gray-200 px-4 py-2 rounded shadow"
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_oiolN22m9vVbrYhwtstvAUxo9fhsPIbykQ&s" alt="MasterCard" class="w-8 h-8" />
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            SEND REQUEST
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

// Islands data
const islands = [
  { name: 'Caohagan Island', entranceFee: 70, id: 1 },
  { name: 'Gilutongan Island', entranceFee: 100, id: 2 },
  { name: 'Nalusuan Island', entranceFee: 100, id: 3 },
  { name: 'Olanggo Island', entranceFee: 50, id: 4 },
  { name: 'Sulpa Island', entranceFee: 100, id: 5 },
  { name: 'Tres Marias Island', entranceFee: 0, id: 6 },
];

// Boat rates
const boatRates = [
  { id: 1, capacity: 5, rate: 3000 },
  { id: 2, capacity: 8, rate: 3500 },
  { id: 3, capacity: 10, rate: 4000 },
  { id: 4, capacity: 20, rate: 4500 },
  { id: 5, capacity: 25, rate: 5000 },
  { id: 6, capacity: 30, rate: 5500 },
];

// Form data
const form = ref({
  name: '',
  date: '',
  capacity: 1, // Default boat rate id
  selectedIslands: [],
  paymentMethod: 'GCASH',
});

// Total price calculation
const totalPrice = ref(0);

// Auto-fill name from local storage on mount
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.name) {
    form.value.name = user.name;
  }
});

// Calculate total price based on selected islands and boat rate
const calculateTotalPrice = () => {
  const selectedRate = boatRates.find(rate => rate.id === form.value.capacity);
  let total = selectedRate ? selectedRate.rate : 0;

  // Add cost for selected islands
  form.value.selectedIslands.forEach(islandName => {
    const island = islands.find(island => island.name === islandName);
    if (island) {
      total += island.entranceFee;
    }
  });

  totalPrice.value = total; // Update totalPrice ref
};

// Watchers to recalculate the total price when the selected islands or boat rate change
watch(() => form.value.selectedIslands, calculateTotalPrice, { deep: true });
watch(() => form.value.capacity, calculateTotalPrice);

// Select payment method
const selectPaymentMethod = (method) => {
  form.value.paymentMethod = method;
};

// Submit the booking
const submitBooking = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const bookingData = {
      user_id: user.id,
      date: form.value.date,
      boat_rate_id: form.value.capacity, // boat_rate_id is the selected boat rate id
      total_price: totalPrice.value, // Use the calculated total price
      payment_method: form.value.paymentMethod,
      selectedIslands: form.value.selectedIslands.map(islandName => {
        const island = islands.find(island => island.name === islandName);
        return island ? island.id : null; // Use island id instead of name
      }).filter(id => id !== null), // Ensure no null ids are added
    };

    const response = await axios.post('http://localhost:3000/api/bookings', bookingData);

    if (response.status === 201) {
      // Success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Booking Created',
        text: 'Your booking has been successfully created!',
      });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    // Error message using SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was an error creating your booking. Please try again later.',
    });
  }
};
</script>
