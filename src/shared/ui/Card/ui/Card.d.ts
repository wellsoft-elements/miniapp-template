export declare enum CardVariant {
    HORIZONTAL_RIGHT = "horizontalRight",
    HORIZONTAL_LEFT = "horizontalLeft",
    VERTICAL = "vertical"
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
export declare const Card: (props: CardProps) => import("react/jsx-runtime").JSX.Element;
export {};
