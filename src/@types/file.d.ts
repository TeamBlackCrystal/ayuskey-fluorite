interface IFile {
  blurhash: string
  comment?: string
  createdAt: string
  folder?: any
  folderId?: string
  id: string
  isSensitive: boolean
  md5: string
  name: string
  properties: IFileProperties
  size: number
  thumbnaiUrl: string
  type: string
  url: string
  user?: any
  userId?: string
}

interface IFileProperties {
  height: number
  width: number
}
