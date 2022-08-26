import { FC, memo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { sp } from "../../media";
import { theme } from "../../theme";
import { api } from "../../utils/api";

interface Props {
	url: string;
}

const FlexDirection = styled.div`
display: flex;
flex-direction: row;
${sp`
flex-direction: column;
`}
`

const Thumbnail = styled.div<{thumbnail: string}>`
width: 100px;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
background-image: url(${props => props.thumbnail});

${sp`
width: 100%;
height: 108px;
`}
`

const Article = styled.div`
left: 100px;
width: calc(100% - 100px);
boxSizing: border-box;
padding: 16px;
flex: 50%;

${sp`
width: 100%;
overflow-wrap: break-word:
`}
`

const UrlPreview: FC<Props> = memo(({ url }) => {
	const { isLoading, data: res } = useQuery(
		url,
		() => api.call("GET", "/url", { query: { url: url } }),
	);
	return (
		<>
		{!isLoading &&
			res?.type === "succeeded" &&
			(
				<div style={{ marginTop: "8px" }}>
          <FlexDirection>
        <Thumbnail thumbnail={res.data.thumbnail}/>

            <Article>
              <header style={{marginBottom: "8px", color: theme.text}}>
                {res.data.title}
              </header>
              <p style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: theme.text}}>
                {res.data.description}
              </p>
              <footer style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginTop: "8px", height: "16px"}}>
                <img src={res.data.icon} className="icon" style={{display: "inline-block", width: "16px", height: "16px", marginRight: "4px", verticalAlign: "top"}}/>
                <p style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: theme.text}}>{res.data.url}</p>
              </footer>
            </Article>
          </FlexDirection>
				</div>
			)}
		</>
	);
});

export default UrlPreview;
