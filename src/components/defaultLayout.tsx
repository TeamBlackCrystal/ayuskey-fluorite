import { FC, ReactNode } from "react";
import { styled, theme } from "../stitches.config";
import { Sidebar } from "./sidebar";


const Contents = styled('div', {
  minWidth: 0,
  minHeight: '100vh',
  width: '100%',
  maxWidth: '750px',
  margin: '0 16px 0 0',
  borderLeft: `solid 1px ${theme.colors.divider}`,
  borderRight: `solid 1px ${theme.colors.divider}`,
  borderRadius: 0,
  overFlow: 'clip',
  '@sp': {
    margin: 0
  }
})

const Widgets = styled('div', {
  width: '300px',
  marginTop: '16px',
  '@sp': {
    display: 'none'
  }
})

const Columns = styled('div', {
  display: 'flex',
  background: theme.colors.bg,
  justifyContent: 'center',
  maxWidth: '100%'
})

export const DefaultLayout: FC<{children: ReactNode}> = ({children}) => {
  return (
    <Columns>
    <Sidebar />
    <Contents>
      {children}
      </Contents>
    <Widgets></Widgets>
  </Columns>
  )
}
