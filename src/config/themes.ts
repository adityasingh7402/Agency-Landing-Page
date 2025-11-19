export type ThemeType = 'light' | 'dark' | 'red' | 'blue' | 'purple' | 'green';

export interface Theme {
  name: string;
  value: ThemeType;
  description: string;
  cssClass: string;
  preview: {
    primary: string;
    background: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Light',
    value: 'light',
    description: 'Clean and bright',
    cssClass: 'theme-light',
    preview: {
      primary: '#292524',
      background: '#ffffff',
      accent: '#f5f5f4',
    },
  },
  {
    name: 'Dark',
    value: 'dark',
    description: 'Easy on the eyes',
    cssClass: 'theme-dark',
    preview: {
      primary: '#ebebeb',
      background: '#252525',
      accent: '#454545',
    },
  },
  {
    name: 'Crimson',
    value: 'red',
    description: 'Bold and energetic',
    cssClass: 'theme-red',
    preview: {
      primary: '#DC2626',
      background: '#1A0B0B',
      accent: '#FCA5A5',
    },
  },
  {
    name: 'Ocean',
    value: 'blue',
    description: 'Calm and professional',
    cssClass: 'theme-blue',
    preview: {
      primary: '#2563EB',
      background: '#0C1222',
      accent: '#93C5FD',
    },
  },
  {
    name: 'Purple',
    value: 'purple',
    description: 'Creative and luxurious',
    cssClass: 'theme-purple',
    preview: {
      primary: '#9333EA',
      background: '#1A0A2E',
      accent: '#D8B4FE',
    },
  },
  {
    name: 'Forest',
    value: 'green',
    description: 'Fresh and natural',
    cssClass: 'theme-green',
    preview: {
      primary: '#16A34A',
      background: '#0A1F0F',
      accent: '#86EFAC',
    },
  },
];

export const defaultTheme: ThemeType = 'dark';

export const getThemeByValue = (value: ThemeType): Theme => {
  return themes.find((theme) => theme.value === value) || themes[1];
};
