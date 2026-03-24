import { PlatformActions } from './platform';
import type { NativeBridge } from './types';
import { DEFAULT_BRANDING, type BrandConfig } from '@/shared/types/branding';

const closeOnIOS = () => {
  const handler = window.webkit?.messageHandlers?.handleWebViewClose;
  handler?.postMessage({ payload: {} });
};

const closeOnAndroid = () => {
  window.AndroidBridge?.handleWebViewClose?.();
};

const openOnIOS = (url: string, inSeparateApp?: boolean) => {
  const handler = window.webkit?.messageHandlers?.openUrl;
  handler?.postMessage({ url, inSeparateApp });
};

const openOnAndroid = (url: string, inSeparateApp?: boolean) => {
  window.AndroidBridge?.openUrl?.(url, inSeparateApp);
};

const initOnIOS = () => {
  const handler = window.webkit?.messageHandlers?.webAppInit;
  handler?.postMessage({ payload: {} });
};

const initOnAndroid = () => {
  window.AndroidBridge?.webAppInit?.();
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const parseMaybeJson = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

const extractBrandingPayload = (value: unknown): Record<string, unknown> | undefined => {
  const parsedValue = parseMaybeJson(value);

  if (!isRecord(parsedValue)) {
    return undefined;
  }

  const parsedPayload = parseMaybeJson(parsedValue.payload);
  if (isRecord(parsedPayload)) {
    return parsedPayload;
  }

  return parsedValue;
};

const sanitizeBranding = (value: unknown): BrandConfig => {
  const payload = extractBrandingPayload(value);

  if (!payload) {
    return { ...DEFAULT_BRANDING };
  }

  const nextBranding: BrandConfig = { ...DEFAULT_BRANDING };
  (Object.keys(DEFAULT_BRANDING) as Array<keyof BrandConfig>).forEach((key) => {
    const nextValue = payload[key];
    if (typeof nextValue === 'string' && nextValue.trim()) {
      nextBranding[key] = nextValue;
    }
  });

  return nextBranding;
};

const getBrandingOnIOS = () => {
  const handler = window.webkit?.messageHandlers?.getBranding;
  return handler?.postMessage({ payload: {} });
};

const getBrandingOnAndroid = () => {
  return window.AndroidBridge?.getBranding?.();
};

const createBridge = (): NativeBridge => ({
  closeWebView: () => {
    PlatformActions.IOS(closeOnIOS);
    PlatformActions.ANDROID(closeOnAndroid);
  },
  openUrl: (url: string, inSeparateApp = false) => {
    PlatformActions.IOS(() => openOnIOS(url, inSeparateApp));
    PlatformActions.ANDROID(() => openOnAndroid(url, inSeparateApp));
  },
  webAppInit: () => {
    PlatformActions.IOS(initOnIOS);
    PlatformActions.ANDROID(initOnAndroid);
  },
  getBranding: async () => {
    let brandingFromNative: unknown;

    PlatformActions.IOS(() => {
      brandingFromNative = getBrandingOnIOS();
    });

    PlatformActions.ANDROID(() => {
      brandingFromNative = getBrandingOnAndroid();
    });

    return sanitizeBranding(brandingFromNative);
  }
});

export const nativeBridge = createBridge();
