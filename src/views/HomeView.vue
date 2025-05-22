<!-- HomeView.vue -->
<template>
  <div class="relative h-screen bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1462557881996-79ed8f9ca4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-30"></div>

    <!-- Content -->
    <div class="relative flex flex-col justify-center items-center h-full text-center px-6">

      <!-- Header Text -->
      <div class="text-white max-w-3xl"data-aos="fade-up" >
        <h1 class="text-2xl md:text-4xl font-semibold leading-snug mb-4">
          Perfect for adventurers and those seeking tranquility alike, it's a magical travel experience that promises unforgettable memories.
        </h1>
        <p class="text-lg md:text-2xl italic">
          Book your journey today to unlock the wonders of paradise!<br />
          <strong>You can choose 3 islands!</strong>
        </p>
      </div>

      <!-- Button -->
      <RouterLink to="/book" class="mt-6 bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition">
        BOOK NOW!
      </RouterLink>
    </div>
  </div>
  <!-- Features Section -->
<section class="bg-white text-gray-900 container mx-auto py-16 px-4 md:px-16 border-y">
  <!-- Heading -->
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4" data-aos="fade-left">Island Hopping Adventures</h1>
    <p class="text-lg text-gray-600" data-aos="fade-right">
      Discover six breathtaking islands and embark on a journey of paradise. Explore crystal-clear waters, white sandy beaches, and unforgettable memories.
    </p>
  </div>

  <!-- Island Features -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"data-aos="fade-up">
    <!-- Island 1 -->
    <div class="flex flex-col items-center text-center" >
      <img
        src="https://cebutours.jp/en/wp-content/uploads/2022/06/Sulpa-Island-Lapu-Lapu-1024x576-1.jpg"
        alt="Sulpa Island"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 class="text-2xl font-bold">Sulpa Island</h2>
      <p class="text-gray-600">
        A peaceful island perfect for swimming, snorkeling, and soaking up the sun.
      </p>
    </div>

    <!-- Island 2 -->
    <div class="flex flex-col items-center text-center" >
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/209000546.jpg?k=49bad8fceaa44b30d0a313e3c16150c6b47ca0744410cc97ec6fcea4ac063ed4&o=&hp=1"
        alt="Tres Marias Island"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 class="text-2xl font-bold">Tres Marias Island</h2>
      <p class="text-gray-600">
        Known for its scenic views and lush greenery, ideal for adventurers.
      </p>
    </div>

    <!-- Island 3 -->
    <div class="flex flex-col items-center text-center">
      <img
        src="https://www.thepoortraveler.net/wp-content/uploads/2013/03/Olango-Island.jpg"
        alt="Olango Island"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 class="text-2xl font-bold">Olango Island</h2>
      <p class="text-gray-600">
        A haven for bird watchers and nature enthusiasts with stunning mangroves.
      </p>
    </div>

    <!-- Island 4 -->
    <div class="flex flex-col items-center text-center" >
      <img
        src="https://i.ytimg.com/vi/SeFJjbBjkT8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLANN1CPQtlPAOD7v6exSEbZJi5cBw"
        alt="Caohagan Island"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 class="text-2xl font-bold">Caohagan Island</h2>
      <p class="text-gray-600">
        Crystal-clear waters and vibrant marine life, perfect for diving and snorkeling.
      </p>
    </div>

    <!-- Island 5 -->
    <div class="flex flex-col items-center text-center" >
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/209000546.jpg?k=49bad8fceaa44b30d0a313e3c16150c6b47ca0744410cc97ec6fcea4ac063ed4&o=&hp=1"
        alt="Island 5"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 class="text-2xl font-bold">Nalusuan Island</h2>
      <p class="text-gray-600">
        Relax on pristine white beaches and enjoy a tranquil escape from the city.
      </p>
    </div>

    <!-- Island 6 -->
    <div class="flex flex-col items-center text-center" >
      <img
        src="https://isletconnect.com/storage/profiles/11/65fd26422ba48.jpg"
        alt="Island 6"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 class="text-2xl font-bold">Gilutungan Island</h2>
      <p class="text-gray-600">
        Experience the beauty of untouched nature and stunning coastal views.
      </p>
    </div>
  </div>
</section>

<!-- Footer -->
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

<script>
export default {
  data() {
    return {
      islands: [
        { id: 1, name: "Sulpa Island", fee: 100 },
        { id: 2, name: "Tres Marias Island", fee: 0 },
        { id: 3, name: "Olango Island", fee: 50 },
        { id: 4, name: "Caohagan Island", fee: 70 },
        { id: 5, name: "Nalusuan Island", fee: 100 },
        { id: 6, name: "Gilutungan Island", fee: 100 },
      ],
    };
  },
};
</script>
<style scoped>
.home-view {
  background-color: #f9fafb;
  min-height: 100vh;
}
</style>