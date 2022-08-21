import { useNotes, useSubScribeNotes,  } from "../state/note"


const Events = {
  on_note: (ws: WebSocket, data: IWebSocketPayload<INote>) => {
    const note = data.body.body
    useNotes.getState().addNote(note)
    const subscribeNote = useSubScribeNotes.getState()
    if (subscribeNote.ids.length + 1 > 20) {
      const unSubscribeNoteID = subscribeNote.ids[0]
      ws.send(
        `{ "type": "un", "body": { "id": "${[unSubscribeNoteID]}" } }`,
      )
      subscribeNote.unsubscribe()
    }
    subscribeNote.subscribe(note.id)
    ws.send(
      `{
        "type": "sn",
        "body": {
          "id": "${note.id}"
        }
      }`,
    );
  },
  on_noteupdated: (ws: WebSocket, data: IWebSocketPayload<INoteUpdate>) => {
    if (data.type === 'reacted') {
      Events['on_reacted'](ws, data)
    }
  },
  on_reacted: (ws: WebSocket, data: IWebSocketPayload<INoteUpdate>) => {
    useNotes.getState().addReaction(String(data.body.id), data.body.body.reaction)
  }
}




export class EventParser {
  ws: WebSocket
  constructor(ws: WebSocket) {
    this.ws = ws
  }

  parse(data: IWebSocketPayload<any>) {
    console.log(`on_${data.body.type.toLowerCase()}`)
    // @ts-ignore
    Events[`on_${data.body.type.toLowerCase()}`](this.ws, data)
  }
}
