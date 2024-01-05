import catalan from './ca.json'
import spanish from './es.json'

export const LANGUAGES: Record<
  string,
  { key: string; language: string; flag: string }
> = {
  CATALAN: {
    key: 'ca',
    language: 'Català',
    flag: 'AD'
  },
  SPANISH: {
    key: 'es',
    language: 'Español',
    flag: 'MX'
  }
} as const

export const SHOW_DEFAULT_LANGUAGE = false
export const DEFAULT_LANGUAGE = {
  key: 'es',
  name: 'SPANISH'
}

export const getI18N = ({
  currentLocale = 'es'
}: {
  currentLocale: string | undefined
}) => {
  if (currentLocale === LANGUAGES.CATALAN.key) return catalan
  if (currentLocale === LANGUAGES.SPANISH.key) return spanish
  return spanish
}
