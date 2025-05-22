<template>
    <div class="p-12"data-aos="fade-up">
      <h2 class="text-2xl font-semibold mb-4">Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total Bookings -->
        <div class="bg-blue-500 text-white p-4 rounded-lg shadow-md shadow-black">
          <h3 class="text-lg font-medium">Total Bookings</h3>
          <p class="text-2xl font-bold">{{ stats.totalBookings || 0 }}</p>
        </div>
  
        <!-- Approved Bookings -->
        <div class="bg-green-500 text-white p-4 rounded-lg shadow-md shadow-black">
          <h3 class="text-lg font-medium">Approved Bookings</h3>
          <p class="text-2xl font-bold">{{ stats.approvedBookings || 0 }}</p>
        </div>
  
        <!-- Total Earnings -->
        <div class="bg-yellow-500 text-white p-4 rounded-lg shadow-md shadow-black">
          <h3 class="text-lg font-medium">Total Earnings</h3>
          <p class="text-2xl font-bold">
            <i class="fa-solid fa-peso-sign"></i> {{ stats.totalEarnings ? stats.totalEarnings.toLocaleString() : '₱0.00' }}
          </p>
        </div>
  
        <!-- Total Users -->
        <div class="bg-indigo-500 text-white p-4 rounded-lg shadow-md shadow-black">
          <h3 class="text-lg font-medium">Total Users</h3>
          <p class="text-2xl font-bold">{{ stats.totalUsers || 0 }}</p>
        </div>
      </div>
  
      <!-- Chart Section -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <!-- Earnings Chart -->
        <div class="bg-white p-4 rounded-lg shadow-md shadow-black">
          <h3 class="text-lg font-medium mb-4">Monthly Earnings (Jan - Dec)</h3>
          <LineChart :data="earningsData" :options="chartOptions" />
        </div>
  
        <!-- User Approved Bookings Chart -->
        <div class="bg-white p-4 rounded-lg shadow-md shadow-black">
          <h3 class="text-lg font-medium mb-4">Approved Bookings and Total Price</h3>
          <BarChart :data="userBookingsData" :options="barChartOptions" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Line, Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from 'chart.js';
  import axios from 'axios';
  
  // Register chart.js components globally
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement
  );
  
  // Alias Line and Bar components
  const LineChart = Line;
  const BarChart = Bar;
  
  // Data references
  const stats = ref({});
  const earningsData = ref({
    labels: [],
    datasets: [],
  });
  const userBookingsData = ref({
    labels: [],
    datasets: [],
  });
  const chartOptions = ref({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Earnings (Jan - Dec)',
      },
    },
  });
  const barChartOptions = ref({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Approved Bookings and Total Price by User',
      },
    },
  });
  
  // Fetch stats from the backend
  const fetchStats = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/dashboard/stats');
    stats.value = response.data;

    // Set data for earnings chart
    earningsData.value = response.data.earningsData;

    // Prepare chart data for user bookings
    const userBookings = response.data.userBookingsData || [];
    userBookingsData.value = {
      labels: userBookings.map((user) => user.userName),
      datasets: [
        {
          label: 'Approved Bookings',
          data: userBookings.map((user) => user.totalApprovedBookings),
          backgroundColor: '#4CAF50',
        },
        {
          label: 'Total Price',
          data: userBookings.map((user) => parseFloat(user.totalPrice)),
          backgroundColor: '#FFC107',
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching stats data:', error);
  }
};

  // Fetch stats when component is mounted
  onMounted(fetchStats);
  </script>
  