export declare enum ButtonTheme {
    DEFAULT = "default",
    ACTIVE = "active",
    DISABLED = "disabled",
    GRADIENT = "gradient"
}
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    theme?: ButtonTheme;
    className?: string;
}
export declare const Button: import("react").MemoExoticComponent<(props: ButtonProps) => import("react/jsx-runtime").JSX.Element>;
export {};
