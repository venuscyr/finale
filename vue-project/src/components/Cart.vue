<template>
  <div class="cart-container">
    <h2>Votre Panier</h2>
    <div v-if="cartItems.length === 0">
      <p>Votre panier est vide.</p>
    </div>
    <ul v-else>
      <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <!-- Gestion des images avec image par défaut -->
        <img 
          :src="item.image || '/images/default-product.png'" 
          alt="product" 
          class="cart-item-image" 
        />
        <div class="cart-item-details">
          <h5>{{ item.name }}</h5>
          <p>Prix unitaire : {{ item.price }} €</p>
          <p>Quantité : 
            <button @click="decreaseQuantity(index)" class="btn btn-light btn-sm">-</button>
            {{ item.quantity }}
            <button @click="increaseQuantity(index)" class="btn btn-light btn-sm">+</button>
          </p>
          <p>Sous-total : {{ item.price * item.quantity }} €</p>
          <button class="btn btn-danger btn-sm" @click="removeFromCart(index)">Supprimer</button>
        </div>
      </li>
    </ul>
    <div v-if="cartItems.length > 0">
      <h3>Total : {{ cartTotal }} €</h3>
      <button class="btn btn-success" @click="checkout">Passer commande</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartItems: [], // Articles dans le panier
    };
  },
  computed: {
    cartTotal() {
      // Calcul du total en tenant compte des quantités
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    loadCart() {
      // Chargement des articles depuis le localStorage
      const cart = localStorage.getItem("cart");
      this.cartItems = cart ? JSON.parse(cart) : [];
    },
    saveCart() {
      // Sauvegarde des articles dans le localStorage
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    increaseQuantity(index) {
      // Augmenter la quantité d'un article
      this.cartItems[index].quantity += 1;
      this.saveCart();
    },
    decreaseQuantity(index) {
      // Diminuer la quantité (sans descendre sous 1)
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
        this.saveCart();
      }
    },
    removeFromCart(index) {
      // Supprimer un article du panier
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    checkout() {
      // Passage de la commande
      alert("Commande passée avec succès !");
      this.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
  mounted() {
    this.loadCart(); // Charger les articles au montage
  },
};
</script>

<style>
.cart-container {
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-details h5 {
  margin-bottom: 10px;
}

.btn-sm {
  margin: 0 5px;
}
</style>

