import { styled } from "@stitches/react";
import { theme } from "~/stitches.config";


export const SpanText = styled('span', {
  color: `${theme.colors.text}`,
  overflowWrap: 'break-word'
})
