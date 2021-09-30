import { User } from '@ayuskey/misskey.js/built/entities'
import { Acct, getAcct } from '~/utils/misc/acct'
import getUserName from '~/utils/misc/get-user-name';
import { url } from '~/utils/config';

export const acct = (user: Acct) => {
  return getAcct(user);
};

export const userName = (user: User) => {
  return getUserName(user);
};

export const userPage = (user: Acct, path?: any, absolute: boolean = false) => {
  return `${absolute ? url : ''}/@${acct(user)}${(path ? `/${path}` : '')}`;
};
