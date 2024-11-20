<template>
  <div class="auth-body">
    <h2>{{ isLogin ? 'Войти в чат' : 'Регистрация в Чате' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Имя пользователя</label>
        <Input
            id="username"
            v-model="username"
            placeholder="Введите имя"
            autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            :autocomplete="isLogin ? 'current-password' : 'new-password'"
        />
      </div>

      <Button type="submit" :label="isLogin ? 'Войти' : 'Зарегистрироваться'" class="submit-button" />
    </form>

    <p class="toggle-text">
      {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
      <a href="#" @click.prevent="isLogin = !isLogin">
        {{ isLogin ? 'Регистрация' : 'Вход' }}
      </a>
    </p>
  </div>
</template>


<script setup>
import Button from "@/components/Button.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from "@/components/Input.vue";
import {useUserStore} from "@/modules/User/UserStore.ts";
import AuthService from "@/modules/services/AuthService.ts";

const username = ref('');
const password = ref('');
const isLogin = ref(false);
const router = useRouter();
const userStore = useUserStore();

const register = async () => {
 try {
   await AuthService.register(username.value, password.value)
   alert('Успешная регистрация! Теперь можно войти.')
   isLogin.value = true
 } catch (error) {
   console.error("Ошибка регистрации:", error)
   alert('Ошибка регистрации.')
 }
};

const login = async () => {
  try {
    const response = await AuthService.login(username.value, password.value)
    const token = response.token

    if (token) {
      localStorage.setItem('token', token);
      userStore.setUser(response.user);
      await router.push('/chat');
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    alert('Ошибка входа.');
  }
};

const handleSubmit = () => {
  if (isLogin.value) {
    login()
  } else {
    register()
  }
}

</script>

<style scoped>
.auth-body {
  padding: 10px;
}

h2 {
  color: #000080;
  font-size: 16px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 10px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #000080;
}

input {
  width: 100%;
  padding: 5px;
  font-family: inherit;
  border: 1px solid #808080;
  margin-bottom: 10px;
}

.submit-button{
  width: 100%;
  padding: 5px;
  background: #d4d0c8;
  border: 1px solid #808080;
  cursor: pointer;
  font-family: inherit;
}

.submit-button:hover {
  background: #c0c0c0;
}

.toggle-text {
  color: #0a0909;
}

h3 {
  font-size: 14px;
  color: #000080;
  margin-bottom: 10px;
}
</style>