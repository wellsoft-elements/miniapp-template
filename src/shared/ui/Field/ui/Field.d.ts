interface FieldProps {
    leftLabel: string;
    rightLabel?: string;
    hint?: string;
    error?: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
export declare const Field: (props: FieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
