import type { Props } from '@/components/Img/SVG';
import { resolve } from "@/components/Img/SVG";
import { h } from "preact";

export default ({ src, class: className, hidden, label, height, width }: Props) => {
  const { attrs, children } = resolve(src, {
    height,
    width,
    class: className,
    'aria-hidden': hidden,
    'aria-label': label
  }, false);
  return h('svg', { ...attrs, dangerouslySetInnerHTML: { __html: children } })
}