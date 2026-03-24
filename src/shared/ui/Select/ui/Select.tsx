import { memo, useState } from "react";
import styles from "./Select.module.css";
import classnames from "classnames";
import { Portal } from "@/shared/ui/Portal";
import { Button } from "../../Button";

export enum SelectTheme {
  DEFAULT = "default",
  ACTIVE = "active",
  DISABLED = "disabled",
}

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  subtitle?: string;
  label: string;
  theme?: SelectTheme;
  options: Option[];
  onChange: (option: Option) => void;
  error?: string;
  bordered?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    subtitle,
    label,
    theme = SelectTheme.DEFAULT,
    options,
    onChange,
    error,
    bordered = true,
  } = props;
  const [open, setIsOpen] = useState<boolean>(false);
  const [groupText, setGroupText] = useState<{
    label: SelectProps["label"];
    subtitle: SelectProps["subtitle"];
  }>({
    label: label,
    subtitle: subtitle || "",
  });

  const toggleOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  const onOptionSelect = (option: Option) => {
    setGroupText({
      label: option.label,
      subtitle: option.value,
    });
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        className={classnames(
          styles.selectWrapper,
          styles[theme],
          {
            [styles.error]: !!error,
            [styles.bordered]: bordered,
            [styles.opened]: open,
          },
        )}
      >
        <div className={styles.selectGroup}>
          <div className={styles.label}>{groupText.label}</div>
          <div className={styles.subtitle}>{groupText.subtitle}</div>
        </div>
        <div className={classnames(styles.arrow, { [styles.active]: open })}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
      {theme !== SelectTheme.DISABLED && (
        <Portal>
          <div
            onClick={toggleOpen}
            className={classnames(styles.backdrop, { [styles.shown]: open })}
          ></div>
          <div className={classnames(styles.options, { [styles.shown]: open })}>
            {options.map((option) => (
              <div
                data-selected={groupText.subtitle === option.value}
                className={styles.item}
                key={option.value}
                onClick={() => {
                  onOptionSelect(option);
                }}
              >
                {option.label}
              </div>
            ))}
            <div className={styles.footer}>
              <Button onClick={toggleOpen}>Отменить</Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
});
