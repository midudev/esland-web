<script setup lang="ts">
interface Props {
  href: string
  locale?: string
}

import { getRelativeLocaleUrl } from "@/i18n/config"

const props = defineProps<Props>()
let { href, locale } = props;
href = getRelativeLocaleUrl(locale, href)
</script>

<template>
  <a :href=href><slot></slot></a>
</template>