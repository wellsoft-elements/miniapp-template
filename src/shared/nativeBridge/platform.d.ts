type PlatformAction = () => void;
type Runner = (action: PlatformAction) => void;
export declare const PlatformActions: {
    IOS: Runner;
    ANDROID: Runner;
};
export {};
