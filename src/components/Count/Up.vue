<script setup>
import { ref } from 'vue'
import ProgressiveNumber from "./Up";

const { initial, final, duration, decimals } = defineProps({
  initial: {
    type: Number,
    required: true
  },
  final: {
    type: Number,
    required: true
  },
  decimals: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 1500
  }
})

const count = ref(initial)

ProgressiveNumber.generate(
  initial,
  final,
  (value) => {
    count.value = value;
  },
  decimals,
  duration,
);
</script>

<template><span>{{ count }}</span></template>