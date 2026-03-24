interface ImageUploaderProps {
    value?: string | null;
    onChange?: (file: File | null, previewUrl: string | null) => void;
    className?: string;
    accept?: string;
    disabled?: boolean;
}
export declare const ImageUploader: (props: ImageUploaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
