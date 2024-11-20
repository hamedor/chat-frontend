<template>
  <div class="chat-container">
    <div class="chat-box">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index">
          <Message :msg="message" />
        </div>
      </div>
      <div class="side-bar">
        <p>Подключено пользователей: {{ connectionCount }}</p>
        <span class="user-list" v-for="user in users" :key="user">
          <span :class="{ 'isAdmin': user.role === 'admin' }">{{ user.username }}</span>
        </span>
      </div>
    </div>
    <div class="form">
      <Input  @keydown.enter.prevent="sendMessage" class="input" v-model="message" />
      <Button @click="sendMessage"  label="Отправить" type="submit"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import { ref, onMounted, onUnmounted } from 'vue';
import Input from "@/components/Input.vue";
import {useUserStore} from "@/modules/User/UserStore.ts";
import Message from "@/components/Message.vue";
import AbstractWebSocketService from '@/modules/services/AbstractWebSocketService';
import WebSocketService from '@/modules/services/WebSocketService';
import {MessageType} from "@/types/MessageType.ts";
import {useRouter} from "vue-router";
import AuthService from "@/modules/services/AuthService.ts";

const messages = ref([]);
const message = ref('');
const connectionCount = ref(0);
const users = ref([])
const token = ref(localStorage.getItem('token') || null);
const userStore = useUserStore()
const router = useRouter()


const webSocketService: AbstractWebSocketService = new WebSocketService(
    import.meta.env.VITE_WS_URL
);

const handleMessage = (receivedData: any) => {
  switch (receivedData.type) {
    case MessageType.ConnectionInfo:
      connectionCount.value = receivedData.data.connectionCount;
      users.value = receivedData.data.users;
      break;
    case MessageType.History:
      messages.value = receivedData.data.map((msg: any) => ({
        username: msg.username,
        role: msg.role,
        text: msg.message,
        createdAt: msg.createdAt,
      }));
      break;
    case MessageType.Message:
      messages.value.push({
        username: receivedData.data.username,
        role: receivedData.data.role,
        text: receivedData.data.message,
        createdAt: receivedData.data.createdAt,
      });
      break;
    case MessageType.Error:
      if (receivedData.message === 'Недействительный токен') {
        localStorage.removeItem('token');
        router.push('/');
      } else {
        alert(`Ошибка: ${receivedData.message || 'Неизвестная ошибка'}`);
      }
      break;
    default:
      console.warn('Неизвестный тип сообщения:', receivedData.type);
  }
};


const sendMessage = () => {
  if (message.value) {
    webSocketService.send({
      type: MessageType.Message,
      text: message.value,
    });
    message.value = '';
  }
};

onMounted(async () => {
  try {
    const userInfo = await AuthService.info();
    userStore.setUser(userInfo);

    webSocketService.connect(token.value, userStore.username);
    webSocketService.addMessageHandler(handleMessage);

  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      userStore.clearUser();
      await router.push('/');
    } else {
      console.error('Ошибка при получении информации о пользователе:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте снова позже.');
    }
  }
});

onUnmounted(() => {
  webSocketService.removeMessageHandler(handleMessage);
  webSocketService.disconnect();
});

</script>

<style scoped>
.chat-container {
  font-family: 'Courier New', Courier, monospace;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: calc(100% - 45px);
}

.chat-box {
  display: flex;
  gap: 20px;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }

}

.side-bar {
  margin-left: auto;

  @media (max-width: 600px) {
   margin-right: auto;
  }
}

.messages {
  flex: 1;
  max-height: 100%;
  overflow-y: auto;
  border: 1px solid #808080;
  padding: 10px;
  margin-bottom: 10px;
}
.isAdmin {
  color: red;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form {
  width: 100%;
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px 16px;
}
</style>