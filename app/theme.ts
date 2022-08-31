export const darkTheme = {
  base: "dark",
  primary: '#99CC00',
  secondary: '#272727',
  text: '#D5D5D6',
  props: {
    hashtag: "#70c0e8",
    link: "#e88080",
    radius: "12px",
		accent: '#63e2b7',
		bg: '#101014',
		fg: '#D5D5D6',
    divider: 'rgba(255, 255, 255, 0.1)',
		panel: '#18181c',
		panelHeaderBg: () => darkTheme.props.panel,
  }
}

export const theme = darkTheme
