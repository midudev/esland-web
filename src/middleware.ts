import { getEntry, type CollectionEntry } from "astro:content";
import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
    const { url, currentLocale, locals } = context;
    const { pathname } = url;
    const path = pathname.substring(1).replace(".html", "");
    if (currentLocale && !path.endsWith(".json")) {
        const { data }  = await getEntry("i18n", currentLocale) as CollectionEntry<'i18n'>;
        locals.i18n = data;
    }
    next();
});