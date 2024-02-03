<script lang="ts">
  let className: string | undefined;
  export let src: string;
  export let label: string | undefined;
  export let hidden: boolean | undefined;
  export let height: string | number | undefined;
  export let width: string | number | undefined;
  export { className as class }
  import { resolve } from "@/components/Img/SVG";
  const { attrs, children } =  resolve(src, {
    height,
    width,
    class: className,
    'aria-hidden': hidden,
    'aria-label': label
  }, false)
</script>
<svg {...attrs}>{@html children}</svg>
