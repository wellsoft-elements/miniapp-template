import type { BrandConfig } from '@/shared/types/branding';
export interface WebkitPostMessage<TPayload extends object = object> {
    payload: TPayload;
}
export interface OpenUrlPayload {
    url: string;
    inSeparateApp?: boolean;
}
declare global {
    interface Window {
        webkit?: {
            messageHandlers?: {
                openUrl?: {
                    postMessage: (params: OpenUrlPayload) => void;
                };
                handleWebViewClose?: {
                    postMessage: (params: WebkitPostMessage) => void;
                };
                webAppInit?: {
                    postMessage: (params: WebkitPostMessage) => void;
                };
                getBranding?: {
                    postMessage: (params: WebkitPostMessage) => unknown;
                };
            };
        };
        AndroidBridge?: {
            openUrl?: (url: string, inSeparateApp?: boolean) => void;
            handleWebViewClose?: () => void;
            webAppInit?: () => void;
            getBranding?: () => unknown;
        };
    }
}
export interface NativeBridge {
    openUrl: (url: string, inSeparateApp?: boolean) => void;
    closeWebView: () => void;
    webAppInit: () => void;
    getBranding: () => Promise<BrandConfig>;
}
