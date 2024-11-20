import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "@/pages/LoginPage.vue";
import ChatPage from "@/pages/ChatPage.vue";

const routes = [
  { path: '/', component: LoginPage },
  { path: '/chat', component: ChatPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;