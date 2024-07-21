import { Fragment } from "preact";
import Styles from "./titles.module.css";

import type { JSXInternal } from "node_modules/preact/src/jsx";

export const Title = ({
  children,
  tag = "p",
  center,
  block,
  uppercase,
  space = "nospace",
  topSpace,
  bottomSpace,
  weight = "weight-normal",
  secondaryText,
}: TitleProps) => {
  const Tag = tag;

  const classes = [Styles.container];
  if (center) classes.push(Styles.center);
  if (block) classes.push(Styles.block);
  if (uppercase) classes.push(Styles.uppercase);
  if (space) classes.push(Styles[space]);
  if (topSpace) classes.push(Styles[`top-${topSpace}`]);
  if (bottomSpace) classes.push(Styles[`bottom-${bottomSpace}`]);
  if (weight) classes.push(Styles[weight]);

  return (
    <Fragment>
      <Tag className={classes.join(" ")}>
        {children}
        {secondaryText && <span className={Styles.secondaryText}>{secondaryText}</span>}
      </Tag>
    </Fragment>
  );
};

interface TitleProps {
  children: JSXInternal.Element | string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  center?: boolean;
  block?: boolean;
  uppercase?: boolean;
  space?: "nospace" | "space-xsmall" | "space-small" | "space-medium" | "space-large" | "space-xlarge";
  topSpace?: "nospace" | "space-xsmall" | "space-small" | "space-medium" | "space-large" | "space-xlarge";
  bottomSpace?: "nospace" | "space-xsmall" | "space-small" | "space-medium" | "space-large" | "space-xlarge";
  weight?: "weight-light" | "weight-normal" | "weight-bold" | "weight-xbold";
  secondaryText?: string;
}
