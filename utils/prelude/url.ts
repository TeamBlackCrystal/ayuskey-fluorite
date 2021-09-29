import { stringify } from 'querystring';

export function query(obj: {}): string {
  return stringify(Object.entries(obj)
    .filter(([, v]) => Array.isArray(v) ? v.length : v !== undefined)
    // eslint-disable-next-line no-sequences,no-return-assign
    .reduce((a, [k, v]) => (a[k] = v, a), {} as Record<string, any>));
}

export function appendQuery(url: string, query: string): string {
  return `${url}${/\?/.test(url) ? url.endsWith('?') ? '' : '&' : '?'}${query}`;
}
