/**
 * Unit Tests – generate-presentation LLM provider helpers
 *
 * Covers: callModelsAPI · callWithRetry · generateSlidesWithFallback
 *         callBedrockFallback · mapLlmError
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Hoist mock handles so vi.mock factories can reference them ──────────────
const { mockBedrockSend } = vi.hoisted(() => ({ mockBedrockSend: vi.fn() }));

// ── Module mocks (hoisted before imports by Vitest) ─────────────────────────
vi.mock('@aws-sdk/client-bedrock-runtime', () => ({
  BedrockRuntimeClient: vi.fn().mockImplementation(() => ({ send: mockBedrockSend })),
  InvokeModelCommand: vi.fn().mockImplementation((params) => params)
}));
vi.mock('@aws-sdk/client-dynamodb', () => ({ DynamoDBClient: vi.fn() }));
vi.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: { from: vi.fn().mockReturnValue({ send: vi.fn() }) },
  PutCommand: vi.fn(),
  GetCommand: vi.fn()
}));
vi.mock('@vercel/functions/oidc', () => ({ awsCredentialsProvider: vi.fn().mockReturnValue({}) }));

global.fetch = vi.fn();

import {
  callModelsAPI,
  callWithRetry,
  generateSlidesWithFallback,
  callBedrockFallback,
  mapLlmError
} from '../../../api/generate-presentation.js';

// ── Shared fixtures ──────────────────────────────────────────────────────────
const MESSAGES = [
  { role: 'system', content: 'You are a presentation expert.' },
  { role: 'user',   content: 'Create 5 slides about innovation.' }
];
const TOKEN        = 'ghp_test_token_abc';
const MOCK_CONTENT = '{"slides":[{"message":"|lg:black|Innovation| drives growth","explanation":"Organizations that embrace change consistently outperform competitors and create lasting value for all stakeholders involved."}]}';

function fetchOk(content = MOCK_CONTENT) {
  return { ok: true, status: 200, json: async () => ({ choices: [{ message: { content } }] }) };
}
function fetchFail(status, body = 'error') {
  return { ok: false, status, text: async () => body };
}
function bedrockOk(text = MOCK_CONTENT) {
  return { body: new TextEncoder().encode(JSON.stringify({ content: [{ type: 'text', text }] })) };
}

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  callModelsAPI                                                           ║
// ╚══════════════════════════════════════════════════════════════════════════╝
describe('callModelsAPI', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('returns ok:true with content on HTTP 200', async () => {
    global.fetch.mockResolvedValueOnce(fetchOk());
    const result = await callModelsAPI({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN });
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.content).toBe(MOCK_CONTENT);
    expect(result.model).toBe('openai/gpt-4o');
  });

  it('returns ok:false with status and errorBody on HTTP 401', async () => {
    global.fetch.mockResolvedValueOnce(fetchFail(401, 'Unauthorized'));
    const result = await callModelsAPI({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(401);
    expect(result.errorBody).toBe('Unauthorized');
  });

  it('returns ok:false on HTTP 429', async () => {
    global.fetch.mockResolvedValueOnce(fetchFail(429, 'Rate limited'));
    const result = await callModelsAPI({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(429);
  });

  it('returns ok:false with "Empty content" when choices content is null', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true, status: 200,
      json: async () => ({ choices: [{ message: { content: null } }] })
    });
    const result = await callModelsAPI({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN });
    expect(result.ok).toBe(false);
    expect(result.errorBody).toBe('Empty content from model');
  });

  it('sends correct Authorization header with Bearer token', async () => {
    global.fetch.mockResolvedValueOnce(fetchOk());
    await callModelsAPI({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN });
    const [, options] = global.fetch.mock.calls[0];
    expect(options.headers['Authorization']).toBe(`Bearer ${TOKEN}`);
    expect(options.headers['X-GitHub-Api-Version']).toBe('2022-11-28');
  });

  it('sends model, messages, temperature 0.3 and max_tokens 4000 in body', async () => {
    global.fetch.mockResolvedValueOnce(fetchOk());
    await callModelsAPI({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN });
    const [, options] = global.fetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.model).toBe('openai/gpt-4o');
    expect(body.messages).toEqual(MESSAGES);
    expect(body.temperature).toBe(0.3);
    expect(body.max_tokens).toBe(4000);
  });
});

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  callWithRetry                                                           ║
// ╚══════════════════════════════════════════════════════════════════════════╝
describe('callWithRetry', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('returns success on first attempt when fetch succeeds', async () => {
    global.fetch.mockResolvedValueOnce(fetchOk());
    const result = await callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test' });
    expect(result.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry on 401 (non-transient auth error)', async () => {
    global.fetch.mockResolvedValue(fetchFail(401));
    const result = await callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test' });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(401);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry on 400 (non-transient client error)', async () => {
    global.fetch.mockResolvedValue(fetchFail(400));
    const result = await callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test' });
    expect(result.ok).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('retries on 429 and succeeds on second attempt', async () => {
    vi.useFakeTimers();
    global.fetch
      .mockResolvedValueOnce(fetchFail(429, 'rate limited'))
      .mockResolvedValueOnce(fetchOk());
    const promise = callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test' });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('retries on 503 (5xx) and succeeds on second attempt', async () => {
    vi.useFakeTimers();
    global.fetch
      .mockResolvedValueOnce(fetchFail(503, 'Service Unavailable'))
      .mockResolvedValueOnce(fetchOk());
    const promise = callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test' });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('exhausts all retries and returns last failure on persistent 429', async () => {
    vi.useFakeTimers();
    global.fetch.mockResolvedValue(fetchFail(429, 'rate limited'));
    const promise = callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test', maxRetries: 2 });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result.ok).toBe(false);
    expect(result.status).toBe(429);
    expect(global.fetch).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
    vi.useRealTimers();
  });

  it('retries on network error (status 0) and returns failure if all attempts fail', async () => {
    vi.useFakeTimers();
    global.fetch.mockRejectedValue(new Error('fetch failed'));
    const promise = callWithRetry({ model: 'openai/gpt-4o', messages: MESSAGES, token: TOKEN, logPrefix: 'test', maxRetries: 1 });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result.ok).toBe(false);
    expect(result.status).toBe(0);
    expect(global.fetch).toHaveBeenCalledTimes(2); // 1 initial + 1 retry
    vi.useRealTimers();
  });
});

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  generateSlidesWithFallback                                              ║
// ╚══════════════════════════════════════════════════════════════════════════╝
describe('generateSlidesWithFallback', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('returns first model result and calls fetch only once when it succeeds', async () => {
    global.fetch.mockResolvedValueOnce(fetchOk());
    const result = await generateSlidesWithFallback({
      models: ['openai/gpt-4o', 'meta/llama-3.1-70b-instruct'],
      messages: MESSAGES, token: TOKEN, logPrefix: 'test'
    });
    expect(result.ok).toBe(true);
    expect(result.model).toBe('openai/gpt-4o');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('falls back to second model when first returns 400', async () => {
    global.fetch
      .mockResolvedValueOnce(fetchFail(400, 'Model not found'))
      .mockResolvedValueOnce(fetchOk());
    const result = await generateSlidesWithFallback({
      models: ['openai/gpt-4o', 'meta/llama-3.1-70b-instruct'],
      messages: MESSAGES, token: TOKEN, logPrefix: 'test'
    });
    expect(result.ok).toBe(true);
    expect(result.model).toBe('meta/llama-3.1-70b-instruct');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('stops immediately on 401 — does NOT try remaining models', async () => {
    global.fetch.mockResolvedValueOnce(fetchFail(401, 'Unauthorized'));
    const result = await generateSlidesWithFallback({
      models: ['openai/gpt-4o', 'meta/llama-3.1-70b-instruct'],
      messages: MESSAGES, token: TOKEN, logPrefix: 'test'
    });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(401);
    expect(global.fetch).toHaveBeenCalledTimes(1); // second model NOT tried
  });

  it('stops immediately on 403 — does NOT try remaining models', async () => {
    global.fetch.mockResolvedValueOnce(fetchFail(403, 'Forbidden'));
    const result = await generateSlidesWithFallback({
      models: ['openai/gpt-4o', 'meta/llama-3.1-70b-instruct'],
      messages: MESSAGES, token: TOKEN, logPrefix: 'test'
    });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(403);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('returns failure after exhausting all models', async () => {
    global.fetch.mockResolvedValue(fetchFail(400, 'Model unavailable'));
    const result = await generateSlidesWithFallback({
      models: ['openai/gpt-4o', 'meta/llama-3.1-70b-instruct'],
      messages: MESSAGES, token: TOKEN, logPrefix: 'test'
    });
    expect(result.ok).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  callBedrockFallback                                                     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
describe('callBedrockFallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.AWS_REGION   = 'us-east-1';
    process.env.AWS_ROLE_ARN = 'arn:aws:iam::311923415472:role/Vercel/access-circleup-dynamodb';
  });

  it('returns ok:true with content on successful Bedrock invoke', async () => {
    mockBedrockSend.mockResolvedValueOnce(bedrockOk());
    const result = await callBedrockFallback({ messages: MESSAGES, logPrefix: 'test' });
    expect(result.ok).toBe(true);
    expect(result.content).toBe(MOCK_CONTENT);
    expect(result.model).toBe('us.anthropic.claude-sonnet-4-6');
  });

  it('separates system message and sends Anthropic Messages format', async () => {
    mockBedrockSend.mockResolvedValueOnce(bedrockOk());
    await callBedrockFallback({ messages: MESSAGES, logPrefix: 'test' });
    const command = mockBedrockSend.mock.calls[0][0];
    const body = JSON.parse(command.body);
    expect(body.anthropic_version).toBe('bedrock-2023-05-31');
    expect(body.system).toBe('You are a presentation expert.');
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0].role).toBe('user');
  });

  it('uses inference profile model id us.anthropic.claude-sonnet-4-6', async () => {
    mockBedrockSend.mockResolvedValueOnce(bedrockOk());
    await callBedrockFallback({ messages: MESSAGES, logPrefix: 'test' });
    const command = mockBedrockSend.mock.calls[0][0];
    expect(command.modelId).toBe('us.anthropic.claude-sonnet-4-6');
    expect(command.contentType).toBe('application/json');
  });

  it('returns ok:false status 502 when decoded text content is empty string', async () => {
    mockBedrockSend.mockResolvedValueOnce({
      body: new TextEncoder().encode(JSON.stringify({ content: [{ type: 'text', text: '' }] }))
    });
    const result = await callBedrockFallback({ messages: MESSAGES, logPrefix: 'test' });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(502);
    expect(result.errorBody).toBe('Empty content from Bedrock');
  });

  it('returns ok:false status 0 when BedrockRuntimeClient.send throws', async () => {
    mockBedrockSend.mockRejectedValueOnce(new Error('AccessDeniedException'));
    const result = await callBedrockFallback({ messages: MESSAGES, logPrefix: 'test' });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(0);
    expect(result.errorBody).toBe('AccessDeniedException');
  });
});

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  mapLlmError                                                             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
describe('mapLlmError', () => {
  it('maps 401 → AI_AUTH_FAILED with httpStatus 502', () => {
    const r = mapLlmError({ status: 401 });
    expect(r.code).toBe('AI_AUTH_FAILED');
    expect(r.httpStatus).toBe(502);
  });

  it('maps 403 → AI_AUTH_FAILED with httpStatus 502', () => {
    const r = mapLlmError({ status: 403 });
    expect(r.code).toBe('AI_AUTH_FAILED');
    expect(r.httpStatus).toBe(502);
  });

  it('maps 429 → AI_RATE_LIMITED with httpStatus 429', () => {
    const r = mapLlmError({ status: 429 });
    expect(r.code).toBe('AI_RATE_LIMITED');
    expect(r.httpStatus).toBe(429);
  });

  it('maps 400 → AI_MODEL_UNAVAILABLE with httpStatus 502', () => {
    const r = mapLlmError({ status: 400 });
    expect(r.code).toBe('AI_MODEL_UNAVAILABLE');
    expect(r.httpStatus).toBe(502);
  });

  it('maps 404 → AI_MODEL_UNAVAILABLE with httpStatus 502', () => {
    const r = mapLlmError({ status: 404 });
    expect(r.code).toBe('AI_MODEL_UNAVAILABLE');
    expect(r.httpStatus).toBe(502);
  });

  it('maps 500 → AI_UNAVAILABLE with httpStatus 502', () => {
    const r = mapLlmError({ status: 500 });
    expect(r.code).toBe('AI_UNAVAILABLE');
    expect(r.httpStatus).toBe(502);
  });

  it('maps status 0 (network error) → AI_UNAVAILABLE, details includes "0"', () => {
    const r = mapLlmError({ status: 0 });
    expect(r.code).toBe('AI_UNAVAILABLE');
    expect(r.details).toContain('0');
  });

  it('maps null result → AI_UNAVAILABLE, details includes "network error"', () => {
    const r = mapLlmError(null);
    expect(r.code).toBe('AI_UNAVAILABLE');
    expect(r.details).toContain('network error');
  });

  it('every mapped result contains the required fields: code, httpStatus, error, details', () => {
    [401, 403, 429, 400, 404, 500, 0].forEach((status) => {
      const r = mapLlmError({ status });
      expect(r).toHaveProperty('code');
      expect(r).toHaveProperty('httpStatus');
      expect(r).toHaveProperty('error');
      expect(r).toHaveProperty('details');
    });
  });
});
