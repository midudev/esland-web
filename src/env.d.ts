/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    i18n: CollectionEntry<'i18n'>
  }
}

declare type Votes = Array<Array<string>>