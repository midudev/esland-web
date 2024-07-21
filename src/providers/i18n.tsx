import type { JSXInternal } from "node_modules/preact/src/jsx";
import { createContext } from "preact";

export const i18nContext = createContext("es");

export const I18nProvider = ({ children, locale }: I18nProps) => {
  return <i18nContext.Provider value={locale}>{children}</i18nContext.Provider>;
};

interface I18nProps {
  children: JSXInternal.Element | JSXInternal.Element[];
  locale: string;
}
