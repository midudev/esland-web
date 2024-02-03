<script setup lang="ts">

import type { Props } from '@/components/Img/SVG';
import { resolve } from '@/components/Img/SVG';

const { src, class: className, hidden, label, height, width } = withDefaults(defineProps<Props>(), {
  hidden: undefined // ignore hidden
});

const { attrs, children } = resolve(src, {
  height,
  width,
  class: className,
  'aria-hidden': hidden,
  'aria-label': label
}, false);
</script>

<template>
  <svg v-html="children" v-bind="{ ...attrs }"  />
</template>
