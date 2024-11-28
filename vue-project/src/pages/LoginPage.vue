<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Login</h2>
    <form @submit.prevent="login" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="email"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script>
import { post } from "@/services/api"; // Utilitaire pour fetch

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        if (response.success) {
          localStorage.setItem("user", JSON.stringify(response.user));
          const role = response.user.role;

          if (role === "Seller") {
            this.$router.push("/seller");
          } else if (role === "Fnac Manager") {
            this.$router.push("/manager");
          } else {
            alert("Rôle inconnu. Contactez l'administrateur.");
          }
        } else {
          alert("Email ou mot de passe incorrect.");
        }
      } catch (error) {
        console.error("Erreur de connexion :", error);
        alert("Impossible de se connecter. Veuillez réessayer.");
      }
    },
  },
};
</script>

<style>

.container {
  max-width: 400px;
  margin: 0 auto;
}

.card {
  border-radius: 8px;
}

button {
  border-radius: 4px;
}
</style>
