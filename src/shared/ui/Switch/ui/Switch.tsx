import { useState } from "react";
import styles from "./Switch.module.css";
import { Switch as Toggle } from "@headlessui/react";
import classnames from "classnames";

interface SwitchProps {
  label?: string;
  direction: "row" | "column";
  onChange: (checked: boolean) => void;
}

export const Switch = (props: SwitchProps) => {
  const { label, direction, onChange } = props;
  const [checked, setChecked] = useState<boolean>(false);

  const onChangeSwitch = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={`switch-${label}`} className={styles.label}>
          {label}
        </label>
      )}
      <Toggle
        id={`switch-${label}`}
        checked={checked}
        onChange={onChangeSwitch}
        className={classnames(styles.switcher, { [styles.toggled]: checked })}
      >
        <span
          className={classnames(styles.slider, { [styles.toggled]: checked })}
        />
      </Toggle>
    </div>
  );
};
