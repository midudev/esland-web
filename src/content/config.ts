import { defineCollection } from "astro:content";
import schemaI18n from "@/schemas/i18n"

const i18nCollection = defineCollection({
  type: "data",
  schema: schemaI18n,
});

export const collections = {
  i18n: i18nCollection,
};