<template>
  <div id="app">
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">FAN Shop</router-link>
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
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Lien pour les vendeurs -->
            <li class="nav-item" v-if="userRole === 'Seller'">
              <router-link class="nav-link" to="/seller">Espace Vendeur</router-link>
            </li>
            <!-- Lien pour les managers -->
            <li class="nav-item" v-if="userRole === 'Fnac Manager'">
              <router-link class="nav-link" to="/manager">Espace Manager</router-link>
            </li>
            <!-- Lien pour la connexion -->
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="userRole">
           <button class="btn btn-link nav-link" @click="logout">Logout</button>
           </li>

          </ul>
        </div>
      </div>
    </nav>

    <!-- Vue principale -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userRole: null, // Rôle de l'utilisateur (par défaut null)
    };
  },
  mounted() {
    try {
      // Vérifier et extraire les données utilisateur du localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role) {
        this.userRole = user.role; // Stocke le rôle de l'utilisateur
        console.log("User role:", this.userRole); // Debug
      } else {
        console.log("No user or role found in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  },
};
</script>


<style>
/* Styles globaux pour l'application */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  margin-bottom: 20px;
}
</style>
