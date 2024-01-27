interface Props {
  href: string
  children?: preact.ComponentChildren
  locale?: string
  className?: string
}

import { getRelativeLocaleUrl } from "@/i18n/config" // falla si no esta dentro

export default ({ href, locale, children, ...rest }: Props) => {
  return <a href={getRelativeLocaleUrl(locale, href)} {...rest}>{children}</a>
}