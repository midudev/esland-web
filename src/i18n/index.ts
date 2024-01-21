import catalan from '@/i18n/ca.json'
import english from '@/i18n/en.json'
import spanish from '@/i18n/es.json'

const LANGUAGES = {
  CATALAN: 'ca',
  ENGLISH: 'en',
  SPANISH: 'es'
}

export const getI18N = ({
  currentLocale = 'es'
}: {
  currentLocale: string | undefined
}) => {
  if (currentLocale === LANGUAGES.CATALAN) return catalan
  if (currentLocale === LANGUAGES.ENGLISH) return english
  if (currentLocale === LANGUAGES.SPANISH) return spanish
  return spanish
}
