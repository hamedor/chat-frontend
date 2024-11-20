import { defineStore } from 'pinia';

interface UserState {
  user: {
    id: number | null;
    username: string;
    role: string;
  };
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {
      id: null,
      username: '',
      role: '',
    },
  }),

  getters: {
    isAuthenticated(state): boolean {
      return !!state.user.username;
    },
    getUsername(state): string {
      return state.user.username;
    },
    getRole(state): string {
      return state.user.role;
    },
  },

  actions: {
    setUser(userData: { id: number; username: string; role: string }) {
      this.user = { ...userData };
    },
    clearUser() {
      this.user = {
        id: null,
        username: '',
        role: '',
      };
    },
  },
});