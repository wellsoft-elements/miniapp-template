import { ChangeEvent, useState } from "react";
import styles from "./Field.module.css";
import classnames from "classnames";

interface FieldProps {
  leftLabel: string;
  rightLabel?: string;
  hint?: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Field = (props: FieldProps) => {
  const {
    leftLabel,
    placeholder = "Введите текст",
    rightLabel,
    hint,
    error,
    onChange,
  } = props;
  const [value, setValue] = useState<string>("");

  const onFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelsWrapper}>
        <span className={styles.label}>{leftLabel}</span>
        {rightLabel && <span className={styles.label}>{rightLabel}</span>}
      </div>
      <textarea
        placeholder={placeholder}
        onChange={onFieldChange}
        value={value}
        className={classnames(styles.field, { [styles.fieldError]: !!error })}
      >
        {value}
      </textarea>

      {error ? (
        <span className={styles.errorText}>{error}</span>
      ) : (
        hint && <span className={styles.label}>{hint}</span>
      )}
    </div>
  );
};
