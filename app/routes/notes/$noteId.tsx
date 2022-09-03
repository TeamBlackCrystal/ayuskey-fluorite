import type { LoaderArgs, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { styled } from "@stitches/react";
import { useTranslation } from "react-i18next";
import { Note } from "~/components/notes/note";
import { RemoteCaution } from "~/components/remoteCaution";
import { theme } from "~/stitches.config";
import { serverSideAPI } from "~/utils/api"
import { getUsername } from "~/utils/username"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

const getLoaderData = async (noteId: string) => {
  return await serverSideAPI.request('notes/show', {noteId})
}

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    return {
      title: `${getUsername(data.user)} | Ayuskey`,
      'og:title': `${getUsername(data.user)}`,
      'og:description': `${data.text}${(data.files.length > 0 && ` ${data.files.length}個のファイル`)}`,
      'og:image': `${data.user.avatarUrl}`,
    }
}

export async function loader({params}: LoaderArgs) {

  if (!params.noteId) throw new Error('NotFound NoteId')
  return json(await serverSideAPI.request('notes/show', {noteId: params.noteId}))

}

const NoteIndex = () => {
  const NoteContainer = styled('div', {
    marginTop: theme.colors.margin
  })

  const note = useLoaderData<typeof loader>()
  return (
    <div style={{padding: '24px'}}>
      {note.user.host && <RemoteCaution />}
    <NoteContainer><Note originalNote={note} /></NoteContainer>
    </div>
  )
}

export default NoteIndex
