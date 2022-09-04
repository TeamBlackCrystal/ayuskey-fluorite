import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: '#99CC00',
      secondary: '#272727',
      text: '#D5D5D6',
      hashtag: "#70c0e8",
      link: "#e88080",
      radius: "12px",
      accent: '#63e2b7',
      bg: '#101014',
      fg: '#D5D5D6',
      divider: 'rgba(255, 255, 255, 0.1)',
      panel: '#18181c',
      panelHeaderBg: '#18181c',
      gray400: 'gainsboro',
      gray500: 'lightgray',
      infoWarnBg: '#42321c',
      infoWarnFg: '#ffbd3e',
      margin: '16px'
    },
  },
  media: {
    sp: '(max-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)'
  },
});


