interface SwitchProps {
    label?: string;
    direction: "row" | "column";
    onChange: (checked: boolean) => void;
}
export declare const Switch: (props: SwitchProps) => import("react/jsx-runtime").JSX.Element;
export {};
