import { IncomingMessage, ServerResponse } from 'http';

import httpProxy from 'http-proxy';

const target = 'https://github.com/';
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  // eslint-disable-next-line prefer-regex-literals
  req.url = req.url.replace(new RegExp('^/api/proxy/github'), '');

  return new Promise<void>((resolve, reject) => {
    try {
      proxy.web(req, res, { proxyTimeout: 5000 }, (e) => {
        reject(e);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
