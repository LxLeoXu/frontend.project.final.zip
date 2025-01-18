<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Logo -->
      <RouterLink class="navbar-brand" to="/">
        <img
          src="/images/logo.png"
          alt="Logo"
          class="d-inline-block align-text-top"
          style="height: 60px; margin-right: 10px;"
        />
      </RouterLink>

      <!-- Tlačidlo na rozbalenie menu -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Odkazy v navigácii -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/Blog">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/shop">Shop</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/pcbuild">PC</RouterLink>
          </li>
        </ul>

        <!-- Tlačidlo pre Light/Dark Mode -->
        <button class="btn btn-outline-primary ms-3" @click="toggleDarkMode">
          {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useDarkModeStore } from "@/stores/darkMode";

export default {
  name: "Header",
  setup() {
    const darkModeStore = useDarkModeStore();

    return {
      isDarkMode: darkModeStore.isDarkMode,
      toggleDarkMode: darkModeStore.toggleDarkMode,
    };
  },
};
</script>

<style scoped>
.navbar {
  border-radius: 10px;
  background-color: #e0e0e0; /* Svetlá sivá */
}

.nav-link {
  color: #6c757d; /* Tmavšia sivá */
  font-weight: 500;
}

.nav-link:hover {
  color: #007bff; /* Modrá pri hover */
}

.navbar-brand {
  color: #007bff; /* Modrá značka */
  font-weight: bold;
  display: flex;
  align-items: center;
}

.navbar-brand:hover {
  color: #0056b3; /* Tmavšia modrá pri hover */
}

/* Tlačidlo pre Dark Mode */
.btn-outline-primary {
  font-weight: 500;
  border-color: #007bff;
  color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}
</style>
