import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readdir } from 'node:fs/promises';

const apiDir = path.resolve('api');
const port = 3001;

function createResponseHelpers(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.json = (payload) => {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }

    res.end(JSON.stringify(payload));
    return res;
  };

  res.send = (payload) => {
    if (typeof payload === 'object' && payload !== null && !Buffer.isBuffer(payload)) {
      return res.json(payload);
    }

    res.end(payload);
    return res;
  };

  return res;
}

function normalizeBody(rawBody, contentType) {
  if (!rawBody) {
    return {};
  }

  if (contentType?.includes('application/json')) {
    try {
      return JSON.parse(rawBody);
    } catch {
      return {};
    }
  }

  return rawBody;
}

function toQueryObject(searchParams) {
  const query = {};

  for (const [key, value] of searchParams.entries()) {
    if (key in query) {
      query[key] = Array.isArray(query[key]) ? [...query[key], value] : [query[key], value];
      continue;
    }

    query[key] = value;
  }

  return query;
}

async function loadHandlers() {
  const entries = await readdir(apiDir, { withFileTypes: true });
  const handlers = new Map();

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) {
      continue;
    }

    const route = `/api/${entry.name.replace(/\.js$/, '')}`;
    handlers.set(route, path.join(apiDir, entry.name));
  }

  return handlers;
}

const handlers = await loadHandlers();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const modulePath = handlers.get(url.pathname);

  if (!modulePath) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  req.query = toQueryObject(url.searchParams);
  req.body = normalizeBody(rawBody, req.headers['content-type']);

  createResponseHelpers(res);

  try {
    const moduleUrl = `${pathToFileURL(modulePath).href}?t=${Date.now()}`;
    const { default: handler } = await import(moduleUrl);
    await handler(req, res);
  } catch (error) {
    console.error('[dev-api]', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    res.end(JSON.stringify({ error: 'Local API server error' }));
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`[dev-api] Listening on http://127.0.0.1:${port}`);
});
