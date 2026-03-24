import classnames from "classnames";
import styles from "./Card.module.css";

export enum CardVariant {
  HORIZONTAL_RIGHT = "horizontalRight",
  HORIZONTAL_LEFT = "horizontalLeft",
  VERTICAL = "vertical",
}

interface CardMetaItem {
  label: string;
  value: string;
}

interface CardProps {
  title: string;
  subtitle?: string;
  price?: string;
  imageUrl: string;
  variant?: CardVariant;
  meta?: CardMetaItem[];
}

export const Card = (props: CardProps) => {
  const {
    title,
    subtitle,
    price,
    imageUrl,
    variant = CardVariant.HORIZONTAL_RIGHT,
    meta,
  } = props;

  const isVertical = variant === CardVariant.VERTICAL;
  const isImageRight = variant === CardVariant.HORIZONTAL_RIGHT;

  return (
    <article
      className={classnames(styles.card, {
        [styles.horizontal]: !isVertical,
        [styles.vertical]: isVertical,
        [styles.imageRight]: isImageRight,
      })}
    >
      <div className={styles.mediaWrapper}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {price && <div className={styles.price}>{price}</div>}

        {meta && meta.length > 0 && (
          <div className={styles.metaList}>
            {meta.map((item) => (
              <div key={`${item.label}-${item.value}`} className={styles.meta}>
                <span className={styles.metaLabel}>{item.label}</span>
                <span className={styles.metaValue}>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
