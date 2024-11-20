<template>
  <button
      :type="type"
      class="button"
      @click="handleClick"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
}

const props = defineProps<ButtonProps>();
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const type = props.type || "button";

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<style scoped>
.button {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  padding: 5px 15px;
  color: black;
  background-color: #d4d0c8;
  text-align: center;
  border: 2px solid #404040;
  position: relative;
  cursor: pointer;
  box-shadow:
      inset 1px 1px #fff,
      inset -1px -1px #000;
  box-sizing: border-box;
}

.button::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 1px dotted #000;
  pointer-events: none;
}

.button:active {
  box-shadow:
      inset 1px 1px #000,
      inset -1px -1px #fff;
  background-color: #c0c0c0;
}

</style>