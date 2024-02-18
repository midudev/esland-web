import type { JSXInternal } from "node_modules/preact/src/jsx";
import Styles from "./container.module.css";

export const Container = ({ children }: ContainerProps) => {
  return <div className={Styles.container}>{children}</div>;
};

interface ContainerProps {
  children: JSXInternal.Element | JSXInternal.Element[];
}
