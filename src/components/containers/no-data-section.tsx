import type { JSXInternal } from "node_modules/preact/src/jsx";
import Styles from "./container.module.css";

export const NoDataSection = ({ children }: NoDataSectionProps) => {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.noDataSection}>{children}</div>
      </div>
    </>
  );
};

interface NoDataSectionProps {
  children: JSXInternal.Element;
}
