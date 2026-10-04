import BeautifulDom from 'beautiful-dom';
import { unescape } from 'html-escaper';

export function getDom(code: string): BeautifulDom | false {
  const htmlRegex = /\$\("#download"\)\.innerHTML\s*=\s*"(.*?)";/s;
  const match = code.match(htmlRegex);

  return match
    ? new BeautifulDom(unescape(match[1].replace(/\\(["'`])/g, '$1')))
    : false;
}
