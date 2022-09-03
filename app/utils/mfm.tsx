import type { CustomEmojiLite } from "ayuskey.js/built/entities";
import * as mfm from "mfm-js";
import type { CSSProperties, FC } from "react";
import { useMemo } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HashTag } from "../components/common/hashtag";
import { Link } from "../components/common/link";
import { Emoji } from "../components/common/emoji";
import { Code } from "../components/code.client";
import { useSnapshot } from "valtio";
import { useCommon } from "~/state/common";
import { ClientOnly } from "remix-utils";
interface TreeProps {
	tree: mfm.MfmNode;
	plain?: boolean;
	emojis?: CustomEmojiLite[];
}

const Tree: FC<TreeProps> = ({ tree, emojis, plain }) => {
	const { host } = useSnapshot(useCommon);
	switch (tree.type) {
		case "url": {
			return (
				<Link type="link" href={tree.props.url} target="_blank">
					{tree.props.url}
					<FaExternalLinkAlt style={{ fontSize: ".9em", paddingLeft: "2px" }} />
				</Link>
			);
		}
		case "text": {
			const text = tree.props.text.replace(/(\r\n|\n|\r)/g, "\n");
			if (plain) {
				const res = [];
				for (const t of text.split("\n")) {
					res.push(<br />);
					res.push(<>{t}</>);
				}
				res.shift();
				return <>{res}</>;
			} else {
				return <>{text}</>;
			}
		}
		case "emojiCode": {
			return <Emoji emoji={`:${tree.props.name}:`} customEmojis={emojis} />;
		}
		case "hashtag": {
			return (
				<HashTag href={`${host}/tags/${tree.props.hashtag}`} target="_blank">
					#{tree.props.hashtag}
				</HashTag>
			);
		}
		case "unicodeEmoji": {
			return (
				<Emoji emoji={tree.props.emoji} customEmojis={emojis} normal={plain} />
			);
		}
		case "mention": {
			return (
				<span>
					{tree.props.acct}
				</span> //TODO
			);
		}
		case "inlineCode": {
			return (
				<ClientOnly>
					{() => <Code code={tree.props.code} inline={true} />}
				</ClientOnly>
			);
		}
		case "blockCode": {
			return (
				<ClientOnly>
					{() => (
						<Code
							code={tree.props.code}
							inline={false}
							lang={tree.props.lang}
						/>
					)}
				</ClientOnly>
			);
		}

		default:
			return <div className="text-red">謎 {tree.type}</div>;
	}
};

interface ForestProps {
	forest?: mfm.MfmNode[];
	plain?: boolean;
	emojis?: CustomEmojiLite[];
}

const Forest: FC<ForestProps> = ({ forest, plain, emojis }) => {
	return forest ? (
		<>{forest.map(
			(tree, i) => <Tree tree={tree} key={i} emojis={emojis} plain={plain} />,
		)}</>
	) : null;
};

interface MFMProps {
	plain?: boolean;
	text: string;
	emojis?: CustomEmojiLite[];
	style?: CSSProperties;
}

export const MFM: FC<MFMProps> = ({ text, emojis, plain, style }) => {
	const forest = useMemo(() =>
		plain ? mfm.parseSimple(text) : mfm.parse(text), [text, plain]);
	const body = <Forest forest={forest} plain={plain} emojis={emojis} />;
	return plain ? <span style={style}>{body}</span> : (
		<span style={style}>{body}</span>
	);
};

export function unique<T>(xs: T[]): T[] {
	return [...new Set(xs)];
}
const removeHash = (x: string) => x.replace(/#[^#]*$/, "");
export function extractUrlFromMfm(
	nodes: mfm.MfmNode[],
	respectSilentFlag = true,
): string[] {
	const urlNodes = mfm.extract(nodes, (node) => {
		return (node.type === "url") || (
			node.type === "link" && (!respectSilentFlag || !node.props.silent)
		);
	});
	//@ts-ignore
	const urls: string[] = unique(urlNodes.map((x) => x.props.url));

	return urls.reduce((array, url) => {
		const urlWithoutHash = removeHash(url);
		if (!array.map((x) => removeHash(x)).includes(urlWithoutHash))
			array.push(url);
		return array;
	}, [] as string[]);
}
