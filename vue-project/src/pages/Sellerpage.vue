<template>
  <div v-if="authorized">
    <h1>Bienvenue, Vendeur</h1>
    <p>Voici la liste de vos produits :</p>
    <ul>
      <li v-for="product in myProducts" :key="product.id">
        {{ product.name }} - {{ product.price }} €
        <button @click="requestTransaction(product.id)">Demander une transaction</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
  </div>
</template>

<script>
import { get, post } from "@/services/api"; // Utilisation des méthodes génériques GET et POST
import { hasRole } from "@/utils/permissions"; // Fonction utilitaire pour vérifier le rôle

export default {
  data() {
    return {
      myProducts: [], // Produits appartenant au vendeur
      authorized: false, // Autorisation d'accès à la page
    };
  },
  methods: {
    // Récupère les produits spécifiques au vendeur
    async fetchSellerProducts() {
      try {
        const response = await get("/seller/products"); // Assurez-vous que cet endpoint correspond au backend
        this.myProducts = response.data; // Supposant que les données des produits sont dans `data`
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        alert("Impossible de récupérer vos produits. Veuillez réessayer.");
      }
    },
    // Demande une transaction pour un produit spécifique
    async requestTransaction(productId) {
      try {
        const response = await post(`/seller/products/${productId}/transaction`);
        if (response.success) {
          alert("Transaction demandée avec succès !");
        } else {
          alert("Échec de la demande de transaction.");
        }
      } catch (error) {
        console.error("Erreur lors de la demande de transaction :", error);
        alert("Une erreur s'est produite lors de la demande.");
      }
    },
  },
  mounted() {
    // Vérifie si l'utilisateur a le rôle "Seller"
    this.authorized = hasRole("Seller");
    if (this.authorized) {
      this.fetchSellerProducts(); // Charge les produits s'il est autorisé
    }
  },
};
</script>

<style>
/* Ajoutez vos styles spécifiques ici si nécessaire */
</style>
