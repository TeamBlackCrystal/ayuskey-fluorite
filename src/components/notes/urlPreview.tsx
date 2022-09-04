import type { FC} from "react";
import { memo } from "react";
import { useQuery } from "react-query";
import { styled } from "../../stitches.config";

import { theme } from "../../theme";
import { useCustomApi } from "../../utils/customApi";

interface Props {
	url: string;
}

const FlexDirection = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  '@sp': {
    flexDirection: 'column'
  }
})

const Thumbnail = styled('div', {
  width: '100px',
  backgroundSize: 'cover',
  display: 'flex',
  justifyContent: 'center',
  backgroundPosition: 'center',
  alignItems: 'center',
  '@sp': {
    width: '100%',
    height: '108px'
  }
})

const Article = styled('div', {
  left: '100px',
  width: 'calc(100% - 100px)',
  boxSizing: 'border-box',
  padding: '16px',
  flex: '50%',
  '@sp': {
    width: '100%',
    overflowWrap: 'break-word'
  }
})
const UrlPreview: FC<Props> = memo(({ url }) => {
  const api = useCustomApi()
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
        <Thumbnail style={{backgroundImage: `url(${res.data.thumbnail})`}}/>

            <Article>
              <header style={{marginBottom: "8px", color: theme.text}}>
                {res.data.title}
              </header>
              <p style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: theme.text}}>
                {res.data.description}
              </p>
              <footer style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginTop: "8px", height: "16px"}}>
                <img src={res.data.icon} alt='urlPreviewImage' className="icon" style={{display: "inline-block", width: "16px", height: "16px", marginRight: "4px", verticalAlign: "top"}}/>
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
