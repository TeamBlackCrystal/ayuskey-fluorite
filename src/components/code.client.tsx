import type { FC } from "react";
// import Prism from "prismjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../assets/css/prism.css"

interface Props {
	code: string;
	lang?: string | null;
	inline?: boolean;
}

export const Code: FC<Props> = ({ code, inline, lang }) => {
	const prismLang = lang ? lang : "js";
	// const { showCodeLineNumber } = useSnapshot(useSettings.codeHighlight);
	return (
		<>
		{inline ? (
			<code className={`language-${prismLang}`}>
				{code}
			</code>
		) : (
			<SyntaxHighlighter
				language={prismLang}
				style={okaidia}
				// showLineNumbers={showCodeLineNumber}
			>
				{code}
			</SyntaxHighlighter>
		)}
		</>
	);
};
