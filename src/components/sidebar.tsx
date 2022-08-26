import { FC } from "react";
import { FaBell, FaCloud, FaHome, FaStar, FaUserClock } from "react-icons/fa";
import style from "styled-components";
import { sp } from "../media";
import { theme } from "../theme";
import { Divider } from "./divider";


const SidebarContainer = style.div`
margin-top: 16px;

${sp`
flex: 0 0 78px;
width: 78px !important;
`}
`;

const UserButton = style.div`
position: relative;
display: block;
font-size: 1em;
line-height: 2.6rem;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width: 100%;
text-align: left;
box-sizing: border-box;
`

const PostNoteContainer = style.div`
position: sticky;
top: 0;
z-index: 1;
padding: 16px 0;
background: var(--bg);
`

const SidebarItem = style.a`
color: ${theme.text};
position: relative;
display: block;
font-size: 1em;
line-height: 2.6rem;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width: 100%;
text-align: left;
box-sizing: border-box;

`

const SidebarItemName = style.span`
font-size: 1em;
line-height: 2.6rem;
white-space: "nowrap";
text-align: "left";
${sp`
display: none;
`}
`


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
