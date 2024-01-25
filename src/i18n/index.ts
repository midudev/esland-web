import catalan from '@/i18n/ca.json';
import english from '@/i18n/en.json';
import spanish from '@/i18n/es.json';

const LANG = {
	CATALAN: 'ca',
	ENGLISH: 'en',
	SPANISH: 'es',
};

export const getI18N = ({
	currentLocale = 'es',
}: {
	currentLocale: string | undefined;
}) => {
	if (currentLocale === LANG.CATALAN) return {...spanish, ...catalan};
	if (currentLocale === LANG.ENGLISH) return {...spanish, ...english};
	return spanish;
};
