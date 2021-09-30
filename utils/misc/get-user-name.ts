import { User } from '@ayuskey/misskey.js/built/entities'

export default function(user: User): string {
  return user.name || user.username;
}
