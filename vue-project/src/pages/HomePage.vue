<template>
  <div>
    <header class="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
      <h1>FAN Shop</h1>
      <div>
        <button @click="toggleCart" class="btn btn-light me-2">Mon Panier ({{ cartCount }})</button>
        <button @click="goToLogin" class="btn btn-light">Login</button>
      </div>
    </header>

    <!-- Composant Panier -->
    <Cart v-if="isCartVisible" @closeCart="toggleCart" />

    <!-- Liste des produits -->
    <main class="container mt-4">
      <div v-if="loading">Chargement...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="row">
        <div
          class="col-md-4"
          v-for="product in products"
          :key="product.id"
        >
          <div class="card">
            <!-- Image produit ou image par défaut -->
            <img 
              :src="product.image || '/images/default-product.png'" 
              class="card-img-top" 
              alt="Product"
            >
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Catégorie : {{ product.description }}</p>
              <p class="card-text text-success">{{ product.price }} €</p>
              <button class="btn btn-success" @click="addToCart(product)">Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";

export default {
  components: {
    Cart,
  },
  data() {
    return {
      products: [], // Liste des produits
      isCartVisible: false, // Contrôle de l'affichage du panier
      cartCount: 0, // Compteur des articles dans le panier
      loading: true, // État de chargement
      error: null // Message d'erreur
    };
  },
  methods: {
    async fetchProducts() {
      try {
        // Requête vers votre API Strapi
        const response = await fetch("http://localhost:1338/api/products");
        const data = await response.json();

        // Mapper les données selon la structure de votre API
        this.products = data.data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.type || "Non spécifié", // Utilisation du champ `type`
          price: item.price,
          image: null // Pas d'image disponible, mais préparez le champ pour l'ajout futur
        }));

        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        this.error = "Impossible de charger les produits";
        this.loading = false;
      }
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Vérifiez si le produit est déjà dans le panier
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 }); // Ajoutez le produit avec une quantité de 1
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.updateCartCount(); // Mettre à jour le compteur
      alert("Produit ajouté au panier !");
    },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible; // Afficher/masquer le panier
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0); // Compte les quantités
    },
    goToLogin() {
      this.$router.push("/login"); // Navigation vers la page login
    },
  },
  mounted() {
    this.fetchProducts();
    this.updateCartCount();
  },
};
</script>

<style>
.card {
  margin-bottom: 20px;
}

.cart-img-top {
  max-height: 200px;
  object-fit: cover;
}
</style>
