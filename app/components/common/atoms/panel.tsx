import { styled } from "@stitches/react";
import { theme } from "~/stitches.config";

export const Panel = styled('div', {
  background: theme.colors.panel,
  borderRadius: theme.colors.radius,
  overflow: 'clip'
})
