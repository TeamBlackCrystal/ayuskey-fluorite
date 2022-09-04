interface INoteUpdate {
  reaction: string
  userId: string
}

interface INote {
  id: string
  createdAt: string
  userId: string
  user: INoteUser
  text?: string
  cw?: string
  visibility: 'public'
  renoteCount: number
  repliesCount: number
  reactions: {[key: string]: number}
  tags: string[]
  emojis: string[]
  fileIds: string[]
  replyId?: string
  renoteId?: string
  renote?: INote
  files: IFile[]
  uri: string
  url: string
}

interface INoteReaction {
  createdAt: string
  id: string
  type: string
  user: INoteUser
}

interface INoteUser {
  id: string
  name: string
  username: string
  host?: string
  avatarUrl: string
  avatarBlurhash: string
  avatarColor: string
  instance?: IInstance
}
