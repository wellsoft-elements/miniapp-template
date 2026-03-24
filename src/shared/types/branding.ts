export interface BrandConfig {
  primary: string;
  secondary: string;
  muted: string;
  primaryActive: string;
  textPrimary: string;
  textSecondary: string;
  backgroundGray: string;
  backgroundWhite: string;
  red: string;
  spaceSmall: string;
  spaceMedium: string;
  spaceLarge: string;
  spaceExtraLarge: string;
  buttonSpacing: string;
  buttonHeight: string;
  cornerRadius: string;
  cornerRadiusBig: string;
}

export const DEFAULT_BRANDING: BrandConfig = {
  primary: '#00a539',
  secondary: '#009e90',
  muted: '#e8f6ea',
  primaryActive: '#008f31',
  textPrimary: '#212121',
  textSecondary: '#757575',
  backgroundGray: '#f5f5f5',
  backgroundWhite: '#ffffff',
  red: '#e53935',
  spaceSmall: '8px',
  spaceMedium: '12px',
  spaceLarge: '16px',
  spaceExtraLarge: '24px',
  buttonSpacing: '14px 16px',
  buttonHeight: '48px',
  cornerRadius: '4px',
  cornerRadiusBig: '8px'
};
