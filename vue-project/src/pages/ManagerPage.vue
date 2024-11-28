<template>
  <div v-if="authorized" class="container mt-4">
    <h1>Bienvenue, Manager</h1>
    <p>Voici la liste des transactions à valider :</p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Produit</th>
          <th>Vendeur</th>
          <th>Prix</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="transaction.id">
          <td>{{ index + 1 }}</td>
          <td>{{ transaction.productName }}</td>
          <td>{{ transaction.sellerName }}</td>
          <td>{{ transaction.price }} €</td>
          <td>
            <button class="btn btn-success me-2" @click="validateTransaction(transaction.id)">
              Valider
            </button>
            <button class="btn btn-danger" @click="rejectTransaction(transaction.id)">
              Rejeter
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
  </div>
</template>

<script>
import { get, post } from "@/services/api"; // Méthodes utilitaires pour fetch
import { hasRole } from "@/utils/permissions"; // Vérifie si l'utilisateur est autorisé

export default {
  data() {
    return {
      transactions: [], // Liste des transactions en attente
      authorized: false, // Indique si l'utilisateur a accès à la page
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await get("/manager/transactions"); // Endpoint pour récupérer les transactions
        this.transactions = response.data; // Assurez-vous que votre API renvoie les transactions sous `data`
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
        alert("Impossible de charger les transactions.");
      }
    },
    async validateTransaction(transactionId) {
      try {
        const response = await post(`/manager/transactions/${transactionId}/validate`);
        if (response.success) {
          alert("Transaction validée avec succès !");
          this.fetchTransactions(); // Recharge la liste des transactions
        } else {
          alert("Échec de la validation.");
        }
      } catch (error) {
        console.error("Erreur lors de la validation :", error);
        alert("Une erreur s'est produite.");
      }
    },
    async rejectTransaction(transactionId) {
      try {
        const response = await post(`/manager/transactions/${transactionId}/reject`);
        if (response.success) {
          alert("Transaction rejetée avec succès !");
          this.fetchTransactions(); // Recharge la liste des transactions
        } else {
          alert("Échec du rejet.");
        }
      } catch (error) {
        console.error("Erreur lors du rejet :", error);
        alert("Une erreur s'est produite.");
      }
    },
  },
  mounted() {
    this.authorized = hasRole("Fnac Manager"); // Vérifie si l'utilisateur est un "Fnac Manager"
    if (this.authorized) {
      this.fetchTransactions(); // Charge les transactions si autorisé
    }
  },
};
</script>

<style>
/* Styles pour une table responsive et moderne */
.table {
  width: 100%;
  margin-top: 20px;
}
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}
</style>
