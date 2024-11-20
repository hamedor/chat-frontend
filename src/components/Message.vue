<template>
  <div class="message">
    <span class="timestamp" :class="{ 'isAdmin': props.msg.role === 'admin' }">[{{ formatTime(msg.createdAt) }}]</span>
    <span class="username" :class="{ 'isAdmin': props.msg.role === 'admin' }"><{{ msg.username }}></span>
    <span class="text" :class="{ 'isAdmin': props.msg.role === 'admin' }">{{ msg.text }}</span>
  </div>
</template>

<script setup lang="ts">

interface Message {
  createdAt: string;
  username: string;
  text: string;
  role: string;
}

const props = defineProps<{ msg: Message }>();

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}



</script>

<style scoped>
.message {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  white-space: pre-wrap;
  text-align: left;
}

.timestamp,
.username,
.text {
  display: inline;
}

.timestamp {
  color: black;
  font-weight: bold;
  margin-right: 5px;
}

.username {
  color: black;
  font-weight: bold;
  margin-right: 5px;
}

.text {
  color: black;
  word-wrap: break-word;
  max-width: 80%;
}

.isAdmin {
  color: red;
}

</style>