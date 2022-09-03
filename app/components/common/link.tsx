import { styled, theme } from "~/stitches.config";

export const Link = styled("a", {
  color: "inherit",
  textDecoration: 'none',
  '&:active': {
    color: "inherit"
  },
  '&:hover': {
    textDecoration: 'underline'
  },
	variants: {
		type: {
			link: {
				color: theme.colors.link,
			},
		},
	},
});
