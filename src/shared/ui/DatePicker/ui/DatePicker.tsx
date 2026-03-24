import { ChangeEvent, useState } from "react";
import styles from "./DatePicker.module.css";
import classnames from "classnames";

interface DatePickerProps {
  leftLabel: string;
  rightLabel?: string;
  hint?: string;
  placeholder?: string;
  onChange?: (value: Date | null) => void;
  error?: string;
}

export const DatePicker = (props: DatePickerProps) => {
  const {
    leftLabel,
    rightLabel,
    hint,
    placeholder = "Select a date",
    onChange,
    error,
  } = props;

  const [value, setValue] = useState<string>("");

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setValue(nextValue);
    onChange?.(nextValue ? new Date(nextValue) : null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelsWrapper}>
        <span className={styles.label}>{leftLabel}</span>
        {rightLabel && <span className={styles.label}>{rightLabel}</span>}
      </div>

      <input
        className={classnames(styles.input, { [styles.inputError]: !!error })}
        type="date"
        value={value}
        placeholder={placeholder}
        onChange={onDateChange}
      />

      {error ? (
        <span className={styles.errorText}>{error}</span>
      ) : (
        hint && <span className={styles.hint}>{hint}</span>
      )}
    </div>
  );
};
