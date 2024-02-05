<script lang="ts">
export let href: string;
export let locale: string;

import { getRelativeLocaleUrl } from "@/i18n/config"

href = getRelativeLocaleUrl(locale, href)

</script>

<a {href}><slot></slot></a>