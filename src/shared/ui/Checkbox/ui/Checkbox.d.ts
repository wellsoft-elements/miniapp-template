interface CheckboxProps {
    label?: string;
    direction: "row" | "column";
    onChange: (checked: boolean) => void;
    defaultChecked?: boolean;
    error?: string;
}
export declare const Checkbox: (props: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
export {};
