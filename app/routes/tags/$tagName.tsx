import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { serverSideAPI } from "~/utils/api";

export async function loader({ params }: LoaderArgs) {
	const tag = params.tagname;
	if (!tag) throw new Error("NotFound TagName");
	const notes = await serverSideAPI.request("notes/search-by-tag", {
		tag: tag,
	});
	return json({ notes });
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
	return <div>タグが見つかりません</div>;
};

export const Tag = () => {
	const {notes} = useLoaderData<typeof loader>();
  return (<></>

  )
};
