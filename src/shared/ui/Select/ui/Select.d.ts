export declare enum SelectTheme {
    DEFAULT = "default",
    ACTIVE = "active",
    DISABLED = "disabled"
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
export declare const Select: import("react").MemoExoticComponent<(props: SelectProps) => import("react/jsx-runtime").JSX.Element>;
export {};
