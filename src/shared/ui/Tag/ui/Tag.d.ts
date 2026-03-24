import { ReactNode } from "react";
export declare enum TagTheme {
    NEUTRAL = "neutral",
    SUCCESS = "success",
    DANGER = "danger"
}
export declare enum TagVariant {
    FILLED = "filled",
    OUTLINE = "outline"
}
interface TagProps {
    children: ReactNode;
    theme?: TagTheme;
    variant?: TagVariant;
    className?: string;
}
export declare const Tag: import("react").MemoExoticComponent<(props: TagProps) => import("react/jsx-runtime").JSX.Element>;
export {};
