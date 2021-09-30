/* eslint-disable eqeqeq */
import P, { Language } from 'parsimmon'
import { toUnicode } from 'punycode/';
import { createLeaf, createTree, urlRegex } from './prelude';
import { emojiRegex } from '~/utils/misc/emoji-regex';
import { takeWhile, cumulativeSum } from '~/utils/prelude/array';
import parseAcct from '~/utils/misc/acct/parse';

type mfmTree = { attr: string | null, content: string }

export function removeOrphanedBrackets(s: string): string {
  const openBrackets = ['(', '['];
  const closeBrackets = [')', ']'];
  const xs = cumulativeSum(s.split('').map(c => {
    if (openBrackets.includes(c)) return 1;
    if (closeBrackets.includes(c)) return -1;
    return 0;
  }));
  const firstOrphanedCloseBracket = xs.findIndex(x => x < 0);
  if (firstOrphanedCloseBracket !== -1) return s.substr(0, firstOrphanedCloseBracket);
  const lastMatched = xs.lastIndexOf(0);
  return s.substr(0, lastMatched + 1);
}

export const mfmLanguage = P.createLanguage({
  root: (r: Language) => P.alt(r.block, r.inline).atLeast(1),
  plain: (r: Language) => P.alt(r.emoji, r.text).atLeast(1),
  block: (r: Language) => P.alt(
    r.title,
    r.quote,
    r.search,
    r.blockCode,
    r.mathBlock,
    r.center,
    r.right,
    r.marquee
  ),
  startOfLine: () => P((input: string, i: number) => {
    if (i == 0 || input[i] == '\n' || input[i - 1] == '\n') {
      return P.makeSuccess(i, null);
    } else {
      return P.makeFailure(i, 'not newline');
    }
  }),
  title: (r: Language) => r.startOfLine.then(P((input: string, i: number) => {
    const text = input.substr(i);
    const match = text.match(/^([【]([^【】\n]+?)[】])(\n|$)/);
    if (!match) return P.makeFailure(i, 'not a title');
    const q = match[2].trim();
    const contents = r.inline.atLeast(1).tryParse(q);
    return P.makeSuccess(i + match[0].length, createTree('title', contents, {}));
  })),
  quote: (r: Language) => r.startOfLine.then(P((input: string, i: number) => {
    const text = input.substr(i);
    if (!text.match(/^>[\s\S]+?/)) return P.makeFailure(i, 'not a quote');
    const quote = takeWhile(line => line.startsWith('>'), text.split('\n'));
    const qInner = quote.join('\n').replace(/^>/gm, '').replace(/^ /gm, '');
    if (qInner == '') return P.makeFailure(i, 'not a quote');
    const contents = r.root.tryParse(qInner);
    return P.makeSuccess(i + quote.join('\n').length + 1, createTree('quote', contents, {}));
  })),
  search: (r: Language) => r.startOfLine.then(P((input: string, i: number) => {
    const text = input.substr(i);
    // eslint-disable-next-line no-irregular-whitespace
    const match = text.match(/^(.+?)( |　)(検索|\[検索\]|Search|\[Search\])(\n|$)/i);
    if (!match) return P.makeFailure(i, 'not a search');
    return P.makeSuccess(i + match[0].length, createLeaf('search', { query: match[1], content: match[0].trim() }));
  })),
  blockCode: (r: Language) => r.startOfLine.then(P((input: string, i: number) => {
    const text = input.substr(i);
    const match = text.match(/^```(.+?)?\n([\s\S]+?)\n```(\n|$)/i);
    if (!match) return P.makeFailure(i, 'not a blockCode');
    return P.makeSuccess(i + match[0].length, createLeaf('blockCode', { code: match[2], lang: match[1] ? match[1].trim() : null }));
  })),
  marquee: (r: Language) => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^<marquee(\s[a-z-]+?)?>(.+?)<\/marquee>/i);
      if (!match) return P.makeFailure(i, 'not a marquee');
      return P.makeSuccess(i + match[0].length, {
        content: match[2], attr: match[1] ? match[1].trim() : null
      });
    }).map((x: mfmTree) => createTree('marquee', r.inline.atLeast(1).tryParse(x.content), { attr: x.attr }));
  },
  inline: (r: Language) => P.alt(
    r.bigger,
    r.big,
    r.bold,
    r.small,
    r.italic,
    r.sup,
    r.sub,
    r.strike,
    r.motion,
    r.xspin,
    r.yspin,
    r.blink,
    r.spin,
    r.jump,
    r.flip,
    r.vflip,
    r.rotate,
    r.twitch,
    r.shake,
    r.inlineCode,
    r.mathInline,
    r.mention,
    r.hashtag,
    r.url,
    r.link,
    r.emoji,
    r.fn,
    r.fn2,
    r.text
  ),
  bigger: (r: Language) => P.regexp(/^\*\*\*\*([\s\S]+?)\*\*\*\*/, 1).map((x: string) => createTree('bigger', r.inline.atLeast(1).tryParse(x), {})),
  big: (r: Language) => P.regexp(/^\*\*\*([\s\S]+?)\*\*\*/, 1).map((x: string) => createTree('big', r.inline.atLeast(1).tryParse(x), {})),
  bold: (r: Language) => {
    const asterisk = P.regexp(/\*\*([\s\S]+?)\*\*/, 1);
    const underscore = P.regexp(/__([a-zA-Z0-9\s]+?)__/, 1);
    return P.alt(asterisk, underscore).map((x: string) => createTree('bold', r.inline.atLeast(1).tryParse(x), {}));
  },
  small: (r: Language) => P.regexp(/<small>([\s\S]+?)<\/small>/, 1).map((x: string) => createTree('small', r.inline.atLeast(1).tryParse(x), {})),
  italic: (r: Language) => {
    const xml = P.regexp(/<i>([\s\S]+?)<\/i>/, 1);
    const underscore = P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^(\*|_)([a-zA-Z0-9]+?[\s\S]*?)\1/);
      if (!match) return P.makeFailure(i, 'not a italic');
      if (input[i - 1] != null && input[i - 1] != ' ' && input[i - 1] != '\n') return P.makeFailure(i, 'not a italic');
      return P.makeSuccess(i + match[0].length, match[2]);
    });

    return P.alt(xml, underscore).map((x: string) => createTree('italic', r.inline.atLeast(1).tryParse(x), {}));
  },
  sup: (r: Language) => {
    const paren = P.regexp(/\(\(\(([\s\S]+?)\)\)\)/, 1);
    const xml = P.regexp(/<sup>(.+?)<\/sup>/, 1);
    return P.alt(paren, xml).map((x: string) => createTree('sup', r.inline.atLeast(1).tryParse(x), {}));
  },
  sub: (r: Language) => {
    const paren = P.regexp(/\(\(\(([\s\S]+?)\)\)\)/, 1);
    const xml = P.regexp(/<sub>(.+?)<\/sub>/, 1);
    return P.alt(paren, xml).map((x: string) => createTree('sub', r.inline.atLeast(1).tryParse(x), {}));
  },
  strike: (r: Language) => P.regexp(/~~([^\n~]+?)~~/, 1).map((x: string) => createTree('strike', r.inline.atLeast(1).tryParse(x), {})),
  motion: (r: Language) => {
    const paren = P.regexp(/\(\(\(([\s\S]+?)\)\)\)/, 1);
    const xml = P.regexp(/<motion>(.+?)<\/motion>/, 1);
    return P.alt(paren, xml).map((x: string) => createTree('motion', r.inline.atLeast(1).tryParse(x), {}));
  },
  spin: (r: Language) => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^<spin(\s[a-z]+?)?>(.+?)<\/spin>/i);
      if (!match) return P.makeFailure(i, 'not a spin');
      return P.makeSuccess(i + match[0].length, {
        content: match[2], attr: match[1] ? match[1].trim() : null
      });
    }).map((x: mfmTree) => createTree('spin', r.inline.atLeast(1).tryParse(x.content), { attr: x.attr }));
  },
  xspin: (r: Language) => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^<xspin(\s[a-z]+?)?>(.+?)<\/xspin>/i);
      if (!match) return P.makeFailure(i, 'not a xspin');
      return P.makeSuccess(i + match[0].length, {
        content: match[2], attr: match[1] ? match[1].trim() : null
      });
    }).map((x: mfmTree) => createTree('xspin', r.inline.atLeast(1).tryParse(x.content), { attr: x.attr }));
  },
  yspin: (r: Language) => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^<yspin(\s[a-z]+?)?>(.+?)<\/yspin>/i);
      if (!match) return P.makeFailure(i, 'not a yspin');
      return P.makeSuccess(i + match[0].length, {
        content: match[2], attr: match[1] ? match[1].trim() : null
      });
    }).map((x: mfmTree) => createTree('yspin', r.inline.atLeast(1).tryParse(x.content), { attr: x.attr }));
  },
  jump: (r: Language) => P.regexp(/<jump>(.+?)<\/jump>/, 1).map((x: string) => createTree('jump', r.inline.atLeast(1).tryParse(x), {})),
  flip: (r: Language) => P.regexp(/<flip>(.+?)<\/flip>/, 1).map((x: string) => createTree('flip', r.inline.atLeast(1).tryParse(x), {})),
  vflip: (r: Language) => P.regexp(/<vflip>(.+?)<\/vflip>/, 1).map((x: string) => createTree('vflip', r.inline.atLeast(1).tryParse(x), {})),
  rotate: (r: Language) => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^<rotate\s+([+-]?\d+)>(.+?)<\/rotate>/i);

      if (match) {
        return P.makeSuccess(i + match[0].length, {
          content: match[2], attr: match[1]
        });
      } else {
        return P.makeFailure(i, 'not a rotate');
      }
    }).map((x: mfmTree) => createTree('rotate', r.inline.atLeast(1).tryParse(x.content), { attr: x.attr }));
  },
  blink: (r: Language) => P.regexp(/<blink>(.+?)<\/blink>/, 1).map((x: string) => createTree('blink', r.inline.atLeast(1).tryParse(x), {})),
  twitch: (r: Language) => P.regexp(/<twitch>(.+?)<\/twitch>/, 1).map((x: string) => createTree('twitch', r.inline.atLeast(1).tryParse(x), {})),
  shake: (r: Language) => P.regexp(/<shake>(.+?)<\/shake>/, 1).map((x: string) => createTree('shake', r.inline.atLeast(1).tryParse(x), {})),
  center: (r: Language) => r.startOfLine.then(P.regexp(/<center>([\s\S]+?)<\/center>/, 1).map((x: string) => createTree('center', r.inline.atLeast(1).tryParse(x), {}))),
  right: (r: Language) => r.startOfLine.then(P.regexp(/<right>([\s\S]+?)<\/right>/, 1).map((x: string) => createTree('right', r.inline.atLeast(1).tryParse(x), {}))),
  inlineCode: () => P.regexp(/`([^´\n]+?)`/, 1).map((x: string) => createLeaf('inlineCode', { code: x })),
  mathBlock: (r: Language) => r.startOfLine.then(P.regexp(/\\\[([\s\S]+?)\\\]/, 1).map((x: string) => createLeaf('mathBlock', { formula: x.trim() }))),
  mathInline: () => P.regexp(/\\\((.+?)\\\)/, 1).map((x: string) => createLeaf('mathInline', { formula: x })),
  mention: () => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(/^@\w([\w-]*\w)?(?:@[\w.-]+\w)?/);
      if (!match) return P.makeFailure(i, 'not a mention');
      if (input[i - 1] != null && input[i - 1].match(/[a-z0-9]/i)) return P.makeFailure(i, 'not a mention');
      return P.makeSuccess(i + match[0].length, match[0]);
    }).map((x: string) => {
      const { username, host } = parseAcct(x.substr(1));
      const canonical = host != null ? `@${username}@${toUnicode(host)}` : x;
      return createLeaf('mention', { canonical, username, host, acct: x });
    });
  },
  hashtag: () => P((input: string, i: number) => {
    const text = input.substr(i);
    const match = text.match(/^#([^\s.,!?'"#:/()[\]【】]+)/i);
    // m544
    //  eslint-disable-next-line no-useless-escape
    //  const match = text.match(/^#([^\s\.,!\?'"#:\/()\[\]]+)/i);
    // end
    if (!match) return P.makeFailure(i, 'not a hashtag');
    const hashtag = match[1];
    if (hashtag.match(/^(\u20E3|\uFE0F)/)) return P.makeFailure(i, 'not a hashtag');
    if (hashtag.match(/^[0-9]+$/)) return P.makeFailure(i, 'not a hashtag');
    if (input[i - 1] != null && input[i - 1].match(/[a-z0-9]/i)) return P.makeFailure(i, 'not a hashtag');
    if (Array.from(hashtag || '').length > 128) return P.makeFailure(i, 'not a hashtag');
    return P.makeSuccess(i + ('#' + hashtag).length, createLeaf('hashtag', { hashtag }));
  }),
  url: () => {
    return P((input: string, i: number) => {
      const text = input.substr(i);
      const match = text.match(urlRegex);
      let url: string;
      if (!match) {
        const match = text.match(/^<(https?:\/\/.*?)>/);
        if (!match) {
          return P.makeFailure(i, 'not a url');
        }
        url = match[1];
        i += 2;
      } else {
        url = match[0];
      }
      url = removeOrphanedBrackets(url);
      url = url.replace(/[.,]*$/, '');
      return P.makeSuccess(i + url.length, url);
    }).map((x: string) => createLeaf('url', { url: x }));
  },
  link: (r: Language) => {
    return P.seqObj(
      // todo: 型いい感じに
      ['silent', P.string('?').fallback(null).map((x: any) => x != null)] as any,
      P.string('['), ['text', P.regexp(/[^\n[\]]+/)] as any, P.string(']'),
      P.string('('), ['url', r.url] as any, P.string(')'),
    ).map((x: any) => {
      return createTree('link', r.inline.atLeast(1).tryParse(x.text), {
        silent: x.silent,
        url: x.url.node.props.url
      });
    });
  },
  emoji: () => {
    const name = P.regexp(/:(@?[\w-]+(?:@[\w.-]+)?):/i, 1).map((x: string) => createLeaf('emoji', { name: x }));
    const code = P.regexp(emojiRegex).map((x: string) => createLeaf('emoji', { emoji: x }));
    return P.alt(name, code);
  },
  fn: (r: Language) => {
    return P.seqObj(
      P.string('['), ['fn', P.regexp(/[^\s\n[\]]+/)] as any, P.string(' '), P.optWhitespace, ['text', P.regexp(/[^\n[\]]+/)] as any, P.string(']'),
    ).map((x: any) => {
      let name = x.fn;
      const args = {};
      const separator = x.fn.indexOf('.');
      if (separator > -1) {
        name = x.fn.substr(0, separator);
        for (const arg of x.fn.substr(separator + 1).split(',')) {
          const kv = arg.split('=');
          if (kv.length === 1) {
            // @ts-ignore
            args[kv[0]] = true;
          } else {
            // @ts-ignore
            args[kv[0]] = kv[1];
          }
        }
      }
      return createTree('fn', r.inline.atLeast(1).tryParse(x.text), {
        name,
        args
      });
    });
  },
  fn2: (r: Language) => {
    return P.seqObj(
      P.string('$['), ['fn', P.regexp(/[^\s\n[\]]+/)] as any, P.string(' '), P.optWhitespace, ['text', P.regexp(/[^\n[\]]+/)] as any, P.string(']'),
    ).map((x: any) => {
      let name = x.fn;
      const args = {};
      const separator = x.fn.indexOf('.');
      if (separator > -1) {
        name = x.fn.substr(0, separator);
        for (const arg of x.fn.substr(separator + 1).split(',')) {
          const kv = arg.split('=');
          if (kv.length === 1) {
            // @ts-ignore
            args[kv[0]] = true;
          } else {
            // @ts-ignore
            args[kv[0]] = kv[1];
          }
        }
      }
      return createTree('fn', r.inline.atLeast(1).tryParse(x.text), {
        name,
        args
      });
    });
  },
  text: () => P.any.map((x: string) => createLeaf('text', { text: x }))
});
