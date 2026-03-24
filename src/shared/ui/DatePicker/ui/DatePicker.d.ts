interface DatePickerProps {
    leftLabel: string;
    rightLabel?: string;
    hint?: string;
    placeholder?: string;
    onChange?: (value: Date | null) => void;
    error?: string;
}
export declare const DatePicker: (props: DatePickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
