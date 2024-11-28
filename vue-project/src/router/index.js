import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SellerPage from '@/pages/SellerPage.vue';
import ManagerPage from '@/pages/ManagerPage.vue';

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/login', component: LoginPage, name: 'Login' },
  { path: '/seller', component: SellerPage, name: 'Seller', meta: { requiresAuth: true, role: 'Seller' } },
  { path: '/manager', component: ManagerPage, name: 'Manager', meta: { requiresAuth: true, role: 'Fnac Manager' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user")); // Récupérer l'utilisateur connecté
  if (to.meta.requiresAuth) {
    if (!user) {
      // Rediriger vers login si non connecté
      next("/login");
    } else if (user.role !== to.meta.role) {
      // Vérifier le rôle si requis
      alert("Vous n'avez pas les permissions nécessaires !");
      next("/");
    } else {
      next();
    }
  } else {
    next(); // Autoriser si la route n'exige pas d'authentification
  }
});
