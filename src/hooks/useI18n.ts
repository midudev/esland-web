import { i18nContext } from "@/providers/i18n";
import { useContext, useEffect, useState } from "preact/hooks";

import { getI18N } from "@/i18n";

export const useI18n = () => {
  const currentLocale = useContext(i18nContext);
  const [i18n, setI18n] = useState(getI18N({ currentLocale }));

  useEffect(() => {
    setI18n(getI18N({ currentLocale }));
  }, [currentLocale]);

  return {
    i18n,
  };
};
