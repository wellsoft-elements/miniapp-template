import { ReactNode, memo } from "react";
import classnames from "classnames";
import styles from "./Tag.module.css";

export enum TagTheme {
  NEUTRAL = "neutral",
  SUCCESS = "success",
  DANGER = "danger",
}

export enum TagVariant {
  FILLED = "filled",
  OUTLINE = "outline",
}

interface TagProps {
  children: ReactNode;
  theme?: TagTheme;
  variant?: TagVariant;
  className?: string;
}

export const Tag = memo((props: TagProps) => {
  const {
    children,
    theme = TagTheme.NEUTRAL,
    variant = TagVariant.FILLED,
    className,
  } = props;

  return (
    <span
      className={classnames(
        styles.tag,
        styles[theme],
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
});
