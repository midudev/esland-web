import catalan from './ca.json'
import spanish from './es.json'
import english from './en.json'

const LANGUAGES = {
  CATALAN: 'ca',
  SPANISH: 'es',
  ENGLISH: 'en'
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
