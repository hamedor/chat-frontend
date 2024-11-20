<template>
  <div class="app-window">
    <div class="title-bar">
      <span>Чат 0.1 alfa</span>
      <div class="buttons">
        <div @click="router.push('/')" class="icon close"></div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()

</script>

<style>
body {
  background-color: #c0c0c0;
  font-family: 'Courier New', Courier, monospace;
}

.app-window {
  background: #d4d0c8;
  border: 2px solid #808080;
  font-size: 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title-bar {
  background: #16265A;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2px 8px;
  font-weight: bold;
}

.toolbar {
  background: linear-gradient(to right, #ced7de, #f0f0f0);
  display: flex;
  padding: 4px;
  gap: 4px;
  border-bottom: 2px solid #808080;
  border-top: 1px solid #fff;
}

.buttons {
  display: flex;
  gap: 4px;
}

.icon {
  width: 20px;
  height: 20px;
  background-color: #d4d0c8;
  box-shadow:
      inset 1px 1px #fff,
      inset -1px -1px #404040;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon:active {
  box-shadow:
      inset 1px 1px #404040,
      inset -1px -1px #fff;
  background-color: #c0c0c0;
}

.close::before {
  content: "✕";
  font-size: 14px;
  color: #0a0909;
}

</style>