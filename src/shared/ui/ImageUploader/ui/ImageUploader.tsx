import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ImageUploader.module.css";
import classnames from "classnames";

interface ImageUploaderProps {
  value?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  className?: string;
  accept?: string;
  disabled?: boolean;
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const {
    value = null,
    onChange,
    className,
    accept = "image/*",
    disabled = false,
  } = props;

  const [preview, setPreview] = useState<string | null>(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const clearObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(() => {
    if (value === null) {
      clearObjectUrl();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
    setPreview(value);
  }, [value]);

  useEffect(() => {
    return () => {
      clearObjectUrl();
    };
  }, []);

  const onCardClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick();
    }
  };

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    clearObjectUrl();

    const url = URL.createObjectURL(file);

    objectUrlRef.current = url;
    setPreview(url);
    onChange?.(file, url);
  };

  const onRemoveImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    clearObjectUrl();
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null, null);
  };

  const placeholder = useMemo(
    () => (
      <svg
        width="104"
        height="104"
        viewBox="0 0 104 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9840_2807)">
          <rect
            x="1"
            y="1"
            width="102"
            height="102"
            rx="7"
            stroke="#E5E5E5"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <path
            d="M50 44V60"
            stroke="#E5E5E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 52H58"
            stroke="#E5E5E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9840_2807">
            <rect width="104" height="104" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    []
  );

  return (
    <div className={classnames(styles.wrapper, className)}>
      {preview && (
        <div className={classnames(styles.card, styles.filled)}>
          <img
            className={styles.image}
            src={preview}
            alt="Загруженное изображение"
          />
          {!disabled && (
            <button
              type="button"
              className={styles.remove}
              onClick={onRemoveImage}
              aria-label="Удалить изображение"
            >
              <svg
                viewBox="0 0 16 16"
                className={styles.removeIcon}
                aria-hidden="true"
              >
                <path
                  d="M4.75 4.75L11.25 11.25M11.25 4.75L4.75 11.25"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      <div
        className={classnames(styles.card, {
          [styles.disabled]: disabled,
        })}
        onClick={onCardClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
        aria-label="Загрузить изображение"
      >
        <input
          ref={inputRef}
          className={styles.input}
          type="file"
          accept={accept}
          onChange={onSelectFile}
          disabled={disabled}
        />
        <div className={styles.placeholder}>{placeholder}</div>
      </div>
    </div>
  );
};
