import { memo } from "react";
import styles from "./Button.module.css";
import classnames from "classnames";

export enum ButtonTheme {
  DEFAULT = "default",
  ACTIVE = "active",
  DISABLED = "disabled",
  GRADIENT = "gradient",
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  theme?: ButtonTheme;
  className?: string;
}

export const Button = memo((props: ButtonProps) => {
  const { children, onClick, theme = ButtonTheme.DEFAULT, className } = props;
  return (
    <button
      onClick={onClick}
      className={classnames(styles.button, styles[theme], className)}
    >
      {children}
    </button>
  );
});
