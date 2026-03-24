import { isAndroid, isIOS } from 'react-device-detect';

type PlatformAction = () => void;

type Runner = (action: PlatformAction) => void;

const logError = (platform: 'IOS' | 'ANDROID', error: unknown) => {
  console.error(`[${platform} bridge]: native handler not available`, error);
};

const guard = (shouldRun: boolean, platform: 'IOS' | 'ANDROID'): Runner => {
  return (action) => {
    if (!shouldRun) {
      return;
    }

    try {
      action();
    } catch (error) {
      logError(platform, error);
    }
  };
};

export const PlatformActions = {
  IOS: guard(isIOS, 'IOS'),
  ANDROID: guard(isAndroid, 'ANDROID')
};
