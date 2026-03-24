import { useState } from "react";
import styles from "./Checkbox.module.css";
import classnames from "classnames";
import { Checkbox as HeadlessCheckbox } from "@headlessui/react";

interface CheckboxProps {
  label?: string;
  direction: "row" | "column";
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
  error?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, direction, onChange, defaultChecked = false, error } = props;
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const onChangeCheckbox = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={`checkbox-${label}`} className={styles.label}>
            {label}
          </label>
        )}
        <HeadlessCheckbox
          id={`checkbox-${label}`}
          checked={checked}
          onChange={onChangeCheckbox}
          className={classnames(styles.switcher, {
            [styles.toggled]: checked,
            [styles.error]: !!error,
          })}
        >
          <span
            className={classnames(styles.slider, { [styles.toggled]: checked })}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 4L6 11.5L2.5 8" stroke="white" strokeWidth="2" />
            </svg>
          </span>
        </HeadlessCheckbox>
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
