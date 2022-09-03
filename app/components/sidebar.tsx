import type { FC } from "react";
import { FaBell, FaCloud, FaHome, FaStar, FaUserClock } from "react-icons/fa";
import { styled, theme } from "~/stitches.config";


const SidebarContainer = styled('div', {
  marginTop: '16px',
  '@sp': {
    flex: '0 0 78px',
    width: '78px !important'
  }
})

const UserButton = styled('div', {
  position: 'relative',
  display: 'block',
  fontSize: '1em',
  lineHeight: '2.6em',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  textAlign: 'left',
  boxSizing: 'border-box'
})
const PostNoteContainer = styled('div', {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  padding: '16px 0',
  background: theme.colors.bg
})

const SidebarItem = styled('a', {
  color: theme.colors.text,
  position: 'relative',
  display: 'block',
  fontSize: '1em',
  lineHeight: '2.6rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  textAlign: 'left',
  boxSizing: 'border-box'
})

const SidebarItemName = styled('span', {
  fontSize: '1em',
  lineHeight: '2.6rem',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  '@sp': {
    display: 'none'
  }
})

export const Divider = () => {
  return (
    <div style={{margin: "10px 0", borderTop: `solid .5px ${theme.colors.divider}`}}/>
  )
}



export const Sidebar: FC = () => {
  return (
    <SidebarContainer>
      <div style={{position: "sticky", padding: "0 16px", boxSizing: "border-box", width: "260px"}}>
        <UserButton></UserButton>
        <PostNoteContainer>

        </PostNoteContainer>
        <Divider />
        <SidebarItem>
          <FaHome style={{marginRight: "8px", width: "32px", fontWeight: "900", textAlign: "center"}}/>
          <SidebarItemName style={{fontSize: "1em", lineHeight: "2.6rem", whiteSpace: "nowrap", textAlign: "left"}}>タイムライン</SidebarItemName>
        </SidebarItem>
        <SidebarItem>
          <FaBell style={{marginRight: "8px", width: "32px", fontWeight: "900", textAlign: "center"}}/>
          <SidebarItemName style={{fontSize: "1em", lineHeight: "2.6rem", whiteSpace: "nowrap", textAlign: "left"}}>通知</SidebarItemName>
        </SidebarItem>
        <SidebarItem>
          <FaStar style={{marginRight: "8px", width: "32px", fontWeight: "900", textAlign: "center"}}/>
          <SidebarItemName style={{fontSize: "1em", lineHeight: "2.6rem", whiteSpace: "nowrap", textAlign: "left"}}>お気に入り</SidebarItemName>
        </SidebarItem>
        <SidebarItem>
          <FaCloud style={{marginRight: "8px", width: "32px", fontWeight: "900", textAlign: "center"}}/>
          <SidebarItemName style={{fontSize: "1em", lineHeight: "2.6rem", whiteSpace: "nowrap", textAlign: "left"}}>ドライブ</SidebarItemName>
        </SidebarItem>
        <SidebarItem>
          <FaUserClock style={{marginRight: "8px", width: "32px", fontWeight: "900", textAlign: "center"}}/>
          <SidebarItemName style={{fontSize: "1em", lineHeight: "2.6rem", whiteSpace: "nowrap", textAlign: "left"}}>フォロー申請</SidebarItemName>
        </SidebarItem>
        <Divider />
      </div>
    </SidebarContainer>
  )
}
