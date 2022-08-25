import { FC, memo } from "react";
import { useQuery } from "react-query";
import { theme } from "../../theme";
import { api } from "../../utils/api";

interface Props {
	url: string;
}

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
					<a
						href={url}
						target="_blank"
						style={{
							position: "relative",
							display: "block",
							fontSize: "14px",
							boxShadow: "0 0 0 1px rgb(255, 255, 255, 255, 0.1)",
							borderRadius: "8px",
							overflow: "hidden",
						}}
					>
						<div
							className="thumbnail"
							style={{
								position: "absolute",
								width: "100px",
								height: "100%",
								backgroundPosition: "center",
								backgroundSize: "cover",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
                backgroundImage: `url(${res.data.thumbnail})`,

							}}
						/>
            <article style={{left: "100px", width: "calc(100% - 100px)", position: "relative", boxSizing: "border-box", padding: "16px"}}>
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
            </article>
					</a>
				</div>
			)}
		</>
	);
});

export default UrlPreview;
