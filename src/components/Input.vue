<template>
  <input
      type="text"
      class="input"
      :value="props.modelValue"
      @input="onInput"
  />
</template>

<script setup lang="ts">

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>


<style scoped>
.input {
  width: 100%;
  padding: 5px;
  border: 1px solid #808080;
  box-shadow: inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040;
  background-color: #ffffff;
  outline: none;
  color: black;
  box-sizing: border-box;
}
</style>