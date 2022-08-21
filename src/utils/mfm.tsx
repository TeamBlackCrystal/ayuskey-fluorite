import * as mfm from "mfm-js";
import { Link } from "react-router-dom";
import { apiClient } from "./api";

// export const MFMParse = (data: mfm.MfmNode) => {
//   console.log(data.type)
// 		switch (data.type) {
// 			case "url": {
// 				apiClient.call("GET", "/url", { query: { url: data.props.url } }).then((
// 					res,
// 				) => {
// 					if (res.type === "failed") {
// 						throw res.type, res.data;
// 					}
// 					const og = res.data;
// 					return (
// 						<Link to={og.url}>
// 							<div
// 								style={{
// 									alignItems: "center",
// 									backgroundColor: "rgba(0, 0, 0, 0.4)",
// 									backgroundPosition: "50%",
// 									backgroundRepeat: "no-repeat",
// 									backgroundSize: "contain",
//                   display: "flex",
//                   height: "100%",
//                   justifyContent: "center",
//                   position: "absolute",
//                   width: "100px"
// 								}}
// 							/>
//               <article style={{left: "100px", width: "calc(100% - 100px)"}}>
//                 <header style={{marginBottom: "8px"}}>
//                   <h1 style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{og.title}</h1>
//                 </header>
//                 <p style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
//                   {og.description}
//                 </p>

//               </article>
// 						</Link>
// 					);
// 				});
// 		}
//   }
// };
